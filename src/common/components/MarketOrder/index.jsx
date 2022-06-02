/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/interactive-supports-focus */
import BSCContext from 'context/BSCContext'
import React, { useContext, useEffect, useState } from 'react'
import Button from 'common/components/Button'
import Image from 'next/image'
import { getBalanceAmount, getDecimalAmount } from 'common/utils/numbers'
import { calculateSlippage, getPancakeFactoryPair, getQuote, getTokenPriceInUSD } from 'common/utils/tokens'
import Slider from 'rc-slider'
import BigNumber from 'bignumber.js'
import Toggle from 'react-toggle'
import { Spinner } from 'react-bootstrap'
import { event } from 'common/utils/ga'
import { toast } from 'react-toastify'
import { toastSettings } from 'common/constants'
import { supportedTokens } from 'common/data/exchangeData'
import supportedPancakeTokens from 'common/constants/tokens/supportedPancakeTokens.json'
import TokenContext from 'context/TokenContext'
import TokenModal from 'components/TokenModal'
import { getContract, getContractNoABI } from 'common/utils/getContract'
import useInterval from 'common/hooks/useInterval'
import { useDebouncedCallback } from 'common/hooks/useDebouncedCallback'
import ThemeContext from 'context/ThemeContext'

const MarketOrder = () => {
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
    const [pancakePair, setPancakePair] = useState()

    const [recommendedSlippage, setRecommendedSlippage] = useState(0)
    const [useRecommendedSlippage, setUseRecommendedSlippage] = useState(false)
    const [currentSwapInUSD, setCurrentSwapInUSD] = useState(0)
    const [loading, setLoading] = useState(false)
    const [loadingQuote, setLoadingQuote] = useState(false)
    const bscContext = useContext(BSCContext)
    const tokenContext = useContext(TokenContext)
    const themeContext = useContext(ThemeContext)

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

    useEffect(async () => {
        // listens for change in tokens to get new pancake pair contract
        setLoading(true)
        const tokenPair = await getPancakeFactoryPair(tokenA.address, tokenB.address)
        setPancakePair(tokenPair)
        setLoading(false)
    }, [tokenA, tokenB])

    const debouncedOnChangeA = useDebouncedCallback(async (currPancakePair, currTokenAAmount, currTokenA, currTokenB) => {
        if (currTokenAAmount) {
            setLoadingQuote(true)
            const quote = await getQuote(currPancakePair, currTokenA, currTokenB, getDecimalAmount(currTokenAAmount, currTokenA.decimals))
            setTokenBAmount(quote)
            setLoadingQuote(false)
        } else {
            setTokenBAmount('')
        }
    }, 500)

    const debouncedOnChangeB = useDebouncedCallback(async (currPancakePair, currTokenBAmount, currTokenB, currTokenA) => {
        if (currTokenBAmount) {
            setLoadingQuote(true)
            const quote = await getQuote(currPancakePair, currTokenB, currTokenA, getDecimalAmount(currTokenBAmount, currTokenB.decimals))
            setTokenAAmount(quote)
            setLoadingQuote(false)
        } else {
            setTokenAAmount('')
        }
    }, 500)

    const parsedSlippagePercentage = (100 - parseFloat(useRecommendedSlippage ? recommendedSlippage : slippagePercentage)) / 100

    const onSwapClick = async () => {
        event({
            action: 'swap',
            params: {
                fromSymbol: tokenA.symbol,
                toSymbol: tokenB.symbol,
            },
        })
        try {
            // Also verify pancakeSwapRouterV2Address
            if (bscContext.currentAccountAddress && bscContext.pancakeSwapRouterV2 && tokenAAmount) {
                // TODO: Check tokenA is approved for swap (Maybe put this logic in another function?)

                // TODO: Change 0 to value depending on desired slippage
                // TODO: Consider changing deadline value to something else in the future (for slower executing times?)
                if (fromBNB) {
                    // if swapping from BNB to token
                    setSwapInProgress(true)

                    await bscContext.pancakeSwapRouterV2.estimateGas
                        .swapExactETHForTokensSupportingFeeOnTransferTokens(
                            getDecimalAmount(parseFloat(tokenBAmount * parsedSlippagePercentage), tokenB.decimals).toFixed(),
                            [tokenA.address, tokenB.address],
                            bscContext.currentAccountAddress,
                            Date.now() + 1000 * 60 * 10,
                            { value: getDecimalAmount(tokenAAmount, tokenA.decimals).toFixed() }
                        )
                        .then(async () => {
                            try {
                                const tx = await bscContext.pancakeSwapRouterV2.swapExactETHForTokensSupportingFeeOnTransferTokens(
                                    getDecimalAmount(parseFloat(tokenBAmount * parsedSlippagePercentage), tokenB.decimals).toFixed(),
                                    [tokenA.address, tokenB.address],
                                    bscContext.currentAccountAddress,
                                    Date.now() + 1000 * 60 * 10,
                                    { value: getDecimalAmount(tokenAAmount, tokenA.decimals).toFixed() }
                                )
                                const receipt = await tx.wait()
                                setSwapInProgress(false)
                                toast.success(
                                    <div className="toast-approved-transaction">
                                        <span>Transaction Approved!</span>{' '}
                                        <a href={`https://bscscan.com/tx/${receipt.transactionHash}`} target="_blank" rel="noreferrer">
                                            View
                                        </a>
                                    </div>,
                                    toastSettings
                                )
                                setTimeout(() => {
                                    bscContext.setRefreshTokens(true)
                                }, 3000)
                            } catch (err) {
                                console.log(err)
                                setSwapInProgress(false)

                                if (err.code === 4001) {
                                    toast.error('Transaction Rejected!', toastSettings)
                                } else {
                                    toast.error('Transaction Failed!', toastSettings)
                                }
                            }
                        })
                        .catch((error) => {
                            try {
                                const parsedError = JSON.parse(error.message.substring(error.message.indexOf('\n') + 1))
                                toast.error(parsedError.message, toastSettings)
                                setSwapInProgress(false)
                            } catch (e) {
                                toast.error(error?.data?.message || 'Error Occured', toastSettings)
                                setSwapInProgress(false)
                            }
                        })
                } else {
                    // if swapping to BNB
                    // Check if approval is required

                    let transactionApproved = false
                    if (tokenAContract.approve) {
                        // Maybe render approval button?
                        // Check if approval is ready
                        const approved = await tokenAContract.allowance(bscContext.currentAccountAddress, bscContext.pancakeSwapRouterV2Address)
                        if (approved.toString() === '0') {
                            setNeedsApproval(true)
                            toast.info('Please Approve the Swap', toastSettings)
                        } else {
                            transactionApproved = true
                        }
                    }

                    if (transactionApproved) {
                        setSwapInProgress(true)
                        await bscContext.pancakeSwapRouterV2.estimateGas
                            .swapExactTokensForETHSupportingFeeOnTransferTokens(
                                getDecimalAmount(tokenAAmount, tokenA.decimals).toFixed(),
                                getDecimalAmount(parseInt(tokenBAmount * parsedSlippagePercentage, 10), tokenB.decimals).toFixed(),
                                [tokenA.address, tokenB.address],
                                bscContext.currentAccountAddress,
                                Math.floor(Date.now() / 1000) + 30
                            )
                            .then(async () => {
                                try {
                                    const tx = await bscContext.pancakeSwapRouterV2.swapExactTokensForETHSupportingFeeOnTransferTokens(
                                        getDecimalAmount(tokenAAmount, tokenA.decimals).toFixed(),
                                        getDecimalAmount(parseInt(tokenBAmount * parsedSlippagePercentage, 10), tokenB.decimals).toFixed(),
                                        [tokenA.address, tokenB.address],
                                        bscContext.currentAccountAddress,
                                        Math.floor(Date.now() / 1000) + 30
                                    )
                                    const receipt = await tx.wait()
                                    setSwapInProgress(false)
                                    toast.success(
                                        <div className="toast-approved-transaction">
                                            <span>Transaction Approved!</span>{' '}
                                            <a href={`https://bscscan.com/tx/${receipt.transactionHash}`} target="_blank" rel="noreferrer">
                                                View
                                            </a>
                                        </div>,
                                        toastSettings
                                    )
                                    setTimeout(() => {
                                        bscContext.setRefreshTokens(true)
                                    }, 3000)
                                } catch (err) {
                                    setSwapInProgress(false)

                                    if (err.code === 4001) {
                                        toast.error('Transaction Rejected!', toastSettings)
                                    } else {
                                        toast.error('Transaction Failed!', toastSettings)
                                    }
                                }
                            })
                            .catch((error) => {
                                try {
                                    const parsedError = JSON.parse(error.message.substring(error.message.indexOf('\n') + 1))
                                    toast.error(parsedError.message, toastSettings)
                                    setSwapInProgress(false)
                                } catch (e) {
                                    toast.error(error?.data?.message || 'Error Occured', toastSettings)
                                    setSwapInProgress(false)
                                }
                            })
                    }
                }
            }
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(async () => {
        try {
            const tokenAabi = await import(`../../../ABI/tokenABI/${tokenA.symbol.toUpperCase()}.js`)
            const currentTokenAContract = getContract(tokenAabi.default, tokenA.address, bscContext.signer)
            setTokenAContract(currentTokenAContract)
        } catch (e) {
            const currentTokenAContract = await getContractNoABI(tokenA.address, bscContext.signer)
            setTokenAContract(currentTokenAContract)
        }
        try {
            const tokenBabi = await import(`../../../ABI/tokenABI/${tokenB.symbol.toUpperCase()}.js`)
            const currentTokenBContract = getContract(tokenBabi.default, tokenB.address, bscContext.signer)
            setTokenBContract(currentTokenBContract)
        } catch (e) {
            const currentTokenBContract = await getContractNoABI(tokenB.address, bscContext.signer)
            setTokenBContract(currentTokenBContract)
        }
    }, [tokenA, tokenB, bscContext.signer])

    useEffect(async () => {
        const tokenASlippage = await calculateSlippage(tokenAContract)
        const tokenBSlippage = await calculateSlippage(tokenBContract)
        if (tokenASlippage || tokenBSlippage) {
            setRecommendedSlippage(12)
        } else {
            setRecommendedSlippage(0.5)
        }
    }, [tokenAContract, tokenBContract]) // set the recommended slippate value

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
        const currentTokenInUSD = await getTokenPriceInUSD(tokenA.address)
        setCurrentSwapInUSD(currentTokenInUSD)
    }, [tokenA, fromBNB])

    useInterval(async () => {
        if (tokenAEstimated) {
            if (tokenBAmount) {
                const newQuote = await getQuote(pancakePair, tokenB, tokenA, getDecimalAmount(tokenBAmount, tokenB.decimals))
                setTokenAAmount(newQuote)
            }
        } else if (tokenAAmount) {
            const newQuote = await getQuote(pancakePair, tokenA, tokenB, getDecimalAmount(tokenAAmount, tokenA.decimals))
            setTokenBAmount(newQuote)
        }
    }, 6000)

    useEffect(async () => {
        setLoadingQuote(true)
        if (tokenAEstimated) {
            if (tokenBAmount) {
                const newQuote = await getQuote(pancakePair, tokenB, tokenA, getDecimalAmount(tokenBAmount, tokenB.decimals))
                setTokenAAmount(newQuote)
            }
        } else if (tokenAAmount) {
            const newQuote = await getQuote(pancakePair, tokenA, tokenB, getDecimalAmount(tokenAAmount, tokenA.decimals))
            setTokenBAmount(newQuote)
        }
        setLoadingQuote(false)
    }, [pancakePair])

    const amountInUSD = currentSwapInUSD ? new BigNumber(currentSwapInUSD).multipliedBy(new BigNumber(tokenAAmount)).toFormat(3) : '?'

    return (
        <>
            <div className="d-flex justify-content-between">
                <div className="market-trade-buy">
                    <form action="#">
                        {loading ? (
                            <div className="spinner-container">
                                <Spinner size="" animation="border" variant="primary" />
                            </div>
                        ) : (
                            <>
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
                                            debouncedOnChangeA(pancakePair, e.target.value, tokenA, tokenB)
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
                                            Balance: {BigNumber.isBigNumber(tokenABalance) && !tokenABalance.isNaN() ? tokenABalance.toFixed(6) : '-'}
                                        </div>
                                    </div>
                                    <div className="sub-price">In USD: {tokenAAmount ? `$${amountInUSD}` : '-'}</div>
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
                                            debouncedOnChangeB(pancakePair, e.target.value, tokenB, tokenA)
                                        }}
                                    />
                                    <div className="token-B-balance">
                                        <div className="balance">Balance: {BigNumber.isBigNumber(tokenBBalance) ? tokenBBalance.toFixed(6) : '-'}</div>
                                    </div>
                                    <div className="sub-price">Min Receieved: {new BigNumber(tokenBAmount).multipliedBy(new BigNumber(parsedSlippagePercentage)).toFixed(3)}</div>
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
                                    <Image src={`/assets/image/icons/swap-coin-image-${themeContext.currentTheme}.svg`} width={45} height={45} quality={100} />
                                </div>
                                <div className="slippage-container">
                                    <div className="slippage-settings">
                                        <span>
                                            SLIPPAGE
                                            {/* <span className="recommended-slippage-toggle">
                                                <Toggle
                                                    defaultChecked={useRecommendedSlippage}
                                                    icons={false}
                                                    onChange={(e) => {
                                                        setUseRecommendedSlippage(e.target.checked)
                                                    }}
                                                />{' '}
                                                AUTO-SLIPPAGE
                                            </span> */}
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
                            </>
                        )}
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
                                                            bscContext.pancakeSwapRouterV2Address,
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
                                            disabled={
                                                loading ||
                                                loadingQuote ||
                                                !tokenABalance ||
                                                (BigNumber.isBigNumber(tokenABalance) && tokenABalance.isNaN()) ||
                                                !tokenAAmount ||
                                                new BigNumber(tokenAAmount).isGreaterThan(new BigNumber(tokenABalance))
                                            }
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
                toggleShowTokenModal={toggleShowTokenModal}
                show={showTokenModal}
                onTokenSelect={async (token) => {
                    toggleShowTokenModal(false)
                    setLoading(true)
                    if (fromBNB) {
                        setTokenB(token)
                        tokenContext.setCurrentlySelectedToken(token)
                    } else {
                        setTokenA(token)
                    }
                    setLoading(false)
                }}
            />
        </>
    )
}

export default MarketOrder
