import React from "react";
import img from "../../img/Lighttree-Logo-Name.svg";
import menu from "../../img/menu.svg";
import login from "../../img/login.svg";
import close from "../../img/closemenu.svg";
import { Navigation, NavigationSmall } from "./NavbarStyles";
// import MenuPopup from "./MenuPopup";
// import LoginScreen from "./LoginScreen";

function Navbar() {
  const [MenuPopupValid, setMenuPopupValid] = React.useState(false);
  const [LoginScreenValid, setLoginScreenValid] = React.useState(false);

  const handleClickMenu = () => {
    setMenuPopupValid(!MenuPopupValid);
    // if (MenuPopupValid === false) {
    //   document.getElementById("component-body").style.filter = "blur(5px)";
    // } else {
    //   document.getElementById("component-body").style.filter = "none";
    // }
  };

  const handleClickLogin = () => {
    setLoginScreenValid(!LoginScreenValid);
    // if (LoginScreenValid === false) {
    //   document.getElementById("component-body").style.filter = "blur(5px)";
    // } else {
    //   document.getElementById("component-body").style.filter = "none";
    // }
  };

  return (
    <>
      <Navigation>
        <a href="/" className="navigation__logo">
          <img src={img} alt="Logo" />
        </a>

        <ul className="navigation__list-1">
          <li className="navigation__item">
            <a href="#aboutUs" className="navigation__link">
              About Us
            </a>
          </li>
          <li className="navigation__item">
            <a href="#ourClients" className="navigation__link">
              Our Clients
            </a>
          </li>
          <li className="navigation__item">
            <a href="#howWeWork" className="navigation__link">
              How we work
            </a>
          </li>
          <li className="navigation__item">
            <a href="#advantages" className="navigation__link">
              Advantages
            </a>
          </li>
          <li className="navigation__item">
            <a href="#contact" className="navigation__link">
              Contact
            </a>
          </li>
        </ul>
        <ul className="navigation__list-2">
          <li className="navigation__registration">
            <a href="#register" className="navigation__link">
              Register
            </a>
          </li>
          <li className="navigation__login">
            <a href="#login" className="navigation__link">
              Login
            </a>
          </li>
          {/* <li class="navigation__logout">Logout</li>  */}
        </ul>
      </Navigation>
      <div id="navbar">
        <NavigationSmall>
          <div className="navigation__menu1">
            <a href="#menuModal" onClick={handleClickMenu}>
              {MenuPopupValid ? (
                <img
                  src={close}
                  alt="Close Menu Screen"
                  className="navigation__menu"
                />
              ) : (
                <img src={menu} alt="Menu" className="navigation__menu" />
              )}
            </a>
          </div>
          <a href="/" className="navigation__logo">
            <img src={img} alt="Logo" />
          </a>
          <div className="navigation__menu2">
            <a href="#loginModal" onClick={handleClickLogin}>
              {LoginScreenValid ? (
                <img
                  src={close}
                  alt="Close Login Screen"
                  className="navigation__login"
                />
              ) : (
                <img src={login} alt="Login" className="navigation__login" />
              )}
            </a>
          </div>
          {/* <div className="navigation__logo"></div> */}
        </NavigationSmall>
      </div>
      {/* {MenuPopupValid ? <MenuPopup /> : null}
      {LoginScreenValid ? <LoginScreen /> : null} */}
    </>
  );
}

export default Navbar;
