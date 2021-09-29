/* eslint-disable jsx-a11y/click-events-have-key-events */
import Button from 'common/components/Button'
import Image from 'next/image'
import { supportedTokens } from 'common/data/exchangeData'
import React, { useContext, useEffect, useState } from 'react'
import { Tabs, Tab } from 'react-bootstrap'
import BSCContext from 'context/BSCContext'
import axios from 'axios'
import web3 from 'web3'
import { round } from 'common/utils/numbers'
import TokenModal from './TokenModal'

export default function MarketTrade() {
    const [fromBNB, toggleFromBnb] = useState(true)
    const [tokenA, setTokenA] = useState(supportedTokens[0])
    const [tokenB, setTokenB] = useState(supportedTokens[2])
    const [tokenAAmount, setTokenAAmount] = useState('')
    const [tokenBAmount, setTokenBAmount] = useState('')
    const [showTokenModal, toggleShowTokenModal] = useState(false)
    const [tokenAEstimated, setTokenAEstimated] = useState(false)

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

    const onSwapClick = async () => {
        // Also verify pancakeSwapRouterV2Address
        if (bscContext.currentAccountAddress && bscContext.pancakeSwapRouterV2) {
            // TODO: Check tokenA is approved for swap (Maybe put this logic in another function?)

            // TODO: Change 0 to value depending on desired slippage
            // TODO: Consider changing deadline value to something else in the future (for slower executing times?)
            await bscContext.pancakeSwapRouterV2.methods
                .swapExactETHForTokensSupportingFeeOnTransferTokens(0, [tokenA.address, tokenB.address], bscContext.currentAccountAddress, Math.floor(Date.now() / 1000) + 30)
                .send({
                    from: bscContext.currentAccountAddress,
                    value: web3.utils.toWei(`${tokenAAmount}`),
                })
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
                                    <div className="input-group">
                                        <input
                                            type="number"
                                            className="form-control"
                                            placeholder={`${fromBNB ? 'From ' : 'To '}  ${tokenAEstimated ? '(Estimated)' : ''}`}
                                            required
                                            onWheel={() => {
                                                document.activeElement.blur()
                                            }}
                                            value={tokenAAmount}
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
                                    <div className="input-group">
                                        <input
                                            type="number"
                                            className="form-control"
                                            placeholder={`${fromBNB ? 'To ' : 'From '}  ${tokenAEstimated ? '' : '(Estimated)'}`}
                                            required
                                            value={tokenBAmount}
                                            onWheel={() => {
                                                document.activeElement.blur()
                                            }}
                                            onChange={(e) => {
                                                setTokenBAmount(e.target.value)
                                            }}
                                            onBlur={(e) => {
                                                setTokenAEstimated(true)
                                                setTokenAAmount(round(fromBNB ? round(e.target.value, 6) * bnbToTokenRatio : round(e.target.value, 6) * (1 / bnbToTokenRatio), 6))
                                            }}
                                        />
                                        <div className="input-group-append">
                                            <Button className={fromBNB ? 'token-swap-to' : ''} title={tokenB.symbol} disabled={!fromBNB} onClick={() => toggleShowTokenModal(!showTokenModal)} />
                                        </div>
                                    </div>
                                    <div role="button" className="swap-coin-icon" onClick={clickToggleFromBNB} tabIndex="0">
                                        <Image src="/assets/image/icons/swapCoins.svg" width={45} height={45} />
                                    </div>
                                    <div>{`${bnbToTokenRatio} ${!fromBNB ? tokenB.symbol : tokenA.symbol} per ${fromBNB ? tokenB.symbol : tokenA.symbol}`}</div>
                                    <div>{`${round(1 / bnbToTokenRatio, 6)} ${!fromBNB ? tokenA.symbol : tokenB.symbol} per ${fromBNB ? tokenA.symbol : tokenB.symbol}`}</div>
                                    {bscContext.currentAccountAddress ? (
                                        <button type="button" className="btn buy" onClick={onSwapClick}>
                                            Swap
                                        </button>
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
