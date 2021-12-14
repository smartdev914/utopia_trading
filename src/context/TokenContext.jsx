import { getTokenPriceInUSD } from 'common/utils/tokens'
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

    useEffect(async () => {
        const currentPriceOfToken = await getTokenPriceInUSD(currentlySelectedToken.address)
        if (currentPriceOfToken) {
            setCurrentTokenPriceInUSD(currentPriceOfToken)
        } else {
            setCurrentTokenPriceInUSD(`-`)
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
