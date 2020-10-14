import axios from "../../axios-orders";
import { put } from "redux-saga/effects";
import * as actions from "../actions/index";

export function* purchaseBurgerSaga(action) {
  yield put(actions.purchaseBurgerStart());
  try {
    const response = yield axios.post(
      "orders.json?auth=" + action.token,
      action.orderData
    );
    console.log("data posted");
    yield put(actions.purchaseBurgerSuccess(response.data, action.orderData));
  } catch (error) {
    console.log(error);
    yield put(actions.purchaseBurgerFail(error));
  }
}

export function* fetchOrdersSaga(action) {
  yield put(actions.fetchOrdersStart());
  try {
    const queryParams = `?auth=${action.token}&orderBy="userId"&equalTo="${action.id}"`;
    const res = yield axios.get(`/orders.json${queryParams}`);
    const fetchedOrders = [];
    for (let key in res.data) {
      fetchedOrders.push({
        ...res.data[key],
        id: key,
      });
    }
    console.log(res.data);
    yield put(actions.fetchOrdersSuccess(fetchedOrders));
  } catch (err) {
    console.log(err);
    yield put(actions.fetchOrdersFail(err));
  }
}
