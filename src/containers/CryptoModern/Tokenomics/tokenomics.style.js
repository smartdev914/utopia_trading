import styled from 'styled-components';
import { themeGet } from '@styled-system/theme-get';

const SectionWrapper = styled.div`
  background-color: #051557;
  padding: 75px 0 25px;
  position: relative;
  .sectionHeader {
    justify-content: center;
  }

  @media (max-width: 1600px) {
    padding: 80px 0 80px;
  }
  @media only screen and (max-width: 1366px) {
    padding: 30px 0;
  }
  @media only screen and (max-width: 667px) {
    padding: 30px 0 0;
  }
  .patternImg {
    position: absolute;
    left: -28%;
    top: -100%;
    width: 50%;
    @media only screen and (max-width: 1440px) {
      display: none;
    }
  }
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-around;

  .missionBlockItem {
    width: 300px;
    height: 300px;
    margin-bottom: 20px;

    img {
      width: 100px;
      height: 100px;
    }
  }

  .feature__block {
    position: relative;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    transition: all 0.3s ease;
    padding: 0 20px;
    cursor: pointer;
    border-radius: 50%;
    background: #152149;

    div {
      h2, p {
        color: rgba(142,199,255,0.502);
        padding: 0 20px;
      }
    }

    &:hover {
      background-image: linear-gradient(
        to bottom,
        transparent 50%,
        rgba(255, 255, 255, 0.031)
      );
    }
    @media (max-width: 500px) {
      padding: 15px 0;
      &:hover {
        background-image: none;
      }
    }
  }

  .image {
    width: 50%;
    @media only screen and (max-width: 991px) {
      width: 50%;
    }
    @media only screen and (max-width: 768px) {
      width: 100%;
      margin-bottom: 40px;
    }
    img {
      width: 100%;
      object-fit: cover;
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
