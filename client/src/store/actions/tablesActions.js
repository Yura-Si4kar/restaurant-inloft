import { addTableToTheDataList, getFetchListByCategories, removeTableFromTheDataList } from "../api";
import { createAction } from "../utils";

export const SET_TABLE_LIST_LOADING = 'SET_TABLE_LIST_LOADING';
export const setTableListLoading = createAction(SET_TABLE_LIST_LOADING);

export const SET_TABLE_ERROR = 'SET_TABLE_ERROR';
export const setTableError = createAction(SET_TABLE_ERROR);

export const SET_TABLES_LIST = 'SET_TABLES_LIST';
export const setTablesList = createAction(SET_TABLES_LIST);

export const ADD_TABLE = 'ADD_TABLE';
export const addTable = createAction(ADD_TABLE);

export const DELETE_TABLE = 'DELETE_TABLE';
export const deleteItem = createAction(DELETE_TABLE);

export const getTableList = (params) => (dispatch, getState) => {
    dispatch(setTableListLoading(true));
    getFetchListByCategories(params)
        .then((data) => {
            dispatch(setTablesList(data));
            dispatch(setTableError(false));
        }).catch((error) => {
            console.error(error);
            dispatch(setTableError(true));
        })
        .finally(() => {
            dispatch(setTableListLoading(false))
        })
    }
    
    export const addItem = (item) => (dispatch, getState) => {
        dispatch(setTableListLoading(true));
        addTableToTheDataList(item)
        .then((data) => {
            dispatch(addTable(data))
            dispatch(setTableError(false));
        }).catch((error) => {
            console.error(error);
            dispatch(setTableError(true));
        })
        .finally(() => {
            dispatch(setTableListLoading(false));
    })
}

export const deleteTable = (id) => (dispatch, getState) => {
    dispatch(setTableListLoading(true));
    removeTableFromTheDataList(id)
        .then(() => {
            dispatch(deleteItem(id));
            dispatch(setTableError(false));
        }).catch((error) => {
            console.error(error);
            dispatch(setTableError(true));
        })
        .finally(() => {
            dispatch(setTableListLoading(false));
        })
}