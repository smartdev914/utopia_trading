/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/interactive-supports-focus */
import BSCContext from 'context/BSCContext'
import React, { useContext, useEffect, useState } from 'react'
import Button from 'common/components/Button'
import { getBalanceAmount, getDecimalAmount } from 'common/utils/numbers'
import { getPancakeFactoryPair, getQuote, getTokenPriceInUSD } from 'common/utils/tokens'
import Slider from 'rc-slider'
import BigNumber from 'bignumber.js'
import { Spinner, Tab, Tabs } from 'react-bootstrap'
import { event } from 'common/utils/ga'
import { toast } from 'react-toastify'
import { toastSettings } from 'common/constants'
import axios from 'axios'
import { supportedTokens } from 'common/data/exchangeData'
import supportedPancakeTokens from 'common/constants/tokens/supportedPancakeTokens.json'
import { getContract, getContractNoABI } from 'common/utils/getContract'
import TokenModal from 'components/TokenModal'
import { ethers } from 'ethers'
import useInterval from 'common/hooks/useInterval'

const StopLoss = () => {
    const [showTokenModal, toggleShowTokenModal] = useState(false)

    const [tokenA, setTokenA] = useState(supportedPancakeTokens.tokens[0])
    const tokenB = supportedTokens[0]

    const [tokenAContract, setTokenAContract] = useState()
    const [tokenBContract, setTokenBContract] = useState()
    const [pancakePair, setPancakePair] = useState()

    const [tokenAAmount, setTokenAAmount] = useState('')
    const [tokenBAmount, setTokenBAmount] = useState('')
    const [tokenABalance, setTokenABalance] = useState()
    const [tokenBBalance, setTokenBBalance] = useState()

    const [slippagePercentage, setSlippagePercentage] = useState('0.5%')

    const [swapInProgress, setSwapInProgress] = useState(false)
    const [needsApproval, setNeedsApproval] = useState(false)
    const [approveInProgress, setApproveInProgress] = useState(false)
    const [loading, setLoading] = useState(false)
    const [loadingQuote, setLoadingQuote] = useState(false)
    const [openLimitOrders, setOpenLimitOrders] = useState([])
    const [allOpenLimitOrders, setAllOpenLimitOrders] = useState([])

    const [currentSwapInUSD, setCurrentSwapInUSD] = useState(0)
    const [currentTokenToBNBPrice, setCurrentTokenToBNBPrice] = useState(null)
    const [loadingBNBTokenPrice, setLoadingTokenToBNBPrice] = useState(false)
    const [transactionFeeId, setTransactionFeeId] = useState()

    const bscContext = useContext(BSCContext)

    const loadOpenOrders = async (currentAccountAddress, tokenAddress) => {
        if (currentAccountAddress && tokenAddress) {
            await axios.get(`https://limit-order-manager-dot-utopia-315014.uw.r.appspot.com/retrieveStopLosses/${currentAccountAddress.toLowerCase()}/${tokenAddress.toLowerCase()}`).then((res) => {
                if (Array.isArray(res.data)) {
                    setOpenLimitOrders(res.data)
                }
            })
        }
    }

    const loadAllOpenOrders = async (tokenAddress) => {
        if (tokenAddress) {
            await axios.get(`https://limit-order-manager-dot-utopia-315014.uw.r.appspot.com/retrievePendingStopLosses/${tokenAddress.toLowerCase()}`).then((res) => {
                if (Array.isArray(res.data)) {
                    setAllOpenLimitOrders(res.data)
                } else {
                    setAllOpenLimitOrders([])
                }
            })
        }
    }

    useInterval(async () => {
        if (bscContext.currentAccountAddress) {
            loadOpenOrders(bscContext.currentAccountAddress, tokenA.address)
        }
        loadAllOpenOrders(tokenA.address)
        const currentBNBToTokenQuote = await getQuote(pancakePair, tokenA, tokenB, getDecimalAmount(1, tokenA.decimals))
        setCurrentTokenToBNBPrice(currentBNBToTokenQuote)
    }, 10000)

    useEffect(async () => {
        // load open orders on token change
        loadOpenOrders(bscContext.currentAccountAddress, tokenA.address)
        loadAllOpenOrders(tokenA.address)
    }, [bscContext.currentAccountAddress, tokenA.address])

    useEffect(async () => {
        // listens for change in tokens to get new pancake pair contract
        setLoading(true)
        const tokenPair = await getPancakeFactoryPair(tokenA.address, tokenB.address)
        setPancakePair(tokenPair)
        setLoading(false)
    }, [tokenA, tokenB])

    const parsedSlippagePercentage = (100 - parseFloat(slippagePercentage)) / 100

    const onSwapClick = async () => {
        event({
            action: 'swap',
            params: {
                fromSymbol: tokenA.symbol,
                toSymbol: tokenB.symbol,
            },
        })
        if (bscContext.currentAccountAddress && bscContext.pancakeSwapRouterV2 && tokenAAmount) {
            let transactionApproved = false
            if (tokenAContract.approve) {
                const approved = await tokenAContract.allowance(bscContext.currentAccountAddress, bscContext.utopiaStopLossAddress)
                if (approved.toString() === '0') {
                    setNeedsApproval(true)
                    toast.info('Please Approve this transaction', toastSettings)
                } else {
                    transactionApproved = true
                }
            }

            if (transactionApproved) {
                setSwapInProgress(true)
                const amountUTOPIAHeld = bscContext.tokenBalances.find((token) => token.TokenAddress.toLowerCase() === '0x1a1d7c7A92e8d7f0de10Ae532ECD9f63B7EAf67c'.toLowerCase())
                const enoughUTOPIAHeld = getBalanceAmount(amountUTOPIAHeld.TokenQuantity, 9).isGreaterThanOrEqualTo(new BigNumber(50000000))
                const transactionFee = await getQuote(
                    await getPancakeFactoryPair('0x55d398326f99059fF775485246999027B3197955', '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c'),
                    {
                        address: '0x55d398326f99059fF775485246999027B3197955',
                        symbol: 'USDT',
                        decimals: 18,
                    },
                    {
                        name: 'WBNB Token',
                        symbol: 'WBNB',
                        address: '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c',
                        decimals: 18,
                    },
                    getDecimalAmount(enoughUTOPIAHeld ? 0.5 : 1, 18)
                )
                const tx = {
                    from: bscContext.currentAccountAddress,
                    to: '0x553fFB649ABD0c52813879451Ccb64f8E9e02630',
                    value: getDecimalAmount(transactionFee, 18).toFixed(0),
                }
                if (!transactionFeeId) {
                    toast.info('Please Approve Limit Order Fee')

                    await window.web3.eth
                        .sendTransaction(tx)
                        .then(async (res) => {
                            setTransactionFeeId(res.transactionHash)
                            toast.success('Transaction Fee Accepted')

                            await axios
                                .post(
                                    'https://limit-order-manager-dot-utopia-315014.uw.r.appspot.com/createStopLoss',
                                    {
                                        ordererAddress: bscContext.currentAccountAddress.toLowerCase(),
                                        tokenInAddress: tokenA.address.toLowerCase(),
                                        tokenOutAddress: tokenB.address.toLowerCase(),
                                        tokenInAmount: getDecimalAmount(tokenAAmount, tokenA.decimals).toFixed(),
                                        tokenOutAmount: getDecimalAmount(tokenAAmount * tokenBAmount, tokenB.decimals).toFixed(),
                                        tokenPrice: tokenBAmount,
                                        slippage: parseFloat(slippagePercentage) * 100,
                                        feeTxHash: res.transactionHash,
                                    },
                                    {
                                        timeout: 5000,
                                    }
                                )
                                .then((result) => {
                                    if (result.data.status !== 'Success') {
                                        throw new Error('Stop Loss Order Failed')
                                    }
                                    setSwapInProgress(false)
                                    toast.success('Stop Loss Order Placed!', toastSettings)
                                    setTokenAAmount('')
                                    setTransactionFeeId(undefined)
                                    loadOpenOrders(bscContext.currentAccountAddress, tokenA.address)
                                })
                                .catch((error) => {
                                    toast.error(error.message, toastSettings)
                                    setSwapInProgress(false)
                                })
                        })
                        .catch(() => {
                            setSwapInProgress(false)
                            toast.error('Transaction Canceled')
                        })
                } else {
                    try {
                        await axios
                            .post(
                                'https://limit-order-manager-dot-utopia-315014.uw.r.appspot.com/createLimitOrder',
                                {
                                    ordererAddress: bscContext.currentAccountAddress.toLowerCase(),
                                    tokenInAddress: tokenA.address.toLowerCase(),
                                    tokenOutAddress: tokenB.address.toLowerCase(),
                                    tokenInAmount: getDecimalAmount(tokenAAmount, tokenA.decimals).toFixed(),
                                    tokenOutAmount: getDecimalAmount(tokenAAmount * tokenBAmount, tokenB.decimals).toFixed(),
                                    tokenPrice: tokenBAmount,
                                    slippage: parseFloat(slippagePercentage) * 100,
                                    feeTxHash: transactionFeeId,
                                },
                                {
                                    timeout: 5000,
                                }
                            )
                            .then((result) => {
                                if (result.data.status !== 'Success') {
                                    throw new Error('Stop Loss Order Failed')
                                }
                                setSwapInProgress(false)
                                toast.success('Stop Loss Order Placed!', toastSettings)
                                setTokenAAmount('')
                                setTransactionFeeId('')
                                loadOpenOrders(bscContext.currentAccountAddress, tokenA.address)
                            })
                            .catch((error) => {
                                toast.error(error.message, toastSettings)
                                setSwapInProgress(false)
                            })
                    } catch {
                        toast.error('Order Placement Failed, Please Try again')
                    }
                    setSwapInProgress(false)
                    setTransactionFeeId(undefined)
                }
            }
        }
    }

    const onCancelOrderClick = async (orderCode) => {
        await axios.delete(`https://limit-order-manager-dot-utopia-315014.uw.r.appspot.com/deleteStopLoss/${tokenA.address.toLowerCase()}/${orderCode}`).then(() => {
            loadOpenOrders(bscContext.currentAccountAddress, tokenA.address)
        })
    }

    const confirmCancelation = async (orderCode) => {
        toast.warn(
            <div>
                Confirm Cancelation?{' '}
                <div role="button" onClick={() => onCancelOrderClick(orderCode)}>
                    Yes
                </div>
            </div>
        )
    }

    const copyToClipboard = (address) => {
        navigator.clipboard.writeText(address)
        toast.info('Copied Address to Clipboard', toastSettings)
    }

    useEffect(async () => {
        if (bscContext.currentAccountAddress) {
            const currentlySelectedTokenBalance = bscContext.tokenBalances.find((token) => token.TokenAddress.toLowerCase() === tokenA.address.toLowerCase())
            const tokenQuantity =
                currentlySelectedTokenBalance?.TokenDivisor === '9' ? getBalanceAmount(currentlySelectedTokenBalance?.TokenQuantity, 9) : getBalanceAmount(currentlySelectedTokenBalance?.TokenQuantity)
            setTokenABalance(tokenQuantity)
            setTokenBBalance(getBalanceAmount(bscContext.currentBnbBalance))
        } else {
            setTokenABalance('-')
            setTokenBBalance('-')
        }
    }, [bscContext.currentAccountAddress, tokenA.address, tokenB.address, bscContext.tokenBalances])

    useEffect(async () => {
        try {
            const tokenAabi = await import(`../../../ABI/tokenABI/${tokenA.symbol.toUpperCase()}.js`)
            const currentTokenAContract = getContract(tokenAabi.default, tokenA.address, bscContext.signer)
            currentTokenAContract.defaultAccount = bscContext.currentAccountAddress
            setTokenAContract(currentTokenAContract)
        } catch (e) {
            const currentTokenAContract = await getContractNoABI(tokenA.address, bscContext.signer)
            currentTokenAContract.defaultAccount = bscContext.currentAccountAddress
            setTokenAContract(currentTokenAContract)
        }
        try {
            const tokenBabi = await import(`../../../ABI/tokenABI/${tokenB.symbol.toUpperCase()}.js`)
            const currentTokenBContract = getContract(tokenBabi.default, tokenB.address, bscContext.signer)
            currentTokenBContract.defaultAccount = bscContext.currentAccountAddress
            setTokenBContract(currentTokenBContract)
        } catch (e) {
            const currentTokenBContract = await getContractNoABI(tokenB.address, bscContext.signer)
            currentTokenBContract.defaultAccount = bscContext.currentAccountAddress
            setTokenBContract(currentTokenBContract)
        }
    }, [tokenA, tokenB, bscContext.signer])

    useEffect(async () => {
        try {
            const currentTokenInUSD = await getTokenPriceInUSD(tokenA.address, tokenA.decimals)
            setCurrentSwapInUSD(currentTokenInUSD)
        } catch (e) {
            setCurrentSwapInUSD(0)
        }
    }, [tokenA])

    useEffect(async () => {
        setLoadingQuote(true)
        if (tokenAAmount) {
            const newQuote = await getQuote(pancakePair, tokenA, tokenB, getDecimalAmount(tokenAAmount, tokenA.decimals))
            setTokenBAmount(newQuote)
        }
        setLoadingQuote(false)
    }, [pancakePair])

    useEffect(async () => {
        setLoadingTokenToBNBPrice(true)
        const currentTokenToBNB = await getQuote(pancakePair, tokenA, tokenB, getDecimalAmount(1, tokenA.decimals))
        setCurrentTokenToBNBPrice(currentTokenToBNB)
        setLoadingTokenToBNBPrice(false)
    }, [pancakePair])

    const amountInUSD = currentSwapInUSD > 0 ? new BigNumber(currentSwapInUSD).multipliedBy(new BigNumber(tokenAAmount)).toFormat(3) : '?'
    const minReceived = tokenAAmount * tokenBAmount * parsedSlippagePercentage

    return (
        <>
            <div className="d-flex justify-content-between">
                <div className="market-trade-buy stop-loss">
                    <form action="#">
                        <div className="input-group top from">
                            <input
                                type="number"
                                className="form-control"
                                required
                                onWheel={() => {
                                    document.activeElement.blur()
                                }}
                                value={tokenAAmount}
                                onInput={(e) => {
                                    setTokenAAmount(e.target.value)
                                }}
                            />
                            <div className="token-A-balance">
                                <Button
                                    title="MAX"
                                    onClick={() => {
                                        setTokenAAmount(tokenABalance)
                                    }}
                                />
                                <div
                                    role="button"
                                    className="balance"
                                    onClick={() => {
                                        setTokenAAmount(tokenABalance)
                                    }}
                                >
                                    Balance: {BigNumber.isBigNumber(tokenABalance) ? tokenABalance.toFixed(6) : '-'}
                                </div>
                            </div>
                            <div className="sub-price">In USD: {tokenAAmount ? `$${amountInUSD}` : '-'}</div>
                            <div className="input-group-append">
                                <Button className="token-swap-from" title={tokenA.displaySymbol || tokenA.symbol} onClick={() => toggleShowTokenModal(!showTokenModal)} />
                            </div>
                        </div>
                        <div className="token-conversion">
                            <span>
                                {`1 ${tokenA.displaySymbol || tokenA.symbol}`} &#8776; {`${currentTokenToBNBPrice} ${tokenB.symbol}`}
                            </span>
                        </div>
                        <div className="input-group to">
                            <input
                                type="number"
                                className="form-control"
                                required
                                value={tokenBAmount}
                                onWheel={() => {
                                    document.activeElement.blur()
                                }}
                                onInput={(e) => {
                                    setTokenBAmount(e.target.value)
                                }}
                            />
                            <div className="token-B-balance">
                                <Button
                                    title="CURRENT"
                                    onClick={() => {
                                        setTokenBAmount(currentTokenToBNBPrice)
                                    }}
                                />
                                <div className="balance">
                                    Change:{' '}
                                    {tokenBAmount
                                        ? new BigNumber(tokenBAmount)
                                              .minus(new BigNumber(currentTokenToBNBPrice))
                                              .dividedBy(new BigNumber(currentTokenToBNBPrice))
                                              .multipliedBy(new BigNumber(100))
                                              .toFixed(2)
                                        : '-'}
                                    %
                                </div>
                            </div>
                            <div className="sub-price">Min Receieved: {minReceived.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 8 })}</div>
                            <div className="input-group-append">
                                <Button className="token-swap-to" title={tokenB.displaySymbol || tokenB.symbol} disabled />
                            </div>
                        </div>
                        <p>Stop Loss will trigger if {tokenA.symbol} falls below this price.</p>

                        <div className="slippage-container">
                            <p>Remember to adjust the correct slippage for your token.</p>

                            <div className="slippage-settings">
                                <span>SLIPPAGE</span>
                                <input
                                    className="slippage-percentage-input"
                                    type="text"
                                    value={slippagePercentage}
                                    onChange={(e) => setSlippagePercentage(e.target.value)}
                                    onBlur={(e) => e.target.value && setSlippagePercentage(`${parseFloat(e.target.value)}%`)}
                                />
                            </div>
                            <Slider
                                min={0}
                                max={50}
                                marks={{ 10: '10', 20: '20', 30: '30', 40: '40', 50: '50' }}
                                value={parseFloat(slippagePercentage)}
                                onChange={(e) => {
                                    setSlippagePercentage(`${e}%`)
                                }}
                            />
                        </div>

                        {bscContext.currentAccountAddress ? (
                            <>
                                {swapInProgress || approveInProgress ? (
                                    <div className="spinner-container">
                                        <Spinner size="" animation="border" variant="primary" />
                                    </div>
                                ) : (
                                    <>
                                        {needsApproval && (
                                            <button
                                                type="button"
                                                className="btn buy"
                                                onClick={async () => {
                                                    setApproveInProgress(true)
                                                    try {
                                                        const tx = await tokenAContract.approve(bscContext.utopiaStopLossAddress, '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')
                                                        await tx.wait()
                                                        setNeedsApproval(false)
                                                        setApproveInProgress(false)
                                                        toast.success('Swap Approved', toastSettings)
                                                    } catch (e) {
                                                        toast.error('Error Approving', toastSettings)
                                                        setApproveInProgress(false)
                                                    }
                                                }}
                                            >
                                                Approve
                                            </button>
                                        )}
                                        <button
                                            type="button"
                                            className="btn buy"
                                            onClick={onSwapClick}
                                            disabled={loading || loadingQuote || !tokenAAmount || new BigNumber(tokenAAmount).isGreaterThan(new BigNumber(tokenABalance))}
                                        >
                                            Place Order
                                        </button>
                                    </>
                                )}
                            </>
                        ) : (
                            <button
                                type="button"
                                className="btn buy"
                                onClick={async () => {
                                    await bscContext.triggerDappModal()
                                }}
                            >
                                Connect Wallet
                            </button>
                        )}
                    </form>
                    <div className="disclaimers-section">
                        <p>Limit Orders cost $0.50 worth of BNB to place (+$0.50 gas fee) or FREE if you are holding at least 50,000,000 UTOPIA (just pay $0.50 to cover gas).</p>

                        <p>Orders are good for 28 days and after that will be cancelled.</p>
                    </div>
                    <div className="order-book-container">
                        <h4>Your Orders</h4>
                        <Tabs defaultActiveKey="open">
                            <Tab eventKey="open" title="OPEN">
                                <div className="order-book-list">
                                    {loadingBNBTokenPrice ? (
                                        <div className="spinner-container">
                                            <Spinner size="" animation="border" variant="primary" />
                                        </div>
                                    ) : (
                                        <>
                                            {openLimitOrders.filter((order) => order.orderStatus === 'PENDING' || (order.orderStatus === 'ATTEMPTED' && order.attempts < 5)).length ? (
                                                openLimitOrders
                                                    .filter((order) => order.orderStatus === 'PENDING' || (order.orderStatus === 'ATTEMPTED' && order.attempts < 5))
                                                    .map((openOrder, index) => {
                                                        const percentChange = currentTokenToBNBPrice
                                                            ? new BigNumber(openOrder.tokenPrice)
                                                                  .minus(new BigNumber(currentTokenToBNBPrice))
                                                                  .dividedBy(new BigNumber(currentTokenToBNBPrice))
                                                                  .multipliedBy(new BigNumber(100))
                                                                  .toFixed(3)
                                                            : '-'

                                                        return (
                                                            <div className="open-limit-order">
                                                                <p>{`Order Code: ${openOrder.orderCode.substr(0, 8)}...`}</p>
                                                                <div className="open-limit-order-row">
                                                                    <span>{`Amount In: ${getBalanceAmount(openOrder.tokenInAmount, tokenA.decimals)} ${tokenA.displaySymbol}`}</span>
                                                                    <span>{`Order Status: ${openOrder.orderStatus}`}</span>
                                                                </div>
                                                                <div className="open-limit-order-row">
                                                                    <span>{`Target Out: ${getBalanceAmount(openOrder.tokenOutAmount, tokenB.decimals)} ${tokenB.symbol}`}</span>
                                                                    <span>{`Percent Change: ${percentChange}%`}</span>
                                                                </div>
                                                                <div className="open-limit-order-row">
                                                                    <span>{`Tries: ${openOrder.attempts}/5`}</span>
                                                                    <div className="cancel-order" role="button" onClick={() => confirmCancelation(openOrder.orderCode)}>
                                                                        Cancel Order
                                                                    </div>
                                                                </div>

                                                                {index !== openLimitOrders.length - 1 && <hr />}
                                                            </div>
                                                        )
                                                    })
                                            ) : (
                                                <div>{`No open orders found for ${tokenB.symbol}`}</div>
                                            )}
                                        </>
                                    )}
                                </div>
                            </Tab>
                            <Tab eventKey="complete" title="COMPLETE">
                                <div className="order-book-list">
                                    {loadingBNBTokenPrice ? (
                                        <div className="spinner-container">
                                            <Spinner size="" animation="border" variant="primary" />
                                        </div>
                                    ) : (
                                        <>
                                            {openLimitOrders.filter((order) => order.orderStatus === 'COMPLETED').length ? (
                                                openLimitOrders
                                                    .filter((order) => order.orderStatus === 'COMPLETED')
                                                    .map((openOrder, index) => {
                                                        const percentChange = currentTokenToBNBPrice
                                                            ? new BigNumber(openOrder.tokenPrice)
                                                                  .minus(new BigNumber(currentTokenToBNBPrice))
                                                                  .dividedBy(new BigNumber(currentTokenToBNBPrice))
                                                                  .multipliedBy(new BigNumber(100))
                                                                  .toFixed(3)
                                                            : '-'

                                                        return (
                                                            <div
                                                                role="button"
                                                                className="open-limit-order completed"
                                                                onClick={() => window.open(`https://bscscan.com/tx/${openOrder.executionTxHash}`, '_blank')}
                                                            >
                                                                <p>{`Order Code: ${openOrder.orderCode.substr(0, 8)}...`}</p>
                                                                <div className="open-limit-order-row">
                                                                    <span>{`Amount In: ${getBalanceAmount(openOrder.tokenInAmount, tokenA.decimals)} ${tokenA.displaySymbol}`}</span>
                                                                    <span>{`Order Status: ${openOrder.orderStatus}`}</span>
                                                                </div>
                                                                <div className="open-limit-order-row">
                                                                    <span>{`Target Out: ${getBalanceAmount(openOrder.tokenOutAmount, tokenB.decimals)} ${tokenB.symbol}`}</span>
                                                                    <span>{`Percent Change: ${percentChange}%`}</span>
                                                                </div>
                                                                {index !== openLimitOrders.length - 1 && <hr />}
                                                            </div>
                                                        )
                                                    })
                                            ) : (
                                                <div>{`No open orders found for ${tokenB.symbol}`}</div>
                                            )}
                                        </>
                                    )}
                                </div>
                            </Tab>
                            <Tab eventKey="failed" title="FAILED">
                                <div className="order-book-list">
                                    {loadingBNBTokenPrice ? (
                                        <div className="spinner-container">
                                            <Spinner size="" animation="border" variant="primary" />
                                        </div>
                                    ) : (
                                        <>
                                            {openLimitOrders.filter((order) => order.orderStatus === 'ATTEMPTED' && order.attempts === 5).length ? (
                                                openLimitOrders
                                                    .filter((order) => order.orderStatus === 'ATTEMPTED' && order.attempts === 5)
                                                    .map((openOrder, index) => {
                                                        const percentChange = currentTokenToBNBPrice
                                                            ? new BigNumber(openOrder.tokenPrice)
                                                                  .minus(new BigNumber(currentTokenToBNBPrice))
                                                                  .dividedBy(new BigNumber(openOrder.tokenPrice))
                                                                  .multipliedBy(new BigNumber(100))
                                                                  .toFixed(3)
                                                            : '-'

                                                        return (
                                                            <div className="open-limit-order">
                                                                <p>{`Order Code: ${openOrder.orderCode.substr(0, 8)}...`}</p>
                                                                <div className="open-limit-order-row">
                                                                    <span>{`Amount In: ${getBalanceAmount(openOrder.tokenInAmount, tokenA.decimals)} ${tokenA.symbol}`}</span>
                                                                    <span>{`Order Status: ${openOrder.orderStatus}`}</span>
                                                                </div>
                                                                <div className="open-limit-order-row">
                                                                    <span>{`Target Out: ${getBalanceAmount(openOrder.tokenOutAmount, tokenB.decimals)} ${tokenB.displaySymbol}`}</span>
                                                                    <span>{`Percent Change: ${percentChange}%`}</span>
                                                                </div>
                                                                <div className="open-limit-order-row">
                                                                    <span>{`Tries: ${openOrder.attempts}/5`}</span>
                                                                </div>

                                                                {index !== openLimitOrders.length - 1 && <hr />}
                                                            </div>
                                                        )
                                                    })
                                            ) : (
                                                <div>{`No failed orders found for ${tokenB.symbol}`}</div>
                                            )}
                                        </>
                                    )}
                                </div>
                            </Tab>
                        </Tabs>

                        <p>If your limit order fails (due to insufficient funds or otherwise) it will be retried 5 times before it is cancelled.</p>
                    </div>
                    <div className="order-book-container">
                        <h4>All Open Orders</h4>
                        <div className="order-book-list">
                            {loadingBNBTokenPrice ? (
                                <div className="spinner-container">
                                    <Spinner size="" animation="border" variant="primary" />
                                </div>
                            ) : (
                                <>
                                    {allOpenLimitOrders.length ? (
                                        allOpenLimitOrders.map((openOrder, index) => {
                                            const percentChange = currentTokenToBNBPrice
                                                ? new BigNumber(openOrder.tokenPrice)
                                                      .minus(new BigNumber(currentTokenToBNBPrice))
                                                      .dividedBy(new BigNumber(openOrder.tokenPrice))
                                                      .multipliedBy(new BigNumber(100))
                                                      .toFixed(3)
                                                : '-'

                                            return (
                                                <div className="open-limit-order">
                                                    <p>{`Order Code: ${openOrder.orderCode.substr(0, 4)}...${openOrder.orderCode.substr(49, 5)}`}</p>
                                                    <p role="button" onClick={() => copyToClipboard(openOrder.ordererAddress)}>{`Owner: ${openOrder.ordererAddress}`}</p>
                                                    <div className="open-limit-order-row">
                                                        <span>{`Amount In: ${getBalanceAmount(openOrder.tokenInAmount, tokenA.decimals)} ${tokenA.symbol}`}</span>
                                                        <span>{`Order Status: ${openOrder.orderStatus}`}</span>
                                                    </div>
                                                    <div className="open-limit-order-row">
                                                        <span>{`Target Out: ${getBalanceAmount(openOrder.tokenOutAmount, tokenB.decimals)} ${tokenB.displaySymbol}`}</span>
                                                        <span>{`Percent Change: ${percentChange}%`}</span>
                                                    </div>
                                                    {index !== openLimitOrders.length - 1 && <hr />}
                                                </div>
                                            )
                                        })
                                    ) : (
                                        <div>{`No open orders found for ${tokenB.symbol}`}</div>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <TokenModal
                hideBar
                toggleShowTokenModal={toggleShowTokenModal}
                show={showTokenModal}
                onTokenSelect={async (token) => {
                    setTokenA(token)
                    toggleShowTokenModal(false)
                }}
            />
        </>
    )
}

export default StopLoss
