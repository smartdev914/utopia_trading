import React, { useState } from 'react'
import { Modal } from '@redq/reuse-modal'
import '@redq/reuse-modal/es/index.css'
import '../../public/assets/css/flaticon.css'
import 'swiper/swiper-bundle.css'
import '../../public/assets/css/icon-example-page.css'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import '../assets/css/ionicons.min.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../assets/scss/style.scss'

import { pdfjs } from 'react-pdf'
import { ThemeProvider } from 'context/ThemeContext'
import { BSCContextProvider } from 'context/BSCContext'

pdfjs.GlobalWorkerOptions.workerSrc = 'pdf.worker.min.js'

export default function CustomApp({ Component, pageProps }) {
    const [theme, setTheme] = useState('dark')

    const [dexContract, setDexContract] = useState({})

    return (
        <ThemeProvider
            value={{
                data: { theme },
                update: () => {
                    setTheme(theme === 'light' ? 'dark' : 'light')
                },
            }}
        >
            <BSCContextProvider
                value={{
                    dexContract,
                    setDexContract: (e) => {
                        setDexContract(e)
                    },
                }}
            >
                <Modal>
                    <Component {...pageProps} />
                </Modal>
            </BSCContextProvider>
        </ThemeProvider>
    )
}
