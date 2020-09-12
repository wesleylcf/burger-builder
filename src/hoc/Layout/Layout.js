import React, { Fragment, Component } from "react";
import styles from "./layout.module.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import Sidedrawer from "../../components/Navigation/Sidedrawer/Sidedrawer";
import { connect } from "react-redux";

class Layout extends Component {
  state = {
    sidedrawerDisplayed: false,
  };
  hideSidedrawerHandler = () => {
    this.setState({
      sidedrawerDisplayed: false,
    });
  };
  displaySidedrawerHandler = () => {
    this.setState((prevState) => {
      return {
        sidedrawerDisplayed: !prevState.sidedrawerDisplayed,
      };
    });
  };
  render() {
    return (
      <Fragment>
        <Toolbar
          show={this.displaySidedrawerHandler}
          isAuth={this.props.isAuthenticated}
        />
        <Sidedrawer
          show={this.state.sidedrawerDisplayed}
          hideSidedrawer={this.hideSidedrawerHandler}
          display={this.state.sidedrawerDisplayed ? "Open" : "Close"}
          isAuth={this.props.isAuthenticated}
        />
        <main className={styles.Content}>{this.props.children}</main>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};

export default connect(mapStateToProps)(Layout);
