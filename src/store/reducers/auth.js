import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility/utility";

const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false,
  redirectPath: "/",
};

const setRedirectPath = (state, action) => {
  return updateObject(state, { redirectPath: action.path });
};

const authStart = (state, action) => {
  return updateObject(state, { loading: true, error: null });
};

const authFail = (state, action) => {
  return updateObject(state, { error: action.error, loading: false });
};

const authSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
    token: action.userToken,
    userId: action.userId,
    error: null,
  });
};

const authLogout = (state, action) => {
  return updateObject(state, { token: null, userId: null });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return authStart(state, action);
    case actionTypes.AUTH_FAIL:
      return authFail(state, action);
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actionTypes.LOGOUT:
      return authLogout(state, action);
    case actionTypes.SET_REDIRECT_PATH:
      return setRedirectPath(state, action);
    default:
      return state;
  }
};

export default reducer;
