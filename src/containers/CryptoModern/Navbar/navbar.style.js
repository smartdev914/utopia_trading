import styled from 'styled-components';
import { themeGet } from '@styled-system/theme-get';

const NavbarWrapper = styled.nav`
  width: 100%;
  padding-top: 10px;
  margin: 25px 0 26px;
  background-color: transparent;
  position: fixed;
  z-index: 99;
  transition: all 0.3s ease;
  @media only screen and (max-width: 1366px) {
    margin: 0px 0 20px;
    padding-top: 10px;
  }
  > div.container {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap-reverse;
    @media only screen and (max-width: 700px) {
      justify-content: flex-end;

    }
  }
  ul {
    li {
      a {
        color: ${themeGet('colors.menu', '#fff')};
        font-size: 16px;
        font-weight: 400;
        transition: all 0.3s ease;
        &:hover {
          font-weight: 700;
        }
      }
      &.is-current {
        a {
          font-weight: 700;
        }
      }
    }
  }
`;

export const MenuArea = styled.div`
  display: flex;
  align-items: center;
  .menu {
    display: flex;
    align-items: center;
    margin-right: 11px;
    opacity: 1;
    visibility: visible;
    transition: all 0.3s ease;
    @media only screen and (max-width: 1366px) {
      margin-right: 13px;
    }
    li {
      margin: 0 19px;
      @media only screen and (max-width: 1366px) {
        margin: 0 17px;
      }
      &:first-child {
        margin-left: 0;
      }
      &:last-child {
        margin-right: 0;
      }
    }
  }
  &.active {
    .menu {
      opacity: 0;
      visibility: hidden;
    }
  }
  .reusecore__button {
    border-radius: 5px;
    font-weight: 500;
    font-size: 20px;
    text-transform: inherit;
    padding-left: 13px;
    padding-right: 13px;
    min-height: 42px;
    width: 198px;

    &.text {
      padding: 0;
      margin-right: 28px;
      cursor: pointer;
      .btn-icon {
        svg {
          width: 22px;
          height: auto;
          stroke: ${themeGet('colors.menu', '0D233E')};
          @media only screen and (max-width: 991px) {
            width: 24px;
          }
        }
      }
      @media only screen and (max-width: 1366px) {
        margin-right: 20px;
      }
      @media only screen and (max-width: 991px) {
        margin-right: 0;
      }
    }
    &.whitepaper {
      background-color: transparent;
      letter-spacing: 0.1rem;
    }
    &.trail {
      letter-spacing: 0.1rem;
      border-radius: 10px;
      background-color: var(--primaryTextColor);
      height: 40px;
      span {
        color: var(--primaryBackgroundColor);
      }

      &:hover {
        box-shadow: rgba(75, 109, 235, 0.78) 0px 12px 24px -10px;
      }
    }

    @media only screen and (max-width: 400px) {
      width: 50%;
      font-size: 16px;
    }
  }
  @media only screen and (max-width: 400px) {
    width: 100%;
  }
`;

export const SocialMediaButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  a:first-child {
    margin-left: 0;
  }

  .social-icon {
    margin: 5px 5px 5px;
  }
`;

export default NavbarWrapper;
