import React, { useContext, useEffect, useState } from 'react'
import Image from 'next/image'
import { ToastContainer } from 'react-toastify'
// import { Modal } from 'react-bootstrap'
import ErrorBoundary from 'components/ErrorBoundry'
import ThemeContext from 'context/ThemeContext'
import BSCContext from 'context/BSCContext'
import { Fade } from 'react-bootstrap'
import MarketInfo from '../../components/MarketInfo'
import Layout from '../../components/Layout'
import MarketHistory from '../../components/MarketHistory'
import MarketExchange from '../../components/MarketExchange'
import Portfolio from '../../components/Portfolio'
import DynamicTVSDark from '../../components/DynamicTVSDark'

const Home = () => {
    // const [showModal, setShowModal] = useState(false)
    const bscContext = useContext(BSCContext)
    const themeContext = useContext(ThemeContext)
    const [showPortfolio, toggleShowPortfolio] = useState(true)
    const [autoOpened, setAutoOpened] = useState(false)

    useEffect(() => {
        document.querySelector('body').classList.remove('darkMode')
        document.querySelector('body').classList.remove('lightMode')
        document.querySelector('body').classList.remove('utopiaMode')
        document.querySelector('body').classList.add(themeContext.currentTheme)
        // const shownModal = sessionStorage.getItem('shownWarningModal')
        // setShowModal(!shownModal)
        // sessionStorage.setItem('shownWarningModal', true)
    }, [themeContext.currentTheme])

    useEffect(() => {
        if (bscContext.currentAccountAddress && !autoOpened) {
            setAutoOpened(true)
            toggleShowPortfolio(true)
        }
    }, [bscContext.currentAccountAddress])

    return (
        <Layout>
            <ErrorBoundary>
                <div className="container-fluid mtb15 no-fluid">
                    <MarketInfo toggleShowPortfolio={toggleShowPortfolio} showPortfolio={showPortfolio} />
                    <div className="row sm-gutters">
                        <div className="col-md-3">
                            <MarketExchange />
                            <div className="utopia-logo-u-main">
                                <Image src={`/assets/image/utopia/utopiaU-${themeContext.currentTheme}.svg`} width={400} height={400} alt="utopia Logo" priority />
                            </div>
                        </div>
                        <div className={`col-sm-12 col-md-${showPortfolio ? 6 : 9}`}>
                            <DynamicTVSDark />
                            <MarketHistory />
                        </div>
                        {showPortfolio && (
                            <div className="col-md-3">
                                <Fade right delay={200}>
                                    <Portfolio />
                                </Fade>
                            </div>
                        )}
                        <div className="utopia-logo-u-main mobile">
                            <Image src={`/assets/image/utopia/utopiaU-${themeContext.currentTheme}.svg`} width={400} height={400} alt="utopia Logo" priority />
                        </div>
                    </div>
                </div>
                <ToastContainer />
                {/* <Modal show={showModal} onHide={() => setShowModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Exchange Still In Beta</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Just a reminder this Dex is currently in beta. There are many bugs and features not yet implemented. Use at your own risk. If you&apos;d like a safe way to purchase UTOPIA or
                        other BSC coins please visit{' '}
                        <a href="https://pancakeswap.finance/swap/0x1a1d7c7A92e8d7f0de10Ae532ECD9f63B7EAf67c" target="_blank" rel="noreferrer">
                            Pancake Swap
                        </a>
                        . If you&apos;d like to report a bug or a feature request feel free to join our&nbsp;
                        <a href="https://t.me/UtopiaBSCSupport" target="_blank" rel="noreferrer">
                            Telegram Support Group
                        </a>
                    </Modal.Body>
                </Modal> */}
            </ErrorBoundary>
        </Layout>
    )
}

export default Home
