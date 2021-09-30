import styled from 'styled-components'

const ComponentWrapper = styled.div`
    position: relative;
    width: 100%;

    .form-control {
        border-radius: 18px;
    }

    .search-dropdown-options {
        position: absolute;
        background: #1733aa;
        width: calc(100% - 25px);
        max-height: 400px;
        overflow: scroll;
        left: 50%;
        transform: translateX(-50%);
        border-bottom-left-radius: 20px;
        border-bottomr-right-radius: 20px;
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
