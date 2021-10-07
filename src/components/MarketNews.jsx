import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import TokenContext from 'context/TokenContext'
import { getBalanceAmount, round } from 'common/utils/numbers'
import BigNumber from 'bignumber.js'

const MarketNews = () => {
    const tokenContext = useContext(TokenContext)
    const [twentyFourHourVolume, setTwentyFourHourVolume] = useState('$-')
    const [twentyFourHourTransactions, setTwentyFourHourTransactions] = useState('-')
    const [liquidity, setLiquidity] = useState('$-')
    const [marketCap, setMarketCap] = useState('$-')
    const parseToMorB = (number) => {
        if (number / 1000000 > 1000) {
            return `${round(number / 1000000000, 3)}B`
        }
        if (number / 1000 > 1000) {
            return `${round(number / 1000000, 3)}M`
        }
        return `${round(number, 0).toLocaleString()}`
    }
    useEffect(async () => {
        const twentyFourHourInfo = await axios.post(
            `https://graphql.bitquery.io`,
            {
                query: `{ ethereum(network: bsc) { dexTrades( options: {limit: 24, desc: "timeInterval.hour"} date: {since: "2021-06-03"} exchangeName: {is: "Pancake v2"} baseCurrency: {is: "${tokenContext.currentlySelectedToken.address}"} ) { count tradeAmount(in: USD) timeInterval { hour(count: 1) } } } } `,
            },
            {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'X-API-KEY': 'BQYmsfh6zyChKKHtKogwvrjXLw8AJkdP',
                },
            }
        )
        const summedValue = twentyFourHourInfo?.data?.data?.ethereum?.dexTrades?.reduce((currSum, currentValue) => currSum + currentValue.tradeAmount, 0)
        const summedTransactions = twentyFourHourInfo?.data?.data?.ethereum?.dexTrades?.reduce((currSum, currentValue) => currSum + currentValue.count, 0)
        setTwentyFourHourVolume(`$${parseToMorB(summedValue)}`)
        setTwentyFourHourTransactions(summedTransactions.toLocaleString())
    }, [tokenContext.currentlySelectedToken])

    useEffect(async () => {
        const currentlLiquidity = await axios.get(
            `https://liquidity-calculator-dot-utopia-315014.uw.r.appspot.com/liquidity/${tokenContext.currentlySelectedToken.address}/0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c`
        )
        if (currentlLiquidity.data) {
            setLiquidity(`$${parseToMorB(currentlLiquidity.data)}`)
        }
    }, [tokenContext.currentlySelectedToken])

    useEffect(async () => {
        const tokenCirculatingSupply = await axios.get('https://api.bscscan.com/api', {
            params: {
                module: 'stats',
                action: 'tokenCsupply',
                contractaddress: tokenContext.currentlySelectedToken.address,
                apiKey: 'IEXFMZMTEFKY351A7BG72V18TQE2VS74J1',
            },
        })
        const circulatingSupply = tokenCirculatingSupply?.data?.result
        console.log(new BigNumber(parseFloat('0.0000007181')).toFixed())

        if (circulatingSupply && tokenContext.currentTokenPriceInUSD) {
            const currentMarketCap = getBalanceAmount(circulatingSupply, tokenContext.currentlySelectedToken.decimals).multipliedBy(
                new BigNumber(parseFloat(tokenContext.currentTokenPriceInUSD?.replace(',', '')))
            )

            setMarketCap(currentMarketCap ? `$${parseToMorB(currentMarketCap.toFixed())}` : `$-`)
        }
    }, [tokenContext.currentlySelectedToken, tokenContext.currentlySelectedToken.address, tokenContext.currentTokenPriceInUSD])

    return (
        <div className="market-history token-info">
            <h3>TOKEN INFO</h3>

            <div className="info-row">
                <div className="info-stat">
                    <div className="info-header">24hr Volume</div>
                    <div className="info-value">{twentyFourHourVolume}</div>
                </div>
                <div className="info-stat">
                    <div className="info-header">Transactions</div>
                    <div className="info-value">{twentyFourHourTransactions}</div>
                </div>
            </div>

            <div className="info-row">
                <div className="info-stat">
                    <div className="info-header">Liquidity</div>
                    <div className="info-value">{liquidity}</div>
                </div>
                <div className="info-stat">
                    <div className="info-header">Marketcap</div>
                    <div className="info-value">{marketCap}</div>
                </div>
            </div>
        </div>
    )
}

export default MarketNews
