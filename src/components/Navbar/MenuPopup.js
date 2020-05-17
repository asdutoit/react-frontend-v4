import React from "react";
import styled from "styled-components";

const PopupScreen = styled.div`
  height: 100%;
  width: 100vw;
  background-color: white;
  filter: drop-shadow(-1px 6px 3px rgba(50, 50, 0, 0.5));
`;

const Popup = styled.div`
  position: fixed;
  top: 42px;
  padding-left: 5%;
  height: 500px;
  width: 100%;
  z-index: 99;
  clip-path: polygon(100% 0%, 101% 5%, 70% 53%, 0px 74%, 0% 50%, 0 0);
  background-color: white;
  .menu__item {
    display: flex;
    flex-direction: column;
  }
  .menu__links {
    list-style: none;
    margin-top: 7.5px;
    margin-bottom: 7.5px;
    text-decoration: none;
    color: #000000;
    width: 180px;
    height: 40px;
    font-family: Akrobat;
    font-size: 30px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
  }
  .menu__links:link {
    color: currentColor;
  }
  .menu__links:link:hover,
  .menu__links:visited:hover {
    color: #fdcd39;
  }
  .menu__links:link:active,
  .menu__links:visited:active {
    font-size: 90%;
  }
`;

export default function MenuPopup() {
  return (
    <PopupScreen>
      <Popup>
        <div className="menu__item">
          <a href="" className="menu__links">
            About Us
          </a>
          <a href="" className="menu__links">
            Our Clients
          </a>
          <a href="" className="menu__links">
            How we work
          </a>
          <a href="" className="menu__links">
            Advantages
          </a>
          <a href="" className="menu__links">
            Contact
          </a>
        </div>
      </Popup>
    </PopupScreen>
  );
}
