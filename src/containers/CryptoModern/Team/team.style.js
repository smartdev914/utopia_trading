import styled from 'styled-components';

const SectionWrapper = styled.div`
  background-color: #004FBF;
  padding: 75px 0;
  overflow: hidden;
  @media (max-width: 1440px) {
  }
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: start;
  justify-content: space-around;
  text-align: center;

  .content {
    h2:nth-child(2) {
      font-size: 18px;
      letter-spacing: 0.55rem;
    }

    @media only screen and (max-width: 768px) {
      margin-bottom: 50px;
    }
  }
`;

export const TeamMember = styled.div`
  width: 100%;

  @media only screen and (min-width: 768px) {
    width: 50%;
  }

  @media only screen and (min-width: 1170px) {
    width: 33%;
  }

  h4 {
    font-size: 28px;
  }
  p {
    font-size: 18px;
    font-weight: 500;
    color: var(--tertiaryTextColor);
  }
`;

export default SectionWrapper;
