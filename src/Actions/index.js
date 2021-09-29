import { GET_BATCH, GET_BATCH_PENDING, GET_BATCH_ERROR } from "./types";
import { getZohoQueryParams, getZohoBatch } from "../Services/zohoService";

// ---------------------- GET BATCH ACTION -------------------------------
export const getBatch = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: GET_BATCH_PENDING });
      const queryParams = await getZohoQueryParams();
      if (!queryParams) {
        throw "Unable to fetch query parameters";
      }
      const batch = await getZohoBatch(queryParams.batchID);
      dispatch({ type: GET_BATCH, payload: batch });
    } catch (error) {
      dispatch({ type: GET_BATCH_ERROR, payload: error.message || error });
    }
  };
};
