import {
  clearLocalStorage,
  deleteItemsFromLocalStorage,
  getItemsFromLocalStorage,
  saveItemsToLocalStorage,
  updateItemsInLocalStorage,
} from '../../storages/localStorage';
import { createAction } from '../actionsCreator';
import { addSalesData } from '../../http/statisticsApi';
import { getListByParams, updateMenuItemRating, setOrdersListToTable } from '../../http/servicesApi';

export const SET_LOADING = 'SET_LOADING';
export const setLoading = createAction(SET_LOADING);

export const SET_AUTH = 'SET_AUTH';
export const setIsAuth = createAction(SET_AUTH);

export const SET_ERROR = 'SET_ERROR';
export const setError = createAction(SET_ERROR);

export const SET_ERROR_BODY = 'SET_ERROR_BODY';
export const setErrorBody = createAction(SET_ERROR_BODY);

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

export const SET_SEARCH_VALUE = 'SET_SEARCH_VALUE';
export const setSearchValue = createAction(SET_SEARCH_VALUE);

export const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
export const setCurrrentPage = createAction(SET_CURRENT_PAGE);

export const SET_TOTAL_PAGES = 'SET_TOTAL_PAGES';
export const setTotal = createAction(SET_TOTAL_PAGES);

export const SET_PAGES_LIMIT = 'SET_PAGES_LIMIT';
export const setPagesLimit = createAction(SET_PAGES_LIMIT);

export const getMenuList =
  (params, page, limit, search) => (dispatch, getState) => {
    dispatch(setLoading(true));
    getListByParams(params, page, limit, search)
    .then((data) => {
      dispatch(setMenuList(data.collections));
      dispatch(setTotal(data.total));
    })
    .catch((error) => {
      console.error(error);
      dispatch(setError(true));
      dispatch(setErrorBody(error));
    })
    .finally(() => {
      dispatch(setLoading(false));
      dispatch(setError(false));
      dispatch(setErrorBody({}));
    });
};

export const getOrderList = () => async (dispatch) => {
  dispatch(setLoading(true));

  try {
    const orders = await getItemsFromLocalStorage();
    dispatch(setOrderList(orders));
    dispatch(setError(false));
    dispatch(setErrorBody({}));
  } catch (error) {
    console.error(error);
    dispatch(setError(true));
    dispatch(setErrorBody(error));
  }

  dispatch(setLoading(false));
};

export const addMenuItems = (value) => async (dispatch, getState) => {
  dispatch(setLoading(true));
  dispatch(addMenuItemToOrderList(value));

  try {
    saveItemsToLocalStorage(value);
    dispatch(setError(false));
    dispatch(setErrorBody({}));
  } catch (error) {
    console.error(error);
    dispatch(setError(true));
    dispatch(setErrorBody(error));
  }

  dispatch(setLoading(false));
};

export const changeItemRating =
  (params, id, newRating) => (dispatch, getState) => {
    const { list } = getState();
    const item = list.find((el) => el._id === id);
    const newItem = { ...item, rate: newRating };
    updateMenuItemRating(params, id, newItem)
      .then((data) => {
        dispatch(changeElementRating(data));
        dispatch(setError(false));
        dispatch(setErrorBody({}));
      })
      .catch((error) => {
        console.error(error);
        dispatch(setError(true));
        dispatch(setErrorBody(error));
      });
  };

export const clearStorage = () => async (dispatch, getState) => {
  dispatch(setLoading(true));
  dispatch(clearOrdersList());

  try {
    clearLocalStorage();
    dispatch(setError(false));
    dispatch(setErrorBody({}));
  } catch (error) {
    console.error(error);
    dispatch(setError(true));
    dispatch(setErrorBody(error));
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
    dispatch(setError(false));
    dispatch(setErrorBody({}));
  } catch (error) {
    console.error(error);
    dispatch(setError(true));
    dispatch(setErrorBody(error));
  }

  dispatch(setLoading(false));
};

export const removeOrderElement = (id) => async (dispatch, getState) => {
  dispatch(setLoading(true));
  dispatch(removeOrderItem(id));

  try {
    deleteItemsFromLocalStorage(id);
    dispatch(setError(false));
    dispatch(setErrorBody({}));
  } catch (error) {
    console.error(error);
    dispatch(setError(true));
    dispatch(setErrorBody(error));
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
      dispatch(setError(false));
      dispatch(setErrorBody({}));
    })
    .catch((error) => {
      console.error(error);
      dispatch(setError(false));
      dispatch(setErrorBody(error));
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
      dispatch(setError(false));
      dispatch(setErrorBody({}));
    })
    .catch((error) => {
      console.error(error);
      dispatch(setError(true));
      dispatch(setErrorBody(error));
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
      dispatch(setError(false));
      dispatch(setErrorBody({}));
    })
    .catch((error) => {
      console.error(error);
      dispatch(setError(true));
      dispatch(setErrorBody(error));
    })
    .finally(() => {
      dispatch(setLoading(false));
    });
};

export const getSalesList = (params) => (dispatch, getState) => {
  dispatch(setLoading(true));
  getListByParams(params)
    .then((data) => {
      dispatch(setSalesList(data));
      dispatch(setError(false));
      dispatch(setErrorBody({}));
    })
    .catch((error) => {
      console.error(error);
      dispatch(setError(false));
      dispatch(setErrorBody(error));
    })
    .finally(() => {
      dispatch(setLoading(false));
    });
};
