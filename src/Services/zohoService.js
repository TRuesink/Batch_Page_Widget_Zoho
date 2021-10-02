export const getZohoQueryParams = async () => {
  await window.ZOHO.CREATOR.init();
  const queryParams = await window.ZOHO.CREATOR.UTIL.getQueryParams();
  return queryParams;
};

export const getZohoRecord = async (reportName, id) => {
  const recordConfig = {
    reportName: reportName,
    id: id,
  };
  try {
    const response = await window.ZOHO.CREATOR.API.getRecordById(recordConfig);
    console.log(response);
    const batch = response.data;
    return batch;
  } catch (error) {
    throw new Error(
      `Could not fetch Record. Contact administrator for assistance. ERROR: ${error.responseText}`
    );
  }
};
