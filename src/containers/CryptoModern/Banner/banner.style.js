import styled from 'styled-components';
import { themeGet } from '@styled-system/theme-get';

const BannerWrapper = styled.div`
  padding-top: 100px;
  min-height: 802px;
  overflow: hidden;
  text-align: center;

  @media only screen and (min-width: 1201px) and (max-width: 1440px) {
    min-height: 90vh;
  }
  @media only screen and (max-width: 1099px) {
    padding-top: 120px;
    min-height: 100%;
  }
  @media only screen and (max-width: 480px) {
    padding-top: 120px;
    min-height: 100%;
  }
  > div.container {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: calc(802px - 100px);
    @media only screen and (min-width: 1201px) and (max-width: 1440px) {
      min-height: 100%;
    }
    @media only screen and (max-width: 1099px) {
      min-height: 100%;
    }
    @media only screen and (max-width: 480px) {
      flex-wrap: wrap;
      min-height: 100%;
    }
  }
`;

export const BannerContent = styled.div`
  width: 100%;
  margin-top: 60px;
  @media only screen and (max-width: 991px) {
    flex-shrink: 0;
    max-width: 360px;
  }

  h1 {
    font-size: 48px;
    line-height: 1.25;
    font-weight: 400;
    color: ${themeGet('colors.menu', '#0D233E')};
    margin-bottom: 24px;
    letter-spacing: 0.5em;

    @media only screen and (min-width: 992px) {
      font-size: 125px;
      letter-spacing: 25px;
      margin-bottom: 20px;
    }
  }

  p {
    color: var(--primaryColor);
    font-size: 18px;
    line-height: 33px;
    font-weight: 400;

    @media only screen and (min-width: 992px) {
      font-size: 26px;
    }
  }
`;

export const ButtonGroup = styled.div`
  margin-top: 75px;
  display: flex;
  justify-content: center;

  a:first-child {
    margin-left: 0;
  }

  .reusecore__button {
    width: 250px;
    text-transform: inherit;
    border-radius: 10px;
    padding-left: 16px;
    padding-right: 16px;
    font-size: 20px;
    font-weight: 500;
    text-transform: uppercase;

    &.primary {
      color: var(--backgroundColor);
      background-color: #00DEE6;
      &:hover {
        box-shadow: #00DEE6 0px 0px 24px 5px;
      }
    }

    &.text {
      margin-right: 15px;
      color: #00DEE6;
      border: 2px solid #00DEE6;
      &:hover {
        box-shadow: #00DEE6 0px 0px 24px 5px;
      }
    }
  }
`;

export default BannerWrapper;
