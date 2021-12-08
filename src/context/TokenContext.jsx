import axios from 'axios'
import { round } from 'common/utils/numbers'
import { getTokenPriceInUSD } from 'common/utils/tokens'
import React, { useEffect, useState } from 'react'
import supportedPancakeTokens from '../common/constants/tokens/supportedPancakeTokens.json'

const TokenContext = React.createContext()

const TokenContextProvider = ({ children }) => {
    const supportedTokenList = supportedPancakeTokens.tokens
    const [currentlySelectedToken, setCurrentlySelectedToken] = useState({
        address: '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c',
        chainId: 56,
        decimals: 18,
        logoURI: 'https://pancakeswap.finance/images/tokens/0x7130d2a12b9bcbfae4f2634d864a1ee1ce3ead9c.png',
        name: 'BTCB Token',
        symbol: 'BTCB',
    })
    const [currentTokenPriceInUSD, setCurrentTokenPriceInUSD] = useState()

    useEffect(async () => {
        const currentPriceOfToken = await getTokenPriceInUSD(currentlySelectedToken.address, currentlySelectedToken.decimals)
        if (currentPriceOfToken) {
            setCurrentTokenPriceInUSD(currentPriceOfToken)
        } else {
            setCurrentTokenPriceInUSD(`-`)
        }
    }, [currentlySelectedToken.address, currentlySelectedToken.decimals])

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
