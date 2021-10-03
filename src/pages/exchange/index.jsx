import React, { useContext, useEffect } from 'react'
import Text from 'common/components/Text'
import Image from 'next/image'
import MarketNews from 'components/MarketNews'
import { ToastContainer } from 'react-toastify'
import dexWhiteListWallets from 'common/data/dexWhiteListWallets'
import BSCContext from 'context/BSCContext'
import Layout from '../../components/Layout'
import MarketHistory from '../../components/MarketHistory'
import MarketPairs from '../../components/MarketPairs'
import MarketExchange from '../../components/MarketExchange'
import { ThemeConsumer } from '../../context/ThemeContext'
import DynamicTVS from '../../components/DynamicTVS'
import DynamicTVSDark from '../../components/DynamicTVSDark'

const Home = ({ query }) => {
    const hasSecretLink = Object.keys(query).includes('716e5a7d-b5da-4cbf-9eb9-be908007fef7')
    const bscContext = useContext(BSCContext)
    const isDexWhiteListed = dexWhiteListWallets.find((wallet) => wallet.toLowerCase() === bscContext.currentAccountAddress.toLowerCase())

    useEffect(() => {
        document.querySelector('body').classList.add('dark')
    }, [])

    return hasSecretLink || isDexWhiteListed ? (
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
    ) : (
        <div className="dex-beta-modal">
            <Text as="p" content="Exchange is Currently In Closed Beta" />
            <Text as="div" content="Connect a whitelisted wallet to use the Beta" />
            <button
                type="button"
                className="btn buy"
                onClick={async () => {
                    await bscContext.triggerDappModal()
                }}
            >
                Connect Wallet
            </button>
        </div>
    )
}

Home.getInitialProps = ({ query }) => ({ query })

export default Home
