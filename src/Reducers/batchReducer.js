import {
  GET_BATCH,
  GET_BATCH_PENDING,
  GET_BATCH_ERROR,
  GET_BATCH_NO_ERROR,
} from "../Actions/types";

const INIT_STATE = {
  data: {},
  success: false,
  pending: false,
  error: null,
};

const batchReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_BATCH:
      return {
        data: action.payload,
        success: true,
        pending: false,
        error: null,
      };
    case GET_BATCH_PENDING:
      return {
        data: state.data,
        success: false,
        pending: true,
        error: null,
      };
    case GET_BATCH_ERROR:
      return {
        data: state.data,
        success: false,
        pending: false,
        error: action.payload,
      };
    case GET_BATCH_NO_ERROR:
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

export default batchReducer;
