import styled from 'styled-components'

const SectionWrapper = styled.div`
    background-color: #004fbf;
    padding: 1rem;
    padding-top: 70px;
    overflow: hidden;
    @media (max-width: 1440px) {
    }
`

export const ContentWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: start;
    justify-content: space-around;
    text-align: center;

    @media (max-width: 768px) {
        h2 {
            font-size: 30px;
        }
    }

    .content {
        h2:nth-child(2) {
            font-size: 18px;
            letter-spacing: 0.2rem;
        }

        h2.sectionSubHeaderStyle {
            font-size: 18px;
        }

        @media only screen and (max-width: 768px) {
            margin-bottom: 50px;
        }
    }

    @media only screen and (max-width: 1254px) {
        .utopiaEcosystemLink {
            display: none;
        }
    }
`

export const ProductSectionWrapper = styled.div`
    margin-top: -5px;
    padding-top: 50px;
    border-radius: 20px;
    background-color: var(--primaryBackgroundColor);
    width: auto;
    margin-bottom: 150px;
    position: relative;
    font-family: var(--fontDosis);

    hr {
        height: 4px;
        color: var(--tertiaryTextColor);
        opacity: 1;
    }

    @media only screen and (min-width: 768px) {
        width: 600px;
    }

    p {
        font-size: 24px;
        font-weight: 600;
        letter-spacing: 0.25rem;
    }

    span,
    p > span {
        font-size: 20px;
        letter-spacing: initial;
        font-weight: 500;

        &.highlightText {
            color: var(--tertiaryTextColor);
            font-weight: 700;
        }
    }

    .productContent {
        padding: 20px 60px;

        @media only screen and (max-width: 768px) {
            padding: 10px 20px 0;
        }
    }

    .subheader {
        font-size: 18px;
        font-weight: 400;
        letter-spacing: 0px;
        margin-bottom: 30px;
    }

    .logoContainer {
        padding: 0 20px;
    }
`

export const ProductIcon = styled.div`
    flex-shrink: 0;
`

export const ProductItem = styled.div`
    display: flex;
    margin-bottom: 50px;

    @media only screen and (max-width: 768px) {
        margin-bottom: 0px;
    }

    h3 {
        font-family: var(--fontDosis);
        font-weight: 500;
        font-size: 28px;
    }

    span {
        font-size: 18px;
    }

    div {
        text-align: left;
    }

    .content {
        margin-left: 40px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    }
`

export default SectionWrapper
