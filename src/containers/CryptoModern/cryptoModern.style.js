import styled, { createGlobalStyle } from 'styled-components';
import { themeGet } from '@styled-system/theme-get';
import emptyCheckbox from '../../../public/assets/image/cryptoModern/EmptyCheckbox.svg';
import filledCheckbox from '../../../public/assets/image/cryptoModern/FilledCheckbox.svg';
import utopiaFlyingCar from '../../../public/assets/image/utoptia/utopiaFlyingCar.svg';

const GlobalStyle = createGlobalStyle`
  :root {
    --fontSyncopate: 'Syncopate', sans-serif;
    --fontOswald: 'Oswald', sans-serif;
    --fontDosis: 'Dosis', sans-serif;
    --fontNotoSans: 'Noto Sans', sans-serif;

    --primaryBackgroundColor: #1B003B;
    --secondaryBackgroundColor: #1733AA;
    --tertiaryBackgroundColor: #051557;
    --primaryTextColor: #A3FFFF;
    --tertiaryTextColor: #F9DF00;
  }

  body {
    font-family: var(--fontOswald);
    background: var(--primaryBackgroundColor);
    font-size: 16px;
  }
  .reuseModalParentWrapper,
  .reuseModalOverlay {
    z-index: 99999;
    .reuseModalHolder{
      border: 0;
    }
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6
  {
    font-family: var(--fontSyncopate);
  }
  span,
  div,
  p
  {
    color: var(--primaryTextColor);
  }
  input[type="checkbox"] {
    width: 16px;
    height: 16px;
    margin-right: 10px;
    -webkit-appearance: none;
    -moz-appearance: none;
    -o-appearance: none;
    appearance: none;


    &:before {
      width: 16px;
      height: 16px;
      content: "";
      display: inline-block;
      background: url(${emptyCheckbox})
    }

    &:checked:before {
      width: 16px;
      height: 16px;
      content: "";
      display: inline-block;
      background: url(${filledCheckbox})
    }
  }

  .WhitePaper {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 90%;
    opacity: 0.9;
    z-index: 10;
  }

  .checkbox {
    display: flex;
    align-items: center;
    justify-content: start;
    position: relative;
  }

  section {
    position: relative;
  }

  button {
    font-family: var(--fontNotoSans);
  }
  .reusecore__button {
    font-weight: 500;
  }
  .link {
    display: inline-block;
    color: var(--tertiaryTextColor);
    text-decoration: underline;
  }
  .sectionHeaderStyle {
    font-weight: 700;
    font-size: 36px;
    letter-spacing: 0.65rem;
    color: var(--primaryTextColor)
  }

  .utopiaFlyingCarLeft {
    position: absolute;
    background: url(${utopiaFlyingCar}) no-repeat;
    background-size: contain;
    width: 60px;
    height: 23px;
  }

  .utopiaFlyingCarRight {
    position: absolute;
    background: url(${utopiaFlyingCar}) no-repeat;
    background-size: contain;
    width: 60px;
    height: 23px;
    transform: scaleX(-1);
  }

  .react-pdf__Document {
    position: relative;
    display: flex;
    top: 15vh;
    flex-direction: column;
    align-items: center;
    height: 80vh;
    overflow: scroll;
  }

  .pdfViewer {
    position: fixed;
    height: 100vh;
    top: 0;
    width: 100%;
    z-index: 100;
  }

  .whitePaperContainer {
    position: relative;
  }

  .greyedBackground {
    position: fixed;
    top: 0;
    width: 100%;
    height: 100vh;
    background: rgba(255, 255, 255, 0.5);
  }

  .closeButton {
    position: absolute;
    z-index: 1;
    top: 10vh;
    left: 50%;
    transform: translateX(-50%);
  }

  @media only screen and (max-width: 667px) {
    .container {
      width: 100%;
    }
  }
  @media only screen and (max-width: 667px) {
    .container {
      padding-left: 20px;
      padding-right: 20px;
    }
  }
  @media only screen and (width: 320px) {
    .container {
      padding-left: 15px;
      padding-right: 15px;
    }
  }
`;

export const CryptoWrapper = styled.div`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  .sticky-active {
    .navbar {
      padding: 20px 0 21px;
      background-color: var(--tertiaryBackgroundColor);
      background-image: none;
      box-shadow: 0px 3px 8px 0px rgba(43, 83, 135, 0.08);
      @media only screen and (max-width: 1366px) {
        padding: 5px 0 5px;
      }
      .main-logo {
        display: none;
      }
      .logo-alt {
        display: block;
      }
      .mobile-menu {
        top: 72px;
      }
      ul {
        li {
          a {
            color: ${themeGet('colors.secondary', '#000')};
            font-size: 16px;
            font-weight: 400;
            transition: all 0.3s ease;
            &:hover {
              color: ${themeGet('colors.menuHoverColor', '#03103b')};
            }
          }
          &.is-current {
            a {
              color: ${themeGet('colors.menuHoverColor', '#03103b')};
            }
          }
        }
      }
      .reusecore__button {
        &.menubar {
          color: ${themeGet('colors.secondary', '#000')};
        }
        &.text {
          color: ${themeGet('colors.secondary', '#000')};
          .btn-icon {
            svg {
              stroke: ${themeGet('colors.secondary', '#000')};
            }
          }
          @media only screen and (max-width: 991px) {
          }
        }
      }
    }
  }
`;

export const ContentWrapper = styled.div`
  flex: 1 0 auto;
  width: 100%;
  overflow: hidden;
`;

export const SectionHeader = styled.header`
  max-width: 352px;
  width: 100%;
  margin: 0 auto 58px;
  text-align: center;
  @media only screen and (max-width: 991px) {
    margin-bottom: 50px;
  }
  h5 {
    font-size: 14px;
    font-weight: 700;
    line-height: 24px;
    margin-bottom: 12px;
    letter-spacing: 1.5px;
    color: ${themeGet('colors.primary', '#2563FF')};
    text-transform: uppercase;
    @media only screen and (max-width: 991px) {
      font-size: 13px;
      margin-bottom: 10px;
    }
  }
  h2 {
    font-size: 30px;
    line-height: 36px;
    font-weight: 700;
    color: ${themeGet('colors.headingColor', '#0F2137')};
    margin: 0;
    letter-spacing: -1px;
    @media only screen and (max-width: 1366px) {
      font-size: 28px;
      letter-spacing: -0.7px;
    }
    @media only screen and (max-width: 991px) {
      font-size: 26px;
      line-height: 38px;
      letter-spacing: -0.5px;
    }
  }
`;

export default GlobalStyle;
