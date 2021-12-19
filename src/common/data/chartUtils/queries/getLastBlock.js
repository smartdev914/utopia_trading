import axios from 'axios'

export default async () => {
    const response = await axios.post(
        'https://graphql.bitquery.io',
        {
            query: `subscription ($network: EthereumNetwork!, $from: ISO8601DateTime) {
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
              }`,
            variables: {
                network: 'bsc',
                from: new Date().toISOString(),
            },
        },
        {
            headers: {
                'Content-Type': 'application/json',
                'X-API-KEY': 'BQYmsfh6zyChKKHtKogwvrjXLw8AJkdP',
            },
        }
    )

    return response
}
