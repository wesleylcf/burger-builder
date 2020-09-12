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
  return (dispatch) => {
    dispatch(purchaseBurgerStart());
    axios
      .post("orders.json?auth=" + token, orderData)
      .then((response) => {
        console.log(response.data);
        console.log("data posted");
        dispatch(purchaseBurgerSuccess(response.data, orderData));
      })
      .catch((error) => {
        console.log(error);
        dispatch(purchaseBurgerFail(error));
      });
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
  return (dispatch) => {
    dispatch(fetchOrdersStart());
    const queryParams = `?auth=${token}&orderBy="userId"&equalTo="${id}"`;
    axios
      .get(`/orders.json${queryParams}`)
      .then((res) => {
        const fetchedOrders = [];
        for (let key in res.data) {
          fetchedOrders.push({
            ...res.data[key],
            id: key,
          });
        }
        console.log(res.data);
        dispatch(fetchOrdersSuccess(fetchedOrders));
      })
      .catch((err) => {
        console.log(err);
        dispatch(fetchOrdersFail(err));
      });
  };
};
