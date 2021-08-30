import React from 'react'
import PropTypes from 'prop-types'
import Fade from 'react-reveal/Fade'
import Box from 'common/components/Box'
import Text from 'common/components/Text'
import Heading from 'common/components/Heading'
import FeatureBlock from 'common/components/FeatureBlock'
import { MissionData } from 'common/data/CryptoModern'
import Container from 'common/components/UI/Container'
import MissionSectionWrapper from './missionSection.style'

const MissionSection = ({ row, sectionHeader, sectionSubTitle, featureTitle, featureDescription, contentStyle, blockWrapperStyle }) => (
    <MissionSectionWrapper id="key-features">
        <Container>
            <Fade up delay={100}>
                <Box {...sectionHeader} className="sectionHeader">
                    <Heading content="MISSION" {...sectionSubTitle} />
                </Box>
            </Fade>
            <Box className="missionRow" {...row}>
                {MissionData.map((feature, index) => (
                    <Fade up delay={index * 100} key={feature.id}>
                        <Box className="col missionBlockItem">
                            <FeatureBlock
                                icon={feature.icon}
                                wrapperStyle={blockWrapperStyle}
                                contentStyle={contentStyle}
                                title={<Text content={feature.title} {...featureTitle} />}
                                description={<Text content={feature.description} {...featureDescription} />}
                                className="cryptoFeature"
                            />
                        </Box>
                    </Fade>
                ))}
            </Box>
        </Container>
    </MissionSectionWrapper>
)

// MissionSection style props
MissionSection.propTypes = {
    sectionHeader: PropTypes.object,
    row: PropTypes.object,
    col: PropTypes.object,
    blockWrapperStyle: PropTypes.object,
    contentStyle: PropTypes.object,
    sectionTitle: PropTypes.object,
    sectionSubTitle: PropTypes.object,
    featureTitle: PropTypes.object,
    featureDescription: PropTypes.object,
}

// MissionSection default style
MissionSection.defaultProps = {
    // section header default style
    sectionHeader: {
        mb: ['40px', '40px', '40px', '80px'],
        display: 'flex',
        width: '100%',
    },
    // sub section default style
    sectionSubTitle: {
        as: 'h2',
        display: 'block',
        textAlign: 'center',
        fontSize: ['36px', '36px'],
        fontWeight: '700',
        letterSpacing: '0.65rem',
        color: '#2D75DC',
        mb: '15px',
    },
    // section title default style
    sectionTitle: {
        textAlign: 'center',
        fontSize: ['14px', '16px'],
        fontWeight: '400',
        color: '#496b96',
        mb: '0',
        maxWidth: '420px',
        lineHeight: '1.5',
    },
    // feature row default style
    row: {
        flexBox: true,
        flexWrap: 'wrap',
    },
    // feature col default style
    col: {
        width: [1, 1 / 2, 1 / 4, 1 / 4],
    },
    // feature block wrapper default style
    blockWrapperStyle: {
        p: ['30px', '20px', '20px', '20px'],
    },

    // feature content default style
    contentStyle: {
        textAlign: 'center',
    },
    // feature title default style
    featureTitle: {
        fontSize: ['24px'],
        fontWeight: '600',
        lineHeight: '1.5',
        mb: ['10px', '10px', '10px', '15px'],
        letterSpacing: '0.3rem',
    },
    // feature description default style
    featureDescription: {
        fontSize: '18px',
        lineHeight: '1.6',
    },
}

export default MissionSection
