import axios from 'axios'
import { useDebouncedCallback } from 'common/hooks/useDebouncedCallback'
import TokenContext from 'context/TokenContext'
import { formatDistanceToNowStrict, intlFormat, parseJSON } from 'date-fns'
import React, { useContext, useEffect, useState } from 'react'
import { Tabs, Tab } from 'react-bootstrap'

export default function MarketHistory() {
    const tokenContext = useContext(TokenContext)
    const [recentTransactions, setRecentTransactions] = useState([])
    const [currentInterval, setCurrentInterval] = useState(null)

    const debouncedCallback = useDebouncedCallback(async (address, lastIntervalId) => {
        clearInterval(lastIntervalId)
        const getRecentTrades = async () => {
            const recentTransactionsResponse = await axios.post(
                `https://graphql.bitquery.io`,
                {
                    query: `{ ethereum(network: bsc) { dexTrades( options: {limit: 100, desc: ["block.timestamp.time"]} baseCurrency: {is: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"} quoteCurrency: {is: "${address}"} date: {since: "2021-09-28"} ) { block { height timestamp { time(format: "%Y-%m-%d %H:%M:%S") } } tradeIndex protocol buyAmount buyCurrency { address symbol } sellAmount sellCurrency { address symbol } transaction { hash } } } } `,
                },
                {
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'X-API-KEY': 'BQYmsfh6zyChKKHtKogwvrjXLw8AJkdP',
                    },
                }
            )

            const filteredTransactions = recentTransactionsResponse.data.data.ethereum.dexTrades.filter((v, i, a) => a.findIndex((t) => t.transaction.hash === v.transaction.hash) === i)
            setRecentTransactions(filteredTransactions)
        }
        if (address) {
            await getRecentTrades()
        }
        const intervalId = setInterval(async () => {
            await getRecentTrades()
        }, 300000)
        setCurrentInterval(intervalId)
    }, 1000)

    useEffect(async () => {
        debouncedCallback(tokenContext.currentlySelectedToken.address, currentInterval)
    }, [tokenContext.currentlySelectedToken.address])

    return (
        <div className="market-history">
            <h3>TRADES</h3>
            <Tabs defaultActiveKey="recent-trades">
                <Tab eventKey="recent-trades">
                    <div className="table-wrapper">
                        <div className="table-container">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>TIME</th>
                                        <th>AMOUNT</th>
                                        {tokenContext.currentTokenPriceInUSD && <th>PRICE</th>}
                                    </tr>
                                </thead>
                                <tbody>
                                    {recentTransactions?.map((transaction) => {
                                        if (transaction.buyCurrency.symbol.toLowerCase() === tokenContext.currentlySelectedToken.symbol.toLowerCase()) {
                                            const timeSince = formatDistanceToNowStrict(parseJSON(transaction.block.timestamp.time)).replace('minutes', 'm')
                                            return (
                                                <tr onClick={() => window.open(`https://bscscan.com/tx/${transaction.transaction.hash}`, '_blank')} key={transaction.transaction.hash}>
                                                    <td className="red">
                                                        <div>{timeSince === 0 ? 'Just Now' : `${timeSince} ago`}</div>
                                                        <div>
                                                            {intlFormat(new Date(new Date(`${transaction.block.timestamp.time}Z`.replace(' ', 'T'))), {
                                                                month: 'numeric',
                                                                day: 'numeric',
                                                                year: 'numeric',
                                                                hour: 'numeric',
                                                                minute: 'numeric',
                                                                second: 'numeric',
                                                                timeZoneName: 'short',
                                                                localeMatcher: 'lookup',
                                                            })
                                                                .replaceAll('/', '-')
                                                                .replaceAll(',', '')}
                                                        </div>
                                                    </td>
                                                    <td className="red">
                                                        <div>{transaction.buyAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 3 })}</div>
                                                        <div>{`${tokenContext.currentlySelectedToken.symbol}`}</div>
                                                    </td>
                                                    {tokenContext.currentTokenPriceInUSD && (
                                                        <td className="red">
                                                            <div>
                                                                $
                                                                {(transaction.buyAmount * tokenContext.currentTokenPriceInUSD).toLocaleString(undefined, {
                                                                    minimumFractionDigits: 2,
                                                                    maximumFractionDigits: 2,
                                                                })}
                                                            </div>
                                                            <div className="bnb-price">
                                                                {transaction.sellAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 3 })} BNB
                                                            </div>
                                                        </td>
                                                    )}
                                                </tr>
                                            )
                                        }
                                        const timeSince = formatDistanceToNowStrict(parseJSON(transaction.block.timestamp.time)).replace('minutes', 'm')
                                        return (
                                            <tr onClick={() => window.open(`https://bscscan.com/tx/${transaction.transaction.hash}`, '_blank')} key={transaction.transaction.hash}>
                                                <td className="green">
                                                    <div>{timeSince === 0 ? 'Just Now' : `${timeSince} ago`}</div>
                                                    <div>
                                                        {intlFormat(new Date(`${transaction.block.timestamp.time}Z`.replace(' ', 'T')), {
                                                            month: 'numeric',
                                                            day: 'numeric',
                                                            year: 'numeric',
                                                            hour: 'numeric',
                                                            minute: 'numeric',
                                                            second: 'numeric',
                                                            timeZoneName: 'short',
                                                            localeMatcher: 'lookup',
                                                        })
                                                            .replaceAll('/', '-')
                                                            .replaceAll(',', '')}
                                                    </div>
                                                </td>
                                                <td className="green">
                                                    <div>{transaction.sellAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 3 })}</div>
                                                    <div>{`${tokenContext.currentlySelectedToken.symbol}`}</div>
                                                </td>
                                                {tokenContext.currentTokenPriceInUSD && (
                                                    <td className="green">
                                                        <div>
                                                            $
                                                            {(transaction.sellAmount * tokenContext.currentTokenPriceInUSD).toLocaleString(undefined, {
                                                                minimumFractionDigits: 2,
                                                                maximumFractionDigits: 2,
                                                            })}
                                                        </div>
                                                        <div>{transaction.buyAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 3 })} BNB</div>
                                                    </td>
                                                )}
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </Tab>
            </Tabs>
        </div>
    )
}
