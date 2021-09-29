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

import { QueryClient, QueryClientProvider } from 'react-query'
import { pdfjs } from 'react-pdf'
import { ThemeProvider } from 'context/ThemeContext'
import { BSCContextProvider } from 'context/BSCContext'
import { AppContextProvider } from 'context/AppContext'

pdfjs.GlobalWorkerOptions.workerSrc = 'pdf.worker.min.js'

const queryClient = new QueryClient()
export default function CustomApp({ Component, pageProps }) {
    const [theme, setTheme] = useState('dark')

    return (
        <ThemeProvider
            value={{
                data: { theme },
                update: () => {
                    setTheme(theme === 'light' ? 'dark' : 'light')
                },
            }}
        >
            <QueryClientProvider client={queryClient}>
                <AppContextProvider>
                    <BSCContextProvider>
                        <Modal>
                            <Component {...pageProps} />
                        </Modal>
                    </BSCContextProvider>
                </AppContextProvider>
            </QueryClientProvider>
        </ThemeProvider>
    )
}
