import styled from 'styled-components';

const SectionWrapper = styled.div`
  padding: 75px 0px;
  overflow: hidden;
  position: relative;

  h2 {
    text-align: center;
  }

  .container {
    display: flex;
    justify-content: center;
    padding: 0px 40px 0px 125px;

    @media only screen and (max-width: 768px) {
      padding: 0px 40px 0px 125px;
    }
  }

  .utopiaTree {
    position: absolute;
    bottom: 0;
    left: 5%;
    z-index: 0;

    @media only screen and (min-width: 2000px) {
      left: 15%;
    }
  }
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  flex-direction: column;
  max-width: 800px;
  font-family: var(--fontDosis);

  .content {
    margin-top: 80px;

    .stepWrapper {
      padding-bottom: 80px;
      position: relative;
      z-index: 1;
    }

    .step {
      font-size: 20px;
      font-weight: 700;
      color: var(--tertiaryTextColor)
    }

    .stepDesc {
      font-size: 20px;
      line-height: 35px;
    }

    .stepNumber {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      font-family: var(--fontOswald);
      color: var(--tertiaryTextColor);
      background-color: var(--secondaryBackgroundColor);
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 50px;
      font-weight: 300;
      position:absolute;
      left: -110px;
      top: 0;
      z-index: 1
    }

    .stepLine {
      position: absolute;
      left: -72px;
      top: 0;
      height: 100%;
      border: 2px dashed #2D75DC;
    }
  }
`;

export default SectionWrapper;
