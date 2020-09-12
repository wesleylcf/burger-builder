import React from "react";
import burgerLogo from "../../assets/images/burger-logo.png";
import logo from "./logo.module.css";

const Logo = (props) => {
  return (
    <div className={logo.Logo}>
      <img src={burgerLogo} alt="Burger logo"></img>
    </div>
  );
};

export default Logo;
