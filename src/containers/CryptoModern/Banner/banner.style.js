import styled from 'styled-components'
import { themeGet } from '@styled-system/theme-get'

const BannerWrapper = styled.div`
    padding: 80px 0;
    min-height: 802px;
    overflow: hidden;
    text-align: center;

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
        max-width: 360px;
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
        font-size: 48px;
        font-weight: 500;

        @media only screen and (max-width: 992px) {
            font-size: 26px;
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
