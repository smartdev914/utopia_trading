import React from 'react';
import Text from 'common/components/Text';
import Heading from 'common/components/Heading';
import Image from 'common/components/Image';
import Fade from 'react-reveal/Fade';
import Box from 'common/components/Box';
import Container from 'common/components/UI/Container';
import FundGraphImg from 'common/assets/image/cryptoModern/fund-graph.png';
import GraphFeatureImg from 'common/assets/image/cryptoModern/graph-feature.png';
import PropTypes from 'prop-types';
import SectionWrapper, { ContentWrapper } from './roadMap.style';

const RoadMap = ({ sectionHeader, sectionSubTitle }) => (
  <SectionWrapper id="fund">
    <Container>
      <Fade up delay={100}>
        <Box {...sectionHeader} className="sectionHeader">
          <Text content="Road Map" {...sectionSubTitle} />
        </Box>
      </Fade>
      <ContentWrapper>
        <Fade up delay={100}>
          <div className="image">
            <Image src={FundGraphImg} alt="Graph Image" />
          </div>
          <div className="content">
            <Heading content="Fund raising allocation" />
            <Text content="Lorem ipsum dolor sit amet consectetur adipisicing elit sed eiu Lorem ipsum dolor sit ." />
            <Image src={GraphFeatureImg} alt="Graph Feature Image" />
          </div>
          <div className="gradientDiv"> </div>
        </Fade>
      </ContentWrapper>
    </Container>
  </SectionWrapper>
);

RoadMap.propTypes = {
  sectionHeader: PropTypes.object,
  sectionSubTitle: PropTypes.object,
};

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
    as: 'span',
    display: 'block',
    textAlign: 'center',
    letterSpacing: '-0.025em',
    mb: '15px',
    fontSize: '60px',
    fontWeight: '500',
    color: 'rgb(163,254,254)',
  },
};

export default RoadMap;
