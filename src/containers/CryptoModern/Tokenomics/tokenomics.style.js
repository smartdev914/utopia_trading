import styled from 'styled-components'
import { themeGet } from '@styled-system/theme-get'

const SectionWrapper = styled.div`
    background-color: var(--tertiaryBackgroundColor);
    padding: 75px 0 100px;
    position: relative;

    .container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .sectionHeader {
        justify-content: center;
    }

    @keyframes utopiaCarThree {
        0% {
            left: 50px;
            top: -200px;
        }
        25% {
            left: 300px;
            top: -250px;
        }
        50% {
            transform: scaleX(-1) rotate(-10deg);
            left: 600px;
            top: -300px;
        }
        53% {
            transform: scaleX(1) rotate(-10deg);
        }
        75% {
            left: 300px;
            top: -250px;
        }
        97% {
            transform: scaleX(1) rotate(-10deg);
        }
        100% {
            transform: scaleX(-1) rotate(-10deg);
            left: 50px;
            top: -200px;
        }
    }

    .carThree {
        left: 50px;
        top: -200px;
        transform: scaleX(-1) rotate(-10deg);
        animation-name: utopiaCarThree;
        animation-duration: 7s;
        animation-iteration-count: infinite;
        animation-timing-function: linear;
    }

    @keyframes utopiaCarFour {
        0% {
            right: 0px;
            top: -100px;
        }
        25% {
            right: 150px;
            top: -50px;
        }
        50% {
            transform: scaleX(1);
            right: 400px;
            top: 0px;
        }
        53% {
            transform: scaleX(-1);
        }
        75% {
            right: 150px;
            top: -50px;
        }
        97% {
            transform: scaleX(-1);
        }
        100% {
            transform: scaleX(1);
            right: 0px;
            top: -100px;
        }
    }

    .carFour {
        top: 0px;
        right: 100px;
        animation-name: utopiaCarFour;
        animation-duration: 5s;
        animation-iteration-count: infinite;
        animation-timing-function: linear;
    }
`

export const TokenomicsNumber = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 350px;
    text-align: center;
    margin-bottom: 40px;

    .tokenomicsHeader {
        font-family: var(--fontNotoSans);
        font-size: 18px;
    }

    .tokenomicsValue {
        font-size: 36px;
        color: var(--tertiaryTextColor);
    }

    .tokenomicsDescription {
        font-family: var(--fontNotoSans);
        font-size: 14px;
        padding: 0 48px;
        line-height: 24px;
    }
`

export const TokenomicsHighlight = styled.div`
    background-color: #004fbf;
    display: flex;
    padding: 50px 70px;
    border-radius: 20px;
    position: relative;
    width: 800px;
    height: 219px;
    flex-wrap: wrap;

    @media (max-width: 768px) {
        width: 100%;
        height: unset;
        flex-direction: column;
    }

    .sectionHeader {
        font-size: 24px;
        font-weight: 700;
        color: var(--tertiaryTextColor);
        font-family: var(--fontDosis);
        letter-spacing: 4px;
    }

    .highlight {
        text-align: center;
        width: 25%;
        margin-bottom: 10px;
        z-index: 1;

        @media (max-width: 768px) {
            text-align: left;
        }

        p {
            font-family: var(--fontNotoSans);
        }

        p:first-child {
            margin-bottom: 0.25em;
        }
        .taxTitle {
            color: var(--tertiaryTextColor);
        }
    }
    .spaceNeedleOne,
    .spaceNeedleTwo,
    .spaceNeedleThree {
        position: absolute;
        z-index: 0;
    }

    .spaceNeedleOne {
        top: -228px;
        left: -25px;
        z-index: -1;
    }

    .spaceNeedleTwo {
        top: -174px;
        left: 0px;
        z-index: -1;
    }
    @media only screen and (min-width: 992px) {
        .spaceNeedleTwo {
            top: -190px;
            left: unset;
            right: 100px;
        }
        .spaceNeedleOne {
            top: -280px;
            left: 20px;
        }
    }

    .spaceNeedleThree {
        top: -250px;
        right: 0px;
    }
`

export const ContentWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: start;
    justify-content: space-evenly;
    position: relative;
    z-index: 1;

    &.tokenomicsHighlights {
        margin-top: 75px;
        z-index: 0;

        @media only screen and (min-width: 1140px) {
            width: 1350px;
        }
    }

    h2 {
        width: 800px;
        text-align: center;
        border-bottom: 1px solid var(--tertiaryTextColor);
        line-height: 0.1em;
        margin: 10px 0 20px;
    }

    .taxHeader {
        background: var(--tertiaryBackgroundColor);
        color: var(--tertiaryTextColor);
        font-family: var(--fontDosis);
        letter-spacing: 4px;
        font-size: 24px;
        font-weight: 600;
        padding: 0 10px;
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
`

export default SectionWrapper
