import React, { useEffect, useState } from 'react'
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
import 'react-toastify/dist/ReactToastify.min.css'

import { QueryClient, QueryClientProvider } from 'react-query'
import { pdfjs } from 'react-pdf'
import { ThemeProvider } from 'context/ThemeContext'
import { BSCContextProvider } from 'context/BSCContext'
import { TokenContextProvider } from 'context/TokenContext'
import { useRouter } from 'next/dist/client/router'
import { pageview } from 'common/utils/ga'

pdfjs.GlobalWorkerOptions.workerSrc = 'pdf.worker.min.js'

const queryClient = new QueryClient()
export default function CustomApp({ Component, pageProps }) {
    const router = useRouter()

    const [theme, setTheme] = useState('dark')

    useEffect(() => {
        const handleRouteChange = (url) => {
            pageview(url)
        }
        // When the component is mounted, subscribe to router changes
        // and log those page views
        router.events.on('routeChangeComplete', handleRouteChange)

        // If the component is unmounted, unsubscribe
        // from the event with the `off` method
        return () => {
            router.events.off('routeChangeComplete', handleRouteChange)
        }
    }, [router.events])

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
                <TokenContextProvider>
                    <BSCContextProvider>
                        <Modal>
                            <Component {...pageProps} />
                        </Modal>
                    </BSCContextProvider>
                </TokenContextProvider>
            </QueryClientProvider>
        </ThemeProvider>
    )
}
