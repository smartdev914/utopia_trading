import React from 'react'
import Fade from 'react-reveal/Fade'
import Text from 'common/components/Text'
import Heading from 'common/components/Heading'
import Container from 'common/components/UI/Container'
import Image from 'next/image'
import SectionWrapper, { ContentWrapper, ProductIcon, ProductSectionWrapper } from './products.style'

const PrivacyPortal = () => (
    <SectionWrapper>
        <Container width="1300px">
            <ContentWrapper>
                <Fade up delay={100}>
                    <div className="content">
                        <Heading content="PRODUCTS" className="sectionHeaderStyle" />
                        <Heading content="IN DEVELOPMENT" className="sectionSubHeaderStyle" />
                    </div>
                </Fade>
            </ContentWrapper>
            <ContentWrapper>
                <div className="productColumn">
                    <Fade left>
                        <ProductSectionWrapper>
                            <ProductIcon>
                                <Image src="/assets/image/icons/DecentralisedIcon.svg" alt="Decentralised" width={75} height={75} />
                            </ProductIcon>
                            <Text content="UTOPIA DECENTRALIZED EXCHANGE" />
                            <Text as="span" content="The Decentralised Exchange will allow seamless trading with minimal fees. " />
                            <Text className="highlightText" as="span" content="The exchange will include various tools including next gen charting, limit orders and more. " />
                            <Text as="span" content="Eventually we intend to have our own liquidity pools that will be directly linked to our launchpad, allowing easy token launches." />
                        </ProductSectionWrapper>
                    </Fade>
                    <Fade left delay={50}>
                        <ProductSectionWrapper>
                            <ProductIcon>
                                <Image src="/assets/image/icons/DefiIcon.svg" alt="Defi Crowdfunding tool" width={82} height={82} />
                            </ProductIcon>
                            <Text content="DEFI CROWDFUNDING TOOL" />
                            <Text as="span" content="Using our decentralised crowdfunding platform, " />
                            <Text className="highlightText" as="span" content="people will be able to use trustless smart contracts to fund charitable acts. " />
                            <Text as="span" content="In addition, the platform will hold users accountable for following through on their projects once successfully funded." />
                        </ProductSectionWrapper>
                    </Fade>
                    <Fade left delay={50}>
                        <ProductSectionWrapper>
                            <ProductIcon>
                                <Image src="/assets/image/icons/UtopiaWorld.svg" alt="Defi Crowdfunding tool" width={82} height={82} />
                            </ProductIcon>
                            <Text content="UTOPIA WORLD" />
                            <p>
                                <Text as="span" content="Utopia World will be " />
                                <Text className="highlightText" as="span" content="an NFT based decentralised game. " />
                                <Text as="span" content="It will be a metaverse where players can battle, build, earn and trade using avatar-based NFTs called Utopians." />
                            </p>
                            <p>
                                <Text as="span" content="The game will have a play to earn structure where players can have PVP battles with their Utopians to " />
                                <Text className="highlightText" as="span" content="earn tokens, buy land and sell their NFTs and other collectables " />
                                <Text as="span" content="on a dedicated marketplace for the game. Initially there will be an IGO (Initial Game Offering) to raise funds for development." />
                            </p>
                        </ProductSectionWrapper>
                    </Fade>
                </div>
                <div className="productColumn">
                    <Fade right>
                        <ProductSectionWrapper>
                            <ProductIcon>
                                <Image src="/assets/image/icons/LaunchpadIcon.svg" alt="Launch Pad" width={90} height={111} />
                            </ProductIcon>
                            <Text content="UTOPIA LAUNCHPAD" />
                            <Text as="span" content="This decentralised platform will provide new tokens the essential tools for conducting presales. " />
                            <Text className="highlightText" as="span" content="There will be multiple anti-bot features that will be implemented so that fair presales can be conducted. " />
                            <Text
                                as="span"
                                content="We will also have a whitelist presale feature that will be fully automated and will have anti-bot features to avoid bots submitting multiple times. The launchpad will eventually be directly linked to the exchange liquidity pool, allowing easy token launches."
                            />
                        </ProductSectionWrapper>
                    </Fade>
                    <Fade right delay={50}>
                        <ProductSectionWrapper>
                            <ProductIcon>
                                <Image src="/assets/image/icons/BTCBridgeIcon.svg" alt="BTC Utopia Bridge" width={89} height={37} />
                            </ProductIcon>
                            <Text content="BTC UTOPIA BRIDGE" />
                            <Text
                                as="span"
                                content="In order to further lower the barrier of entry to buy our token and to bring further utility to the platform, we will build a decentralized bridge in between BTC and UTOPIA. This bridge will "
                            />
                            <Text className="highlightText" as="span" content="allow users to go fluidly in between the 2 different blockchains." />
                        </ProductSectionWrapper>
                    </Fade>
                    <Fade right delay={50}>
                        <ProductSectionWrapper>
                            <ProductIcon>
                                <Image src="/assets/image/icons/DefiLendingProtocol.svg" alt="BTC Utopia Bridge" width={82} height={64} />
                            </ProductIcon>
                            <Text content="DEFI LENDING PROTOCOL" />
                            <Text as="span" content="Our DeFi lending platform will " />
                            <Text className="highlightText" as="span" content="allow users to become lenders and borrowers in a permissionless way using trustless smart contracts, " />
                            <Text
                                as="span"
                                content="while maintaining full custody of their crypto assets. This platform will also allow for DeFi margin trading and we will be able to introduce a leverage trading tool to our exchange."
                            />
                        </ProductSectionWrapper>
                    </Fade>
                </div>
            </ContentWrapper>
        </Container>
    </SectionWrapper>
)

export default PrivacyPortal
