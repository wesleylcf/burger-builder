import React from "react";
import navitems from "./navitems.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";

const NavigationItems = (props) => {
  return (
    <ul className={navitems.NavigationItems}>
      <NavigationItem link="/" exact>
        Build a Burger
      </NavigationItem>
      <NavigationItem link="/orders">Orders</NavigationItem>
      <NavigationItem link="/login">Login</NavigationItem>
    </ul>
  );
};

export default NavigationItems;
