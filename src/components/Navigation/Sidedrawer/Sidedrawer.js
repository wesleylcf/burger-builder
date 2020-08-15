import React, { Fragment } from "react";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import sidedrawer from "./sidedrawer.module.css";
import Backdrop from "../../UI/Backdrop/Backdrop";

const Sidedrawer = (props) => {
  return (
    <Fragment>
      <Backdrop show={props.show} click={props.hideSidedrawer} />
      <div
        className={[sidedrawer.Sidedrawer, sidedrawer[props.display]].join(" ")}
      >
        <div className={sidedrawer.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems></NavigationItems>
        </nav>
      </div>
    </Fragment>
  );
};

export default Sidedrawer;
