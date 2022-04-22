import { formatISO, subDays } from 'date-fns'

const getTransactionSubscriptionId = async (baseAddress, quoteAddress) => {
    const ds = new window.dataSourceWidget(
        `
        subscription ($network: EthereumNetwork!, $from: ISO8601DateTime, $baseAddress: String, $quoteAddress: String) {
          ethereum(network: $network) {
            dexTrades(
              options: {desc: ["block.timestamp.time"], limit: 100}
              baseCurrency: {is: $baseAddress}
              quoteCurrency: {is: $quoteAddress}
              time: {since: $from}
              protocol: {is: "Uniswap v2"}
            ) {
              block {
                timestamp { 
                  time(format: "%Y-%m-%d %H:%M:%S")
                }
                height
              }
              tradeIndex
              protocol
              buyAmount
              buyCurrency {
                address
                symbol
              }
              sellAmount
              sellCurrency {
                address
                symbol
              }
              exchange {
                fullName
              }
              smartContract {
                address {
                  address
                  annotation
                }
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
            from: '2021-09-28',
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

export default getTransactionSubscriptionId
