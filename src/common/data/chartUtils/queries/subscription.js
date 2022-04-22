const getSubscriptionId = async (baseAddress, quoteAddress) => {
    const ds = new window.dataSourceWidget(
        `
	subscription (
			$network: EthereumNetwork!
			$from: ISO8601DateTime
			$baseAddress: String
			$quoteAddress: String
		) {
		ethereum(network: $network) {
		  dexTrades(
			options: {desc: ["block.height", "tradeIndex"]}
			baseCurrency: {is: $baseAddress}
			quoteCurrency: {is: $quoteAddress}
			time: {since: $from}
		  ) {
			block {
			  timestamp {
				time(format: "%FT%TZ")
			  }
			  height
			}
			tradeIndex
			protocol
			exchange {
			  fullName
			}
			smartContract {
			  address {
				address
				annotation
			  }
			}
			baseAmount
			baseCurrency {
			  address
			  symbol
			}
			quoteAmount
			quoteCurrency {
			  address
			  symbol
			}
			transaction {
			  hash
			}
			quotePrice
		  }
		}
	  }
	  
 `,
        {
            network: 'bsc',
            baseAddress,
            quoteAddress,
            from: new Date().toISOString(),
        },
        `ethereum.dexTrades`,
        'BQYmsfh6zyChKKHtKogwvrjXLw8AJkdP'
    )
    try {
        const data = await ds.fetcher()
        const json = await data.json()
        return json.extensions.subId
    } catch (error) {
        console.log(error)
    }
}

export default getSubscriptionId
