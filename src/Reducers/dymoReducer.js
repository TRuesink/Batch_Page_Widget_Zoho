import {
  GET_PRINTERS,
  GET_PRINTERS_PENDING,
  GET_PRINTERS_ERROR,
  GET_PRINTERS_NO_ERROR,
} from "../Actions/types";

const INIT_STATE = {
  printers: [],
  success: false,
  pending: false,
  error: null,
};

const dymoReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_PRINTERS:
      return {
        printers: action.payload,
        success: true,
        pending: false,
        error: null,
      };
    case GET_PRINTERS_PENDING:
      return {
        printers: state.printers,
        success: false,
        pending: true,
        error: null,
      };
    case GET_PRINTERS_ERROR:
      return {
        printers: state.printers,
        success: false,
        pending: false,
        error: action.payload,
      };
    case GET_PRINTERS_NO_ERROR:
      return {
        printers: state.data,
        success: false,
        pending: false,
        error: null,
      };

    default:
      return state;
  }
};

export default dymoReducer;
