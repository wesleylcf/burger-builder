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
  // localStorage.removeItem("token");
  // localStorage.removeItem("expirationDate");
  // localStorage.removeItem("userId");
  return {
    type: actionTypes.AUTH_INIT_LOGOUT,
  };
};

export const didLogout = () => {
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const checkAuthTimeout = (expirationTime) => {
  return {
    type: actionTypes.AUTH_CHECK_TIMEOUT,
    expirationTime: expirationTime,
  };
};

export const setRedirectPath = (path) => {
  return {
    type: actionTypes.SET_REDIRECT_PATH,
    path: path,
  };
};

export const auth = (email, password, isSigningUp) => {
  return {
    type: actionTypes.AUTH_INIT,
    email: email,
    password: password,
    isSigningUp: isSigningUp,
  };
};

export const authCheckState = () => {
  return {
    type: actionTypes.AUTH_INIT_CHECKSTATE,
  };
};
