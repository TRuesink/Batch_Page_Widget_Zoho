import {
  GET_BATCH,
  GET_BATCH_PENDING,
  GET_BATCH_ERROR,
  GET_PRINTERS_PENDING,
  GET_PRINTERS_ERROR,
  GET_PRINTERS,
  GET_LABELS,
  GET_LABEL_RENDERINGS,
  GET_LABEL_RENDERINGS_PENDING,
  GET_LABEL_RENDERINGS_ERROR,
  CLEAR_RENDERINGS,
} from "./types";
import { getZohoQueryParams, getZohoRecord } from "../Services/zohoService";
import { generateLabelImage, loadPrinters } from "../Services/dymoService";

// ---------------------- GET BATCH ACTION -------------------------------
export const getBatch = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: GET_BATCH_PENDING });
      const queryParams = await getZohoQueryParams();
      if (!queryParams) {
        throw "Unable to fetch query parameters";
      }
      const batch = await getZohoRecord("Batch_Report", queryParams.batchID);
      dispatch({ type: GET_BATCH, payload: batch });
    } catch (error) {
      dispatch({ type: GET_BATCH_ERROR, payload: error.message || error });
    }
  };
};

export const getPrinters = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: GET_PRINTERS_PENDING });
      const printers = await loadPrinters();
      dispatch({ type: GET_PRINTERS, payload: printers });
    } catch (error) {
      dispatch({ type: GET_PRINTERS_ERROR, payload: error.message || error });
    }
  };
};

export const getLabels = (recipe) => {
  const serialNum = recipe.display_value.split(",")[0];
  const numVials = recipe.display_value.split(",")[1];
  const labels = [];
  for (let i = 0; i < numVials; i++) {
    labels.push(serialNum + "_" + i);
  }
  return { type: GET_LABELS, payload: labels };
};

export const clearLabelRenderings = () => {
  return { type: CLEAR_RENDERINGS };
};

export const getLabelRenderings = (batchId, vials, start, end) => {
  return async (dispatch) => {
    try {
      dispatch({ type: GET_LABEL_RENDERINGS_PENDING });
      const labelImages = await generateLabelImage(batchId, vials, start, end);
      console.log(labelImages);
      dispatch({ type: GET_LABEL_RENDERINGS, payload: labelImages });
    } catch (error) {
      dispatch({
        type: GET_LABEL_RENDERINGS_ERROR,
        payload: error.message || error,
      });
    }
  };
};
