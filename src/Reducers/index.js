import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import batchReducer from "./batchReducer";
import dymoReducer from "./dymoReducer";

const reducers = combineReducers({
  batch: batchReducer,
  dymo: dymoReducer,
  form: formReducer,
});

export default reducers;
