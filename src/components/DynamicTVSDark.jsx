/* eslint-disable new-cap */
import TokenContext from 'context/TokenContext'
import React, { useContext, useEffect } from 'react'
import supportedPancakeTokens from 'common/constants/tokens/supportedPancakeTokens.json'
import ThemeContext from 'context/ThemeContext'
import Datafeed from '../common/data/chartUtils/datafeed'

export default function DynamicTVS() {
    const tokenContext = useContext(TokenContext)
    const themeContext = useContext(ThemeContext)
    const currentTokenSymbol = tokenContext.currentlySelectedToken.symbol
    const supportedToken = supportedPancakeTokens.tokens.find((token) => token.symbol === currentTokenSymbol)
    const currentTokenAddress = tokenContext.currentlySelectedToken.address

    useEffect(() => {
        window.localStorage.removeItem('tradingview.chartproperties')
        const savedResolution = window.localStorage.getItem('tradingview.chart.lastUsedTimeBasedResolution')
        const initTVwidgetDark = () => {
            window.tvWidget = new window.TradingView.widget({
                symbol: supportedToken ? `${currentTokenSymbol}/BNB` : currentTokenAddress, // default symbol
                interval: savedResolution || '1D', // default interval
                container: 'tv_chart_container',
                datafeed: Datafeed,
                // disabled_features: ['use_localstorage_for_settings'],
                library_path: '/libs/charting_library_cloned_data/charting_library/',
                height: '100%',
                width: '100%',
                theme: 'Dark',
                custom_css_url: '/assets/css/tradingViewDark.css',
                applyOverrides: true,
                overrides: {
                    'paneProperties.background': '#111721',
                    'paneProperties.backgroundType': 'solid',
                    'paneProperties.backgroundGradientStartColor': '#111721',
                    'paneProperties.backgroundGradientEndColor': '#111721',
                    'mainSeriesProperties.style': 8,
                },
            })
        }
        const initTVwidgetLight = () => {
            window.tvWidget = new window.TradingView.widget({
                symbol: supportedToken ? `${currentTokenSymbol}/BNB` : currentTokenAddress, // default symbol
                interval: savedResolution || '1D', // default interval
                container: 'tv_chart_container',
                datafeed: Datafeed,
                // disabled_features: ['use_localstorage_for_settings'],
                library_path: '/libs/charting_library_cloned_data/charting_library/',
                height: '100%',
                width: '100%',
                theme: 'Dark',
                custom_css_url: '/assets/css/tradingViewLight.css',
                applyOverrides: true,
                overrides: {
                    'paneProperties.background': '#FFF',
                    'paneProperties.backgroundType': 'solid',
                    'paneProperties.backgroundGradientStartColor': '#FFF',
                    'paneProperties.backgroundGradientEndColor': '#FFF',
                    'mainSeriesProperties.style': 8,
                },
            })
        }
        const initTVwidgetUTOPIA = () => {
            window.tvWidget = new window.TradingView.widget({
                symbol: supportedToken ? `${currentTokenSymbol}/BNB` : currentTokenAddress, // default symbol
                interval: savedResolution || '1D', // default interval
                container: 'tv_chart_container',
                datafeed: Datafeed,
                // disabled_features: ['use_localstorage_for_settings'],
                library_path: '/libs/charting_library_cloned_data/charting_library/',
                height: '100%',
                width: '100%',
                theme: 'Dark',
                custom_css_url: '/assets/css/tradingViewUtopia.css',
                applyOverrides: true,
                overrides: {
                    'paneProperties.background': '#150035',
                    'paneProperties.backgroundType': 'solid',
                    'paneProperties.backgroundGradientStartColor': '#150035',
                    'paneProperties.backgroundGradientEndColor': '#150035',
                    'mainSeriesProperties.style': 8,
                },
            })
        }
        switch (themeContext.currentTheme) {
            case 'darkMode':
                initTVwidgetDark()
                break
            case 'lightMode':
                initTVwidgetLight()
                break
            case 'utopiaMode':
                initTVwidgetUTOPIA()
                break
            default:
                break
        }
    }, [currentTokenSymbol, themeContext.currentTheme])

    return (
        <div className="main-chart mb15">
            <div id="tv_chart_container" />
            {/* {!supportedPancakeTokens.tokens.find((token) => token.symbol === currentTokenSymbol) && (
                <div className="token-not-supported">
                    <div>Token Chart Not Currently Supported!</div>
                    <span>Tokens added by popular demand</span>
                </div>
            )} */}
        </div>
    )
}
