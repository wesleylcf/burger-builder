import React from "react";
import navitems from "./navitems.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";

const NavigationItems = (props) => {
  return (
    <ul className={navitems.NavigationItems}>
      <NavigationItem link="/" exact>
        Build a Burger
      </NavigationItem>
      {props.isAuth ? (
        <NavigationItem link="/orders">Orders</NavigationItem>
      ) : null}
      {props.isAuth ? (
        <NavigationItem link="/logout">Log out</NavigationItem>
      ) : (
        <NavigationItem link="/authentication">Login</NavigationItem>
      )}
    </ul>
  );
};

export default NavigationItems;
