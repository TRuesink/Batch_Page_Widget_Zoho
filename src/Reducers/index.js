import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import batchReducer from "./batchReducer";
import dymoReducer from "./dymoReducer";
import labelReducer from "./labelReducer";

const reducers = combineReducers({
  batch: batchReducer,
  dymo: dymoReducer,
  labels: labelReducer,
  form: formReducer,
});

export default reducers;
