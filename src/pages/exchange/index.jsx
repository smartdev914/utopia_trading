import React, { useEffect } from 'react'
import Text from 'common/components/Text'
import Image from 'next/image'
import Layout from '../../components/Layout'
import MarketHistory from '../../components/MarketHistory'
import MarketPairs from '../../components/MarketPairs'
import MarketExchange from '../../components/MarketExchange'
import { ThemeConsumer } from '../../context/ThemeContext'
import DynamicTVS from '../../components/DynamicTVS'
import DynamicTVSDark from '../../components/DynamicTVSDark'

const Home = ({ query }) => {
    const hasSecretLink = Object.keys(query).includes('716e5a7d-b5da-4cbf-9eb9-be908007fef7')

    useEffect(() => {
        document.querySelector('body').classList.add('dark')
    }, [])

    return hasSecretLink ? (
        <Layout>
            <div className="container-fluid mtb15 no-fluid">
                <div className="row sm-gutters">
                    <div className="col-sm-12 col-md-3">
                        <MarketPairs />
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
        </Layout>
    ) : (
        <Text as="p" content="Exchange Under Development." />
    )
}

Home.getInitialProps = ({ query }) => ({ query })

export default Home
