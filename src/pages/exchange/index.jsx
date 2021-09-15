import React, { useContext, useEffect } from 'react'
import Text from 'common/components/Text'
import Image from 'next/image'
import Web3 from 'web3'
import utopiaDexABI from 'ABI/utopiaDexABI'
import Layout from '../../components/Layout'
import MarketHistory from '../../components/MarketHistory'
import MarketPairs from '../../components/MarketPairs'
import MarketExchange from '../../components/MarketExchange'
import { ThemeConsumer } from '../../context/ThemeContext'
import DynamicTVS from '../../components/DynamicTVS'
import DynamicTVSDark from '../../components/DynamicTVSDark'
import BSCContext from '../../context/BSCContext'

const Home = ({ query }) => {
    const hasSecretLink = Object.keys(query).includes('716e5a7d-b5da-4cbf-9eb9-be908007fef7')
    const contractContext = useContext(BSCContext)

    const loadBSCDexContract = async () => {
        const utopiaDexContract = '0x10ED43C718714eb63d5aA57B78B54704E256024E'
        if (window.web3) {
            const UtopiaDexContract = new window.web3.eth.Contract(utopiaDexABI, utopiaDexContract)
            if (!contractContext.dexContract) {
                contractContext.setDexContract(UtopiaDexContract)
            }
        }
    }

    useEffect(() => {
        if (typeof window.web3 !== 'undefined') {
            window.web3 = new Web3(window.web3.currentProvider)
        } else {
            window.web3 = new Web3(new Web3.providers.HttpProvider('https://localhost:8545'))
        }
        loadBSCDexContract()
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
                            <Image src="/assets/image/utopia/utopiaUDarkbg.svg" width={500} height={500} alt="utopia Logo" priority />
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
