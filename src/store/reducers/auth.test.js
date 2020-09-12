import reducer from "./auth";
import * as actionTypes from "../actions/index";

describe(" auth reducer ", () => {
  it("should return the initial state ", () => {
    expect(reducer(undefined, {})).toEqual({
      token: null,
      userId: null,
      error: null,
      loading: false,
      redirectPath: "/",
    });
  });
  it("should store token on login", () => {
    expect(
      reducer(
        {
          token: null,
          userId: null,
          error: null,
          loading: false,
          redirectPath: "/",
        },
        {
          type: actionTypes.AUTH_SUCCESS,
          userId: "id",
          userToken: "token",
        }
      )
    ).toEqual({
      token: null,
      userId: null,
      error: null,
      loading: false,
      redirectPath: "/",
    });
  });
});
