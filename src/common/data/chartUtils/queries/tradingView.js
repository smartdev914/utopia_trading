export const getTradingViewData = async (baseAddress, quoteAddress, interval) => {
    const ds = new window.dataSourceWidget(
        `
        query ($baseAddress: String, $quoteAddress: String, $from: ISO8601DateTime!, $interval: Int, $protocol: String, $exchangeName: String, $count: Int) {
          ethereum(network: bsc) {
            dexTrades(
              protocol: {is: $protocol}
              baseCurrency: {is: $baseAddress}
              quoteCurrency: {is: $quoteAddress}
              time: {since: $from}
              exchangeName: {is: $exchangeName}
              priceAsymmetry: {lt: 0.7}
              any: [{tradeAmountUsd: {gt: 0.00001}}, {tradeAmountUsd: {is: 0}}]
              options: {limit: $count, desc: "time.minute"}
            ) {
              time: timeInterval {
                minute(format: "%Y-%m-%d %H:%M:%S", count: $interval)
              }
              buyCurrency: baseCurrency {
                symbol
                address
              }
              buyAmount: baseAmount
              sellCurrency: quoteCurrency {
                symbol
                address
              }
              volume: quoteAmount
              trades: count
              high: quotePrice(calculate: maximum)
              low: quotePrice(calculate: minimum)
              open: minimum(of: block, get: quote_price)
              close: maximum(of: block, get: quote_price)
            }
          }
        } 
        `,
        {
            from: '2021-10-18T00:00:00',
            interval,
            baseAddress,
            quoteAddress,
            protocol: 'Uniswap v2',
            count: 750,
        },
        `ethereum.dexTrades`,
        'BQYmsfh6zyChKKHtKogwvrjXLw8AJkdP'
    )
    try {
        const data = await ds.fetcher()
        const json = await data.json()
        return ds.setupData(json)
    } catch (e) {
        console.log(e)
    }
    return []
}

export default {}
