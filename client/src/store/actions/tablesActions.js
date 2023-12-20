import { createAction } from "../actionsCreator";
import { addTableToTheDataList, getFetchListByCategories, removeTableFromTheDataList } from "../api";

export const SET_LOADING = 'SET_LOADING'
export const setTableListLoading = createAction(SET_LOADING);

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
        }).catch((error) => {
            console.error(error);
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
        }).catch((error) => {
            console.error(error);
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
        }).catch((error) => {
            console.error(error);
        })
        .finally(() => {
            dispatch(setTableListLoading(false));
        })
}