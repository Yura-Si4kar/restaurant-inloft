import { $hostAuth } from ".";

export const addSalesData = async (obj) => {
    const { data } = await $hostAuth.post('sales', obj);

    return data;
}