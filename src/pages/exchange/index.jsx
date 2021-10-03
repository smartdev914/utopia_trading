import React, { useEffect } from 'react'
import Image from 'next/image'
import MarketNews from 'components/MarketNews'
import { ToastContainer } from 'react-toastify'
import Layout from '../../components/Layout'
import MarketHistory from '../../components/MarketHistory'
import MarketPairs from '../../components/MarketPairs'
import MarketExchange from '../../components/MarketExchange'
import { ThemeConsumer } from '../../context/ThemeContext'
import DynamicTVS from '../../components/DynamicTVS'
import DynamicTVSDark from '../../components/DynamicTVSDark'

const Home = () => {
    useEffect(() => {
        document.querySelector('body').classList.add('dark')
    }, [])

    return (
        <Layout>
            <div className="container-fluid mtb15 no-fluid">
                <div className="row sm-gutters">
                    <div className="col-sm-12 col-md-3">
                        <MarketPairs />
                        <MarketNews />
                    </div>
                    <div className="col-sm-12 col-md-6">
                        <ThemeConsumer>{({ data }) => (data.theme === 'light' ? <DynamicTVS /> : <DynamicTVSDark />)}</ThemeConsumer>
                        <MarketHistory />
                    </div>
                    <div className="col-md-3">
                        <MarketExchange />
                        <div className="utopia-logo-u-main">
                            <Image src="/assets/gifs/utopiaLogoGif1.gif" width={600} height={600} alt="utopia Logo" priority />
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </Layout>
    )
}

Home.getInitialProps = ({ query }) => ({ query })

export default Home
