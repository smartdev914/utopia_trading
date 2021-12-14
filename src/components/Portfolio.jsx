/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useContext, useEffect, useState } from 'react'
import BSCContext from 'context/BSCContext'
import dynamic from 'next/dynamic'
import { getBalanceAmount } from 'common/utils/numbers'
import axios from 'axios'
import ThemeContext from 'context/ThemeContext'
import { round } from '../common/utils/numbers'

const ApexCharts = dynamic(() => import('react-apexcharts'), { ssr: false })

export default function MarketTrade() {
    const bscContext = useContext(BSCContext)
    const themeContext = useContext(ThemeContext)
    const [currentBalance, setCurrentBalance] = useState(0)
    const [tokenLabels, setTokenLabels] = useState(['Token1', 'Token2', 'Token3', 'Token4'])
    const [tokenBalances, setTokenBalances] = useState(null)
    const [filteredTokensList, setFilteredTokensList] = useState([])
    const [sortDescending, toggleSortDescending] = useState(true)
    const [unfilteredTokenList, setUnfilteredTokenList] = useState([])
    const [showUnfilteredTokenList, toggleShowUnfilteredTokenList] = useState(false)

    useEffect(async () => {
        const walletBalancesObject = bscContext.tokenBalances.map((token) => ({
            token_address: token.TokenAddress,
            amount: parseFloat(getBalanceAmount(token.TokenQuantity).toFixed()),
        }))
        try {
            const walletBalancesResponse = await axios.post('https://go-wallet-reader-dot-utopia-315014.uw.r.appspot.com/getWallet', {
                wallet_address: bscContext.currentAccountAddress,
                tokens: walletBalancesObject,
            })

            setUnfilteredTokenList(walletBalancesResponse.data.token_values)
            const filteredWalletBalances = walletBalancesResponse.data.token_values.filter((token) => token.token_value > 0)
            setFilteredTokensList(filteredWalletBalances)
            setTokenBalances(filteredWalletBalances.map((token) => token.token_value))
            setTokenLabels(filteredWalletBalances.map((token) => token.token_symbol))
            setCurrentBalance(walletBalancesResponse.data.total_value.toFixed(2))
        } catch (e) {
            // console.log(e)
        }
    }, [bscContext.currentAccountAddress, bscContext.tokenBalances])

    let colors = []
    switch (themeContext.currentTheme) {
        case 'lightMode':
            colors = ['#A198F8', '#9BB5FF', '#00DEE6', '#CBCBFF', '#DBDBF0', '#A3FFFF']
            break
        case 'darkMode':
            colors = ['#31FAB1', '#FFEB44', '#10CAE3', '#D8308A', '#7EFFFF', '#98B7FF']
            break
        default:
            colors = ['#1FC08E', '#F9DF00', '#00DEE6', '#D0572B', '#A3FFFF', '#2D75DC']
            break
    }

    const series = tokenBalances || [25, 25, 25, 25]
    const chartOptions = {
        labels: tokenLabels,
        colors,
        legend: {
            position: 'bottom',
            fontFamily: 'var(--fontDosis)',
            fontSize: '14px',
            labels: {
                colors: themeContext.currentTheme === 'lightMode' ? '#2A3962' : '#fff',
            },
            markers: {
                width: 15,
                height: 15,
                radius: 5,
            },
        },
        dataLabels: {
            style: {
                fontFamily: 'var(--fontDosis)',
                colors: ['#000'],
                fontSize: '14px',
                fontWeight: '500',
            },
            dropShadow: {
                enabled: false,
            },
        },
        stroke: {
            width: 0,
        },
        plotOptions: {
            pie: {
                donut: {
                    size: '73%',
                    // labels: {
                    //     show: true,
                    //     total: {
                    //         label: 'CURRENT BALANCE',
                    //         show: true,
                    //         formatter: (w) => {
                    //             return `$${w.globals.seriesTotals.reduce((a, b) => a + b, 0)}`
                    //         },
                    //     },
                    // },
                },
            },
        },
    }

    useEffect(() => {
        // Component Set up
        bscContext.setLoadDexContract(true)
        bscContext.setupNetwork()
    }, [])
    return (
        <>
            <div className="market-portfolio mb15">
                <h3>PORTFOLIO</h3>
                <div className="portfolio-chart">
                    <ApexCharts options={chartOptions} series={series} type="donut" width="100%" height="400px" />
                    <div className="current-balance">
                        {currentBalance ? (
                            <>
                                <h4>CURRENT BALANCE</h4>
                                <div className="green">${currentBalance}</div>
                            </>
                        ) : (
                            <h4>PLEASE CONNECT YOUR WALLET</h4>
                        )}
                    </div>
                </div>
                <div className="portfolio-table">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>TOKENS</th>
                                <th onClick={() => toggleSortDescending(!sortDescending)}>BALANCE {sortDescending ? <i className="fa fa-chevron-down" /> : <i className="fa fa-chevron-up" />}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {(showUnfilteredTokenList ? unfilteredTokenList : filteredTokensList)
                                ?.sort((a, b) => (sortDescending ? b.token_value - a.token_value : a.token_value - b.token_value))
                                ?.map((token) => (
                                    <tr key={token.token_symbol}>
                                        <td>
                                            <div>
                                                {token.token_symbol} <span className="green">${token.unit_price ? token.unit_price.toFixed(2) : 0}</span>
                                            </div>
                                            <div className="secondary-label">{token.token_symbol}</div>
                                        </td>
                                        <td>
                                            <div>{round(token.amount, 8)}</div>
                                            <div className="green">{`$${token.token_value ? token.token_value.toFixed(2) : 0}`}</div>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
                <div role="button" tabIndex="0" className="show-unsupported" onClick={() => toggleShowUnfilteredTokenList(!showUnfilteredTokenList)}>
                    {showUnfilteredTokenList ? 'Hide' : 'Show'} unsupported tokens
                </div>
            </div>
        </>
    )
}
