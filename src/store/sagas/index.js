import { take, takeEvery, takeLatest, all } from "redux-saga/effects";
import {
  logoutSaga,
  checkAuthSaga,
  authUserSaga,
  checkStateSaga,
} from "./auth";
import { initIngredientsSaga } from "./burgerBuilder";
import { purchaseBurgerSaga, fetchOrdersSaga } from "./orders";
import * as actionTypes from "../actions/actionTypes";

export function* watchAuth() {
  // execute simiultaneously, redundant in this case since our sagas are synchronous.
  yield all([
    takeEvery(actionTypes.AUTH_INIT_LOGOUT, logoutSaga),
    takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthSaga),
    takeEvery(actionTypes.AUTH_INIT, authUserSaga),
    takeEvery(actionTypes.AUTH_INIT_CHECKSTATE, checkStateSaga),
  ]);
}

export function* watchBurgerBuilder() {
  yield takeEvery(actionTypes.INIT_INGREDIENTS, initIngredientsSaga);
}

export function* watchOrders() {
  // takeEvery refers to executing a saga every time we recieve an action of the defined type
  // takeLatest below cancels any ongoing executions of purchaseBurgerSaga and execute the latest one
  yield takeLatest(actionTypes.PURCHASE_BURGER, purchaseBurgerSaga);
  yield takeEvery(actionTypes.FETCH_ORDERS, fetchOrdersSaga);
}
