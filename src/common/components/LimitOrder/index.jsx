/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/interactive-supports-focus */
import BSCContext from 'context/BSCContext'
import React, { useContext, useEffect, useState } from 'react'
import Button from 'common/components/Button'
import { useDebouncedCallback } from 'common/hooks/useDebouncedCallback'
import { getBalanceAmount, getDecimalAmount } from 'common/utils/numbers'
import { calculateSlippage, getPancakeFactoryPair, getQuote, getTokenPriceInUSD } from 'common/utils/tokens'
import Slider from 'rc-slider'
import BigNumber from 'bignumber.js'
import Toggle from 'react-toggle'
import { Spinner } from 'react-bootstrap'
import { event } from 'common/utils/ga'
import { toast } from 'react-toastify'
import { toastSettings } from 'common/constants'
import axios from 'axios'
import { supportedTokens } from 'common/data/exchangeData'
import supportedPancakeTokens from 'common/constants/tokens/supportedPancakeTokens.json'
import { getContract, getContractNoABI } from 'common/utils/getContract'
import TokenModal from 'components/TokenModal'

const MarketOrder = () => {
    const [showTokenModal, toggleShowTokenModal] = useState(false)

    const tokenA = supportedTokens[0]
    const [tokenB, setTokenB] = useState(supportedPancakeTokens.tokens[0])
    const [tokenAContract, setTokenAContract] = useState()
    const [tokenBContract, setTokenBContract] = useState()
    const [pancakePair, setPancakePair] = useState()

    const [tokenAAmount, setTokenAAmount] = useState('')
    const [tokenBAmount, setTokenBAmount] = useState('')
    const [tokenABalance, setTokenABalance] = useState()
    const [tokenBBalance, setTokenBBalance] = useState()

    const [useRecommendedSlippage, setUseRecommendedSlippage] = useState(true)
    const [slippagePercentage, setSlippagePercentage] = useState('0.5%')
    const [recommendedSlippage, setRecommendedSlippage] = useState(0)

    const [swapInProgress, setSwapInProgress] = useState(false)
    const [needsApproval, setNeedsApproval] = useState(false)
    const [approveInProgress, setApproveInProgress] = useState(false)
    const [loading, setLoading] = useState(false)
    const [loadingQuote, setLoadingQuote] = useState(false)
    const [openLimitOrders, setOpenLimitOrders] = useState([])
    const [allOpenLimitOrders, setAllOpenLimitOrders] = useState([])

    const [currentSwapInUSD, setCurrentSwapInUSD] = useState(0)
    const [currentBNBToTokenPrice, setCurrentBNBToTokenPrice] = useState(null)

    const bscContext = useContext(BSCContext)

    const loadOpenOrders = async (currentAccountAddress, tokenAddress) => {
        if (currentAccountAddress && tokenAddress) {
            await axios.get(`https://limit-order-manager-dot-utopia-315014.uw.r.appspot.com/retrieveLimitOrders/${currentAccountAddress.toLowerCase()}/${tokenAddress.toLowerCase()}`).then((res) => {
                if (Array.isArray(res.data)) {
                    setOpenLimitOrders(res.data)
                }
            })
        }
    }

    const loadAllOpenOrders = async (tokenAddress) => {
        if (tokenAddress) {
            await axios.get(`https://limit-order-manager-dot-utopia-315014.uw.r.appspot.com/retrievePendingLimitOrders/${tokenAddress.toLowerCase()}`).then((res) => {
                if (Array.isArray(res.data)) {
                    setAllOpenLimitOrders(res.data)
                }
            })
        }
    }

    useEffect(async () => {
        // load open orders on token change
        loadOpenOrders(bscContext.currentAccountAddress, tokenB.address)
        loadAllOpenOrders(tokenB.address)
    }, [bscContext.currentAccountAddress, tokenB.address])

    useEffect(async () => {
        // listens for change in tokens to get new pancake pair contract
        setLoading(true)
        const tokenPair = await getPancakeFactoryPair(tokenA.address, tokenB.address)
        setPancakePair(tokenPair)
        setLoading(false)
    }, [tokenA, tokenB])

    const debouncedOnChangeA = useDebouncedCallback(async (currPancakePair, currTokenAAmount, currTokenA, currTokenB, intervalId) => {
        clearInterval(intervalId)
        if (currTokenAAmount) {
            const quote = await getQuote(currPancakePair, currTokenA, currTokenB, getDecimalAmount(currTokenAAmount, currTokenA.decimals))
            setTokenBAmount(quote)
        } else {
            setTokenBAmount('')
        }
    }, 750)

    const parsedSlippagePercentage = (100 - parseFloat(useRecommendedSlippage ? recommendedSlippage : slippagePercentage)) / 100

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
                const approved = await tokenAContract.allowance(bscContext.currentAccountAddress, bscContext.utopiaLimitOrderAddress)
                if (approved.toString() === '0') {
                    setNeedsApproval(true)
                    toast.info('Please Approve this transaction', toastSettings)
                } else {
                    transactionApproved = true
                }
            }

            if (transactionApproved) {
                setSwapInProgress(true)
                axios
                    .post('https://limit-order-manager-dot-utopia-315014.uw.r.appspot.com/createLimitOrder', {
                        ordererAddress: bscContext.currentAccountAddress.toLowerCase(),
                        tokenInAddress: tokenA.address.toLowerCase(),
                        tokenOutAddress: tokenB.address.toLowerCase(),
                        tokenInAmount: getDecimalAmount(tokenAAmount, tokenA.decimals).toFixed(),
                        tokenOutAmount: getDecimalAmount(tokenBAmount, tokenB.decimals).toFixed(),
                        slippage: parseFloat(useRecommendedSlippage ? recommendedSlippage : slippagePercentage),
                    })
                    .then(() => {
                        setSwapInProgress(false)
                        toast.success('Limit Order Placed!', toastSettings)
                        loadOpenOrders(bscContext.currentAccountAddress, tokenB.address)
                    })
                    .catch((error) => {
                        toast.error(error.message, toastSettings)
                        setSwapInProgress(false)
                    })
            }
        }
    }

    const onCancelOrderClick = async (orderCode) => {
        await axios.delete(`https://limit-order-manager-dot-utopia-315014.uw.r.appspot.com/deleteLimitOrder/${tokenB.address.toLowerCase()}/${orderCode}`).then(() => {
            loadOpenOrders(bscContext.currentAccountAddress, tokenB.address)
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
    }

    useEffect(async () => {
        if (bscContext.currentAccountAddress) {
            const currentlySelectedTokenBalance = bscContext.tokenBalances.find((token) => token.TokenAddress.toLowerCase() === tokenB.address.toLowerCase())
            const tokenQuantity =
                currentlySelectedTokenBalance?.TokenDivisor === '9' ? getBalanceAmount(currentlySelectedTokenBalance?.TokenQuantity, 9) : getBalanceAmount(currentlySelectedTokenBalance?.TokenQuantity)
            setTokenABalance(getBalanceAmount(bscContext.currentBnbBalance))
            setTokenBBalance(tokenQuantity)
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
        const tokenASlippage = await calculateSlippage(tokenAContract)
        const tokenBSlippage = await calculateSlippage(tokenBContract)
        if (tokenASlippage || tokenBSlippage) {
            setRecommendedSlippage(tokenASlippage + tokenBSlippage + 2)
        } else {
            setRecommendedSlippage(0.5)
        }
    }, [tokenAContract, tokenBContract]) // set the recommended slippate value

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
        const currentBNBToTokenQuote = await getQuote(pancakePair, tokenA, tokenB, getDecimalAmount(1, tokenA.decimals))
        setCurrentBNBToTokenPrice(currentBNBToTokenQuote)
    }, [pancakePair])

    const amountInUSD = currentSwapInUSD > 0 ? new BigNumber(currentSwapInUSD).multipliedBy(new BigNumber(tokenAAmount)).toFormat(3) : '?'

    return (
        <>
            <div className="d-flex justify-content-between">
                <div className="market-trade-buy limit-order">
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
                                    debouncedOnChangeA(pancakePair, e.target.value, tokenA, tokenB)
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
                                <Button title={tokenA.displaySymbol || tokenA.symbol} disabled />
                            </div>
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
                                <div className="balance">Balance: {BigNumber.isBigNumber(tokenBBalance) ? tokenBBalance.toFixed(6) : '-'}</div>
                            </div>
                            <div className="sub-price">
                                Min Receieved: {(tokenBAmount * parsedSlippagePercentage).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 8 })}
                            </div>
                            <div className="input-group-append">
                                <Button className="token-swap-to" title={tokenB.displaySymbol || tokenB.symbol} onClick={() => toggleShowTokenModal(!showTokenModal)} />
                            </div>
                        </div>
                        <p>Limit orders cost $0.50 worth of BNB per order. Please make sure you have sufficient BNB.</p>

                        <div className="slippage-container">
                            <div className="slippage-settings">
                                <span>
                                    SLIPPAGE&nbsp;
                                    <span className="recommended-slippage-toggle">
                                        <Toggle
                                            defaultChecked={useRecommendedSlippage}
                                            icons={false}
                                            onChange={(e) => {
                                                setUseRecommendedSlippage(e.target.checked)
                                            }}
                                        />{' '}
                                        AUTO-SLIPPAGE
                                    </span>
                                </span>
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
                                                        const tx = await tokenAContract.approve(
                                                            bscContext.utopiaLimitOrderAddress,
                                                            '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'
                                                        )
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
                                            Swap
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
                    <div className="order-book-container">
                        <h4>Your Orders</h4>
                        <div className="order-book-list">
                            {openLimitOrders.length ? (
                                openLimitOrders.map((openOrder, index) => {
                                    const percentChange = currentBNBToTokenPrice
                                        ? new BigNumber(openOrder.tokenPrice)
                                              .minus(new BigNumber(currentBNBToTokenPrice))
                                              .dividedBy(new BigNumber(openOrder.tokenPrice))
                                              .multipliedBy(new BigNumber(100))
                                              .toFixed(3)
                                        : '-'

                                    return (
                                        <div className="open-limit-order">
                                            <p>{`Order Code: ${openOrder.orderCode.substr(0, 4)}...${openOrder.orderCode.substr(49, 5)}`}</p>
                                            <div className="open-limit-order-row">
                                                <span>{`Amount In: ${getBalanceAmount(openOrder.tokenInAmount, tokenA.decimals)} ${tokenA.displaySymbol}`}</span>
                                                <span>{`Order Status: ${openOrder.orderStatus}`}</span>
                                            </div>
                                            <div className="open-limit-order-row">
                                                <span>{`Target Out: ${getBalanceAmount(openOrder.tokenOutAmount, tokenB.decimals)} ${tokenB.symbol}`}</span>
                                                <span>{`Percent Change: ${percentChange}%`}</span>
                                            </div>
                                            {openOrder.orderStatus === 'PENDING' && (
                                                <div className="open-limit-order-row">
                                                    <span>{`Tries: ${openOrder.attempts}`}</span>
                                                    <div className="cancel-order" role="button" onClick={() => confirmCancelation(openOrder.orderCode)}>
                                                        Cancel Order
                                                    </div>
                                                </div>
                                            )}
                                            {index !== openLimitOrders.length - 1 && <hr />}
                                        </div>
                                    )
                                })
                            ) : (
                                <div>{`No open orders found for ${tokenB.symbol}`}</div>
                            )}
                        </div>
                        <p>If your limit order fails (due to insufficient funds or otherwise) it will be retried 5 times before it is cancelled.</p>
                    </div>
                    <div className="order-book-container">
                        <h4>Open Orders</h4>
                        <div className="order-book-list">
                            {allOpenLimitOrders.length ? (
                                allOpenLimitOrders.map((openOrder, index) => {
                                    const percentChange = currentBNBToTokenPrice
                                        ? new BigNumber(openOrder.tokenPrice)
                                              .minus(new BigNumber(currentBNBToTokenPrice))
                                              .dividedBy(new BigNumber(openOrder.tokenPrice))
                                              .multipliedBy(new BigNumber(100))
                                              .toFixed(3)
                                        : '-'

                                    return (
                                        <div className="open-limit-order">
                                            <p>{`Order Code: ${openOrder.orderCode.substr(0, 4)}...${openOrder.orderCode.substr(49, 5)}`}</p>
                                            <p role="button" onClick={copyToClipboard(openOrder.ordererAddress)}>{`Owner: ${openOrder.ordererAddress}`}</p>
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
                        </div>
                    </div>
                </div>
            </div>
            <TokenModal
                show={showTokenModal}
                onTokenSelect={async (token) => {
                    setTokenB(token)
                    toggleShowTokenModal(false)
                }}
            />
        </>
    )
}

export default MarketOrder
