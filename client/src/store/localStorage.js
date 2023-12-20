import { STORAGE_KEY } from '../config/config';

export const getItemsFromLocalStorage = () => {
  const items = localStorage.getItem(STORAGE_KEY);
  return items ? JSON.parse(items) : [];
};

const saveData = (data) => {
  return localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

export const saveItemsToLocalStorage = (items) => {
  const orders = getItemsFromLocalStorage(STORAGE_KEY);
  saveData([...orders, items]);
};

export const deleteItemsFromLocalStorage = (id) => {
  const orders = getItemsFromLocalStorage(STORAGE_KEY);
  saveData(orders.filter((el) => el._id !== id));
};

export const updateItemsInLocalStorage = (id, updatedOrder) => {
  const orders = getItemsFromLocalStorage(STORAGE_KEY);

  saveData(orders.map((order) => (order._id !== id ? order : updatedOrder)));
};

export const clearLocalStorage = () => {
  const list = getItemsFromLocalStorage();

  list.splice(0, list.length);

  saveData(list);
};
