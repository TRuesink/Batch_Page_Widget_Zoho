import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import batchReducer from "./batchReducer";

const reducers = combineReducers({
  batch: batchReducer,
  vial: () => "vial reducer = CHANGE ME",
  recipe: () => "recipe reducer - change me",
  dymo: () => "dymo reducer - CHANGE ME",
  form: formReducer,
  ui: () => "ui reducer - CHANGE ME",
});

export default reducers;
