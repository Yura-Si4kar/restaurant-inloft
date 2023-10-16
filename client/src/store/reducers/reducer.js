import { initialValue } from "../../config";
import { ADD_EMPLOYEE, DELETE_EMPLOYEE, SET_PERSONELL_LIST, SET_PERSONNEL_ERROR, SET_PERSONNEL_LIST_LOADING } from "../actions/personnelActions";
import {
    ADD_MENU_ITEM, CALCULATE_THE_CLIENT, CHANGE_ITEM_RATING,
    CLEAR_ORDER_LIST, CLEAR_ORDER_LIST_FROM_THE_TABLE, OVERWRITE_ORDER_ITEM,
    REMOVE_ORDER_ITEM, SET_ERROR, SET_LOADING, SET_MENU_LIST,
    SET_ORDERS_LIST, SET_SALES_LIST, TIE_THE_ORDER_TO_THE_TABLE
} from "../actions/servicesActions";
import { ADD_TABLE, DELETE_TABLE, SET_TABLES_LIST, SET_TABLE_ERROR, SET_TABLE_LIST_LOADING } from "../actions/tablesActions";

export default function reducer(state = initialValue, { type, payload }) {
    switch (type) {
        case SET_LOADING:
            return { ...state, isLoading: payload }
        case SET_PERSONNEL_LIST_LOADING:
            return { ...state, isLoading: payload }
        case SET_TABLE_LIST_LOADING:
            return { ...state, isLoading: payload }
        case SET_ERROR:
            return {...state, error: payload}
        case SET_PERSONNEL_ERROR:
            return {...state, error: payload}
        case SET_TABLE_ERROR:
            return {...state, error: payload}
        case SET_MENU_LIST:
            return {...state, list: payload};
        case SET_TABLES_LIST:
            return {...state, tables: payload};
        case SET_PERSONELL_LIST:
            return {...state, personnel: payload};
        case SET_SALES_LIST:
            return {...state, sales: payload};
        case SET_ORDERS_LIST:
            return {...state, orders: payload};
        case ADD_MENU_ITEM:
            return addMenuItem(state, payload);
        case CHANGE_ITEM_RATING:
            return changeRating(state, payload);
        case REMOVE_ORDER_ITEM:
            return removeOrderItem(state, payload);
        case OVERWRITE_ORDER_ITEM:
            return overwriteItem(state, payload);
        case TIE_THE_ORDER_TO_THE_TABLE:
            return addOrderToTheTable(state, payload);
        case CLEAR_ORDER_LIST_FROM_THE_TABLE:
            return clearOrderFromTheTable(state, payload);
        case CLEAR_ORDER_LIST:
            return clearOrders(state, payload);
        case CALCULATE_THE_CLIENT:
            return calculate(state, payload);
        case ADD_EMPLOYEE:
            return addWorker(state, payload);
        case DELETE_EMPLOYEE:
            return removeWorker(state, payload);
        case ADD_TABLE:
            return addTable(state, payload);
        case DELETE_TABLE:
            return removeTable(state, payload);
        default:
            return state;
    }
}

function addMenuItem(state, item) {
    return {
        ...state, 
            orders: [...state.orders, item]
    };
}

function changeRating(state, item) {
    return {
        ...state,
            list: state.list.map((elem) => elem.id !== item.id ? elem : item)
    }
}

function removeOrderItem(state, id) {
    return {
        ...state,
            orders: state.orders.filter((item) => item.id !== id)
    }
}

function overwriteItem(state, item) {
    return {
        ...state,
            orders: state.orders.map((element) => element.id !== item.id ? element : item)
    }
}

function addOrderToTheTable(state, item) {
    return {
        ...state,
        tables: state.tables.map((table) =>
            table.name === item.name
                ? { ...table, order: [...table.order, item] }
                : table),
    }
}

function clearOrderFromTheTable(state, id) {
    return {
        ...state,
            tables: state.tables.map((table) => table.id === id ? { ...table, order: [] } : table),
    }
}

function clearOrders(state) {
    return {
        ...state,
            orders: [],
    }
}

function calculate(state, payload) {
    return {
        ...state,
            sales: [...state.sales, {...payload, id: Date.now()}]
    }
}

function addWorker(state, payload) {
    return {
        ...state,
            personnel: [...state.personnel, payload]
    }
}

function removeWorker(state, id) {
    return {
        ...state,
        personnel: state.personnel.filter((worker) => worker.id !== id)
    }
}

function addTable(state, table) {
    return {
        ...state,
            tables: [...state.tables, {...table, order: []}]
    }
}

function removeTable(state, id) {
    return {
        ...state,
            tables: state.tables.filter((table) => table.id !== id)
    }
}