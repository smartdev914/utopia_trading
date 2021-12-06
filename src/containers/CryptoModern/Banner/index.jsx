/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import React, { useState } from 'react'
import Fade from 'react-reveal/Fade'
import Text from 'common/components/Text'
import Image from 'next/image'
import Button from 'common/components/Button'
import Container from 'common/components/UI/Container'
import Link from 'next/link'

import { Modal } from 'react-bootstrap'
import BannerWrapper, { BannerContent, ButtonGroup } from './banner.style'

const copyToClipboard = () => {
    navigator.clipboard.writeText('0x1a1d7c7A92e8d7f0de10Ae532ECD9f63B7EAf67c')

    const tooltip = document.getElementById('myTooltip')
    tooltip.innerHTML = `Copied Address!`
}

const setClipboardTooltip = () => {
    const tooltip = document.getElementById('myTooltip')
    tooltip.innerHTML = 'Copy to clipboard'
}

const Banner = () => {
    const [showModal, setShowModal] = useState(false)

    return (
        <BannerWrapper id="home">
            <Container>
                <BannerContent>
                    <Fade up delay={50}>
                        <Image src="/assets/image/utopia/Utopia_dark_full.png" alt="Utopia Banner" width={1258} height={316} priority unoptimized />
                    </Fade>
                    <Fade up delay={100}>
                        <Text className="tagline" content="Built today, for a better tomorrow" />
                        {/* <Text as="span" className="contract-header" content="UTOPIA Contract:" />
                    <div className="tooltip">
                        <div role="button" className="contract-address" onClick={copyToClipboard} onMouseOut={setClipboardTooltip}>
                            <span className="tooltiptext" id="myTooltip">
                                Copy to clipboard
                            </span>
                            <Text as="span" className="highlight" content="(COMING SOON)" /> <Image src="/assets/image/icons/copyIcon2.png" width={20} height={20} />
                        </div>
                    </div> */}
                    </Fade>
                    <Fade up delay={150}>
                        <ButtonGroup>
                            <Link href="/exchange">
                                <Button className="text exchange" variant="textButton" title="EXCHANGE (beta)" />
                            </Link>
                            {/* <Link href="https://pancakeswap.finance/swap?outputCurrency=0x1a1d7c7A92e8d7f0de10Ae532ECD9f63B7EAf67c"> */}
                            <Button className="primary buy" title="BUY UTOPIA" onClick={() => setShowModal(true)} />
                            {/* </Link> */}
                        </ButtonGroup>
                        <Text as="p" content="Coming soon on Dec 15th." />
                    </Fade>
                </BannerContent>
            </Container>
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Release on Dec 15th!</Modal.Title>
                </Modal.Header>
                <Modal.Body>Our presale is scheduled for Dec 10th and Release is on the 15th! Stay tuned for more info! Join our Telegram group for most up to date information!</Modal.Body>
            </Modal>
        </BannerWrapper>
    )
}

export default Banner
