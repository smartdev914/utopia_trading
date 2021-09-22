/* eslint-disable jsx-a11y/click-events-have-key-events */
import Button from 'common/components/Button'
import Image from 'next/image'
import { supportedTokens } from 'common/data/exchangeData'
import React, { useState } from 'react'
import { Tabs, Tab } from 'react-bootstrap'
import TokenModal from './TokenModal'

export default function MarketTrade() {
    const [fromBNB, toggleFromBnb] = useState(true)
    const [tokenA, setTokenA] = useState(supportedTokens[0])
    const [tokenB, setTokenB] = useState(supportedTokens[2])
    const [showTokenModal, toggleShowTokenModal] = useState(false)

    const clickToggleFromBNB = () => {
        toggleFromBnb(!fromBNB)
        const tempToken = tokenA
        setTokenA(tokenB)
        setTokenB(tempToken)
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
                                            placeholder="From"
                                            required
                                            onWheel={() => {
                                                document.activeElement.blur()
                                            }}
                                        />
                                        <div className="input-group-append">
                                            <Button title={tokenA.tokenSymbol} disabled={fromBNB} onClick={() => toggleShowTokenModal(!showTokenModal)} />
                                        </div>
                                    </div>
                                    <div className="input-group">
                                        <input
                                            type="number"
                                            className="form-control"
                                            placeholder="To (estimated)"
                                            required
                                            onWheel={() => {
                                                document.activeElement.blur()
                                            }}
                                        />
                                        <div className="input-group-append">
                                            <Button title={tokenB.tokenSymbol} disabled={!fromBNB} onClick={() => toggleShowTokenModal(!showTokenModal)} />
                                        </div>
                                    </div>
                                    <div role="button" className="swap-coin-icon" onClick={clickToggleFromBNB} tabIndex="0">
                                        <Image src="/assets/image/icons/swapCoins.svg" width={45} height={45} />
                                    </div>
                                    <button type="submit" className="btn buy">
                                        Buy
                                    </button>
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
