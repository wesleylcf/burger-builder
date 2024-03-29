import { put } from "redux-saga/effects";
import * as actions from "../actions/index";
import axios from "../../axios-orders";

export function* initIngredientsSaga(action) {
  try {
    const response = yield axios.get("ingredients.json");
    yield put(actions.setIngredients(response.data));
    yield put(actions.fetchIngredientsFailed());
  } catch (err) {
    console.log(err);
  }
}
