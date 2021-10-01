/* eslint-disable jsx-a11y/click-events-have-key-events */
import Button from 'common/components/Button'
import Image from 'next/image'
import { supportedTokens } from 'common/data/exchangeData'
import React, { useContext, useEffect, useState } from 'react'
import { Tabs, Tab, Spinner } from 'react-bootstrap'
import BSCContext from 'context/BSCContext'
import axios from 'axios'
import web3 from 'web3'
import { round } from 'common/utils/numbers'
import Slider from 'rc-slider'
import TokenModal from './TokenModal'
import 'rc-slider/assets/index.css'

export default function MarketTrade() {
    const [fromBNB, toggleFromBnb] = useState(true)
    const [tokenA, setTokenA] = useState(supportedTokens[0])
    const [tokenB, setTokenB] = useState(supportedTokens[2])
    const [tokenAAmount, setTokenAAmount] = useState('')
    const [tokenBAmount, setTokenBAmount] = useState('')
    const [showTokenModal, toggleShowTokenModal] = useState(false)
    const [tokenAEstimated, setTokenAEstimated] = useState(false)
    const [needsApproval, setNeedsApproval] = useState(false)
    const [tokenAContract, setTokenAContract] = useState()
    const [swapInProgress, setSwapInProgress] = useState(false)
    const [approveInProgress, setApproveInProgress] = useState(false)
    const [slippagePercentage, setSlippagePercentage] = useState('0%')
    const [tokenABalance, setTokenABalance] = useState()
    const [tokenBBalance, setTokenBBalance] = useState()

    const [currentPricingInterval, setCurrentPricingInterval] = useState(null)
    const [bnbToTokenRatio, setBnbToTokenRatio] = useState(0)

    const bscContext = useContext(BSCContext)

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

    useEffect(async () => {
        if (currentPricingInterval) {
            clearInterval(currentPricingInterval)
        }
        const getAndSetRatio = async () => {
            const moralisResponse = await axios.get(`https://deep-index.moralis.io/api/v2/erc20/${fromBNB ? tokenB.address : tokenA.address}/price?chain=bsc`, {
                headers: {
                    accept: 'application/json',
                    'X-API-Key': 'c2YpyMVhR0Kg1Oyjw0AuwFAnv3DcqmtDAmp8o3Wne4m9V2gUg47fjSjZLbgg8ZNs',
                },
            })
            const ratio = web3.utils.fromWei(moralisResponse.data.nativePrice.value)
            setBnbToTokenRatio(round(ratio, 6))
        }
        await getAndSetRatio()
        const interval = setInterval(async () => {
            await getAndSetRatio()
        }, 7500)
        setCurrentPricingInterval(interval)
    }, [fromBNB, tokenA.address, tokenB.address])

    useEffect(() => {
        if (tokenAEstimated) {
            setTokenAAmount(round(fromBNB ? round(tokenBAmount, 6) * bnbToTokenRatio : round(tokenBAmount, 6) * (1 / bnbToTokenRatio), 6))
        } else {
            setTokenBAmount(round(fromBNB ? round(tokenAAmount, 6) * (1 / bnbToTokenRatio) : round(tokenAAmount, 6) * bnbToTokenRatio, 6))
        }
    }, [bnbToTokenRatio])

    useEffect(async () => {
        if (window.web3.eth) {
            const tokenABI = await axios.get('https://api.bscscan.com/api', {
                params: {
                    module: 'contract',
                    action: 'getabi',
                    address: tokenA.address,
                    apiKey: 'IEXFMZMTEFKY351A7BG72V18TQE2VS74J1',
                },
            })
            const tokenContract = await new window.web3.eth.Contract(JSON.parse(tokenABI.data.result), tokenA.address)
            setTokenAContract(tokenContract)
        }
    }, [tokenA, bscContext.currentAccountAddress])

    useEffect(async () => {
        if (bscContext.currentAccountAddress) {
            const currentTokenABalance = await axios.get('https://api.bscscan.com/api', {
                module: 'account',
                action: 'tokenbalance',
                contractaddress: tokenA.address,
                address: bscContext.currentAccountAddress,
                tag: 'latest',
                apikey: 'IEXFMZMTEFKY351A7BG72V18TQE2VS74J1',
            })
            console
            const currentTokenBBalance = await axios.get('https://api.bscscan.com/api', {
                module: 'account',
                action: 'tokenbalance',
                contractaddress: tokenA.address,
                address: bscContext.currentAccountAddress,
                tag: 'latest',
                apikey: 'IEXFMZMTEFKY351A7BG72V18TQE2VS74J1',
            })
            setTokenABalance(currentTokenABalance)
            setTokenABalance(currentTokenBBalance)
        }
    }, [bscContext.currentAccountAddress, tokenA.address])

    const onSwapClick = async () => {
        // Also verify pancakeSwapRouterV2Address
        if (bscContext.currentAccountAddress && bscContext.pancakeSwapRouterV2 && tokenAAmount) {
            // TODO: Check tokenA is approved for swap (Maybe put this logic in another function?)

            // TODO: Change 0 to value depending on desired slippage
            // TODO: Consider changing deadline value to something else in the future (for slower executing times?)
            if (fromBNB) {
                // if swapping from BNB to token
                setSwapInProgress(true)
                const parsedSlippagePercentage = (100 - parseInt(slippagePercentage, 10)) / 100
                await bscContext.pancakeSwapRouterV2.methods
                    .swapExactETHForTokensSupportingFeeOnTransferTokens(
                        web3.utils.toWei(`${tokenBAmount * parsedSlippagePercentage}`),
                        [tokenA.address, tokenB.address],
                        bscContext.currentAccountAddress,
                        Math.floor(Date.now() / 1000) + 30
                    )
                    .send({
                        from: bscContext.currentAccountAddress,
                        value: web3.utils.toWei(`${tokenAAmount}`),
                    })
                    .then(() => {
                        setSwapInProgress(false)
                    })
                    .catch(() => {
                        setSwapInProgress(false)
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
                    } else {
                        transactionApproved = true
                    }
                }

                const parsedSlippagePercentage = (100 - parseInt(slippagePercentage, 10)) / 100

                if (transactionApproved) {
                    setSwapInProgress(true)
                    await bscContext.pancakeSwapRouterV2.methods
                        .swapExactTokensForETHSupportingFeeOnTransferTokens(
                            web3.utils.toWei(`${tokenAAmount}`),
                            web3.utils.toWei(`${tokenBAmount * parsedSlippagePercentage}`),
                            [tokenA.address, tokenB.address],
                            bscContext.currentAccountAddress,
                            Math.floor(Date.now() / 1000) + 30
                        )
                        .send({
                            from: bscContext.currentAccountAddress,
                        })
                        .then(() => {
                            setSwapInProgress(false)
                        })
                        .catch(() => {
                            setSwapInProgress(false)
                        })
                }
            }
        }
    }

    return (
        <>
            <div className="market-trade mb15">
                <h3>SWAP</h3>
                {/* <div>Get the best price for your trade from multiple DEX&apos;s with no additional fees.</div> */}
                <Tabs defaultActiveKey="market">
                    <Tab eventKey="market" title="MARKET">
                        <div className="d-flex justify-content-between">
                            <div className="market-trade-buy">
                                <form action="#">
                                    <div className={`input-group from ${tokenAEstimated ? 'estimated' : ''}`}>
                                        <input
                                            type="number"
                                            className="form-control"
                                            required
                                            onWheel={() => {
                                                document.activeElement.blur()
                                            }}
                                            value={tokenAAmount}
                                            onFocus={() => {
                                                setTokenAEstimated(false)
                                            }}
                                            onBlur={(e) => {
                                                setTokenAEstimated(false)
                                                setTokenBAmount(round(fromBNB ? round(e.target.value, 6) * (1 / bnbToTokenRatio) : round(e.target.value, 6) * bnbToTokenRatio, 6))
                                            }}
                                            onChange={(e) => {
                                                setTokenAAmount(e.target.value)
                                            }}
                                        />
                                        <div className="input-group-append">
                                            <Button className={!fromBNB ? 'token-swap-to' : ''} title={tokenA.symbol} disabled={fromBNB} onClick={() => toggleShowTokenModal(!showTokenModal)} />
                                        </div>
                                    </div>
                                    {tokenABalance}
                                    <div className={`input-group to ${!tokenAEstimated ? 'estimated' : ''}`}>
                                        <input
                                            type="number"
                                            className="form-control"
                                            required
                                            value={tokenBAmount}
                                            onFocus={() => setTokenAEstimated(true)}
                                            onWheel={() => {
                                                document.activeElement.blur()
                                            }}
                                            onChange={(e) => {
                                                setTokenBAmount(e.target.value)
                                            }}
                                            onBlur={(e) => {
                                                setTokenAAmount(round(fromBNB ? round(e.target.value, 6) * bnbToTokenRatio : round(e.target.value, 6) * (1 / bnbToTokenRatio), 6))
                                            }}
                                        />
                                        {tokenBBalance}
                                        <div className="input-group-append">
                                            <Button className={fromBNB ? 'token-swap-to' : ''} title={tokenB.symbol} disabled={!fromBNB} onClick={() => toggleShowTokenModal(!showTokenModal)} />
                                        </div>
                                    </div>
                                    <div role="button" className="swap-coin-icon" onClick={clickToggleFromBNB} tabIndex="0">
                                        <Image src="/assets/image/icons/swapCoins.svg" width={45} height={45} />
                                    </div>
                                    <div className="slippage-container">
                                        <div className="slippage-settings">
                                            <span>SLIPPAGE</span>
                                            <input
                                                className="slippage-percentage-input"
                                                type="text"
                                                value={slippagePercentage}
                                                onChange={(e) => setSlippagePercentage(e.target.value)}
                                                onBlur={(e) => e.target.value && setSlippagePercentage(`${parseInt(e.target.value, 10)}%`)}
                                            />
                                        </div>
                                        <Slider
                                            min={0}
                                            max={50}
                                            marks={{ 10: '10', 20: '20', 30: '30', 40: '40', 50: '50' }}
                                            value={parseInt(slippagePercentage, 10)}
                                            onChange={(e) => {
                                                setSlippagePercentage(`${e}%`)
                                            }}
                                        />
                                    </div>

                                    {bscContext.currentAccountAddress ? (
                                        <>
                                            {swapInProgress || approveInProgress ? (
                                                <Spinner size="" animation="border" variant="primary" />
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
                                                                    })
                                                                    .catch(() => {
                                                                        // alert approval error
                                                                        setApproveInProgress(false)
                                                                    })
                                                            }}
                                                        >
                                                            Approve
                                                        </button>
                                                    )}
                                                    <button type="button" className="btn buy" onClick={onSwapClick}>
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
