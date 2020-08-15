import React, { Component, Fragment } from "react";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";

// global constants are named in all caps.

class BurgerBuilder extends Component {
  state = {
    isOrdered: false,
    // isCheckedOut: false,
    // hasError: false,
  };
  componentDidMount() {
    this.props.initIngredientsHandler();
    console.log(this.props.state);
    this.props.onPurchased();
  }

  updatePurchaseable(ingredients) {
    const sum = Object.keys(ingredients)
      .map((type) => {
        return ingredients[type];
      })
      .reduce((Count, CurCount) => {
        return Count + CurCount;
      }, 0);
    return sum > 0;
  }

  displayModalHandler = () => {
    if (this.props.isAuth) {
      this.setState({
        isOrdered: true,
      });
    } else {
      this.props.onAuthRedirect("/checkout");
      this.props.history.push("/authentication");
    }
  };

  hideModalHandler = () => {
    console.log("exit");
    this.setState({
      isOrdered: false,
    });
  };
  checkoutHandler = () => {
    // console.log(this.props.ingredients);
    // const queryParams = [];
    // for (let ig in this.props.ingredients) {
    //   queryParams.push(
    //     encodeURIComponent(ig) +
    //       "=" +
    //       encodeURIComponent(this.props.ingredients[ig])
    //   );
    // }
    // queryParams.push(
    //   encodeURIComponent("totalPrice") + "=" + this.props.totalPrice
    // );
    // const queryString = queryParams.join("&");
    this.props.history.push({
      pathname: "/checkout",
    });
  };
  render() {
    let orderSummary = null;

    const disabledInfo = {};
    for (let x in { ...this.props.ingredients }) {
      disabledInfo[x] = this.props.ingredients[x] < 1;
    }
    console.log("[BurgerBuilder] disabledInfo", disabledInfo);
    let burger = this.props.hasError ? (
      <p>Unsuccessful attempt to get ingredients</p>
    ) : (
      <Spinner />
    );

    if (this.props.ingredients) {
      orderSummary = (
        <OrderSummary
          ingredients={this.props.ingredients}
          cancel={this.hideModalHandler}
          continue={this.checkoutHandler}
          price={this.props.totalPrice}
        />
      );
      burger = (
        <Fragment>
          <Burger ingredients={this.props.ingredients} />
          <BuildControls
            add={this.props.addIngredientHandler}
            remove={this.props.removeIngredientHandler}
            disabled={disabledInfo}
            price={this.props.totalPrice}
            purchaseable={this.updatePurchaseable(this.props.ingredients)}
            displayModal={this.displayModalHandler}
            isAuth={this.props.isAuth}
          />
        </Fragment>
      );
    }
    // WHY NOT BELOW (need to adjust both burger and ordersummary if ingredients is null)
    // if(!this.state.ingredients) {
    //     return <Spinner/>
    // }
    // then burger and orderSummary can remain as theirselves.
    return (
      <Fragment>
        <Modal
          show={this.state.isOrdered}
          hideModal={this.hideModalHandler}
          isCheckedOut={this.state.isCheckedOut}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    hasError: state.burgerBuilder.hasError,
    isAuth: state.auth.token !== null,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addIngredientHandler: (name) => dispatch(actions.addIngredient(name)),
    removeIngredientHandler: (name) => dispatch(actions.removeIngredient(name)),
    initIngredientsHandler: () => dispatch(actions.initIngredients()),
    onPurchased: () => dispatch(actions.purchaseInit()),
    onAuthRedirect: (path) => dispatch(actions.setRedirectPath(path)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
