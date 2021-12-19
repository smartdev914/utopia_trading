import styled from 'styled-components'

const ComponentWrapper = styled.div`
    position: relative;
    width: 375px;
    flex-shrink: 0;

    @media only screen and (max-width: 768px) {
        margin-top: 10px;
        width: 100%;
        margin-bottom: 10px;
    }

    .form-control {
        padding: 0.41rem 0.75rem;
        border-radius: 18px;
    }

    .search-box {
        position: relative;

        input {
            font-family: var(--fontDosis);
            padding-left: 35px;
        }

        .mag-glass {
            position: absolute;
            left: 10px;
            top: 10px;
        }
    }

    .search-dropdown-options {
        font-family: var(--fontDosis);
        position: absolute;
        width: calc(100% - 25px);
        max-height: 400px;
        overflow: scroll;
        left: 50%;
        transform: translateX(-50%);
        border-bottom-left-radius: 20px;
        border-bottomr-right-radius: 20px;
        z-index: 10;

        .token-option {
            padding: 10px;
            font-size: 20px;
        }
    }

    .unlisted-token {
        .token-address {
            font-size: 14px;
        }
    }

    .autocomplete-option {
        color: #fff;
        font-size: 20px;
        padding: 10px 15px;
        display: flex;
        align-items: center;

        &:hover {
            background: #1d0e6b;
            cursor: pointer;
        }

        img {
            width: 30px;
            margin-right: 10px;
        }
    }
`

export default ComponentWrapper
