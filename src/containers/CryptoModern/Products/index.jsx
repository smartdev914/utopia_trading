import React from 'react'
import Fade from 'react-reveal/Fade'
import Text from 'common/components/Text'
import Heading from 'common/components/Heading'
import Container from 'common/components/UI/Container'
import Image from 'next/image'
import SectionWrapper, { ContentWrapper, ProductIcon, ProductSectionWrapper, ProductItem } from './products.style'

const PrivacyPortal = () => (
    <SectionWrapper>
        <Container width="1300px">
            <ContentWrapper>
                <Fade up delay={100}>
                    <div className="content">
                        <Heading content="UTOPIA ECOSYSTEM" className="sectionHeaderStyle" />
                    </div>
                </Fade>
                <Fade up delay={100}>
                    <div className="utopiaEcosystemLink">
                        <Image src="/assets/image/utopia/ecosystemLink.svg" width={700} height={173} />
                    </div>
                </Fade>
            </ContentWrapper>
            <ContentWrapper>
                <div className="productColumn">
                    <Fade left>
                        <ProductSectionWrapper>
                            <div className="logoContainer">
                                <Image src="/assets/image/utopia/utopiaLabsLogo.svg" width={400} height={40} />
                            </div>
                            <Text className="subheader" as="p" content="The DeFi tool builder branch of Utopia" />
                            <hr />
                            <div className="productContent">
                                <ProductItem>
                                    <ProductIcon>
                                        <Image src="/assets/image/icons/DecentralisedIcon.svg" alt="Decentralised" width={75} height={75} />
                                    </ProductIcon>
                                    <div className="content">
                                        <h3>UtopiaDex</h3>
                                        <div>
                                            <Text className="highlightText" as="span" content="A full decentralised exchange " />
                                            <Text as="span" content="with charting limit orders stop losses and more" />
                                        </div>
                                    </div>
                                </ProductItem>
                                <ProductItem>
                                    <ProductIcon>
                                        <Image src="/assets/image/icons/LaunchpadIcon.svg" alt="Decentralised" width={75} height={75} />
                                    </ProductIcon>
                                    <div className="content">
                                        <h3>UtopiaPad</h3>
                                        <div>
                                            <Text className="highlightText" as="span" content="A fully Launchpad " />
                                            <Text as="span" content="with anti-bot-measures and more" />
                                        </div>
                                    </div>
                                </ProductItem>
                                <ProductItem>
                                    <ProductIcon>
                                        <Image src="/assets/image/icons/DefiIcon.svg" alt="Decentralised" width={75} height={75} />
                                    </ProductIcon>
                                    <div className="content">
                                        <h3>UtopiaLend</h3>
                                        <div>
                                            <Text className="highlightText" as="span" content="A decentralised lending platform " />
                                            <Text as="span" content="that uses trustless smart contracts and liquidity pools" />
                                        </div>
                                    </div>
                                </ProductItem>
                                <ProductItem>
                                    <ProductIcon>
                                        <Image src="/assets/image/icons/BTCBridgeIcon.svg" alt="Decentralised" width={75} height={75} />
                                    </ProductIcon>
                                    <div className="content">
                                        <h3>UtopiaBridge</h3>
                                        <div>
                                            <Text className="highlightText" as="span" content="A decentralised Bridge " />
                                            <Text as="span" content="which allows users to traverse across various blockchains" />
                                        </div>
                                    </div>
                                </ProductItem>
                            </div>
                        </ProductSectionWrapper>
                    </Fade>
                </div>
                <div className="productColumn">
                    <Fade right>
                        <ProductSectionWrapper>
                            <div className="logoContainer">
                                <Image src="/assets/image/utopia/utopiaWorldLogo.svg" width={338} height={86} />
                            </div>
                            <Text className="subheader" as="p" content="This branch of Utopia will focus on creating the Utopia metaverse and various blockchain games within the metaverse" />
                            <hr />
                            <div className="productContent">
                                <ProductItem>
                                    <ProductIcon>
                                        <Image src="/assets/image/icons/UtopiaWorld.svg" alt="Decentralised" width={75} height={75} />
                                    </ProductIcon>
                                    <div className="content">
                                        <h3>Metaverse</h3>
                                        <div>
                                            <Text className="highlightText" as="span" content="A decentralised virtual world " />
                                            <Text as="span" content="where you can buy land and create your own world" />
                                        </div>
                                    </div>
                                </ProductItem>
                                <ProductItem>
                                    <ProductIcon>
                                        <Image src="/assets/image/icons/BattleRushGame.svg" alt="Decentralised" width={75} height={75} />
                                    </ProductIcon>
                                    <div className="content">
                                        <h3>NFT P2E MMO Battle Rush Game</h3>
                                        <div>
                                            <Text className="highlightText" as="span" content="A Ground Rush type game " />
                                            <Text as="span" content="where you can battle players in the metaverse with your NFT's to earn in-game tokens" />
                                        </div>
                                    </div>
                                </ProductItem>
                            </div>
                        </ProductSectionWrapper>
                    </Fade>
                </div>
            </ContentWrapper>
        </Container>
    </SectionWrapper>
)

export default PrivacyPortal
