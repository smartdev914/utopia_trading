/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import Button from 'common/components/Button'
import Image from 'next/image'
import { toast } from 'react-toastify'
import { supportedTokens } from 'common/data/exchangeData'
import React, { useContext, useEffect, useState } from 'react'
import { Tabs, Tab, Spinner } from 'react-bootstrap'
import BSCContext from 'context/BSCContext'
import TokenContext from 'context/TokenContext'
import { getBalanceAmount, getDecimalAmount } from 'common/utils/numbers'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import { BigNumber } from 'bignumber.js'
import { useDebouncedCallback } from 'common/hooks/useDebouncedCallback'
import { calculateSlippage, getQuote, getTokenPriceInUSD } from 'common/utils/tokens'
import Toggle from 'react-toggle'
import { event } from 'common/utils/ga'
import getContract from 'common/utils/getContract'
import TokenModal from './TokenModal'

import supportedPancakeTokens from '../common/constants/tokens/supportedPancakeTokens.json'

const Contract = require('web3-eth-contract')
// set provider for all later instances to use
Contract.setProvider('wss://ws-nd-219-979-765.p2pify.com/c2317b27ad9bde72c2d30764cf359fa3')

const toastSettings = {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'colored',
}

export default function MarketTrade() {
    const [fromBNB, toggleFromBnb] = useState(true)
    const [tokenA, setTokenA] = useState(supportedTokens[0])
    const [tokenB, setTokenB] = useState(supportedPancakeTokens.tokens[0])
    const [tokenAAmount, setTokenAAmount] = useState('')
    const [tokenBAmount, setTokenBAmount] = useState('')
    const [showTokenModal, toggleShowTokenModal] = useState(false)
    const [tokenAEstimated, setTokenAEstimated] = useState(false)
    const [needsApproval, setNeedsApproval] = useState(false)
    const [tokenAContract, setTokenAContract] = useState()
    const [tokenBContract, setTokenBContract] = useState()
    const [swapInProgress, setSwapInProgress] = useState(false)
    const [approveInProgress, setApproveInProgress] = useState(false)
    const [slippagePercentage, setSlippagePercentage] = useState('0.5%')
    const [tokenABalance, setTokenABalance] = useState()
    const [tokenBBalance, setTokenBBalance] = useState()

    const [recommendedSlippage, setRecommendedSlippage] = useState(0)
    const [useRecommendedSlippage, setUseRecommendedSlippage] = useState(true)
    const [quoteIntervalId, setQuoteIntervalId] = useState()
    const [currentSwapInUSD, setCurrentSwapInUSD] = useState(0)
    const bscContext = useContext(BSCContext)
    const tokenContext = useContext(TokenContext)

    const clickToggleFromBNB = () => {
        toggleFromBnb(!fromBNB)

        const tempToken = tokenA
        setTokenA(tokenB)
        setTokenB(tempToken)

        const tempTokenAmount = tokenAAmount
        setTokenAAmount(tokenBAmount)
        setTokenBAmount(tempTokenAmount)

        setTokenAEstimated(!tokenAEstimated)
    }

    useEffect(() => {
        bscContext.setLoadDexContract(true)
    }, [])

    useEffect(() => {
        if (fromBNB) {
            setTokenB(tokenContext.currentlySelectedToken)
        } else {
            setTokenA(tokenContext.currentlySelectedToken)
        }
    }, [tokenContext.currentlySelectedToken])

    useEffect(async () => {
        const tokenASlippage = await calculateSlippage(tokenAContract)
        const tokenBSlippage = await calculateSlippage(tokenBContract)
        if (tokenASlippage || tokenBSlippage) {
            setRecommendedSlippage(tokenASlippage + tokenBSlippage + 2)
        } else {
            setRecommendedSlippage(0.5)
        }
    }, [tokenAContract, tokenBContract]) // set the recommended slippate value

    const debouncedOnChangeA = useDebouncedCallback(async (currTokenAAmount, currTokenA, currTokenB, intervalId) => {
        clearInterval(intervalId)
        if (currTokenAAmount) {
            const quote = await getQuote(currTokenA, currTokenB, getDecimalAmount(currTokenAAmount, currTokenA.decimals))
            setTokenBAmount(quote)
            const currIntervalId = setInterval(async () => {}, 7000)
            setQuoteIntervalId(currIntervalId)
        } else {
            setTokenBAmount('')
        }
    }, 750)

    const debouncedOnChangeB = useDebouncedCallback(async (currTokenBAmount, currTokenB, currTokenA, intervalId) => {
        clearInterval(intervalId)
        if (currTokenBAmount) {
            const quote = await getQuote(currTokenB, currTokenA, getDecimalAmount(currTokenBAmount, currTokenB.decimals))
            setTokenAAmount(quote)
            const currIntervalId = setInterval(async () => {
                const newQuote = await getQuote(currTokenB, currTokenA, getDecimalAmount(currTokenBAmount, currTokenB.decimals))
                setTokenAAmount(newQuote)
            }, 7000)
            setQuoteIntervalId(currIntervalId)
        } else {
            setTokenAAmount('')
        }
    }, 750)

    useEffect(async () => {
        clearInterval(quoteIntervalId)
        if (tokenAAmount || tokenBAmount) {
            const getAndSetQuoted = async () => {
                if (tokenAEstimated) {
                    const newQuote = await getQuote(tokenB, tokenA, getDecimalAmount(tokenBAmount, tokenB.decimals))
                    setTokenAAmount(newQuote)
                } else {
                    const newQuote = await getQuote(tokenA, tokenB, getDecimalAmount(tokenAAmount, tokenA.decimals))
                    setTokenBAmount(newQuote)
                }
            }
            await getAndSetQuoted()
            const currIntervalId = setInterval(async () => {
                await getAndSetQuoted()
            }, 7000)
            setQuoteIntervalId(currIntervalId)
        }
    }, [fromBNB, tokenA, tokenB])

    useEffect(async () => {
        try {
            const tokenAabi = await import(`../ABI/tokenABI/${tokenA.symbol.toUpperCase()}.js`)
            const currentTokenAContract = await Contract(tokenAabi.default, tokenA.address)
            setTokenAContract(currentTokenAContract)
        } catch (e) {
            const currentTokenAContract = await getContract(tokenA.address)
            setTokenAContract(currentTokenAContract)
        }
        try {
            const tokenBabi = await import(`../ABI/tokenABI/${tokenB.symbol.toUpperCase()}.js`)
            const currentTokenBContract = await Contract(tokenBabi.default, tokenB.address)
            setTokenBContract(currentTokenBContract)
        } catch (e) {
            const currentTokenBContract = await getContract(tokenB.address)
            setTokenBContract(currentTokenBContract)
        }
    }, [tokenA, tokenB])

    useEffect(async () => {
        if (bscContext.currentAccountAddress) {
            const currentlySelectedTokenBalance = bscContext.tokenBalances.find((token) => token.TokenAddress.toLowerCase() === (fromBNB ? tokenB.address.toLowerCase() : tokenA.address.toLowerCase()))
            const tokenQuantity =
                currentlySelectedTokenBalance?.TokenDivisor === '9' ? getBalanceAmount(currentlySelectedTokenBalance?.TokenQuantity, 9) : getBalanceAmount(currentlySelectedTokenBalance?.TokenQuantity)
            if (fromBNB) {
                setTokenABalance(getBalanceAmount(bscContext.currentBnbBalance))
                setTokenBBalance(tokenQuantity)
            } else {
                setTokenBBalance(getBalanceAmount(bscContext.currentBnbBalance))
                setTokenABalance(tokenQuantity)
            }
        } else {
            setTokenABalance('-')
            setTokenBBalance('-')
        }
    }, [bscContext.currentAccountAddress, fromBNB, tokenA.address, tokenB.address, bscContext.tokenBalances])

    useEffect(async () => {
        const currentTokenInUSD = await getTokenPriceInUSD(tokenA.address, tokenA.decimals)
        setCurrentSwapInUSD(currentTokenInUSD)
    }, [tokenA])

    const parsedSlippagePercentage = (100 - parseFloat(useRecommendedSlippage ? recommendedSlippage : slippagePercentage)) / 100

    const onSwapClick = async () => {
        event({
            action: 'swap',
            params: {
                fromSymbol: tokenA.symbol,
                toSymbol: tokenB.symbol,
            },
        })
        // Also verify pancakeSwapRouterV2Address
        if (bscContext.currentAccountAddress && bscContext.pancakeSwapRouterV2 && tokenAAmount) {
            // TODO: Check tokenA is approved for swap (Maybe put this logic in another function?)

            // TODO: Change 0 to value depending on desired slippage
            // TODO: Consider changing deadline value to something else in the future (for slower executing times?)
            if (fromBNB) {
                // if swapping from BNB to token
                setSwapInProgress(true)
                await bscContext.pancakeSwapRouterV2.methods
                    .swapExactETHForTokensSupportingFeeOnTransferTokens(
                        getDecimalAmount(parseInt(tokenBAmount * parsedSlippagePercentage, 10), tokenB.decimals).toFixed(),
                        [tokenA.address, tokenB.address],
                        bscContext.currentAccountAddress,
                        Math.floor(Date.now() / 1000) + 30
                    )
                    .estimateGas({
                        from: bscContext.currentAccountAddress,
                        value: getDecimalAmount(tokenAAmount, tokenA.decimals),
                    })
                    .then(async () => {
                        await bscContext.pancakeSwapRouterV2.methods
                            .swapExactETHForTokensSupportingFeeOnTransferTokens(
                                getDecimalAmount(parseInt(tokenBAmount * parsedSlippagePercentage, 10), tokenB.decimals).toFixed(),
                                [tokenA.address, tokenB.address],
                                bscContext.currentAccountAddress,
                                Math.floor(Date.now() / 1000) + 30
                            )
                            .send({
                                from: bscContext.currentAccountAddress,
                                value: getDecimalAmount(tokenAAmount, tokenA.decimals),
                            })
                            .then((result) => {
                                toast.success(
                                    <div className="toast-approved-transaction">
                                        <span>Transaction Approved!</span>{' '}
                                        <a href={`https://bscscan.com/tx/${result.transactionHash}`} target="_blank" rel="noreferrer">
                                            View
                                        </a>
                                    </div>,
                                    toastSettings
                                )
                                setSwapInProgress(false)
                                bscContext.setRefreshTokens(true)
                            })
                            .catch((err) => {
                                if (err.code === 4001) {
                                    toast.error('Transaction Rejected!', toastSettings)
                                } else {
                                    toast.error('Transaction Failed!', toastSettings)
                                }
                                setSwapInProgress(false)
                            })
                    })
                    .catch((error) => {
                        try {
                            const parsedError = JSON.parse(error.message.substring(error.message.indexOf('\n') + 1))
                            toast.error(parsedError.message, toastSettings)
                            setSwapInProgress(false)
                        } catch (e) {
                            toast.error(error.message, toastSettings)
                            setSwapInProgress(false)
                        }
                    })
            } else {
                // if swapping to BNB
                // Check if approval is required

                let transactionApproved = false
                if (tokenAContract.methods.approve) {
                    // Maybe render approval button?
                    // Check if approval is ready
                    const approved = await tokenAContract.methods.allowance(bscContext.currentAccountAddress, bscContext.pancakeSwapRouterV2Address).call()
                    if (approved < Number.MAX_SAFE_INTEGER) {
                        setNeedsApproval(true)
                        toast.info('Please Approve the Swap', toastSettings)
                    } else {
                        transactionApproved = true
                    }
                }

                if (transactionApproved) {
                    setSwapInProgress(true)
                    await bscContext.pancakeSwapRouterV2.methods
                        .swapExactTokensForETHSupportingFeeOnTransferTokens(
                            getDecimalAmount(tokenAAmount, tokenA.decimals).toFixed(),
                            getDecimalAmount(parseInt(tokenBAmount * parsedSlippagePercentage, 10), tokenB.decimals).toFixed(),
                            [tokenA.address, tokenB.address],
                            bscContext.currentAccountAddress,
                            Math.floor(Date.now() / 1000) + 30
                        )
                        .estimateGas({
                            from: bscContext.currentAccountAddress,
                        })
                        .then(async () => {
                            await bscContext.pancakeSwapRouterV2.methods
                                .swapExactTokensForETHSupportingFeeOnTransferTokens(
                                    getDecimalAmount(tokenAAmount, tokenA.decimals).toFixed(),
                                    getDecimalAmount(parseInt(tokenBAmount * parsedSlippagePercentage, 10), tokenB.decimals).toFixed(),
                                    [tokenA.address, tokenB.address],
                                    bscContext.currentAccountAddress,
                                    Math.floor(Date.now() / 1000) + 30
                                )
                                .send({
                                    from: bscContext.currentAccountAddress,
                                })
                                .then((result) => {
                                    toast.success(
                                        <div className="toast-approved-transaction">
                                            <span>Transaction Approved!</span>{' '}
                                            <a href={`https://bscscan.com/tx/${result.transactionHash}`} target="_blank" rel="noreferrer">
                                                View
                                            </a>
                                        </div>,
                                        toastSettings
                                    )
                                    setSwapInProgress(false)
                                    bscContext.refreshTokens(true)
                                })
                                .catch((err) => {
                                    if (err.code === 4001) {
                                        toast.error('Transaction Rejected!', toastSettings)
                                    } else {
                                        toast.error('Transaction Failed!', toastSettings)
                                    }

                                    setSwapInProgress(false)
                                })
                        })
                        .catch((error) => {
                            try {
                                const parsedError = JSON.parse(error.message.substring(error.message.indexOf('\n') + 1))
                                toast.error(parsedError.message, toastSettings)
                                setSwapInProgress(false)
                            } catch (e) {
                                toast.error(error.message, toastSettings)
                                setSwapInProgress(false)
                            }
                        })
                }
            }
        }
    }

    return (
        <>
            <div className="market-trade mb15">
                <h3>SWAP</h3>
                <Tabs defaultActiveKey="market">
                    <Tab eventKey="market" title="MARKET">
                        <div className="d-flex justify-content-between">
                            <div className="market-trade-buy">
                                <form action="#">
                                    <div className={`input-group top from ${tokenAEstimated ? 'estimated' : ''}`}>
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
                                                setTokenAEstimated(false)
                                                debouncedOnChangeA(e.target.value, tokenA, tokenB, quoteIntervalId)
                                            }}
                                        />
                                        <div className="token-A-balance">
                                            <Button
                                                title="MAX"
                                                onClick={() => {
                                                    setTokenAEstimated(false)
                                                    setTokenAAmount(tokenABalance)
                                                }}
                                            />
                                            <div
                                                role="button"
                                                className="balance"
                                                onClick={() => {
                                                    setTokenAEstimated(false)
                                                    setTokenAAmount(tokenABalance)
                                                }}
                                            >
                                                Balance: {BigNumber.isBigNumber(tokenABalance) ? tokenABalance.toFixed(6) : '-'}
                                            </div>
                                        </div>
                                        <div className="sub-price">
                                            In USD: {tokenAAmount ? `$${new BigNumber(1).dividedBy(new BigNumber(currentSwapInUSD)).multipliedBy(new BigNumber(tokenAAmount)).toFormat(3)}` : '-'}
                                        </div>
                                        <div className="input-group-append">
                                            <Button
                                                className={!fromBNB ? 'token-swap-to' : ''}
                                                title={tokenA.displaySymbol || tokenA.symbol}
                                                disabled={fromBNB}
                                                onClick={() => toggleShowTokenModal(!showTokenModal)}
                                            />
                                        </div>
                                    </div>
                                    <div className={`input-group to ${!tokenAEstimated ? 'estimated' : ''}`}>
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
                                                setTokenAEstimated(true)
                                                debouncedOnChangeB(e.target.value, tokenB, tokenA, quoteIntervalId)
                                            }}
                                        />
                                        <div className="token-B-balance">
                                            <div className="balance">Balance: {BigNumber.isBigNumber(tokenBBalance) ? tokenBBalance.toFixed(6) : '-'}</div>
                                        </div>
                                        <div className="sub-price">Min Receieved: {parseInt(tokenBAmount * parsedSlippagePercentage, 10)}</div>
                                        <div className="input-group-append">
                                            <Button
                                                className={fromBNB ? 'token-swap-to' : ''}
                                                title={tokenB.displaySymbol || tokenB.symbol}
                                                disabled={!fromBNB}
                                                onClick={() => toggleShowTokenModal(!showTokenModal)}
                                            />
                                        </div>
                                    </div>
                                    <div role="button" className="swap-coin-icon" onClick={clickToggleFromBNB} tabIndex="0">
                                        <Image src="/assets/image/icons/swap-coin-image.png" width={45} height={45} quality={100} />
                                    </div>
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
                                                                await tokenAContract.methods
                                                                    .approve(bscContext.pancakeSwapRouterV2Address, '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')
                                                                    .send({
                                                                        from: bscContext.currentAccountAddress,
                                                                    })
                                                                    .then(() => {
                                                                        setNeedsApproval(false)
                                                                        setApproveInProgress(false)
                                                                        toast.success('Swap Approved', toastSettings)
                                                                    })
                                                                    .catch(() => {
                                                                        toast.error('Error Approving', toastSettings)
                                                                        setApproveInProgress(false)
                                                                    })
                                                            }}
                                                        >
                                                            Approve
                                                        </button>
                                                    )}
                                                    <button
                                                        type="button"
                                                        className="btn buy"
                                                        onClick={onSwapClick}
                                                        disabled={!tokenAAmount || new BigNumber(tokenAAmount).isGreaterThan(new BigNumber(tokenABalance))}
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
                            </div>
                        </div>
                    </Tab>
                    <Tab eventKey="limit" title="LIMIT">
                        <div className="d-flex justify-content-between">
                            <div className="coming-soon">Coming Soon...</div>
                        </div>
                    </Tab>

                    <Tab eventKey="stop-limit" title="STOP LOSS">
                        <div className="d-flex justify-content-between">
                            <div className="coming-soon">Coming Soon...</div>
                        </div>
                    </Tab>
                </Tabs>
            </div>
            <TokenModal
                show={showTokenModal}
                onTokenSelect={(token) => {
                    if (fromBNB) {
                        setTokenB(token)
                    } else {
                        setTokenA(token)
                    }
                    toggleShowTokenModal(false)
                }}
            />
        </>
    )
}
