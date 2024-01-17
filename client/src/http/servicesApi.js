import { $host, $hostAuth } from ".";
import { isLoggedIn } from "../storages/cookie";

export const getListByParams = async (params, page, limit, search) => {
    try {
        let queryString = params;

        if (search) {
          queryString += `?page=${page}&limit=${limit}&search=${search}`;
        } else {
          queryString += `?page=${page}&limit=${limit}`;
        }

        if (!paramsValidation(params)) {
          throw new Error('Invalid parameter');
        }

        const { data } = await (isLoggedIn() ? $hostAuth : $host).get(queryString);
        
        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
};

function paramsValidation(param) {
  return param !== 'tables' || param !== 'personnels' || param !== 'sales';
}

export const updateMenuItemRating = async (params, id, newItem) => {
    try {
        const response = await $host.put(`${params}/${id}`, newItem);

        if (response && response.data) {
        return response.data;
        } else {
        throw new Error("Invalid response data");
        }
    } catch (error) {
        console.error("Error updating item rating:", error);
        throw error;
    }
};

export const setOrdersListToTable = async (id, table) => {
  try {
    const response = await (isLoggedIn() ? $hostAuth : $host).put(`tables/${id}`, table);

    if (response && response.data) {
      return response.data;
    } else {
      throw new Error("Invalid response data");
    }
  } catch (error) {
    console.error("Error setting orders list to table:", error);
    throw error;
  }
};