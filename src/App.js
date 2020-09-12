import React, { Component } from "react";
import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import { Route, Switch, Redirect } from "react-router-dom";
import Logout from "./containers/Auth/Logout";
import { connect } from "react-redux";
import * as authActions from "./store/actions/index";
import asyncComponent from "./hoc/lazyLoad/asyncComponent";

const asyncCheckout = asyncComponent(() => {
  return import("./containers/Checkout/Checkout");
});

const asyncOrders = asyncComponent(() => {
  return import("./containers/Orders/Orders");
});

const asyncAuth = asyncComponent(() => {
  return import("./containers/Auth/Auth");
});

class App extends Component {
  componentDidMount() {
    this.props.checkState();
    console.log(this.props.isAuth);
  }

  // testing for successful ejecting of axios interceptor during CWU
  // state={
  //   show: true
  // }
  // componentDidMount() {
  //   setTimeout(() => {
  //     this.setState({
  //       show:false
  //     })
  //   }, 5000)

  // }
  render() {
    let routes = (
      <Switch>
        <Route path="/authentication" exact component={asyncAuth} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    );
    if (this.props.isAuth) {
      routes = (
        <Switch>
          <Route path="/checkout" component={asyncCheckout} />
          <Route path="/orders" exact component={asyncOrders} />
          <Route path="/authentication" exact component={asyncAuth} />
          <Route path="/logout" exact component={Logout} />
          <Route path="/" exact component={BurgerBuilder} />
          <Redirect to="/" />
        </Switch>
      );
    }
    return (
      <div>
        <Layout>{routes}</Layout>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    checkState: () => dispatch(authActions.authCheckState()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
