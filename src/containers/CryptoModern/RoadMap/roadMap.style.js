import styled from 'styled-components'
import { themeGet } from '@styled-system/theme-get'

const SectionWrapper = styled.div`
    padding: 75px 0;
    position: relative;
    background-color: var(--tertiaryBackgroundColor);
    .sectionHeader {
        justify-content: center;
    }

    @keyframes utopiaCarOne {
        0% {
            right: 100px;
            top: 50px;
        }
        25% {
            right: 300px;
            top: 25px;
        }
        50% {
            transform: scaleX(1);
            right: 600px;
            top: 0px;
        }
        53% {
            transform: scaleX(-1);
        }
        75% {
            right: 300px;
            top: 25px;
        }
        97% {
            transform: scaleX(-1);
        }
        100% {
            transform: scaleX(1);
            right: 100px;
            top: 50px;
        }
    }

    .carOne {
        top: 50px;
        right: 100px;
        animation-name: utopiaCarOne;
        animation-duration: 5s;
        animation-iteration-count: infinite;
        animation-timing-function: linear;
    }

    @keyframes utopiaCarTwo {
        0% {
            left: 100px;
            top: -500px;
        }
        25% {
            left: 300px;
            top: -400px;
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
            top: -400px;
        }
        97% {
            transform: scaleX(1) rotate(-10deg);
        }
        100% {
            transform: scaleX(-1) rotate(-10deg);
            left: 100px;
            top: -500px;
        }
    }

    .carTwo {
        left: 100px;
        top: -500px;
        transform: scaleX(-1) rotate(-10deg);
        animation-name: utopiaCarTwo;
        animation-duration: 7s;
        animation-iteration-count: infinite;
        animation-timing-function: linear;
    }

    .backgroundContainer {
        z-index: 1;
        position: absolute;
        height: 664px;
        width: 100%;
        bottom: 0;
        left: 0;
    }

    .background {
        background: url('/assets/image/utopia/backgroundHill.svg') no-repeat;
        background-size: cover;
        background-position: top;
        width: 100%;
        height: 100%;
        position: relative;
        z-index: initial;

        .utopiaHouseOne {
            position: absolute;
            background: url('/assets/image/utopia/utopiaBuilding4.svg') no-repeat;
            width: 290px;
            height: 531px;
            top: -68%;
            left: -29%;
            z-index: -1;
        }

        .utopiaHouseTwo {
            position: absolute;
            background: url('/assets/image/utopia/utopiaBuilding5.svg') no-repeat;
            width: 161px;
            height: 287px;
            top: -17%;
            left: 60%;
            z-index: -1;
        }

        @media (min-width: 769px) {
            .utopiaHouseOne {
                top: -77%;
                left: -10%;
            }

            .utopiaHouseTwo {
                top: -37%;
                left: 17%;
            }
        }

        @media (min-width: 1170px) {
            .utopiaHouseOne {
                top: -75%;
                left: 2%;
            }

            .utopiaHouseTwo {
                top: -41%;
                left: 20%;
            }
        }

        @media (min-width: 1440px) {
            .utopiaHouseOne {
                top: -75%;
                left: 8%;
            }

            .utopiaHouseTwo {
                top: -41%;
                left: 24%;
            }
        }

        @media (min-width: 1800px) {
            .utopiaHouseOne {
                top: -75%;
                left: 11%;
            }

            .utopiaHouseTwo {
                top: -41%;
                left: 24%;
            }
        }
    }
`

export const ContentWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: flex-end;
    position: relative;
    z-index: 2;
    margin-left: 85px;
    font-family: var(--fontDosis);

    .quarterSection {
        padding-bottom: 60px;
        position: relative;
    }

    .quarterHeader {
        font-size: 24px;
        font-weight: 700;
    }

    .quarterTwoInnerDot {
        width: 20px;
        height: 20px;
        border: 13px solid var(--primaryTextColor);
        border-radius: 50%;
    }

    .quarterTwoOuterDot {
        position: absolute;
        top: -13px;
        left: -80px;
        border: 3px solid var(--primaryTextColor);
        border-radius: 50%;
        padding: 16px;
    }

    .quarterDot {
        position: absolute;
        border: 7.5px solid var(--primaryTextColor);
        border-radius: 50%;
        top: 12px;
        left: -55.5px;
    }

    .roadMapLine {
        position: absolute;
        left: -49px;
        top: 25px;
        border: 1px solid var(--primaryTextColor);
        height: 100%;
    }

    label {
        font-size: 18px;
    }

    .content {
        width: 40%;
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
            @media only screen and (max-width: 1440px) {
                font-size: 38px;
                margin-bottom: 15px;
            }
            @media only screen and (max-width: 768px) {
                font-size: 40px;
                max-width: 100%;
                text-align: center;
            }
            @media only screen and (max-width: 480px) {
                font-size: 30px;
            }
        }
        p {
            font-size: 16px;
            line-height: 28px;
            color: #496b96;
            max-width: 400px;
            @media only screen and (max-width: 768px) {
                max-width: 100%;
                text-align: center;
            }
        }
        img {
            margin-top: 50px;
            object-fit: cover;
            width: 100%;
            @media only screen and (max-width: 1440px) {
                margin-top: 30px;
            }
            @media only screen and (max-width: 1099px) {
                margin-top: 50px;
            }
        }
    }
`

export default SectionWrapper
