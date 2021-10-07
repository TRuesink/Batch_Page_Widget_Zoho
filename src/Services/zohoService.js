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
    const batch = response.data;
    return batch;
  } catch (error) {
    throw new Error(
      `Could not fetch Record. Contact administrator for assistance. ERROR: ${error.responseText}`
    );
  }
};

export const getZohoRecords = async (reportName, criteria) => {
  try {
    const config = {
      reportName: reportName,
      criteria: criteria,
      page: 1,
      pageSize: 150,
    };
    const records = await window.ZOHO.CREATOR.API.getAllRecords(config);
    return records.data;
  } catch (error) {
    throw new Error(
      `Could not fetch records from ${reportName} with criteria ${criteria}. ERROR MESSAGE: ${error.responseText}`
    );
  }
};
