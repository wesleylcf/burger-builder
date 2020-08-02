import React, { Component, Fragment } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import { Route, Redirect } from "react-router";
import ContactData from "../ContactData/ContactData";
import { connect } from "react-redux";

class Checkout extends Component {
  // state = {
  //   ingredients: null,
  // };

  // // // WARNING: HERE he used CWM and below called this.setState while i used constructor and this.state ={}
  // constructor(props) {
  //   super(props);
  //   const query = new URLSearchParams(this.props.location.search);
  //   let ingredients = {};
  //   let price = 0;
  //   for (let entry of query.entries()) {
  //     if (entry[0] === "totalPrice") {
  //       price = entry[1];
  //     } else {
  //       ingredients[entry[0]] = +entry[1];
  //     }
  //   }
  //   console.log("ingredients");
  //   console.log(ingredients);
  //   this.state = {
  //     ingredients: ingredients,
  //     totalPrice: price,
  //   };
  //   console.log("setstate ran");
  //   console.log(this.state.ingredients);
  // }

  checkoutCancelled = () => {
    this.props.history.goBack();
  };
  checkoutContinued = () => {
    this.props.history.replace("/checkout/contact-data");
  };
  render() {
    let summary = <Redirect to="/" />;
    if (this.props.ingredients) {
      summary = (
        <Fragment>
          <CheckoutSummary
            ingredients={this.props.ingredients}
            checkoutCancelled={this.checkoutCancelled}
            checkoutContinued={this.checkoutContinued}
          />
          <Route
            path={this.props.match.url + "/contact-data"}
            component={ContactData}
          />
        </Fragment>
      );
    }
    return <div>{summary}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
  };
};

export default connect(mapStateToProps)(Checkout);
