import { getTokenPriceInUSD } from 'common/utils/tokens'
import React, { useEffect, useState } from 'react'
import supportedPancakeTokens from '../common/constants/tokens/supportedPancakeTokens.json'

const TokenContext = React.createContext()

const TokenContextProvider = ({ children }) => {
    const supportedTokenList = supportedPancakeTokens.tokens
    const [currentlySelectedToken, setCurrentlySelectedToken] = useState(supportedPancakeTokens.tokens[0])
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
