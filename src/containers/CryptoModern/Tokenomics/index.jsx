import React from 'react';
import Text from 'common/components/Text';
import PropTypes from 'prop-types';
import Heading from 'common/components/Heading';
import Box from 'common/components/Box';
import Image from 'common/components/Image';
import Fade from 'react-reveal/Fade';
import Container from 'common/components/UI/Container';
import GraphImg from 'common/assets/image/cryptoModern/graph.png';
import dummyImg from 'common/assets/image/cryptoModern/pattern.png';
import { TokenomicsData } from 'common/data/CryptoModern';
import FeatureBlock from 'common/components/FeatureBlock';
import SectionWrapper, { ContentWrapper } from './tokenomics.style';

const Tokenomics = ({
  sectionHeader, sectionSubTitle, blockWrapperStyle, contentStyle, featureTitle, featureDescription,
}) => (
  <SectionWrapper>
    <Container>
      <Fade up delay={100}>
        <Box {...sectionHeader} className="sectionHeader">
          <Heading content="TOKENOMICS" {...sectionSubTitle} />
        </Box>
      </Fade>
      <ContentWrapper>
        {TokenomicsData.map((feature, index) => (
          <Fade up delay={index * 100} key={feature.id}>
            <Box className="col missionBlockItem">
              <FeatureBlock
                icon={<img src={feature.icon} alt="utopia icon" />}
                wrapperStyle={blockWrapperStyle}
                contentStyle={contentStyle}
                title={<Heading content={feature.title} {...featureTitle} />}
                description={
                  <Text content={feature.description} {...featureDescription} />
                  }
                className="cryptoFeature"
              />
            </Box>
          </Fade>
        ))}
        <div className="content">
          <Text content="Lorem ipsum dolor sit amet consectetur adipisicing elit sed eiu Lorem ipsum dolor sit amet consectetur adipisicing elit sed eiu. Lorem ipsum dolor sit amet consectetur adipisicing elit sed eiu Lorem ipsum dolor sit amet consectetur adipisicing elit sed eiu" />
        </div>
        <div className="image">
          <Image src={GraphImg} alt="Graph Image" />
        </div>
      </ContentWrapper>
    </Container>
    <Image className="patternImg" src={dummyImg} alt="pattern Image" />
  </SectionWrapper>
);

Tokenomics.propTypes = {
  sectionHeader: PropTypes.object,
  blockWrapperStyle: PropTypes.object,
  contentStyle: PropTypes.object,
  sectionSubTitle: PropTypes.object,
  featureTitle: PropTypes.object,
  featureDescription: PropTypes.object,
};

Tokenomics.defaultProps = {
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
    letterSpacing: '0.65rem',
    mb: '15px',
    fontSize: '36px',
    fontWeight: '700',
    color: 'var(--primaryColor)',
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
    fontSize: ['18px', '20px'],
    fontWeight: '400',
    color: '#fff',
    lineHeight: '1.5',
    mb: ['10px', '10px', '10px', '15px'],
    letterSpacing: '-0.025em',
    mt: ['15px', '15px', '15px', '25px'],
  },
  // feature description default style
  featureDescription: {
    fontSize: '15px',
    lineHeight: '1.6',
    color: 'rgba(142, 199, 255, 0.502)',
  },
};

export default Tokenomics;
