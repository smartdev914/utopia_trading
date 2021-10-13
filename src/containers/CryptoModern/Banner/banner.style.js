import styled from 'styled-components'
import { themeGet } from '@styled-system/theme-get'

const BannerWrapper = styled.div`
    padding: 80px 0;
    min-height: 802px;
    overflow: hidden;
    text-align: center;

    .contract-header,
    .contract-address {
        font-family: var(--fontDosis);
        font-size: 20px;
    }
    .contract-address {
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;

        span {
            margin-bottom: 0;
            margin-right: 5px;
        }
    }

    .tooltip {
        position: relative;
        display: inline-block;
    }

    .tooltip .tooltiptext {
        visibility: hidden;
        width: 100px;
        font-size: 12px;
        background-color: #555;
        color: #fff;
        text-align: center;
        border-radius: 6px;
        padding: 5px;
        position: absolute;
        z-index: 1;
        bottom: 150%;
        right: -46px;
        opacity: 0;
        -webkit-transition: opacity 0.3s;
        transition: opacity 0.3s;
    }

    .tooltip .tooltiptext::after {
        content: '';
        position: absolute;
        top: 100%;
        left: 50%;
        margin-left: -5px;
        border-width: 5px;
        border-style: solid;
        border-color: #555 transparent transparent transparent;
    }

    .tooltip:hover .tooltiptext {
        visibility: visible;
        opacity: 1;
    }

    @media only screen and (min-width: 1201px) and (max-width: 1440px) {
        min-height: 90vh;
    }
    @media only screen and (max-width: 1099px) {
        padding-top: 120px;
        padding-bottom: 150px;
        min-height: 100%;
    }
    @media only screen and (max-width: 480px) {
        padding-top: 120px;
        padding-bottom: 180px;
        min-height: 100%;

        .contract-header,
        .contract-address {
            font-size: 16px;
        }
    }
    > div.container {
        display: flex;
        align-items: center;
        justify-content: center;

        @media only screen and (min-width: 1201px) and (max-width: 1440px) {
            min-height: 100%;
        }
        @media only screen and (max-width: 1099px) {
            min-height: 100%;
        }
        @media only screen and (max-width: 480px) {
            flex-wrap: wrap;
            min-height: 100%;
        }
    }
`

export const BannerContent = styled.div`
    width: 100%;
    margin-top: 60px;
    @media only screen and (max-width: 991px) {
        flex-shrink: 0;
        max-width: 500px;
    }

    h1 {
        font-size: 48px;
        line-height: 1.25;
        font-weight: 400;
        color: ${themeGet('colors.menu', '#0D233E')};
        margin-bottom: 24px;
        letter-spacing: 0.5em;

        @media only screen and (min-width: 992px) {
            font-size: 125px;
            letter-spacing: 25px;
            margin-bottom: 20px;
        }
    }

    p {
        font-size: 18px;
        font-weight: 400;

        @media only screen and (min-width: 992px) {
            font-size: 26px;
        }
    }

    .tagline {
        font-family: var(--fontDosis);
        font-size: 19px;
        font-weight: 500;

        @media only screen and (min-width: 992px) {
            font-size: 40px;
        }
    }
`

export const ButtonGroup = styled.div`
    margin-top: 75px;
    display: flex;
    justify-content: center;

    a:first-child {
        margin-left: 0;
    }

    .reusecore__button.text.exchange {
        border: 2px solid #f9df00;
        &:hover {
            box-shadow: #ffef6a 0px 0px 24px 5px;
        }
        span {
            color: #ffef6a;
        }
    }

    .reusecore__button {
        width: 250px;
        text-transform: inherit;
        border-radius: 10px;
        padding-left: 16px;
        padding-right: 16px;
        font-size: 16px;
        font-weight: 500;
        text-transform: uppercase;

        &.primary {
            color: var(--primaryBackgroundColor);
            background-color: #00dee6;
            &:hover {
                box-shadow: #00dee6 0px 0px 24px 5px;
            }

            span {
                color: var(--primaryBackgroundColor);
            }
        }

        &.text {
            margin-right: 15px;
            color: #00dee6;
            border: 2px solid #00dee6;
            &:hover {
                box-shadow: #00dee6 0px 0px 24px 5px;
            }
        }

        @media only screen and (min-width: 992px) {
            font-size: 20px;
        }
    }
`

export default BannerWrapper
