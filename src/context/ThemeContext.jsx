import React, { useEffect, useState } from 'react'

const ThemeContext = React.createContext()

const ThemeContextProvider = ({ children }) => {
    const [currentTheme, toggleCurrentTheme] = useState('darkMode')

    useEffect(() => {
        const theme = localStorage.getItem('theme')
        toggleCurrentTheme(theme || 'darkMode')
    }, [])

    useEffect(() => {
        localStorage.setItem('theme', currentTheme)
    }, [currentTheme])

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
