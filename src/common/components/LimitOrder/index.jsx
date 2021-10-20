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

    const [currentSwapInUSD, setCurrentSwapInUSD] = useState(0)

    const bscContext = useContext(BSCContext)

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
                        ordererAddress: bscContext.currentAccountAddress,
                        tokenInAddress: tokenA.address,
                        tokenOutAddress: tokenB.address,
                        tokenInValue: getDecimalAmount(tokenAAmount, tokenA.decimals).toFixed(),
                        tokenOutValue: getDecimalAmount(parseInt(tokenBAmount * parsedSlippagePercentage, 10), tokenB.decimals).toFixed(),
                        slippage: parsedSlippagePercentage,
                    })
                    .then((res) => {
                        console.log(res)
                    })
                    .catch((error) => {
                        toast.error(error.message, toastSettings)
                        setSwapInProgress(false)
                    })

                // await bscContext.pancakeSwapRouterV2.methods
                //     .swapExactTokensForETHSupportingFeeOnTransferTokens(
                //         getDecimalAmount(tokenAAmount, tokenA.decimals).toFixed(),
                //         getDecimalAmount(parseInt(tokenBAmount * parsedSlippagePercentage, 10), tokenB.decimals).toFixed(),
                //         [tokenA.address, tokenB.address],
                //         bscContext.currentAccountAddress,
                //         Math.floor(Date.now() / 1000) + 30
                //     )
                //     .estimateGas({
                //         from: bscContext.currentAccountAddress,
                //     })
                //     .then(async () => {
                //         await bscContext.pancakeSwapRouterV2.methods
                //             .swapExactTokensForETHSupportingFeeOnTransferTokens(
                //                 getDecimalAmount(tokenAAmount, tokenA.decimals).toFixed(),
                //                 getDecimalAmount(parseInt(tokenBAmount * parsedSlippagePercentage, 10), tokenB.decimals).toFixed(),
                //                 [tokenA.address, tokenB.address],
                //                 bscContext.currentAccountAddress,
                //                 Math.floor(Date.now() / 1000) + 30
                //             )
                //             .send({
                //                 from: bscContext.currentAccountAddress,
                //             })
                //             .then((result) => {
                //                 setSwapInProgress(false)

                //                 toast.success(
                //                     <div className="toast-approved-transaction">
                //                         <span>Transaction Approved!</span>{' '}
                //                         <a href={`https://bscscan.com/tx/${result.transactionHash}`} target="_blank" rel="noreferrer">
                //                             View
                //                         </a>
                //                     </div>,
                //                     toastSettings
                //                 )
                //                 bscContext.refreshTokens(true)
                //             })
                //             .catch((err) => {
                //                 setSwapInProgress(false)

                //                 if (err.code === 4001) {
                //                     toast.error('Transaction Rejected!', toastSettings)
                //                 } else {
                //                     toast.error('Transaction Failed!', toastSettings)
                //                 }
                //             })
                //     })
                //     .catch((error) => {
                //         try {
                //             const parsedError = JSON.parse(error.message.substring(error.message.indexOf('\n') + 1))
                //             toast.error(parsedError.message, toastSettings)
                //             setSwapInProgress(false)
                //         } catch (e) {
                //             toast.error(error.message, toastSettings)
                //             setSwapInProgress(false)
                //         }
                //     })
            }
        }
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
            console.log({ currentTokenInUSD })
            setCurrentSwapInUSD(currentTokenInUSD)
        } catch (e) {
            console.log(e)
            setCurrentSwapInUSD(0)
        }
    }, [tokenA])
    console.log({ currentSwapInUSD })
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
                                            disabled={loading || !tokenAAmount || new BigNumber(tokenAAmount).isGreaterThan(new BigNumber(tokenABalance))}
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
            <TokenModal
                show={showTokenModal}
                onTokenSelect={(token) => {
                    setTokenB(token)
                    toggleShowTokenModal(false)
                }}
            />
        </>
    )
}

export default MarketOrder
