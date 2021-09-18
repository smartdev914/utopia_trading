import React from 'react'
import Text from 'common/components/Text'
import Fade from 'react-reveal/Fade'
import Box from 'common/components/Box'
import Container from 'common/components/UI/Container'
import PropTypes from 'prop-types'
import { FutureRoadMap, Q2RoadMap, Q3RoadMap, Q4RoadMap } from 'common/data/CryptoModern'
import Heading from 'common/components/Heading'
import SectionWrapper, { ContentWrapper } from './roadMap.style'

const RoadMap = ({ sectionHeader, sectionSubTitle }) => (
    <SectionWrapper id="fund">
        <Container>
            <Fade up delay={100}>
                <Box {...sectionHeader} className="sectionHeader">
                    <Heading content="ROAD MAP" {...sectionSubTitle} />
                </Box>
            </Fade>
            <ContentWrapper>
                <div className="content">
                    <div className="utopiaFlyingCarLeft carOne" />
                    <Fade down delay={300}>
                        <div className="quarterSection quarterTwo">
                            <Fade clear delay={1000}>
                                <Text className="quarterHeader" as="div" content="Q3 / LAUNCH" />
                                {Q2RoadMap.filter((item) => item.checked).map((roadMapItem) => (
                                    <div key={roadMapItem.id} className="checkbox">
                                        <input type="checkbox" id={roadMapItem.id} checked disabled />
                                        <label htmlFor={roadMapItem.id}>{roadMapItem.label}</label>
                                    </div>
                                ))}
                                {Q2RoadMap.filter((item) => !item.checked).map((roadMapItem) => (
                                    <div key={roadMapItem.id} className="checkbox">
                                        <input type="checkbox" id={roadMapItem.id} disabled />
                                        <label htmlFor={roadMapItem.id}>{roadMapItem.label}</label>
                                    </div>
                                ))}
                                <div className="roadMapLine" />
                            </Fade>
                            <div className="quarterTwoOuterDot">
                                <div className="quarterTwoInnerDot" />
                            </div>
                        </div>
                    </Fade>
                    <Fade down delay={300}>
                        <div className="quarterSection quarterThree">
                            <Fade clear delay={1000}>
                                <Text className="quarterHeader" as="div" content="Q4 2021" />
                                {Q3RoadMap.filter((item) => item.checked).map((roadMapItem) => (
                                    <div key={roadMapItem.id} className="checkbox">
                                        <input type="checkbox" id={roadMapItem.id} checked disabled />
                                        <label htmlFor={roadMapItem.id}>{roadMapItem.label}</label>
                                    </div>
                                ))}
                                {Q3RoadMap.filter((item) => !item.checked).map((roadMapItem) => (
                                    <div key={roadMapItem.id} className="checkbox">
                                        <input type="checkbox" id={roadMapItem.id} disabled />
                                        <label htmlFor={roadMapItem.id}>{roadMapItem.label}</label>
                                    </div>
                                ))}
                                <div className="roadMapLine" />
                            </Fade>
                            <div className="quarterDot" />
                        </div>
                    </Fade>
                    <Fade down delay={300}>
                        <div className="quarterSection quarterFour">
                            <Fade clear delay={1000}>
                                <Text className="quarterHeader" as="div" content="Q1 2022" />
                                {Q4RoadMap.filter((item) => item.checked).map((roadMapItem) => (
                                    <div key={roadMapItem.id} className="checkbox">
                                        <input type="checkbox" id={roadMapItem.id} checked disabled />
                                        <label htmlFor={roadMapItem.id}>{roadMapItem.label}</label>
                                    </div>
                                ))}
                                {Q4RoadMap.filter((item) => !item.checked).map((roadMapItem) => (
                                    <div key={roadMapItem.id} className="checkbox">
                                        <input type="checkbox" id={roadMapItem.id} disabled />
                                        <label htmlFor={roadMapItem.id}>{roadMapItem.label}</label>
                                    </div>
                                ))}
                                <div className="roadMapLine last" />
                            </Fade>
                            <div className="quarterDot" />
                        </div>
                    </Fade>
                    <Fade down delay={300}>
                        <div className="quarterSection futureQuarter">
                            <Fade clear delay={1000}>
                                <Text className="quarterHeader" as="div" content="FUTURE" />
                                {FutureRoadMap.filter((item) => item.checked).map((roadMapItem) => (
                                    <div key={roadMapItem.id} className="checkbox">
                                        <input type="checkbox" id={roadMapItem.id} checked disabled />
                                        <label htmlFor={roadMapItem.id}>{roadMapItem.label}</label>
                                    </div>
                                ))}
                                {FutureRoadMap.filter((item) => !item.checked).map((roadMapItem) => (
                                    <div key={roadMapItem.id} className="checkbox">
                                        <input type="checkbox" id={roadMapItem.id} disabled />
                                        <label htmlFor={roadMapItem.id}>{roadMapItem.label}</label>
                                    </div>
                                ))}
                            </Fade>
                            <div className="quarterDot" />
                        </div>
                    </Fade>
                </div>
            </ContentWrapper>
            <div className="backgroundContainer">
                <div className="background">
                    <div className="utopiaHouseOne" />
                    <div className="utopiaHouseTwo" />
                    <div className="utopiaFlyingCarRight carTwo" />
                </div>
            </div>
        </Container>
    </SectionWrapper>
)

RoadMap.propTypes = {
    sectionHeader: PropTypes.object,
    sectionSubTitle: PropTypes.object,
}

RoadMap.defaultProps = {
    // section header default style
    sectionHeader: {
        mb: ['40px', '40px', '40px', '80px'],
        display: 'flex',
        width: '100%',
        textAlign: 'center',
    },
    // sub section default style
    sectionSubTitle: {
        as: 'h2',
        display: 'block',
        textAlign: 'center',
        fontSize: ['36px', '36px'],
        fontWeight: '700',
        letterSpacing: '0.65rem',
        mb: '15px',
    },
}

export default RoadMap
