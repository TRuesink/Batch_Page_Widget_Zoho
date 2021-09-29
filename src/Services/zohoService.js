export const getZohoQueryParams = async () => {
  await window.ZOHO.CREATOR.init();
  const queryParams = await window.ZOHO.CREATOR.UTIL.getQueryParams();
  return queryParams;
};

export const getZohoBatch = async (id) => {
  const batchConfig = {
    reportName: "Batch_Report",
    id: id,
  };
  try {
    const response = await window.ZOHO.CREATOR.API.getRecordById(batchConfig);
    console.log(response);
    const batch = response.data;
    return batch;
  } catch (error) {
    throw new Error(
      `Could not fetch Batch. Contact administrator for assistance. ERROR: ${error.responseText}`
    );
  }
};

export const getZohoRecipes = async (batch) => {
  const reportType =
    batch.Type === "R2*" ? "R2_Recipe_Report" : batch.Type + "_Recipe_Report";
  const recipeConfig = {
    reportName: reportType,
    criteria: `Batch = ${batch.ID}`,
    page: 1,
    pageSize: 150,
  };

  try {
    const response = await window.ZOHO.CREATOR.API.getAllRecords(recipeConfig);
    return response.data;
  } catch (error) {
    throw new Error(
      `Could not fetch Recipes for Batch with ID ${batch.ID}. Contact administrator for assistance. ERROR: ${error.responseText}`
    );
  }
};

export const createSingleVial = async (recipe, vialNumber) => {
  const vialSerialNums = recipe.Vial.map((r) => {
    return r.display_value;
  });
  const pdffRecipe = recipe["Batch.Type"] === "PDFF" ? recipe.ID : null;
  const r2Recipe = recipe["Batch.Type"] === "R2*" ? recipe.ID : null;
  const t1Recipe = recipe["Batch.Type"] === "T1" ? recipe.ID : null;
  const serialNum = recipe.Serial_Number + "_" + vialNumber;
  const vialConfig = {
    formName: "Vial",
    data: {
      data: {
        Batch: recipe.Batch.ID,
        PDFF_Recipe: pdffRecipe,
        R2_Recipe: r2Recipe,
        T1_Recipe: t1Recipe,
        Vial_Serial_Number: serialNum,
      },
    },
  };
  try {
    if (vialSerialNums.includes(serialNum)) {
      return Promise.resolve({
        code: 404,
        message: `Vial with serial number ${serialNum} already exists`,
      });
    }
    const response = await window.ZOHO.CREATOR.API.addRecord(vialConfig);
    return response;
  } catch (error) {
    throw new Error(
      `Could not create Vial for Recipe with ID ${recipe.ID}. Contact administrator for assistance. ERROR: ${error.responseText}`
    );
  }
};

export const getSingleZohoRecipe = async (recipe) => {
  const reportType =
    recipe["Batch.Type"] === "R2*"
      ? "R2_Recipe_Report"
      : recipe["Batch.Type"] + "_Recipe_Report";
  const recipeConfig = {
    reportName: reportType,
    id: recipe.ID,
  };
  try {
    const response = await window.ZOHO.CREATOR.API.getRecordById(recipeConfig);
    return response.data;
  } catch (error) {
    throw new Error(
      `Could not fetch Recipe with ID ${recipe.ID}. Contact administrator for assistance. ERROR: ${error.responseText}`
    );
  }
};
