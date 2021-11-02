/* eslint-disable new-cap */
import TokenContext from 'context/TokenContext'
import React, { useContext, useEffect } from 'react'
import supportedPancakeTokens from 'common/constants/tokens/supportedPancakeTokens.json'
import Datafeed from '../common/data/chartUtils/datafeed'

export default function DynamicTVS() {
    const tokenContext = useContext(TokenContext)
    const currentTokenSymbol = tokenContext.currentlySelectedToken.symbol

    useEffect(() => {
        const initTVwidget = () => {
            window.tvWidget = new window.TradingView.widget({
                symbol: `Utopia:${currentTokenSymbol}/BNB`, // default symbol
                interval: '15', // default interval
                container: 'tv_chart_container',
                datafeed: Datafeed,
                library_path: '/libs/charting_library_cloned_data/charting_library/',
                height: '100%',
                width: '100%',
                theme: 'Dark',
            })
        }
        initTVwidget()
    }, [currentTokenSymbol])

    return (
        <div className="main-chart mb15">
            <div id="tv_chart_container" />
            {!supportedPancakeTokens.tokens.find((token) => token.symbol === currentTokenSymbol) && (
                <div className="token-not-supported">
                    <div>Token Chart Not Currently Supported!</div>
                    <span>Tokens added by popular demand</span>
                </div>
            )}
        </div>
    )
}
