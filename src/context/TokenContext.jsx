import axios from 'axios'
import { round } from 'common/utils/numbers'
import { getTokenPriceInUSD } from 'common/utils/tokens'
import React, { useEffect, useState } from 'react'
import supportedPancakeTokens from '../common/constants/tokens/supportedPancakeTokens.json'

const TokenContext = React.createContext()

const TokenContextProvider = ({ children }) => {
    const supportedTokenList = supportedPancakeTokens.tokens
    const [currentlySelectedToken, setCurrentlySelectedToken] = useState({
        address: '0x1a1d7c7A92e8d7f0de10Ae532ECD9f63B7EAf67c',
        chainId: 56,
        decimals: 9,
        logoURI: 'https://utopia.cc/assets/image/utopia/utopiaUDarkbg.svg',
        name: 'Utopia Token',
        symbol: 'UTOPIA',
    })
    const [currentTokenPriceInUSD, setCurrentTokenPriceInUSD] = useState()

    useEffect(async () => {
        const currentPriceOfToken = await getTokenPriceInUSD(currentlySelectedToken.address, currentlySelectedToken.decimals)
        if (currentPriceOfToken) {
            setCurrentTokenPriceInUSD(currentPriceOfToken)
        } else {
            setCurrentTokenPriceInUSD(`-`)
        }
        console.log('Changing Price: ', currentPriceOfToken)
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
