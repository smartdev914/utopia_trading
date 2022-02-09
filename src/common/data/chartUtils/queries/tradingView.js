export const getTradingViewData = async (baseAddress, quoteAddress, interval) => {
    const ds = new window.dataSourceWidget(
        `
   query(
	 $baseAddress: String
	 $quoteAddress: String
	 $from: ISO8601DateTime!
	 $interval: Int
	 $protocol: String
	 $exchangeName: String
   ) {
	 ethereum(network: bsc) {
	   dexTrades(
		 protocol: { is: $protocol }
		 baseCurrency: { is: $baseAddress }
		 quoteCurrency: { is: $quoteAddress }
		 time: { since:  $from }
		 exchangeName: { is: $exchangeName }
		 priceAsymmetry: { lt: 0.7 }
		 any: [
		   {tradeAmountUsd: { gt: 0.00001 }},
		   {tradeAmountUsd: { is: 0 }}
		 ]
	   ) {
		 time: timeInterval {
		   minute(format:"%FT%TZ", count: $interval)
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
            from: '2020-10-18T00:00:00',
            interval,
            baseAddress,
            quoteAddress,
            protocol: 'Uniswap v2',
        },
        `ethereum.dexTrades`,
        'BQYmsfh6zyChKKHtKogwvrjXLw8AJkdP'
    )
    const data = await ds.fetcher()
    const json = await data.json()
    return ds.setupData(json)
}

export default {}
