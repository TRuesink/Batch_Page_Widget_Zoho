import _ from "lodash";
import {
  GET_LABEL_RENDERINGS,
  GET_LABEL_RENDERINGS_PENDING,
  GET_LABEL_RENDERINGS_ERROR,
  CLEAR_RENDERINGS,
} from "../Actions/types";

const INIT_STATE = {
  data: {},
  success: false,
  pending: false,
  error: null,
};

const labelReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_LABEL_RENDERINGS:
      return {
        data: { ..._.mapKeys(action.payload, "id") },
        success: true,
        pending: false,
        error: null,
      };
    case GET_LABEL_RENDERINGS_PENDING:
      return {
        data: state.data,
        success: false,
        pending: true,
        error: null,
      };
    case GET_LABEL_RENDERINGS_ERROR:
      return {
        data: state.data,
        success: false,
        pending: false,
        error: action.payload,
      };
    case CLEAR_RENDERINGS:
      return {
        data: {},
        success: false,
        pending: false,
        error: null,
      };

    default:
      return state;
  }
};

export default labelReducer;
