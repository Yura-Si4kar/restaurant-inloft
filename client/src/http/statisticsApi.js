import { $hostAuth } from ".";

export const addSalesData = async (obj) => {
    const { data } = $hostAuth.post('sales', obj);

    return data;
}