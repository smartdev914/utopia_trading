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
                                <Text as="p" className="step" content="Setup MetaMask (Computer/Laptop users) and purchase BNB" />
                                <div className="stepDesc">
                                    <Text as="span" content="Download " />
                                    <a className="link" href="https://metamask.io/">
                                        MetaMask
                                    </a>
                                    <Text as="span" content="and purchase BNB through a 3rd party on ramp service or a CEX like Binance/Kucoin and transfer them to your MetaMask" />
                                </div>
                                <div className="stepLine" />
                            </Fade>
                            <div className="stepNumber">1</div>
                        </div>
                    </Fade>
                    <Fade down delay={400}>
                        <div className="stepTwo stepWrapper">
                            <Fade clear delay={1000}>
                                <Text as="p" className="step" content="Exchange for Utopia" />
                                <div className="stepDesc">
                                    <Text as="span" content="Open " />
                                    <a className="link" href="https://udex.co/">
                                        Udex.co
                                    </a>
                                    <Text as="span" content="where Utopia is already loaded for swap. Then connect your BSC wallet and set slippage to 11-12%" />
                                </div>
                                <div className="stepLine" />
                            </Fade>
                            <div className="stepNumber">2</div>
                        </div>
                    </Fade>
                    <Fade down delay={400}>
                        <div className="stepThree stepWrapper">
                            <Fade clear delay={1000}>
                                <Text as="p" className="step" content="Approve the Swap" />
                                <div className="stepDesc">
                                    <p>
                                        <Text as="span" content="Then approve the transaction and swap to Utopia! Make sure to add the Utopia token to you wallet so you can view it" />
                                    </p>
                                    {/* <p>
                                        <Text as="span" content="UTOPIA Token Address: " />
                                        <Text as="div" content="0x1a1d7c7A92e8d7f0de10Ae532ECD9f63B7EAf67c" />
                                    </p> */}
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
