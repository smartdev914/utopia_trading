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
                disabled_features: ['use_localstorage_for_settings'],
                library_path: '/libs/charting_library_cloned_data/charting_library/',
                height: '100%',
                width: '100%',
                theme: 'Dark',
                custom_css_url: '/assets/css/tradingView.css',
                applyOverrides: true,
                overrides: {
                    'paneProperties.background': '#150035',
                    'paneProperties.backgroundType': 'solid',
                    'paneProperties.backgroundGradientStartColor': '#150035',
                    'paneProperties.backgroundGradientEndColor': '#150035',
                },
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
