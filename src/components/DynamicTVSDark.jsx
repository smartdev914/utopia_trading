/* eslint-disable new-cap */
import React, { useEffect } from 'react'
import Datafeed from '../common/data/chartUtils/datafeed'

export default function DynamicTVS() {
    useEffect(() => {
        const initTVwidget = () => {
            window.tvWidget = new window.TradingView.widget({
                symbol: 'Utopia:CAKE/BNB', // default symbol
                interval: '15', // default interval
                container: 'tv_chart_container',
                datafeed: Datafeed,
                library_path: '/libs/charting_library_cloned_data/charting_library/',
                height: '100%',
                width: '100%',
                theme: 'Dark',
            })
        }
        window.addEventListener('load', initTVwidget)

        return () => {
            window.removeEventListener('load', initTVwidget)
        }
    }, [])

    return (
        <div className="main-chart mb15">
            <div id="tv_chart_container" />
        </div>
    )
}
