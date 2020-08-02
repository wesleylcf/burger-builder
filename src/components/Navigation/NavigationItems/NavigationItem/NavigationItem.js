import React from "react";
import navitem from "./navitem.module.css";
import { NavLink } from "react-router-dom";

const NavigationItem = (props) => {
  return (
    <li className={navitem.NavigationItem}>
      <NavLink
        to={props.link}
        exact={props.exact}
        activeClassName={navitem.active}
      >
        {props.children}
      </NavLink>
    </li>
  );
};

export default NavigationItem;
