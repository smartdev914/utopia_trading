import axios from 'axios'
import { useDebouncedCallback } from 'common/hooks/useDebouncedCallback'
import TokenContext from 'context/TokenContext'
import { secondsToMinutes, millisecondsToSeconds, getUnixTime } from 'date-fns'
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
            setRecentTransactions(recentTransactionsResponse.data.data.ethereum.dexTrades)
        }
        await getRecentTrades()
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
                                        <th>Time</th>
                                        <th>Amount(BNB)</th>
                                        <th>Amount({`${tokenContext.currentlySelectedToken.symbol}`})</th>
                                        {tokenContext.currentTokenPriceInUSD && <th>Value (USD)</th>}
                                    </tr>
                                </thead>
                                <tbody>
                                    {recentTransactions?.map((transaction) => {
                                        if (transaction.buyCurrency.symbol.toLowerCase() === tokenContext.currentlySelectedToken.symbol.toLowerCase()) {
                                            const timeSince = secondsToMinutes(millisecondsToSeconds(Date.now()) - getUnixTime(new Date(`${transaction.block.timestamp.time} GMT`)))
                                            return (
                                                <tr onClick={() => window.open(`https://bscscan.com/tx/${transaction.transaction.hash}`, '_blank')} key={transaction.transaction.hash}>
                                                    <td className="red">{timeSince === 0 ? 'Just Now' : `${timeSince}m ago`}</td>
                                                    <td className="red">{transaction.sellAmount.toLocaleString(undefined, { minimumFractionDigits: 3 })}</td>
                                                    <td className="red">{transaction.buyAmount.toLocaleString(undefined, { minimumFractionDigits: 3 })}</td>
                                                    {tokenContext.currentTokenPriceInUSD && <td className="red">{(transaction.buyAmount * tokenContext.currentTokenPriceInUSD).toFixed(2)}</td>}
                                                </tr>
                                            )
                                        }
                                        const timeSince = secondsToMinutes(millisecondsToSeconds(Date.now()) - getUnixTime(new Date(`${transaction.block.timestamp.time} GMT`)))
                                        return (
                                            <tr onClick={() => window.open(`https://bscscan.com/tx/${transaction.transaction.hash}`, '_blank')} key={transaction.transaction.hash}>
                                                <td className="green">{timeSince === 0 ? 'Just Now' : `${timeSince}m ago`}</td>
                                                <td className="green">{transaction.buyAmount.toLocaleString(undefined, { minimumFractionDigits: 3 })}</td>
                                                <td className="green">{transaction.sellAmount.toLocaleString(undefined, { minimumFractionDigits: 3 })}</td>
                                                {tokenContext.currentTokenPriceInUSD && <td className="red">{(transaction.sellAmount * tokenContext.currentTokenPriceInUSD).toFixed(2)}</td>}
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
