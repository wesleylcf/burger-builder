import { put, delay, call } from "redux-saga/effects";
import * as actions from "../actions/index";
import axios from "axios";

export function* logoutSaga(action) {
  // call gives us greater flexibility to test our generator functions
  yield call([localStorage, "removeItem"], "token");
  yield localStorage.removeItem("expirationDate");
  yield localStorage.removeItem("userId");
  yield put(actions.didLogout());
}

export function* checkAuthSaga(action) {
  yield delay(action.expirationTime * 1000);
  yield put(actions.logout());
}

export function* authUserSaga(action) {
  yield put(actions.authStart);
  const authData = {
    email: action.email,
    password: action.password,
    returnSecureToken: true,
  };
  let url =
    "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBARjmdQDvqaKmJho6pAY0u5M0nhj-vlEc";
  if (!action.isSigningUp) {
    url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBARjmdQDvqaKmJho6pAY0u5M0nhj-vlEc";
  }
  // Adding yield in front of a function that returns a promise, returns the result of that function instead.
  try {
    const response = yield axios.post(url, authData);
    const expirationDate = new Date(
      new Date().getTime() + response.data.expiresIn * 1000
    );
    yield localStorage.setItem("userId", response.data.localId);
    yield localStorage.setItem("token", response.data.idToken);
    yield localStorage.setItem("expirationDate", expirationDate);
    yield put(
      actions.authSuccess(response.data.localId, response.data.idToken)
    );
    yield put(actions.checkAuthTimeout(response.data.expiresIn));
  } catch (err) {
    yield put(actions.authFail(err.response.data.error));
  }
}

export function* checkStateSaga(action) {
  const token = localStorage.getItem("token");
  if (!token) {
    yield put(actions.logout());
  }
  const expirationDate = new Date(localStorage.getItem("expirationDate"));
  const userId = localStorage.getItem("userId");
  if (expirationDate > new Date()) {
    console.log(expirationDate.getTime());
    console.log(new Date().getTime());
    yield put(actions.authSuccess(userId, token));
    yield put(
      actions.checkAuthTimeout(
        (expirationDate.getTime() - new Date().getTime()) / 1000
      )
    );
  } else {
    yield put(actions.logout());
  }
}
