import React, { Component } from "react";
import Order from "../../components/Order/Order/Order";
import axios from "../../axios-orders";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import Spinner from "../../components/UI/Spinner/Spinner";
import { connect } from "react-redux";
import * as orderActions from "../../store/actions/index";

class Orders extends Component {
  componentDidMount() {
    this.props.onFetchOrders();
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
  };
};

const MapDispatchToProps = (dispatch) => {
  return {
    onFetchOrders: () => dispatch(orderActions.fetchOrders()),
  };
};

export default connect(
  MapStateToProps,
  MapDispatchToProps
)(withErrorHandler(Orders, axios));
