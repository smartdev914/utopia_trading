import React, { useState } from 'react'

const ThemeContext = React.createContext()

const ThemeContextProvider = ({ children }) => {
    const [currentTheme, toggleCurrentTheme] = useState('darkMode')

    return (
        <ThemeContext.Provider
            value={{
                currentTheme,
                toggleCurrentTheme,
            }}
        >
            {children}
        </ThemeContext.Provider>
    )
}

export default ThemeContext

export { ThemeContextProvider }
