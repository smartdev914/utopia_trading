import axios from 'axios'
import { round } from 'common/utils/numbers'
import React, { useEffect, useState } from 'react'
import supportedPancakeTokens from '../common/constants/tokens/supportedPancakeTokens.json'

const TokenContext = React.createContext()

const TokenContextProvider = ({ children }) => {
    const supportedTokenList = supportedPancakeTokens.tokens
    const [currentlySelectedToken, setCurrentlySelectedToken] = useState({
        address: '0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82',
        chainId: 56,
        decimals: 18,
        logoURI: 'https://pancakeswap.finance/images/tokens/0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82.png',
        name: 'PancakeSwap',
        symbol: 'CAKE',
    })
    const [currentTokenPriceInUSD, setCurrentTokenPriceInUSD] = useState()

    const getCurrentPriceOfTokeninUSD = async (address) => {
        if (address === '0x55d398326f99059ff775485246999027b3197955') {
            return 1
        }
        const bitQueryResponse = await axios.post(
            'https://graphql.bitquery.io',
            {
                query: 'query($token: String, $currency: String){ ethereum(network: bsc) { address(address: {is: $token}) { smartContract { currency { symbol name decimals tokenType } } } dexTrades( baseCurrency: {is: $token} quoteCurrency: {is: $currency} options: {desc: ["block.height", "transaction.index"], limit: 1} ) { block { height timestamp { time(format: "%Y-%m-%d %H:%M:%S") } } transaction { index } baseCurrency { symbol } quoteCurrency { symbol } quotePrice } } }',
                variables: {
                    token: address,
                    currency: '0x55d398326f99059ff775485246999027b3197955',
                },
            },
            {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'X-API-KEY': 'BQYmsfh6zyChKKHtKogwvrjXLw8AJkdP',
                },
            }
        )
        return bitQueryResponse?.data?.data?.ethereum?.dexTrades?.[0]?.quotePrice
    }

    useEffect(async () => {
        if (currentlySelectedToken.address === '0x55d398326f99059fF775485246999027B3197955') {
            setCurrentTokenPriceInUSD(round(1.0, 2))
        } else {
            const currentPriceOfToken = await getCurrentPriceOfTokeninUSD(currentlySelectedToken.address)
            setCurrentTokenPriceInUSD(round(parseFloat(currentPriceOfToken), 2).toLocaleString(undefined, { minimumFractionDigits: 2 }))
        }
    }, [currentlySelectedToken.address])

    return (
        <TokenContext.Provider
            value={{
                supportedTokenList,
                currentlySelectedToken,
                setCurrentlySelectedToken,
                currentTokenPriceInUSD,
            }}
        >
            {children}
        </TokenContext.Provider>
    )
}

export default TokenContext

export { TokenContextProvider }
