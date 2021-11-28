import React, { useEffect } from 'react'
import Image from 'next/image'
import { ToastContainer } from 'react-toastify'
// import { Modal } from 'react-bootstrap'
import ErrorBoundary from 'components/ErrorBoundry'
import MarketNews from '../../components/MarketNews'
import Layout from '../../components/Layout'
import MarketHistory from '../../components/MarketHistory'
import MarketExchange from '../../components/MarketExchange'
import { ThemeConsumer } from '../../context/ThemeContext'
import DynamicTVS from '../../components/DynamicTVS'
import DynamicTVSDark from '../../components/DynamicTVSDark'

const Home = () => {
    // const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        document.querySelector('body').classList.add('dark')
        // const shownModal = sessionStorage.getItem('shownWarningModal')
        // setShowModal(!shownModal)
        sessionStorage.setItem('shownWarningModal', true)
    }, [])

    return (
        <Layout>
            <ErrorBoundary>
                <div className="container-fluid mtb15 no-fluid">
                    <div className="row sm-gutters">
                        <div className="col-md-3">
                            <MarketExchange />
                            <div className="utopia-logo-u-main">
                                <Image src="/assets/gifs/utopiaLogoGif1.gif" width={600} height={600} alt="utopia Logo" priority />
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-9">
                            <MarketNews />

                            <ThemeConsumer>{({ data }) => (data.theme === 'light' ? <DynamicTVS /> : <DynamicTVSDark />)}</ThemeConsumer>
                            <MarketHistory />
                            <div className="utopia-logo-u-main mobile">
                                <Image src="/assets/gifs/utopiaLogoGif1.gif" width={600} height={600} alt="utopia Logo" priority />
                            </div>
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

Home.getInitialProps = ({ query }) => ({ query })

export default Home
