import styled from 'styled-components';
import { themeGet } from '@styled-system/theme-get';
import backgroundHill from '../../../common/assets/image/utoptia/backgroundHill.svg';
import utopiaHouseOne from '../../../common/assets/image/utoptia/utopiaBuilding4.svg';
import utopiaHouseTwo from '../../../common/assets/image/utoptia/utopiaBuilding5.svg';

const SectionWrapper = styled.div`
  padding: 75px 0;
  position: relative;
  background-color: var(--tertiaryBackgroundColor);
  .sectionHeader {
    justify-content: center;
  }


  .backgroundContainer {
    z-index: 1;
    position: absolute;
    height: 664px;
    width: 100%;
    bottom: 0;
    left: 0;
  }

  .background {
    background: url(${backgroundHill}) no-repeat;
    background-size: cover;
    background-position: top;
    width: 100%;
    height: 100%;
    position: relative;
    z-index: initial;

    .utopiaHouseOne {
      position: absolute;
      background: url(${utopiaHouseOne}) no-repeat;
      width: 290px;
      height: 531px;
      top: -74%;
      left: -18%;
      z-index: -1;
    }

    .utopiaHouseTwo {
      position: absolute;
      background: url(${utopiaHouseTwo}) no-repeat;
      width: 161px;
      height: 287px;
      top: -34%;
      left: 20%;
      z-index: -1;
    }

    @media (min-width: 769px) {
      .utopiaHouseOne {
        top: -77%;
        left: -10%;
      }

      .utopiaHouseTwo {
        top: -37%;
        left: 17%;
      }
    }

    @media (min-width: 1170px) {
      .utopiaHouseOne {
        top: -75%;
        left: 2%;
      }

      .utopiaHouseTwo {
        top: -41%;
        left: 20%;
      }
    }

    @media (min-width: 1440px) {
      .utopiaHouseOne {
        top: -75%;
        left: 8%;
      }

      .utopiaHouseTwo {
        top: -41%;
        left: 24%;
      }
    }

    @media (min-width: 1800px) {
      .utopiaHouseOne {
        top: -75%;
        left: 11%;
      }

      .utopiaHouseTwo {
        top: -41%;
        left: 24%;
      }
    }
  }
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-end;
  position: relative;
  z-index: 2;
  margin-left: 85px;

  .quarterSection {
    padding-bottom: 60px;
    position: relative;
  }

  .quarterHeader {
    font-size: 24px;
    font-weight: 500;
  }

  .quarterTwoInnerDot {
    width: 20px;
    height: 20px;
    border: 13px solid var(--primaryTextColor);
    border-radius: 50%;
  }

  .quarterTwoOuterDot {
    position: absolute;
    top: -13px;
    left: -80px;
    border: 3px solid var(--primaryTextColor);
    border-radius: 50%;
    padding: 16px;
  }

  .quarterDot {
    position: absolute;
    border: 7.5px solid var(--primaryTextColor);
    border-radius: 50%;
    top: 15px;
    left: -54.5px;
  }

  .roadMapLine {
    position: absolute;
    left: -49px;
    top: 49px;
    border: 1px solid var(--primaryTextColor);
    height: 100%;

    &.last {
      height: calc(100% - 20px);
    }
  }


  .content {
    width: 40%;
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
      @media only screen and (max-width: 1440px) {
        font-size: 38px;
        margin-bottom: 15px;
      }
      @media only screen and (max-width: 768px) {
        font-size: 40px;
        max-width: 100%;
        text-align: center;
      }
      @media only screen and (max-width: 480px) {
        font-size: 30px;
      }
    }
    p {
      font-size: 16px;
      line-height: 28px;
      color: #496b96;
      max-width: 400px;
      @media only screen and (max-width: 768px) {
        max-width: 100%;
        text-align: center;
      }
    }
    img {
      margin-top: 50px;
      object-fit: cover;
      width: 100%;
      @media only screen and (max-width: 1440px) {
        margin-top: 30px;
      }
      @media only screen and (max-width: 1099px) {
        margin-top: 50px;
      }
    }
  }
`;

export default SectionWrapper;
