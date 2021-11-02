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
                custom_css_url: '/assets/css/tradingView.css',
                settings_adapter: {
                    initialSettings: JSON.stringify({
                        backgroundType: 'solid',
                        background: 'rgba(21, 0, 53, 1)',
                        backgroundGradientStartColor: '#150035',
                        backgroundGradientEndColor: '#150035',
                        vertGridProperties: {
                            color: 'rgba(240, 243, 250, 0.06)',
                            style: 0,
                        },
                        horzGridProperties: {
                            color: 'rgba(240, 243, 250, 0.06)',
                            style: 0,
                        },
                        crossHairProperties: {
                            color: '#9598A1',
                            style: 2,
                            transparency: 0,
                            width: 1,
                            'color:': '#9598A1',
                        },
                        topMargin: 10,
                        bottomMargin: 8,
                        axisProperties: {
                            autoScale: true,
                            autoScaleDisabled: false,
                            lockScale: false,
                            percentage: false,
                            percentageDisabled: false,
                            indexedTo100: false,
                            log: false,
                            logDisabled: false,
                            alignLabels: true,
                            isInverted: false,
                        },
                        legendProperties: {
                            showStudyArguments: true,
                            showStudyTitles: true,
                            showStudyValues: true,
                            showSeriesTitle: true,
                            showSeriesOHLC: true,
                            showLegend: true,
                            showBarChange: true,
                            showBackground: true,
                            backgroundTransparency: 50,
                            wrapText: false,
                        },
                    }),
                    setValue: (key, value) => {
                        console.log({ key, value })
                    },
                    removeValue: (key) => {},
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
