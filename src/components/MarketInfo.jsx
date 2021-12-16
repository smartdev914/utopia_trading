/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useContext, useEffect, useState } from 'react'
import Image from 'next/image'
import axios from 'axios'
import TokenContext from 'context/TokenContext'
import ThemeContext from 'context/ThemeContext'
import { getBalanceAmount, round } from 'common/utils/numbers'
import BigNumber from 'bignumber.js'
import BSCContext from 'context/BSCContext'
import { toast } from 'react-toastify'
import { toastSettings } from 'common/constants'
import { SocialIcon } from 'react-social-icons'
import { formatISO, subDays } from 'date-fns'
import useInterval from 'common/hooks/useInterval'
import { Spinner } from 'react-bootstrap'

const MarketInfo = ({ showPortfolio, toggleShowPortfolio }) => {
    const tokenContext = useContext(TokenContext)
    const bscContext = useContext(BSCContext)
    const themeContext = useContext(ThemeContext)
    const [twentyFourHourVolume, setTwentyFourHourVolume] = useState('$-')
    const [twentyFourHourTransactions, setTwentyFourHourTransactions] = useState('-')
    const [showSocials, toggleShowSocials] = useState(false)
    const [loading, setLoading] = useState(false)
    const [liquidity, setLiquidity] = useState('$-')
    const [marketCap, setMarketCap] = useState('$-')
    const [tokenInfo, setTokenInfo] = useState({})
    const parseToMorB = (number) => {
        if (number / 1000000 > 1000) {
            return `${round(number / 1000000000, 3)}B`
        }
        if (number / 1000 > 1000) {
            return `${round(number / 1000000, 3)}M`
        }
        return `${round(number, 0).toLocaleString()}`
    }

    const copyToClipboard = () => {
        navigator.clipboard.writeText(tokenContext.currentlySelectedToken.address)
        toast.success('Address copied to clipboard!', toastSettings)
    }

    useInterval(async () => {
        const today = new Date()
        const formattedDate = formatISO(subDays(today, 2))
        const twentyFourHourInfo = await axios.post(
            `https://graphql.bitquery.io`,
            {
                query: `{ ethereum(network: bsc) { dexTrades( options: {limit: 1, desc: "timeInterval.day"} date: {since: "${formattedDate}"} baseCurrency: {is: "${tokenContext.currentlySelectedToken.address}"} ) { count tradeAmount(in: USD) timeInterval { day(count: 1) } } } } `,
            },
            {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'X-API-KEY': 'BQYmsfh6zyChKKHtKogwvrjXLw8AJkdP',
                },
            }
        )
        const summedValue = twentyFourHourInfo?.data?.data?.ethereum?.dexTrades?.[0]?.tradeAmount
        const summedTransactions = twentyFourHourInfo?.data?.data?.ethereum?.dexTrades?.[0]?.count
        setTwentyFourHourVolume(`$${parseToMorB(summedValue)}`)
        setTwentyFourHourTransactions(summedTransactions?.toLocaleString())
    }, 5000)

    useInterval(async () => {
        const currentlLiquidity = await axios.get(
            `https://liquidity-calculator-dot-utopia-315014.uw.r.appspot.com/liquidity/${tokenContext.currentlySelectedToken.address}/0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c`
        )
        if (currentlLiquidity.data) {
            setLiquidity(`$${parseToMorB(currentlLiquidity.data)}`)
        }
    }, 5000)

    useInterval(async () => {
        const tokenCirculatingSupply = await axios.get('https://api.bscscan.com/api', {
            params: {
                module: 'stats',
                action: 'tokenCsupply',
                contractaddress: tokenContext.currentlySelectedToken.address,
                apiKey: 'IEXFMZMTEFKY351A7BG72V18TQE2VS74J1',
            },
        })
        const circulatingSupply = tokenCirculatingSupply?.data?.result
        if (circulatingSupply && tokenContext.currentTokenPriceInUSD) {
            const currentMarketCap = getBalanceAmount(circulatingSupply, tokenContext.currentlySelectedToken.decimals).multipliedBy(new BigNumber(parseFloat(tokenContext.currentTokenPriceInUSD)))
            setMarketCap(currentMarketCap ? `$${parseToMorB(currentMarketCap.toFixed())}` : `$-`)
        }
    }, 5000)

    useEffect(async () => {
        setLoading(true)
        const tokenInfoRes = await axios.get('https://api.bscscan.com/api', {
            params: {
                module: 'token',
                action: 'tokeninfo',
                contractaddress: tokenContext.currentlySelectedToken.address,
                apikey: 'IEXFMZMTEFKY351A7BG72V18TQE2VS74J1',
            },
        })
        setTokenInfo(tokenInfoRes?.data?.result?.[0] || {})
        setLoading(false)
    }, [tokenContext.currentlySelectedToken.address])

    const addToWallet = async () => {
        try {
            await bscContext.registerToken(tokenContext.currentlySelectedToken)
        } catch {
            toast.error('Error adding token to wallet', toastSettings)
        }
    }

    const iconSize = '25px'
    return (
        <div className="token-info">
            <div className="flex-row">
                <div className="selected-token">
                    <img className="token-icon" src={tokenContext.currentlySelectedToken.logoURI} alt="token logo" />
                    <div className="selected-token-info">
                        <div>{`${tokenContext.currentlySelectedToken.name} (${tokenContext.currentlySelectedToken.symbol} / BNB)`}</div>
                        <div className="green">{`$${!Number.isNaN(tokenContext.currentTokenPriceInUSD) ? tokenContext.currentTokenPriceInUSD : '-'}`}</div>
                    </div>
                </div>
                {loading ? (
                    <div className="spinner-container">
                        <Spinner size="" animation="border" variant="primary" />
                    </div>
                ) : (
                    <div className="info-row">
                        <div className="info-stat">
                            <div className="info-header">24hr Volume</div>
                            <div className="info-value">{twentyFourHourVolume}</div>
                        </div>
                        <div className="info-stat">
                            <div className="info-header">Transactions</div>
                            <div className="info-value">{twentyFourHourTransactions}</div>
                        </div>
                        <div className="info-stat">
                            <div className="info-header">Liquidity</div>
                            <div className="info-value">{liquidity}</div>
                        </div>
                        <div className="info-stat">
                            <div className="info-header">Marketcap</div>
                            <div className="info-value">{marketCap}</div>
                        </div>
                    </div>
                )}
                <div className="info-row socials">
                    <div role="button" tabIndex="0" onClick={addToWallet} className="token-info-button wide">
                        <Image src="/assets/image/icons/metamask.svg" width={20} height={20} />{' '}
                        <Image src={`/assets/image/icons/plus${themeContext.currentTheme === 'lightMode' ? 'Light' : ''}.svg`} width={10} height={10} />
                    </div>
                    <div role="button" tabIndex="0" onClick={copyToClipboard} className="token-info-button wide">
                        Contract <Image src={`/assets/image/icons/Contract${themeContext.currentTheme === 'lightMode' ? 'Light' : ''}.svg`} width={20} height={20} />
                    </div>
                    <a href={`https://bscscan.com/token/${tokenContext.currentlySelectedToken.address}`} target="_blank" rel="noreferrer">
                        <div className="token-info-button">
                            <Image src={`/assets/image/icons/bscScan${themeContext.currentTheme === 'lightMode' ? 'Light' : ''}.svg`} width={20} height={20} />
                        </div>
                    </a>
                    <div role="button" tabIndex="0" onClick={() => toggleShowSocials(!showSocials)} className="token-info-button share">
                        <Image src={`/assets/image/icons/share${themeContext.currentTheme === 'lightMode' ? 'Light' : ''}.svg`} width={20} height={20} />
                        <div className={`social-drop-down ${showSocials ? 'show' : ''}`}>
                            {tokenInfo.linkedin && (
                                <a href={tokenInfo.linkedin} target="_blank" rel="noreferrer">
                                    <SocialIcon network="linkedin" style={{ width: iconSize, height: iconSize }} />
                                    LinkedIn
                                </a>
                            )}
                            {tokenInfo.facebook && (
                                <a href={tokenInfo.facebook} target="_blank" rel="noreferrer">
                                    <SocialIcon network="facebook" style={{ width: iconSize, height: iconSize }} />
                                    Facebook
                                </a>
                            )}
                            {tokenInfo.telegram && (
                                <a href={tokenInfo.telegram} target="_blank" rel="noreferrer">
                                    <SocialIcon network="telegram" style={{ width: iconSize, height: iconSize }} />
                                    Telegram
                                </a>
                            )}
                            {tokenInfo.twitter && (
                                <a href={tokenInfo.twitter} target="_blank" rel="noreferrer">
                                    <SocialIcon network="twitter" style={{ width: iconSize, height: iconSize }} />
                                    Twitter
                                </a>
                            )}
                            {tokenInfo.website && (
                                <a href={tokenInfo.website} target="_blank" rel="noreferrer">
                                    <SocialIcon style={{ width: iconSize, height: iconSize }} />
                                    Website
                                </a>
                            )}
                            {tokenInfo.discord && (
                                <a href={tokenInfo.discord} target="_blank" rel="noreferrer">
                                    <SocialIcon network="discord" style={{ width: iconSize, height: iconSize }} />
                                    Discord
                                </a>
                            )}
                            {tokenInfo.github && (
                                <a href={tokenInfo.github} target="_blank" rel="noreferrer">
                                    <SocialIcon network="github" style={{ width: iconSize, height: iconSize }} />
                                    Github
                                </a>
                            )}
                            {tokenInfo.reddit && (
                                <a href={tokenInfo.reddit} target="_blank" rel="noreferrer">
                                    <SocialIcon network="reddit" style={{ width: iconSize, height: iconSize }} />
                                    Reddit
                                </a>
                            )}
                            {tokenInfo.wechat && (
                                <a href={tokenInfo.wechat} target="_blank" rel="noreferrer">
                                    <SocialIcon network="wechat" style={{ width: iconSize, height: iconSize }} />
                                    WeChat
                                </a>
                            )}
                        </div>
                    </div>
                    <div role="button" tabIndex="0" onClick={() => toggleShowPortfolio(!showPortfolio)} className="token-info-button wallet">
                        <Image src={`/assets/image/icons/wallet${themeContext.currentTheme === 'lightMode' ? 'Light' : ''}${showPortfolio ? '' : 'Closed'}.svg`} width={30} height={30} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MarketInfo
