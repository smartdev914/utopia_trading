import React, { useState } from 'react'
import Head from 'next/head'
import Sticky from 'react-stickynode'
import Navbar from 'containers/CryptoModern/Navbar'
import GlobalStyle, { CryptoWrapper, ContentWrapper } from 'containers/CryptoModern/cryptoModern.style'
import Presale from 'containers/CryptoModern/Presale'
import { ResetCSS } from '../../../public/assets/css/style'

const CryptoModern = () => {
    const [showWhitePaper, toggleShowWhitePaper] = useState(false)

    return (
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
                    <Presale />
                </ContentWrapper>
            </CryptoWrapper>
            {/* end of app classic landing */}
        </>
    )
}
export default CryptoModern
