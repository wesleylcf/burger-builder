import React, { Component } from "react";
import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout";
import { Route, Switch, Redirect } from "react-router-dom";
import Orders from "./containers/Orders/Orders";
import Auth from "./containers/Auth/Auth";
import Logout from "./containers/Auth/Logout";
import { connect } from "react-redux";
import * as authActions from "./store/actions/index";

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
        <Route path="/authentication" exact component={Auth} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    );
    if (this.props.isAuth) {
      routes = (
        <Switch>
          <Route path="/checkout" component={Checkout} />
          <Route path="/orders" exact component={Orders} />
          <Route path="/authentication" exact component={Auth} />
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
