import styled from 'styled-components';

const FeatureSectionWrapper = styled.section`
  padding: 80px 0 180px 0;
  @media (max-width: 990px) {
    padding: 60px 0 60px 0;
  }
  @media (max-width: 767px) {
    padding: 60px 0 30px 0;
  }
  @media (max-width: 992px) {
    .row {
      justify-content: center;
    }

    .missionBlockItem {
      margin-left: 20px;
      margin-right: 20px;
    }
  }

  .sectionHeader {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    span {
      font-size: 60px;
      font-weight: 500;
      color: rgb(163,254,254);
    }

  }

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
`;

export default FeatureSectionWrapper;
