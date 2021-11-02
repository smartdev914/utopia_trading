/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useContext, useEffect } from 'react'
import { Tabs, Tab } from 'react-bootstrap'
import BSCContext from 'context/BSCContext'
import 'rc-slider/assets/index.css'
import MarketOrder from 'common/components/MarketOrder'
import LimitOrder from 'common/components/LimitOrder'
import StopLoss from 'common/components/StopLoss'

export default function MarketTrade() {
    const bscContext = useContext(BSCContext)

    useEffect(() => {
        // Component Set up
        bscContext.setLoadDexContract(true)
        bscContext.setupNetwork()
    }, [])

    return (
        <>
            <div className="market-trade mb15">
                <h3>SWAP</h3>
                <Tabs defaultActiveKey="market">
                    <Tab eventKey="market" title="MARKET">
                        <MarketOrder />
                    </Tab>
                    <Tab eventKey="limit" title="LIMIT">
                        <LimitOrder />
                    </Tab>

                    <Tab eventKey="stop-limit" title="STOP LOSS">
                        <StopLoss />
                        {/* <div className="d-flex justify-content-between">
                            <div className="coming-soon">Coming Soon...</div>
                        </div> */}
                    </Tab>
                </Tabs>
            </div>
        </>
    )
}
