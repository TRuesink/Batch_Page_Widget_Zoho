import {
  GET_PRINTERS,
  GET_PRINTERS_PENDING,
  GET_PRINTERS_ERROR,
  GET_LABELS,
} from "../Actions/types";

const INIT_STATE = {
  printers: [],
  labels: [],
  success: false,
  pending: false,
  error: null,
};

const dymoReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_PRINTERS:
      return {
        printers: action.payload,
        labels: state.labels,
        success: true,
        pending: false,
        error: null,
      };
    case GET_PRINTERS_PENDING:
      return {
        printers: state.printers,
        labels: state.labels,
        success: false,
        pending: true,
        error: null,
      };
    case GET_PRINTERS_ERROR:
      return {
        printers: state.printers,
        labels: state.labels,
        success: false,
        pending: false,
        error: action.payload,
      };
    case GET_LABELS:
      return {
        printers: state.printers,
        labels: action.payload,
        success: true,
        pending: false,
        error: null,
      };

    default:
      return state;
  }
};

export default dymoReducer;
