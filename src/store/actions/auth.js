import * as actionTypes from "./actionTypes";
import axios from "axios";

export const authStart = () => {
  return { type: actionTypes.AUTH_START };
};
export const authFail = (error) => {
  return { type: actionTypes.AUTH_FAIL, error: error };
};
export const authSuccess = (userId, token) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    userId: userId,
    userToken: token,
  };
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expirationDate");
  localStorage.removeItem("userId");
  return {
    type: actionTypes.LOGOUT,
  };
};

export const checkAuthTimeout = (expirationTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};

export const setRedirectPath = (path) => {
  return {
    type: actionTypes.SET_REDIRECT_PATH,
    path: path,
  };
};

export const auth = (email, password, isSigningUp) => {
  return (dispatch) => {
    dispatch(authStart());
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true,
    };
    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBARjmdQDvqaKmJho6pAY0u5M0nhj-vlEc";
    if (!isSigningUp) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBARjmdQDvqaKmJho6pAY0u5M0nhj-vlEc";
    }
    axios
      .post(url, authData)
      .then((res) => {
        console.log(res);
        const expirationDate = new Date(
          new Date().getTime() + res.data.expiresIn * 1000
        );
        localStorage.setItem("userId", res.data.localId);
        localStorage.setItem("token", res.data.idToken);
        localStorage.setItem("expirationDate", expirationDate);
        dispatch(authSuccess(res.data.localId, res.data.idToken));
        dispatch(checkAuthTimeout(res.data.expiresIn));
      })
      .catch((err) => {
        console.log(err);
        dispatch(authFail(err.response.data.error));
      });
  };
};

export const authCheckState = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(logout());
    }
    const expirationDate = new Date(localStorage.getItem("expirationDate"));
    const userId = localStorage.getItem("userId");
    if (expirationDate > new Date()) {
      console.log(expirationDate.getTime());
      console.log(new Date().getTime());
      dispatch(authSuccess(userId, token));
      dispatch(
        checkAuthTimeout(
          (expirationDate.getTime() - new Date().getTime()) / 1000
        )
      );
    } else {
      dispatch(logout());
    }
  };
};
