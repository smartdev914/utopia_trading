import React from 'react';
import Text from 'common/components/Text';
import PropTypes from 'prop-types';
import Heading from 'common/components/Heading';
import Box from 'common/components/Box';
import Fade from 'react-reveal/Fade';
import Container from 'common/components/UI/Container';
import { TokenomicsData, TokenomicsTaxHightlights, TokenomicsWhaleHightlights } from 'common/data/CryptoModern';
import SectionWrapper, { ContentWrapper, TokenomicsHighlight, TokenomicsNumber } from './tokenomics.style';
import utopiaBuilding1 from '../../../common/assets/image/utoptia/utopiaBuilding1.svg';
import utopiaBuilding2 from '../../../common/assets/image/utoptia/utopiaBuilding2.svg';
import utopiaBuilding3 from '../../../common/assets/image/utoptia/utopiaBuilding3.svg';

const Tokenomics = ({
  sectionHeader, sectionSubTitle,
}) => (
  <SectionWrapper>
    <Container>
      <Fade up delay={50}>
        <Box {...sectionHeader} className="sectionHeader">
          <Heading content="TOKENOMICS" {...sectionSubTitle} />
        </Box>
      </Fade>
      <ContentWrapper>
        {TokenomicsData.map((feature, index) => (
          <Fade up delay={index * 50} key={feature.id}>
            <TokenomicsNumber>
              <Text className="tokenomicsHeader" content={feature.title} />
              <Text className="tokenomicsValue" content={feature.value} />
              {feature.description && <Text className="tokenomicsDescription" content={feature.description} />}
            </TokenomicsNumber>
          </Fade>
        ))}
      </ContentWrapper>
      <ContentWrapper className="tokenomicsHighlights">
        <Fade left delay={50}>
          <TokenomicsHighlight>
            <Text className="sectionHeader" content="TAX" />
            {TokenomicsTaxHightlights.map((highlight) => (
              <div className="highlight">
                <Text fontSize="36px" fontWeight="500" content={highlight.title} />
                <Text fontSize="20px" content={highlight.description} />
              </div>
            ))}
            <img src={utopiaBuilding1} alt="futuristic space needle building" className="spaceNeedleOne" />
            <div className="utopiaFlyingCarRight carThree" />

          </TokenomicsHighlight>
        </Fade>
        <Fade right delay={50}>
          <TokenomicsHighlight>
            <Text className="sectionHeader" content="ANTI WHALE/BOT FEATURE" />
            {TokenomicsWhaleHightlights.map((highlight) => (
              <div className="highlight">
                <Text fontSize="36px" fontWeight="500" content={highlight.title} />
                <Text fontSize="20px" content={highlight.description} />
              </div>
            ))}
            <img src={utopiaBuilding2} alt="futuristic space needle building" className="spaceNeedleTwo" />
            <img src={utopiaBuilding3} alt="futuristic space needle building" className="spaceNeedleThree" />
            <div className="utopiaFlyingCarLeft carFour" />

          </TokenomicsHighlight>
        </Fade>
      </ContentWrapper>
    </Container>
  </SectionWrapper>
);

Tokenomics.propTypes = {
  sectionHeader: PropTypes.object,
  sectionSubTitle: PropTypes.object,
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
    fontSize: ['28px', '36px', '36px', '36px'],
    fontWeight: '700',
  },
};

export default Tokenomics;
