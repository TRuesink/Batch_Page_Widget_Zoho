import _ from "lodash";
import {
  GET_VIALS,
  GET_VIALS_PENDING,
  GET_VIALS_ERROR,
  GET_VIALS_NO_ERROR,
} from "../Actions/types";

const INIT_STATE = {
  data: {},
  success: false,
  pending: false,
  error: null,
};

const vialReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_VIALS:
      return {
        data: { ..._.mapKeys(action.payload, "ID") },
        success: true,
        pending: false,
        error: null,
      };
    case GET_VIALS_PENDING:
      return {
        data: state.data,
        success: false,
        pending: true,
        error: null,
      };
    case GET_VIALS_ERROR:
      return {
        data: state.data,
        success: false,
        pending: false,
        error: action.payload,
      };
    case GET_VIALS_NO_ERROR:
      return {
        data: state.data,
        success: false,
        pending: false,
        error: null,
      };

    default:
      return state;
  }
};

export default vialReducer;
