import { $hostAuth } from ".";

export const addEmployeeToDataList = async (user) => {
  try {
    const response = await $hostAuth.post("personnels", user);

    if (response && response.data) {
      return response.data;
    } else {
      throw new Error("Invalid response data");
    }
  } catch (error) {
    console.error("Error adding employee to data list:", error);
    throw error;
  }
};

export const removeEmployeeFromDataList = async (id) => {
  try {
    const response = await $hostAuth.delete(`personnels/${id}`);

    if (response) {
      return response;
    } else {
      throw new Error("Invalid response data");
    }
  } catch (error) {
    console.error("Error removing employee from data list:", error);
    throw error;
  }
};