import {
  GET_BATCH,
  GET_BATCH_PENDING,
  GET_BATCH_ERROR,
  GET_PRINTERS_PENDING,
  GET_PRINTERS_ERROR,
  GET_PRINTERS,
  GET_LABEL_RENDERINGS,
  GET_LABEL_RENDERINGS_PENDING,
  GET_LABEL_RENDERINGS_ERROR,
  CLEAR_RENDERINGS,
  GET_VIALS_PENDING,
  GET_VIALS,
  GET_VIALS_ERROR,
  GET_BATCH_NO_ERROR,
  GET_PRINTERS_NO_ERROR,
  GET_VIALS_NO_ERROR,
  GET_LABEL_RENDERINGS_NO_ERROR,
} from "./types";
import {
  getZohoQueryParams,
  getZohoRecord,
  getZohoRecords,
} from "../Services/zohoService";
import { generateLabelImage, loadPrinters } from "../Services/dymoService";

// ---------------------- GET BATCH ACTION -------------------------------
export const getBatch = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: GET_BATCH_PENDING });
      const queryParams = await getZohoQueryParams();
      if (!queryParams) {
        throw new Error("Unable to fetch query parameters");
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

export const getVials = (recipeId) => {
  return async (dispatch) => {
    try {
      dispatch({ type: GET_VIALS_PENDING });
      const vials = await getZohoRecords("Vial_Report", `Recipe = ${recipeId}`);
      const sortedVials = vials.sort((a, b) => {
        const aNum = a.Vial_Serial_Number.split("-")[1];
        const bNum = b.Vial_Serial_Number.split("-")[1];
        return aNum - bNum;
      });
      dispatch({ type: GET_VIALS, payload: sortedVials });
    } catch (error) {
      dispatch({ type: GET_VIALS_ERROR, payload: error.message || error });
    }
  };
};

export const clearLabelRenderings = () => {
  return { type: CLEAR_RENDERINGS };
};

export const getLabelRenderings = (vials, start, end) => {
  return async (dispatch) => {
    try {
      dispatch({ type: GET_LABEL_RENDERINGS_PENDING });
      const labelImages = await generateLabelImage(vials, start, end);
      dispatch({ type: GET_LABEL_RENDERINGS, payload: labelImages });
    } catch (error) {
      dispatch({
        type: GET_LABEL_RENDERINGS_ERROR,
        payload: error.message || error,
      });
    }
  };
};

export const clearBatchError = () => {
  return { type: GET_BATCH_NO_ERROR };
};

export const clearDymoError = () => {
  return { type: GET_PRINTERS_NO_ERROR };
};

export const clearVialsError = () => {
  return { type: GET_VIALS_NO_ERROR };
};

export const clearLabelRenderingsError = () => {
  return { type: GET_LABEL_RENDERINGS_NO_ERROR };
};
