import { useRouter } from 'next/dist/client/router'
import React, { useEffect, useState } from 'react'

const ThemeContext = React.createContext()

const ThemeContextProvider = ({ children }) => {
    const [currentTheme, toggleCurrentTheme] = useState('darkMode')
    const router = useRouter()
    const { pathname } = router

    useEffect(() => {
        if (pathname === '/exchange') {
            const theme = localStorage.getItem('theme')
            toggleCurrentTheme(theme || 'darkMode')
        } else {
            document.querySelector('body').classList.remove('darkMode')
            document.querySelector('body').classList.remove('lightMode')
            document.querySelector('body').classList.remove('utopiaMode')
        }
    }, [pathname])

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
