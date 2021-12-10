import React, { useState } from 'react'
import Head from 'next/head'
import { ThemeProvider } from 'styled-components'
import { theme } from 'common/theme/appModern'
import Sticky from 'react-stickynode'
import Navbar from 'containers/CryptoModern/Navbar'
import Banner from 'containers/CryptoModern/Banner'
import Mission from 'containers/CryptoModern/MissionSection'
import Tokenomics from 'containers/CryptoModern/Tokenomics'
import RoadMap from 'containers/CryptoModern/RoadMap'
import Products from 'containers/CryptoModern/Products'
import HowToBuy from 'containers/CryptoModern/HowToBuy'
import Team from 'containers/CryptoModern/Team'
import GlobalStyle, { CryptoWrapper, ContentWrapper } from 'containers/CryptoModern/cryptoModern.style'
import dynamic from 'next/dynamic'
import { ToastContainer } from 'react-toastify'
import Button from 'common/components/Button'
import { ResetCSS } from '../../public/assets/css/style'
import UtopiaWhitePaper from '../../public/assets/docs/Utopia_Whitepaper.pdf'

const PDFViewer = dynamic(() => import('../containers/CryptoModern/PDFViewer'), { ssr: false })

const CryptoModern = () => {
    const [showWhitePaper, toggleShowWhitePaper] = useState(false)

    return (
        <ThemeProvider theme={theme}>
            <>
                <Head>
                    <title>Utopia | Built today, for a better tomorrow</title>
                    <meta name="Description" content="Utopia Landing Page" />
                    <meta name="theme-color" content="#2563FF" />
                    <meta name="keywords" content="Utopia, UTOPIA, Decentralised, Exchange, DEX" />
                    <link href="https://fonts.googleapis.com/css2?family=Syncopate:wght@400;700&display=swap" rel="stylesheet" />
                    <link href="https://fonts.googleapis.com/css2?family=Oswald:wght@200;300;400;500;600;700&family=Syncopate:wght@400;700&display=swap" rel="stylesheet" />
                    <link href="https://fonts.googleapis.com/css2?family=Dosis:wght@200;300;500;700&family=Noto+Sans:wght@400;700&display=swap" rel="stylesheet" />
                    <link href="https://fonts.googleapis.com/css?family=Roboto:100,100i,300,300i,400,400i,500,500i,700,700i,900,900i" rel="stylesheet" />
                </Head>
                {/* end of head */}

                <ResetCSS />
                <GlobalStyle />
                {/* end of global and reset style */}

                {/* start app classic landing */}
                <CryptoWrapper>
                    <Sticky top={0} innerZ={9999} activeClass="sticky-active">
                        <Navbar toggleShowWhitePaper={toggleShowWhitePaper} showWhitePaper={showWhitePaper} />
                    </Sticky>
                    <ContentWrapper>
                        <Banner />
                        {/* <Mission /> */}
                        <Products />
                        <Tokenomics />
                        <HowToBuy />
                        <RoadMap />
                        <Team />
                        <div className="temp-footer">
                            <Button onClick={() => toggleShowWhitePaper(!showWhitePaper)} className="whitepaper" title="WHITE PAPER" />
                        </div>
                        {showWhitePaper && <PDFViewer url={UtopiaWhitePaper} toggleShowWhitePaper={toggleShowWhitePaper} />}
                    </ContentWrapper>
                </CryptoWrapper>
                {/* end of app classic landing */}
            </>
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
        </ThemeProvider>
    )
}
export default CryptoModern
