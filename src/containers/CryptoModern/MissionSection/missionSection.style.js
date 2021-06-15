import styled from 'styled-components';

const MissionSectionWrapper = styled.section`
  padding-bottom: 180px;
  @media (max-width: 990px) {
    padding: 20px 0 20px 0;
  }
  @media (max-width: 767px) {
    padding: 60px 0 30px 0;
  }
  @media (max-width: 991px) {
    .row {
      justify-content: center;
    }

    .missionBlockItem {
      margin-left: 20px;
      margin-right: 20px;
    }
  }
  @media (min-width: 991px) {
    padding: 0 0 100px;
    .row {
      justify-content: space-around;
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
    width: 350px;
    height: 350px;
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
    justify-content: start;
    align-items: center;
    flex-direction: column;
    transition: all 0.3s ease;
    padding: 0 20px;
    cursor: pointer;
    border-radius: 50%;
    background: #1733AA;

    div {
      h2, p {
        color: var(--primaryColor);
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

export default MissionSectionWrapper;
