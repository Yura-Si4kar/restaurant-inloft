import {
  clearLocalStorage,
  deleteItemsFromLocalStorage,
  getItemsFromLocalStorage,
  saveItemsToLocalStorage,
  updateItemsInLocalStorage,
} from '../localStorage';
import { createAction } from '../actionsCreator';
import {
  addSalesData,
  getFetchListByCategories,
  setNewRatingToTheMenuItem,
  setOrdersListToTable,
} from '../api';

export const SET_LOADING = 'SET_LOADING';
export const setLoading = createAction(SET_LOADING);

export const SET_AUTH = 'SET_AUTH';
export const setIsAuth = createAction(SET_AUTH);

export const SET_USER = 'SET_USER';
export const setUser = createAction(SET_USER);

export const SET_MENU_LIST = 'SET_MENU_LIST';
export const setMenuList = createAction(SET_MENU_LIST);

export const SET_ORDER_LIST = 'SET_ORDER_LIST';
export const setOrderList = createAction(SET_ORDER_LIST);

export const SET_SALES_LIST = 'SET_SALES_LIST';
export const setSalesList = createAction(SET_SALES_LIST);

export const ADD_MENU_ITEM_TO_ORDER_LIST = 'ADD_MENU_ITEM_TO_ORDER_LIST';
export const addMenuItemToOrderList = createAction(ADD_MENU_ITEM_TO_ORDER_LIST);

export const CHANGE_ELEMENT_RATING = 'CHANGE_ELEMENT_RATING';
export const changeElementRating = createAction(CHANGE_ELEMENT_RATING);

export const CLEAR_ORDER_LIST = 'CLEAR_ORDER_LIST';
export const clearOrdersList = createAction(CLEAR_ORDER_LIST);

export const OVERWRITE_ORDER_ITEM = 'OVERWRITE_ORDER_ITEM';
export const overwriteOrderListItem = createAction(OVERWRITE_ORDER_ITEM);

export const REMOVE_ORDER_ITEM = 'REMOVE_ORDER_ITEM';
export const removeOrderItem = createAction(REMOVE_ORDER_ITEM);

export const TIE_THE_ORDER_TO_THE_TABLE = 'TIE_THE_ORDER_TO_THE_TABLE';
export const tieTheOrderToTheTable = createAction(TIE_THE_ORDER_TO_THE_TABLE);

export const CLEAR_ORDER_LIST_FROM_THE_TABLE =
  'CLEAR_ORDER_LIST_FROM_THE_TABLE';
export const clearOrderListFromTheTable = createAction(
  CLEAR_ORDER_LIST_FROM_THE_TABLE,
);

export const CALCULATE_THE_CLIENT = 'CALCULATE_THE_CLIENT';
export const calculateTheExtractor = createAction(CALCULATE_THE_CLIENT);

export const getMenuList = (params) => (dispatch, getState) => {
  dispatch(setLoading(true));
  getFetchListByCategories(params)
    .then((data) => {
      dispatch(setMenuList(data));
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => {
      dispatch(setLoading(false));
    });
};

export const getOrderList = () => async (dispatch) => {
  dispatch(setLoading(true));

  try {
    const orders = await getItemsFromLocalStorage();
    dispatch(setOrderList(orders));
  } catch (error) {
    console.error(error);
  }

  dispatch(setLoading(false));
};

export const addMenuItems = (value) => async (dispatch, getState) => {
  dispatch(setLoading(true));
  dispatch(addMenuItemToOrderList(value));

  try {
    saveItemsToLocalStorage(value);
  } catch (error) {
    console.error(error);
  }

  dispatch(setLoading(false));
};

export const changeItemRating =
  (params, id, newRating) => (dispatch, getState) => {
    const { list } = getState();
    const item = list.find((el) => el._id === id);
    const newItem = { ...item, rate: newRating };
    setNewRatingToTheMenuItem(params, id, newItem)
      .then((data) => {
        dispatch(changeElementRating(data));
      })
      .catch((error) => {
        console.error(error);
      });
  };

export const clearStorage = () => async (dispatch, getState) => {
  dispatch(setLoading(true));
  dispatch(clearOrdersList());

  try {
    clearLocalStorage();
  } catch (error) {
    console.error(error);
  }

  dispatch(setLoading(false));
};

export const overwriteOrderItem = (id, value) => async (dispatch, getState) => {
  dispatch(setLoading(true));
  const { orders } = getState();
  const order = orders.find((item) => item._id === id);
  dispatch(overwriteOrderListItem({ ...order, numbers: value }));

  try {
    updateItemsInLocalStorage(id, { ...order, numbers: value });
  } catch (error) {
    console.error(error);
  }

  dispatch(setLoading(false));
};

export const removeOrderElement = (id) => async (dispatch, getState) => {
  dispatch(setLoading(true));
  dispatch(removeOrderItem(id));

  try {
    deleteItemsFromLocalStorage(id);
  } catch (error) {
    console.error(error);
  }

  dispatch(setLoading(false));
};

export const tieOrder = (order) => (dispatch, getState) => {
  const { tables } = getState();
  const table = tables.find((item) => item.name === order.name);
  table.order.push(...order.list);
  dispatch(setLoading(true));
  setOrdersListToTable(table._id, table)
    .then((data) => {
      dispatch(tieTheOrderToTheTable(data));
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => {
      dispatch(setLoading(false));
    });
};

export const clearTableOrders = (id, order) => (dispatch, getState) => {
  const { tables } = getState();
  const rightTable = tables.find((item) => item._id === id);
  let newItem = { ...rightTable, order };
  dispatch(setLoading(true));
  setOrdersListToTable(id, newItem)
    .then(() => {
      dispatch(clearOrderListFromTheTable(id));
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => {
      dispatch(setLoading(false));
    });
};

export const saveSalesDate = (obj) => (dispatch, getState) => {
  dispatch(setLoading(true));
  addSalesData(obj)
    .then((data) => {
      dispatch(calculateTheExtractor(data));
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => {
      dispatch(setLoading(false));
    });
};

export const getSalesList = (params) => (dispatch, getState) => {
  dispatch(setLoading(true));
  getFetchListByCategories(params)
    .then((data) => {
      dispatch(setSalesList(data));
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => {
      dispatch(setLoading(false));
    });
};
