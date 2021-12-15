import ThemeContext from 'context/ThemeContext'
import React, { useContext } from 'react'
import MultiToggle from 'react-multi-toggle'

const ThemeToggle = () => {
    const themeContext = useContext(ThemeContext)
    const themeOptions = [
        {
            displayName: 'DARK',
            value: 'darkMode',
        },
        {
            displayName: 'LIGHT',
            value: 'lightMode',
        },
        {
            displayName: 'UTOPIA',
            value: 'utopiaMode',
        },
    ]

    return <MultiToggle options={themeOptions} selectedOption={themeContext.currentTheme} onSelectOption={(value) => themeContext.toggleCurrentTheme(value)} />
}

export default ThemeToggle
