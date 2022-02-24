/* eslint-disable camelcase */
/* eslint-disable no-restricted-syntax */
import axios from 'axios'
import { getTradingViewData } from './queries/tradingView'
import { subscribeOnStream, unsubscribeFromStream } from './streaming'
import supportedChartTokens from './supportedChartTokens'

const lastBarsCache = new Map()

const configurationData = {
    supported_resolutions: ['1M', '1W', '1D', '1', '5', '10', '30', '1H', '240', '12H'],
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
            try {
                const tokenInfoRes = await axios.get('https://api.bscscan.com/api', {
                    params: {
                        module: 'token',
                        action: 'tokeninfo',
                        contractaddress: symbolName,
                        apikey: 'IEXFMZMTEFKY351A7BG72V18TQE2VS74J1',
                    },
                })
                if (tokenInfoRes.data.status === '1') {
                    const tokenInfo = tokenInfoRes.data.result[0]
                    const symbolInfo = {
                        ticker: `${tokenInfo.symbol}/BNB`,
                        name: tokenInfo.symbol,
                        description: `${tokenInfo.symbol}/BNB`,
                        type: 'crypto',
                        session: '24x7',
                        timezone: 'Etc/UTC',
                        exchange: 'Utopia',
                        minmov: 1,
                        pricescale: tokenInfo.divisor === '18' ? 10 ** 9 : 10 ** 12,
                        has_intraday: true,
                        has_no_volume: true,
                        has_weekly_and_monthly: true,
                        supported_resolutions: configurationData.supported_resolutions,
                        volume_precision: 2,
                        data_status: 'streaming',
                        address: tokenInfo.contractAddress,
                        has_empty_bars: true,
                    }
                    onSymbolResolvedCallback(symbolInfo)
                }
            } catch (e) {
                onResolveErrorCallback('cannot resolve symbol')
            }
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
            pricescale: symbolItem.pricescale,
            has_intraday: true,
            has_no_volume: true,
            has_weekly_and_monthly: true,
            supported_resolutions: configurationData.supported_resolutions,
            volume_precision: 2,
            data_status: 'streaming',
            address: symbolItem.address,
            has_empty_bars: true,
        }

        onSymbolResolvedCallback(symbolInfo)
    },
    getBars: async (symbolInfo, resolution, periodParams, onHistoryCallback, onErrorCallback) => {
        try {
            const { from, to, firstDataRequest, countBack } = periodParams
            let resolutionTime = resolution
            switch (resolution) {
                case '1H':
                    resolutionTime = '60'
                    break
                case '12H':
                    resolutionTime = '720'
                    break
                case '1D':
                    resolutionTime = '1440'
                    break
                case '1W':
                    resolutionTime = '10080'
                    break
                case '1M':
                    resolutionTime = '43200'
                    break
                default: {
                    resolutionTime = resolution
                    break
                }
            }
            const bitQueryData = await getTradingViewData(symbolInfo.address, '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c', parseInt(resolutionTime, 10), countBack)
            try {
                const bars = bitQueryData.reverse().map((el) => ({
                    time: new Date(el.time.minute).getTime(), // date string in api response
                    low: el.low,
                    high: el.high,
                    open: Number(el.open),
                    close: Number(el.close),
                    volume: el.volume,
                }))
                if (firstDataRequest) {
                    lastBarsCache.set(symbolInfo.full_name, { ...bars[bars.length - 1] })
                }
                if (bars.length) {
                    onHistoryCallback(bars, { noData: false })
                } else {
                    onHistoryCallback([], { noData: true })
                }
            } catch (error) {
                onErrorCallback(error)
            }
        } catch (err) {
            console.log({ err })
            onErrorCallback(err)
        }
    },
    // getBars: async (symbolInfo, resolution, periodParams, onHistoryCallback, onErrorCallback) => {
    //     const { from, to, firstDataRequest } = periodParams
    //     let resolutionTime
    //     switch (resolution) {
    //         case '5':
    //             resolutionTime = '300'
    //             break
    //         case '15':
    //             resolutionTime = '900'
    //             break
    //         case '240':
    //             resolutionTime = '14400'
    //             break
    //         case '1D':
    //             resolutionTime = '86400'
    //             break
    //         default: {
    //             resolutionTime = '86400'
    //         }
    //     }
    //     try {
    //         // const data = await makeUtopiaApiRequest(`retrievePrice/${symbolInfo.address}/${resolutionTime}/${from}/${to}`)

    //         const data = await axios.post(
    //             `https://graphql.bitquery.io`,
    //             {
    //                 query: `{
    //                     ethereum(network: bsc) {
    //                       dexTrades(
    //                         options: {asc: "timeInterval.minute"}
    //                         date: {since: "2021-10-20T07:23:21.000Z", till: "2021-10-23T15:23:21.000Z"}
    //                         exchangeAddress: {is: "0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73"}
    //                         baseCurrency: {is: ${symbolInfo.address}},
    //                         quoteCurrency: {is: "0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c"},
    //                         tradeAmountUsd: {gt: 10}
    //                       )
    //                       {
    //                         timeInterval {
    //                           minute(count: 15, format: "%Y-%m-%dT%H:%M:%SZ")
    //                         }
    //                         volume: quoteAmount
    //                         high: quotePrice(calculate: maximum)
    //                         low: quotePrice(calculate: minimum)
    //                         open: minimum(of: block, get: quote_price)
    //                         close: maximum(of: block, get: quote_price)
    //                       }
    //                     }
    //                   }`
    //             },
    //             {
    //                 headers: {
    //                     'Access-Control-Allow-Origin': '*',
    //                     'X-API-KEY': 'BQYmsfh6zyChKKHtKogwvrjXLw8AJkdP',
    //                 },
    //             }
    //         )
    //         console.log("abcde");
    //         console.log(data);

    //         if ((data && data.status === 'Not Found') || data.length === 0) {
    //             // "noData" should be set if there is no data in the requested period.
    //             onHistoryCallback([], { noData: true })
    //             return
    //         }
    //         let bars = []
    //         data.forEach((bar) => {
    //             if (bar.startTime >= from && bar.startTime < to) {
    //                 bars = [
    //                     ...bars,
    //                     {
    //                         time: bar.startTime * 1000,
    //                         low: bar.low,
    //                         high: bar.high,
    //                         open: bar.open,
    //                         close: bar.close,
    //                     },
    //                 ]
    //             }
    //         })
    //         if (firstDataRequest) {
    //             lastBarsCache.set(symbolInfo.full_name, { ...bars[bars.length - 1] })
    //         }
    //         onHistoryCallback(bars, { noData: false })
    //     } catch (error) {
    //         onErrorCallback(error)
    //     }
    // },
    subscribeBars: (symbolInfo, resolution, onRealtimeCallback, subscribeUID, onResetCacheNeededCallback) => {
        let resolutionTime = resolution
        switch (resolution) {
            case '1H':
                resolutionTime = '60'
                break
            case '12H':
                resolutionTime = '720'
                break
            case '1D':
                resolutionTime = '1440'
                break
            case '1W':
                resolutionTime = '10080'
                break
            case '1M':
                resolutionTime = '43200'
                break
            default: {
                resolutionTime = resolution
                break
            }
        }
        subscribeOnStream(symbolInfo, resolutionTime, onRealtimeCallback, subscribeUID, onResetCacheNeededCallback, lastBarsCache.get(symbolInfo.full_name))
    },
    unsubscribeBars: (subscriberUID) => {
        unsubscribeFromStream(subscriberUID)
    },
}
