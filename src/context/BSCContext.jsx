import React, { useState } from 'react'

const BSCContext = React.createContext()

const BSCContextProvider = ({ children }) => {
    const [dexContract, setDexContract] = useState({})

    return (
        <BSCContext.Provider
            value={{
                dexContract,
                setDexContract,
            }}
        >
            {children}
        </BSCContext.Provider>
    )
}

export default BSCContext

export { BSCContextProvider }
