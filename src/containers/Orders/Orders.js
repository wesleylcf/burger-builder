import React, { Component } from "react";
import Order from "../../components/Order/Order/Order";
import axios from "../../axios-orders";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import Spinner from "../../components/UI/Spinner/Spinner";
import { connect } from "react-redux";
import * as orderActions from "../../store/actions/index";

class Orders extends Component {
  componentDidMount() {
    this.props.onFetchOrders(this.props.token, this.props.userId);
  }

  render() {
    if (this.props.loading) {
      return <Spinner />;
    }
    return (
      <div>
        {this.props.orders.map((order, index) => (
          <Order
            ingredients={order.ingredients}
            price={order.price}
            key={index}
          />
        ))}
      </div>
    );
  }
}

const MapStateToProps = (state) => {
  return {
    hasError: state.order.error,
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId,
  };
};

const MapDispatchToProps = (dispatch) => {
  return {
    onFetchOrders: (token, userId) =>
      dispatch(orderActions.fetchOrders(token, userId)),
  };
};

export default connect(
  MapStateToProps,
  MapDispatchToProps
)(withErrorHandler(Orders, axios));
