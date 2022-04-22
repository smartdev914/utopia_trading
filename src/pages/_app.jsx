import React, { useEffect } from 'react'
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
import 'react-multi-toggle/style.css'

import { QueryClient, QueryClientProvider } from 'react-query'
import { pdfjs } from 'react-pdf'
import { ThemeContextProvider } from 'context/ThemeContext'
import { BSCContextProvider } from 'context/BSCContext'
import { TokenContextProvider } from 'context/TokenContext'
import { useRouter } from 'next/dist/client/router'
import { pageview } from 'common/utils/ga'
import { Provider } from 'react-redux'
import store from '../../redux/store'

pdfjs.GlobalWorkerOptions.workerSrc = 'pdf.worker.min.js'

const queryClient = new QueryClient()
export default function CustomApp({ Component, pageProps }) {
    const router = useRouter()

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
        <Provider store={store}>
            <ThemeContextProvider>
                <QueryClientProvider client={queryClient}>
                    <TokenContextProvider>
                        <BSCContextProvider>
                            <Modal>
                                <Component {...pageProps} />
                            </Modal>
                        </BSCContextProvider>
                    </TokenContextProvider>
                </QueryClientProvider>
            </ThemeContextProvider>
        </Provider>
    )
}
