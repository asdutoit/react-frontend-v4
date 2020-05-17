import styled from "styled-components";

const Navigation = styled.div`
  height: 100px;
  width: 100%;
  display: grid;
  grid-row: 1 / 2;
  grid-column: 1 / -1;
  grid-template-columns: 30rem 1fr 120rem 1fr 30rem;
  box-shadow: 10px 3px 30px 0 rgba(74, 144, 226, 0.21);
  position: sticky;
  top: 0;
  z-index: 10;
  background: #ffff;
  .navigation__list-1 {
    list-style: none;
    display: grid;
    grid-column: 3 / 4;
    grid-template-columns: repeat(5, minmax(14rem, 24rem));
    column-gap: 1rem;
    justify-content: center;
    align-items: center;
    justify-items: stretch;
  }
  .navigation__logo {
    grid-column: 1 / 2;
    width: 11.4rem;
    height: 2.5rem;
    align-self: center;
    margin-left: 5rem;
  }

  .navigation__list-2 {
    list-style: none;
    display: grid;
    grid-column: 5 / 6;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    justify-content: center;
  }
  .navigation__item {
    justify-self: center;
  }
  .navigation__login,
  .navigation__registration {
    color: #27a7df;
    justify-self: center;
  }
  .navigation__link:link,
  .navigation__link:visited {
    text-decoration: none;
    color: currentColor;
    transition: color 0.2s, font-size 0.1s;
  }
  .navigation__link:link:hover,
  .navigation__link:visited:hover {
    color: #fdcd39;
  }
  .navigation__link:link:active,
  .navigation__link:visited:active {
    font-size: 105%;
  }

  @media only screen and (max-width: 160em) {
  }
  @media only screen and (max-width: 114.3125em) {
    grid-template-columns: 28rem 1fr 90rem 1fr 28rem;
    .navigation__list-1 {
      grid-template-columns: repeat(5, minmax(14rem, 20rem));
    }
  }
  @media only screen and (max-width: 98.4375em) {
    grid-template-columns: 25rem 1fr 80rem 1fr 25rem;
  }

  @media only screen and (max-width: 82.875em) {
    grid-template-columns: 20rem 1fr 75rem 1fr 20rem;
  }
  @media only screen and (max-width: 73.75em) {
    grid-template-columns: 18rem 1fr 65rem 1fr 18rem;
    font-size: 2.2rem;
    .navigation__list-1 {
      grid-template-columns: repeat(5, minmax(12rem, 16rem));
    }
  }
  @media only screen and (max-width: 64.375em) {
    grid-template-columns: 16rem 1fr 49rem 1fr 16rem;
    font-size: 1.8rem;
    height: 68px;
    .navigation__list-1 {
      grid-template-columns: repeat(5, minmax(9rem, 9rem));
    }
    .navigation__logo {
      margin-left: 4rem;
      width: 10.4rem;
    }
  }

  @media only screen and (max-width: 52.5em) {
    grid-template-columns: 14rem 1fr 49rem 1fr 12rem;
    height: 68px;
    .navigation__logo {
      margin-left: 3rem;
      width: 8.4rem;
    }
    .navigation__list-1 {
      grid-template-columns: repeat(5, minmax(9rem, 9rem));
      font-size: 1.7rem;
    }
    .navigation__list-2 {
      font-size: 1.7rem;
    }
  }

  @media only screen and (max-width: 48.125em) {
    grid-template-columns: 10rem 1fr 39rem 1fr 10rem;
    height: 68px;
    .navigation__logo {
      margin-left: 3rem;
      width: 8.4rem;
    }
    .navigation__list-1 {
      grid-template-columns: repeat(5, minmax(7rem, 8rem));
      font-size: 1.4rem;
    }
    .navigation__list-2 {
      font-size: 1.5rem;
    }
  }

  @media only screen and (max-width: 39.3125em) {
    display: none;
  }

  @media only screen and (max-width: 26em) {
    display: none;
  }
`;

const NavigationSmall = styled.div`
  visibility: hidden;
  display: none;
 
  @media only screen and (max-width: 39.3125em) {
    padding-left: 15px;
    padding-right: 15px;
    visibility: visible;
    height: 42px;
    width: 100%;
    display: flex
    box-shadow: 10px 3px 30px 0 rgba(74, 144, 226, 0.21);
    position: fixed;
    top: 0;
    z-index: 0;
    background: #ffff;
    align-items:  center;
    justify-content: space-between;
    .navigation__logo {
      text-align: center;
      width: 100px;
    }
    .navigation__menu1 {
      width: 20px;
    }
    .navigation__menu2 {
      width: 24px;
    }
  }
`;

export { Navigation, NavigationSmall };
