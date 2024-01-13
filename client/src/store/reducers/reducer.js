import { initialValue } from '../../config/config';
import {
  ADD_EMPLOYEE,
  DELETE_EMPLOYEE,
  SET_PERSONNELS_LIST,
} from '../actions/personnelsActions';
import {
  ADD_MENU_ITEM_TO_ORDER_LIST,
  CALCULATE_THE_CLIENT,
  CHANGE_ELEMENT_RATING,
  CLEAR_ORDER_LIST,
  CLEAR_ORDER_LIST_FROM_THE_TABLE,
  OVERWRITE_ORDER_ITEM,
  REMOVE_ORDER_ITEM,
  SET_AUTH,
  SET_CURRENT_PAGE,
  SET_ERROR,
  SET_ERROR_BODY,
  SET_LOADING,
  SET_MENU_LIST,
  SET_ORDER_LIST,
  SET_PAGES_LIMIT,
  SET_SALES_LIST,
  SET_SEARCH_VALUE,
  SET_TOTAL_PAGES,
  SET_USER,
  TIE_THE_ORDER_TO_THE_TABLE,
} from '../actions/servicesActions';
import {
  ADD_TABLE,
  DELETE_TABLE,
  SET_TABLES_LIST,
} from '../actions/tablesActions';

export default function reducer(state = initialValue, { type, payload }) {
  switch (type) {
    case SET_LOADING:
      return { ...state, isLoading: payload };
    case SET_AUTH:
      return { ...state, isAuth: payload };
    case SET_ERROR:
      return { ...state, error: payload };
    case SET_ERROR_BODY:
      return { ...state, errorBody: payload };
    case SET_USER:
      return { ...state, user: payload };
    case SET_TABLES_LIST:
      return { ...state, tables: [...payload] };
    case SET_MENU_LIST:
      return { ...state, list: [...payload] };
    case SET_ORDER_LIST:
      return { ...state, orders: [...payload] };
    case SET_PERSONNELS_LIST:
      return { ...state, personnels: [...payload] };
    case SET_SALES_LIST:
      return { ...state, sales: payload };
    case SET_PAGES_LIMIT:
      return { ...state, pagesLimit: payload };
    case SET_SEARCH_VALUE:
      return { ...state, search: payload };
    case SET_CURRENT_PAGE:
      return { ...state, page: payload };
    case SET_TOTAL_PAGES:
      return { ...state, total: payload };
    case ADD_MENU_ITEM_TO_ORDER_LIST:
      return addMenuItem(state, payload);
    case CHANGE_ELEMENT_RATING:
      return changeRating(state, payload);
    case CLEAR_ORDER_LIST:
      return clearOrders(state, payload);
    case OVERWRITE_ORDER_ITEM:
      return overwriteItem(state, payload);
    case REMOVE_ORDER_ITEM:
      return removeOrderItem(state, payload);
    case TIE_THE_ORDER_TO_THE_TABLE:
      return addOrderToTheTable(state, payload);
    case CLEAR_ORDER_LIST_FROM_THE_TABLE:
      return clearOrderFromTheTable(state, payload);
    case CALCULATE_THE_CLIENT:
      return calculate(state, payload);
    case ADD_TABLE:
      return addTable(state, payload);
    case ADD_EMPLOYEE:
      return addWorker(state, payload);
    case DELETE_TABLE:
      return removeTable(state, payload);
    case DELETE_EMPLOYEE:
      return removeWorker(state, payload);

    default:
      return state;
  }
}

function addMenuItem(state, item) {
  const existingItem = state.orders.find((existing) => existing._id === item._id);

  if (existingItem) {
    // Якщо елемент уже існує, оновіть його numbers
    const updatedOrders = state.orders.map((existing) => {
      if (existing._id === item._id) {
        return {
          ...existing,
          numbers: existing.numbers + item.numbers,
        };
      }
      return existing;
    });

    return {
      ...state,
      orders: updatedOrders,
    };
  } else {
    // Якщо елемент ще не існує, просто додайте його
    return {
      ...state,
      orders: [...state.orders, item],
    };
  }
}

function changeRating(state, item) {
  return {
    ...state,
    list: state.list.map((elem) => (elem._id !== item._id ? elem : item)),
  };
}

function clearOrders(state) {
  return {
    ...state,
    orders: [],
  };
}

function overwriteItem(state, item) {
  return {
    ...state,
    orders: state.orders.map((element) =>
      element._id !== item._id ? element : item,
    ),
  };
}

function removeOrderItem(state, id) {
  return {
    ...state,
    orders: state.orders.filter((item) => item._id !== id),
  };
}

function addOrderToTheTable(state, item) {
  return {
    ...state,
    tables: state.tables.map((table) =>
      table.name === item.name
        ? { ...table, order: [...table.order, item] }
        : table,
    ),
  };
}

function clearOrderFromTheTable(state, id) {
  return {
    ...state,
    tables: state.tables.map((table) =>
      table._id === id ? { ...table, order: [] } : table,
    ),
  };
}

function calculate(state, payload) {
  return {
    ...state,
    sales: [...state.sales, payload],
  };
}

function addTable(state, table) {
  return {
    ...state,
    tables: [...state.tables, { ...table, order: [] }],
  };
}

function removeTable(state, id) {
  return {
    ...state,
    tables: state.tables.filter((table) => table._id !== id),
  };
}

function addWorker(state, payload) {
  return {
    ...state,
    personnels: [...state.personnels, payload],
  };
}

function removeWorker(state, id) {
  return {
    ...state,
    personnels: state.personnels.filter((worker) => worker._id !== id),
  };
}
