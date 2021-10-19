/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useContext, useEffect } from 'react'
import { Tabs, Tab } from 'react-bootstrap'
import BSCContext from 'context/BSCContext'
import 'rc-slider/assets/index.css'
import MarketOrder from 'common/components/MarketOrder'
import LimitOrder from 'common/components/LimitOrder'
import { useRouter } from 'next/dist/client/router'

export default function MarketTrade() {
    const router = useRouter()
    const { query } = router
    const limitOrderGUID = Object.keys(query)?.includes('9d5855f4-5a07-4728-885d-afeabffa5f44')

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
                        {limitOrderGUID ? (
                            <LimitOrder />
                        ) : (
                            <div className="d-flex justify-content-between">
                                <div className="coming-soon">Coming Soon...</div>
                            </div>
                        )}
                    </Tab>

                    <Tab eventKey="stop-limit" title="STOP LOSS">
                        <div className="d-flex justify-content-between">
                            <div className="coming-soon">Coming Soon...</div>
                        </div>
                    </Tab>
                </Tabs>
            </div>
        </>
    )
}
