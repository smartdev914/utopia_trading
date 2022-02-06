/* eslint-disable new-cap */
const getLastBlockSubscriptionId = async () => {
    const ds = new window.dataSourceWidget(
        `
      subscription ($network: EthereumNetwork!, $from: ISO8601DateTime) {
        ethereum(network: $network) {
          dexTrades(time: {since: $from}, options: {limit: 1}) {
          block {
            timestamp{
              time(format: "%FT%TZ")
              }
            height
          }
          }
        }
        }
    `,
        {
            network: 'bsc',
            from: new Date().toISOString(),
        },
        `ethereum.dexTrades`,
        'BQYmsfh6zyChKKHtKogwvrjXLw8AJkdP'
    )
    const data = await ds.fetcher()
    const json = await data.json()
    return json.extensions.subId
}

export default getLastBlockSubscriptionId
