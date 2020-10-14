import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";

export const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    payload: { order: { id: id.name, ...orderData } },
  };
};

export const purchaseBurgerFail = (error) => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error: error,
  };
};

export const purchaseBurgerStart = () => {
  return { type: actionTypes.PURCHASE_BURGER_START };
};

export const purchaseBurger = (orderData, token) => {
  return {
    type: actionTypes.PURCHASE_BURGER,
    orderData: orderData,
    token: token,
  };
};

export const purchaseInit = () => {
  return { type: actionTypes.PURCHASE_INIT };
};

export const fetchOrdersStart = () => {
  return { type: actionTypes.FETCH_ORDERS_START };
};

export const fetchOrdersSuccess = (orders) => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    payload: { orders: orders },
  };
};

export const fetchOrdersFail = (err) => {
  return { type: actionTypes.FETCH_ORDERS_FAIL, error: err };
};

export const fetchOrders = (token, id) => {
  return {
    type: actionTypes.FETCH_ORDERS,
    id: id,
    token: token,
  };
};
