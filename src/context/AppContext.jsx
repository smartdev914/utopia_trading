import React, { useState } from 'react'
import supportedPancakeTokens from '../common/constants/tokens/supportedPancakeTokens.json'

const AppContext = React.createContext()

const AppContextProvider = ({ children }) => {
    const supportedTokenList = supportedPancakeTokens.tokens
    const [currentlySelectedToken, setCurrentlySelectedToken] = useState({
        address: '0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82',
        chainId: 56,
        decimals: 18,
        logoURI: 'https://pancakeswap.finance/images/tokens/0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82.png',
        name: 'PancakeSwap Token',
        symbol: 'CAKE',
    })
    return (
        <AppContext.Provider
            value={{
                supportedTokenList,
                currentlySelectedToken,
                setCurrentlySelectedToken,
            }}
        >
            {children}
        </AppContext.Provider>
    )
}

export default AppContext

export { AppContextProvider }
