import { $hostAuth } from ".";

export const addTableToDataList = async (item) => {
  try {
    const response = await $hostAuth.post("tables", item);

    if (response && response.data) {
      return response.data;
    } else {
      throw new Error("Invalid response data");
    }
  } catch (error) {
    console.error("Error adding table to data list:", error);
    throw error;
  }
};

export const removeTableFromDataList = async (id) => {
  try {
    const response = await $hostAuth.delete(`tables/${id}`);

    if (response) {
      return response;
    } else {
      throw new Error("Invalid response data");
    }
  } catch (error) {
    console.error("Error removing table from data list:", error);
    throw error;
  }
};