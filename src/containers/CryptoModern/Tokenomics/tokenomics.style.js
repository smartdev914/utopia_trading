import styled from 'styled-components';
import { themeGet } from '@styled-system/theme-get';

const SectionWrapper = styled.div`
  background-color: #051557;
  padding: 75px 0 100px;
  position: relative;

  .container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .sectionHeader {
    justify-content: center;
  }

`;

export const TokenomicsNumber = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 350px;
  text-align: center;
  margin-bottom: 40px;

  .tokenomicsHeader {
    font-size: 20px;
    color: var(--primaryColor);
  }

  .tokenomicsValue {
    font-size: 36px;
    color: var(--tertiaryTextColor);
  }

  .tokenomicsDescription {
    font-size: 16px;
    color: var(--primaryColor);
  }
`;

export const TokenomicsHighlight = styled.div`
  background-color: #004FBF;
  display: flex;
  flex-direction: column;
  padding: 50px 70px;
  border-radius: 20px;
  color: var(--primaryColor);
  position: relative;

  .sectionHeader {
    font-size: 24px;
    font-weight: 500;
    color: var(--tertiaryTextColor);
  }

  .highlight {
    margin-bottom: 30px;
    z-index: 1;

    p:first-child {
      margin-bottom: 0.25em;
    }
  }
  .spaceNeedleOne,
  .spaceNeedleTwo,
  .spaceNeedleThree {
    position: absolute;
    z-index: 0;
  }

  .spaceNeedleOne {
    top: -280px;
    left: 20px;
  }

  .spaceNeedleTwo {
    top: -190px;
    right: 100px;
  }

  .spaceNeedleThree {
    top: -250px;
    right: 0px;
  }
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: start;
  justify-content: space-evenly;
  position: relative;
  z-index: 1;

  &.tokenomicsHighlights {
    margin-top: 75px;
    z-index: 0;

    > div:nth-child(2) {
      margin-top: 50px;
    }

    @media only screen and (min-width: 1140px) {
      width: 1250px;
    }
  }

  .content {
    width: 50%;
    @media only screen and (max-width: 991px) {
      width: 50%;
    }
    @media only screen and (max-width: 768px) {
      width: 100%;
      margin-bottom: 50px;
    }
    h2 {
      color: ${themeGet('colors.white', 'fff')};
      font-size: 48px;
      line-height: 1.2;
      font-weight: 300;
      letter-spacing: -0.025em;
      margin-bottom: 27px;
      max-width: 370px;
      @media only screen and (max-width: 1440px) {
        font-size: 38px;
      }
      @media only screen and (max-width: 768px) {
        max-width: 100%;
        text-align: center;
      }
      @media only screen and (max-width: 480px) {
        font-size: 30px;
      }
    }
    p {
      font-size: 20px;
      line-height: 28px;
      color: #496b96;
      max-width: 400px;
      @media only screen and (max-width: 768px) {
        max-width: 100%;
        text-align: center;
      }
    }
  }
`;

export default SectionWrapper;
