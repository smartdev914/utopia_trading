import React from 'react'
import Text from 'common/components/Text'
import Heading from 'common/components/Heading'
import Container from 'common/components/UI/Container'
import Fade from 'react-reveal/Fade'
import Image from 'next/image'

import SectionWrapper, { ContentWrapper } from './howToBuy.style'

const WalletPortal = () => (
    <SectionWrapper id="howToBuy">
        <Fade up delay={100}>
            <Heading content="HOW TO BUY" className="sectionHeaderStyle" />
        </Fade>
        <Container>
            <ContentWrapper>
                <div className="content">
                    <Fade down delay={400}>
                        <div className="stepOne stepWrapper">
                            <Fade clear delay={1000}>
                                <Text as="p" className="step" content="Setup MetaMask (Computer/Laptop users) or TrustWallet (Phone users)" />
                                <div className="stepDesc">
                                    <a className="link" href="https://metamask.io/">
                                        MetaMask
                                    </a>
                                    <Text as="span" content="&nbsp;can be added as a chrome browser extension or downloaded from the app/playstore and&nbsp;" />
                                    <a className="link" href="https://trustwallet.com/">
                                        TrustWallet
                                    </a>
                                    <Text
                                        as="span"
                                        content="&nbsp;can be downloaded from the play store. After that, for MetaMask, you will have to add the Binance Smart Chain to your network-list. "
                                    />
                                    <a className="link" href="https://academy.binance.com/en/articles/connecting-metamask-to-binance-smart-chain/">
                                        (Click here for a step-by-step tutorial)
                                    </a>
                                </div>
                                <div className="stepLine" />
                            </Fade>
                            <div className="stepNumber">1</div>
                        </div>
                    </Fade>
                    <Fade down delay={400}>
                        <div className="stepTwo stepWrapper">
                            <Fade clear delay={1000}>
                                <Text as="p" className="step" content="Buy and send BNB to your wallet" />
                                <div className="stepDesc">
                                    <Text
                                        as="span"
                                        content="Buy BNB on a centralised exchange (i.e. Binance, Coinbase, KuCoin etc.). Then using your wallet address, transfer the tokens to your wallet from the exchange. 
                                        On TrustWallet, you can buy BNB directly to your wallet with fiat using Simplex. "
                                    />
                                </div>
                                <div className="stepLine" />
                            </Fade>
                            <div className="stepNumber">2</div>
                        </div>
                    </Fade>
                    <Fade down delay={400}>
                        <div className="stepThree stepWrapper">
                            <Fade clear delay={1000}>
                                <Text as="p" className="step" content="Swap BnB Smart Chain for Utopia on Pancakeswap" />
                                <div className="stepDesc">
                                    <p>
                                        <Text as="span" content="For computer/laptop users, navigate to&nbsp;" />
                                        <a className="link" href="https://pancakeswap.finance/">
                                            pancakeswap.finance
                                        </a>
                                        <Text
                                            as="span"
                                            content="&nbsp;and connect your MetaMask wallet. For phone users, access the Dapp browser within the trust wallet (android users only) or metamask app and navigate to&nbsp;"
                                        />
                                        <a className="link" href="https://pancakeswap.finance">
                                            pancakeswap.finance
                                        </a>
                                        <Text as="span" content="&nbsp;and connect your wallet." />
                                    </p>
                                    <p>
                                        <Text
                                            as="span"
                                            content="Once that is done, obtain the Utopia token address and paste into the pancakeswap exchange. Ensure to set slippage to 11% and if any error occurs try a higher slippage. Next swap BnB Smart Chain for Utopia token, which you should be able to view now in your wallet. To view Utopia token on MetaMask, you will have to manually add Utopia to your network list."
                                        />
                                    </p>
                                    <p>
                                        <Text as="span" content="UTOPIA Token Address: " />
                                        <Text as="div" content="0x1a1d7c7A92e8d7f0de10Ae532ECD9f63B7EAf67c" />
                                    </p>
                                </div>
                                <div className="stepNumber">3</div>
                            </Fade>
                        </div>
                    </Fade>
                </div>
                <div className="utopiaTree">
                    <Image src="/assets/image/utopia/utopiaTree.svg" alt="utopia tree" width={286} height={213} />
                </div>
            </ContentWrapper>
        </Container>
    </SectionWrapper>
)

export default WalletPortal
