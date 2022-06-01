import { getTokenPriceInUSD } from 'common/utils/tokens'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/dist/client/router'
import supportedPancakeTokens from '../common/constants/tokens/supportedPancakeTokens.json'

const TokenContext = React.createContext()

let initialTokenIndex = 0
try {
    initialTokenIndex = parseInt(window.localStorage.getItem('currentTokenIndex'), 10)
    if (Number.isNaN(initialTokenIndex)) {
        localStorage.setItem('currentTokenIndex', 0)
        initialTokenIndex = 0
    }
} catch (e) {
    initialTokenIndex = 0
}

const TokenContextProvider = ({ children }) => {
    const supportedTokenList = supportedPancakeTokens.tokens
    const [currentlySelectedToken, setCurrentlySelectedToken] = useState(supportedPancakeTokens.tokens[initialTokenIndex])
    const [currentTokenPriceInUSD, setCurrentTokenPriceInUSD] = useState('0')

    const router = useRouter()
    const { pathname } = router

    useEffect(() => {
        if (pathname === '/exchange') {
            // debugger
            let currentTokenIndex = parseInt(localStorage.getItem('currentTokenIndex'), 10)
            if (Number.isNaN(currentTokenIndex)) {
                localStorage.setItem('currentTokenIndex', 0)
                currentTokenIndex = 0
            }
            setCurrentlySelectedToken(supportedPancakeTokens.tokens[currentTokenIndex])
        }
    }, [pathname])

    useEffect(async () => {
        const currentPriceOfToken = await getTokenPriceInUSD(currentlySelectedToken.address)

        if (currentPriceOfToken) {
            setCurrentTokenPriceInUSD(currentPriceOfToken)
        } else {
            setCurrentTokenPriceInUSD(0)
        }
        localStorage.setItem(
            'currentTokenIndex',
            supportedPancakeTokens.tokens.findIndex((item) => item.address === currentlySelectedToken.address)
        )
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
