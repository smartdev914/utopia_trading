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
    .missionRow {
      justify-content: center;
    }

    .missionBlockItem {
      margin-left: 20px;
      margin-right: 20px;
    }
  }
  @media (min-width: 991px) {
    padding: 0 0 100px;
    .missionRow {
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
    }

  }

  .missionBlockItem {
    width: 350px;
    height: 350px;
    margin-bottom: 20px;
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
    background: var(--secondaryBackgroundColor);
    font-family: var(--fontDosis);

    .icon__wrapper {
      margin-top: 20px;
    }

    div {
      h2, p {
        padding: 0 30px;
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
