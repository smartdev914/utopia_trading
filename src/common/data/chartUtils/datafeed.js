/* eslint-disable no-restricted-syntax */
import { makeUtopiaApiRequest } from './helpers'
import { subscribeOnStream, unsubscribeFromStream } from './streaming'

const lastBarsCache = new Map()

const configurationData = {
    supported_resolutions: ['1D'],
    exchanges: [
        {
            value: 'Utopia',
            name: 'Utopia',
            desc: 'Utopia Exchange',
        },
    ],
    symbols_types: [
        {
            name: 'crypto',
            value: 'crypto',
        },
    ],
}

const supportedChartTokens = [
    {
        description: 'CAKE/BNB',
        exchange: 'Utopia',
        full_name: 'Utopia:CAKE/BNB',
        symbol: 'CAKE/BNB',
        type: 'crypto',
        address: '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82',
    },
    {
        description: 'BAKE/BNB',
        exchange: 'Utopia',
        full_name: 'Utopia:BAKE/BNB',
        symbol: 'BAKE/BNB',
        type: 'crypto',
        address: '0xE02dF9e3e622DeBdD69fb838bB799E3F168902c5',
    },
    {
        description: 'SAFEMOON/BNB',
        exchange: 'Utopia',
        full_name: 'Utopia:SAFEMOON/BNB',
        symbol: 'SAFEMOON/BNB',
        type: 'crypto',
        address: '0x8076c74c5e3f5852037f31ff0093eeb8c8add8d3',
    },
    {
        description: 'COIN98/BNB',
        exchange: 'Utopia',
        full_name: 'Utopia:COIN98/BNB',
        symbol: 'COIN98/BNB',
        type: 'crypto',
        address: '0xaec945e04baf28b135fa7c640f624f8d90f1c3a6',
    },
    {
        description: '1INCH/BNB',
        exchange: 'Utopia',
        full_name: 'Utopia:1INCH/BNB',
        symbol: '1INCH/BNB',
        type: 'crypto',
        address: '0x111111111117dc0aa78b770fa6a738034120c302',
    },
    {
        description: 'ONT/BNB',
        exchange: 'Utopia',
        full_name: 'Utopia:ONT/BNB',
        symbol: 'ONT/BNB',
        type: 'crypto',
        address: '0xfd7b3a77848f1c2d67e05e54d78d174a0c850335',
    },
    {
        description: 'SXP/BNB',
        exchange: 'Utopia',
        full_name: 'Utopia:SXP/BNB',
        symbol: 'SXP/BNB',
        type: 'crypto',
        address: '0x47bead2563dcbf3bf2c9407fea4dc236faba485a',
    },
]

export default {
    onReady: (callback) => {
        setTimeout(() => callback(configurationData))
    },
    searchSymbols: async (userInput, exchange, symbolType, onResultReadyCallback) => {
        const symbols = supportedChartTokens
        const newSymbols = symbols.filter((symbol) => {
            const isExchangeValid = exchange === '' || symbol.exchange === exchange
            const isFullSymbolContainsInput = symbol.full_name.toLowerCase().indexOf(userInput.toLowerCase()) !== -1
            return isExchangeValid && isFullSymbolContainsInput
        })
        onResultReadyCallback(newSymbols)
    },
    resolveSymbol: async (symbolName, onSymbolResolvedCallback, onResolveErrorCallback) => {
        const symbols = supportedChartTokens
        const symbolItem = symbols.find(({ full_name }) => full_name === symbolName)
        if (!symbolItem) {
            onResolveErrorCallback('cannot resolve symbol')
            return
        }
        const symbolInfo = {
            ticker: symbolItem.full_name,
            name: symbolItem.symbol,
            description: symbolItem.description,
            type: symbolItem.type,
            session: '24x7',
            timezone: 'Etc/UTC',
            exchange: symbolItem.exchange,
            minmov: 1,
            pricescale: 100,
            has_intraday: false,
            has_no_volume: true,
            has_weekly_and_monthly: false,
            supported_resolutions: configurationData.supported_resolutions,
            volume_precision: 2,
            data_status: 'streaming',
            address: symbolItem.address,
        }

        onSymbolResolvedCallback(symbolInfo)
    },
    getBars: async (symbolInfo, resolution, periodParams, onHistoryCallback, onErrorCallback) => {
        const { from, to, firstDataRequest } = periodParams

        try {
            const data = await makeUtopiaApiRequest(`retrievePrice/${symbolInfo.address}/86400/${from}/${to}`)
            if ((data.Response && data.Response === 'Error') || data.Data.length === 0) {
                // "noData" should be set if there is no data in the requested period.
                onHistoryCallback([], { noData: true })
                return
            }
            let bars = []
            data.Data.forEach((bar) => {
                if (bar.time >= from && bar.time < to) {
                    bars = [
                        ...bars,
                        {
                            time: bar.time * 1000,
                            low: bar.low,
                            high: bar.high,
                            open: bar.open,
                            close: bar.close,
                        },
                    ]
                }
            })
            if (firstDataRequest) {
                lastBarsCache.set(symbolInfo.full_name, { ...bars[bars.length - 1] })
            }
            onHistoryCallback(bars, { noData: false })
        } catch (error) {
            onErrorCallback(error)
        }
    },
    subscribeBars: (symbolInfo, resolution, onRealtimeCallback, subscribeUID, onResetCacheNeededCallback) => {
        subscribeOnStream(symbolInfo, resolution, onRealtimeCallback, subscribeUID, onResetCacheNeededCallback, lastBarsCache.get(symbolInfo.full_name))
    },
    unsubscribeBars: (subscriberUID) => (subscriberUID) => {
        unsubscribeFromStream(subscriberUID)
    },
}
