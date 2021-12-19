/* eslint-disable camelcase */
/* eslint-disable no-restricted-syntax */
import axios from 'axios'
import { formatISO, fromUnixTime } from 'date-fns'
import { subscribeOnStream, unsubscribeFromStream } from './streaming'

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

const supportedChartTokens = [
    {
        description: 'TOPIA/BNB',
        exchange: 'Utopia',
        full_name: 'TOPIA/BNB',
        symbol: 'TOPIA/BNB',
        type: 'crypto',
        address: '0x391748379827340DB2daFFC845AC6Cffad431B50',
        pricescale: 10 ** 9,
    },
    {
        description: 'CAKE/BNB',
        exchange: 'Utopia',
        full_name: 'CAKE/BNB',
        symbol: 'CAKE/BNB',
        type: 'crypto',
        address: '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82',
        pricescale: 10 ** 9,
    },
    {
        description: 'BAKE/BNB',
        exchange: 'Utopia',
        full_name: 'BAKE/BNB',
        symbol: 'BAKE/BNB',
        type: 'crypto',
        address: '0xE02dF9e3e622DeBdD69fb838bB799E3F168902c5',
        pricescale: 10 ** 9,
    },
    {
        description: 'SAFEMOON/BNB',
        exchange: 'Utopia',
        full_name: 'SAFEMOON/BNB',
        symbol: 'SAFEMOON/BNB',
        type: 'crypto',
        address: '0x8076c74c5e3f5852037f31ff0093eeb8c8add8d3',
        pricescale: 10 ** 12,
    },
    {
        description: 'COIN98/BNB',
        exchange: 'Utopia',
        full_name: 'COIN98/BNB',
        symbol: 'COIN98/BNB',
        type: 'crypto',
        address: '0xaec945e04baf28b135fa7c640f624f8d90f1c3a6',
        pricescale: 10 ** 9,
    },
    {
        description: '1INCH/BNB',
        exchange: 'Utopia',
        full_name: '1INCH/BNB',
        symbol: '1INCH/BNB',
        type: 'crypto',
        address: '0x111111111117dc0aa78b770fa6a738034120c302',
        pricescale: 10 ** 9,
    },
    {
        description: 'ONT/BNB',
        exchange: 'Utopia',
        full_name: 'ONT/BNB',
        symbol: 'ONT/BNB',
        type: 'crypto',
        address: '0xfd7b3a77848f1c2d67e05e54d78d174a0c850335',
        pricescale: 10 ** 9,
    },
    {
        description: 'SXP/BNB',
        exchange: 'Utopia',
        full_name: 'SXP/BNB',
        symbol: 'SXP/BNB',
        type: 'crypto',
        address: '0x47bead2563dcbf3bf2c9407fea4dc236faba485a',
        pricescale: 10 ** 9,
    },
    {
        description: 'ETH/BNB',
        exchange: 'Utopia',
        full_name: 'ETH/BNB',
        symbol: 'ETH/BNB',
        type: 'crypto',
        address: '0x2170ed0880ac9a755fd29b2688956bd959f933f8',
        pricescale: 10 ** 9,
    },
    {
        description: 'BTCB/BNB',
        exchange: 'Utopia',
        full_name: 'BTCB/BNB',
        symbol: 'BTCB/BNB',
        type: 'crypto',
        address: '0x7130d2a12b9bcbfae4f2634d864a1ee1ce3ead9c',
        pricescale: 10 ** 9,
    },
    {
        description: 'BUSD/BNB',
        exchange: 'Utopia',
        full_name: 'BUSD/BNB',
        symbol: 'BUSD/BNB',
        type: 'crypto',
        address: '0xe9e7cea3dedca5984780bafc599bd69add087d56',
        pricescale: 10 ** 9,
    },
    {
        description: 'USDT/BNB',
        exchange: 'Utopia',
        full_name: 'USDT/BNB',
        symbol: 'USDT/BNB',
        type: 'crypto',
        address: '0x55d398326f99059ff775485246999027b3197955',
        pricescale: 10 ** 9,
    },
    {
        description: 'XVS/BNB',
        exchange: 'Utopia',
        full_name: 'XVS/BNB',
        symbol: 'XVS/BNB',
        type: 'crypto',
        address: '0xcf6bb5389c92bdda8a3747ddb454cb7a64626c63',
        pricescale: 10 ** 9,
    },
    {
        description: 'VAI/BNB',
        exchange: 'Utopia',
        full_name: 'VAI/BNB',
        symbol: 'VAI/BNB',
        type: 'crypto',
        address: '0x4bd17003473389a42daf6a0a729f6fdb328bbbd7',
        pricescale: 10 ** 9,
    },
    {
        description: 'VETTER/BNB',
        exchange: 'Utopia',
        full_name: 'VETTER/BNB',
        symbol: 'VETTER/BNB',
        type: 'crypto',
        address: '0x6169b3b23e57de79a6146a2170980ceb1f83b9e0',
        pricescale: 10 ** 12,
    },
    {
        description: 'SSB/BNB',
        exchange: 'Utopia',
        full_name: 'SSB/BNB',
        symbol: 'SSB/BNB',
        type: 'crypto',
        address: '0x55b53855eae06c4744841dbfa06fce335db4355b',
        pricescale: 10 ** 12,
    },
    {
        description: 'CRYPT/BNB',
        exchange: 'Utopia',
        full_name: 'CRYPT/BNB',
        symbol: 'CRYPT/BNB',
        type: 'crypto',
        address: '0xda6802bbec06ab447a68294a63de47ed4506acaa',
        pricescale: 10 ** 12,
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
                        has_no_volume: false,
                        has_weekly_and_monthly: true,
                        supported_resolutions: configurationData.supported_resolutions,
                        volume_precision: 2,
                        data_status: 'streaming',
                        address: tokenInfo.contractAddress,
                        has_empty_bars: false,
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
            has_no_volume: false,
            has_weekly_and_monthly: true,
            supported_resolutions: configurationData.supported_resolutions,
            volume_precision: 2,
            data_status: 'streaming',
            address: symbolItem.address,
            has_empty_bars: false,
        }

        onSymbolResolvedCallback(symbolInfo)
    },
    getBars: async (symbolInfo, resolution, periodParams, onHistoryCallback, onErrorCallback) => {
        try {
            const { from, to, firstDataRequest } = periodParams
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
            const response2 = await axios.post(
                'https://graphql.bitquery.io',
                {
                    query: `{ ethereum(network: bsc) { dexTrades( options: {asc: "timeInterval.minute"} date: {since: "${formatISO(fromUnixTime(from))}", till: "${formatISO(
                        fromUnixTime(to)
                    )}"} exchangeAddress: {is: "0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73"} baseCurrency: {is: "${
                        symbolInfo.address
                    }"}, quoteCurrency: {is: "0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c"}, tradeAmountUsd: {gt: 10} ) { timeInterval { minute(count: ${resolutionTime}, format: "%Y-%m-%dT%H:%M:%SZ") } volume: quoteAmount high: quotePrice(calculate: maximum) low: quotePrice(calculate: minimum) open: minimum(of: block, get: quote_price) close: maximum(of: block, get: quote_price) } } }`,
                },
                {
                    // variables: {
                    //     from: new Date('2021-10-20T07:23:21.000Z').toISOString(),
                    //     to: new Date('2021-10-23T15:23:21.000Z').toISOString(),
                    //     interval: Number(resolution),
                    //     tokenAddress: symbolInfo.ticker,
                    // },
                    headers: {
                        'Content-Type': 'application/json',
                        'X-API-KEY': 'BQYmsfh6zyChKKHtKogwvrjXLw8AJkdP',
                    },
                }
            )
            try {
                const bars = response2?.data?.data?.ethereum?.dexTrades.map((el) => ({
                    time: new Date(el.timeInterval.minute).getTime(), // date string in api response
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
        const resolutionMap = new Map([
            ['5', 300],
            ['15', 15 * 60],
            ['240', 4 * 60 * 60],
            ['1D', 60 * 60 * 24],
            ['1W', 60 * 60 * 24 * 7],
            ['1M', 60 * 60 * 24 * 30],
        ])
        const newResolution = resolutionMap.get(resolution)
        subscribeOnStream(symbolInfo, newResolution, onRealtimeCallback, subscribeUID, onResetCacheNeededCallback, lastBarsCache.get(symbolInfo.full_name))
    },
    unsubscribeBars: (subscriberUID) => {
        unsubscribeFromStream(subscriberUID)
    },
}
