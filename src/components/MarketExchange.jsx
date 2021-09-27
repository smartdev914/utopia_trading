/* eslint-disable jsx-a11y/click-events-have-key-events */
import Button from 'common/components/Button'
import Image from 'next/image'
import { supportedTokens } from 'common/data/exchangeData'
import React, { useContext, useEffect, useState } from 'react'
import { Tabs, Tab } from 'react-bootstrap'
import BSCContext from 'context/BSCContext'
import axios from 'axios'
import TokenModal from './TokenModal'

export default function MarketTrade() {
    const [fromBNB, toggleFromBnb] = useState(true)
    const [tokenA, setTokenA] = useState(supportedTokens[0])
    const [tokenB, setTokenB] = useState(supportedTokens[2])
    const [showTokenModal, toggleShowTokenModal] = useState(false)

    const [pancakePairContract, setPancakePairContract] = useState('')

    const bscContext = useContext(BSCContext)

    const clickToggleFromBNB = () => {
        toggleFromBnb(!fromBNB)
        const tempToken = tokenA
        setTokenA(tokenB)
        setTokenB(tempToken)
    }

    useEffect(() => {
        bscContext.setLoadDexContract(true)
    }, [])

    useEffect(async () => {
        if (bscContext.pancakeSwapContract) {
            const currentPancakePairAddress = fromBNB
                ? await bscContext.pancakeSwapContract.methods.getPair(tokenA.address, tokenB.address).call()
                : await bscContext.pancakeSwapContract.methods.getPair(tokenB.address, tokenA.address).call()
            if (window.web3) {
                const contractABI = await axios.get('https://api.bscscan.com/api', {
                    params: {
                        module: 'contract',
                        action: 'getabi',
                        address: currentPancakePairAddress,
                        apiKey: 'IEXFMZMTEFKY351A7BG72V18TQE2VS74J1',
                    },
                })
                const currentContract = new window.web3.eth.Contract(JSON.parse(contractABI.data.result), currentPancakePairAddress)
                setPancakePairContract(currentContract)
            }
        }
    }, [tokenA, tokenB, fromBNB])

    const onSwapClick = () => {
        if (pancakePairContract && bscContext.currentAccountAddress) {
            pancakePairContract.methods.approve(bscContext.currentAccountAddress)
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
                                            placeholder="From"
                                            required
                                            onWheel={() => {
                                                document.activeElement.blur()
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
                                            placeholder="To (estimated)"
                                            required
                                            onWheel={() => {
                                                document.activeElement.blur()
                                            }}
                                        />
                                        <div className="input-group-append">
                                            <Button className={fromBNB ? 'token-swap-to' : ''} title={tokenB.symbol} disabled={!fromBNB} onClick={() => toggleShowTokenModal(!showTokenModal)} />
                                        </div>
                                    </div>
                                    <div role="button" className="swap-coin-icon" onClick={clickToggleFromBNB} tabIndex="0">
                                        <Image src="/assets/image/icons/swapCoins.svg" width={45} height={45} />
                                    </div>
                                    {bscContext.currentAccountAddress ? (
                                        <button type="submit" className="btn buy" onClick={onSwapClick}>
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
