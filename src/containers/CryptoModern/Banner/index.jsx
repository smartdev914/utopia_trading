import React from 'react'
import Fade from 'react-reveal/Fade'
import Text from 'common/components/Text'
import Image from 'next/image'
import Button from 'common/components/Button'
import Container from 'common/components/UI/Container'
import Link from 'next/link'

import BannerWrapper, { BannerContent, ButtonGroup } from './banner.style'

const Banner = () => (
    <BannerWrapper id="home">
        <Container>
            <BannerContent>
                <Fade up delay={50}>
                    <Image src="/assets/image/utopia/Utopia_dark_full.png" alt="Utopia Banner" width={1258} height={316} priority unoptimized />
                </Fade>
                <Fade up delay={100}>
                    <Text className="tagline" content="Built today, for a better tomorrow" />
                </Fade>
                <Fade up delay={150}>
                    <ButtonGroup>
                        <Link href="/presale">
                            <Button className="text" variant="textButton" title="PRESALE" />
                        </Link>
                        <Link href="https://pancakeswap.finance/swap?outputCurrency=0x1a1d7c7A92e8d7f0de10Ae532ECD9f63B7EAf67c">
                            <Button className="primary" title="BUY UTOPIA" />
                        </Link>
                    </ButtonGroup>
                </Fade>
            </BannerContent>
        </Container>
    </BannerWrapper>
)

export default Banner
