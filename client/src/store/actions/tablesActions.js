import { getListByParams } from '../../http/servicesApi';
import { createAction } from '../actionsCreator';
import {
  addTableToDataList,
  removeTableFromDataList,
} from '../../http/tablesApi.js';

export const SET_LOADING = 'SET_LOADING';
export const setTableListLoading = createAction(SET_LOADING);

export const SET_ERROR = 'SET_ERROR';
export const setTablesError = createAction(SET_ERROR);

export const SET_ERROR_BODY = 'SET_ERROR_BODY';
export const setTablesErrorBody = createAction(SET_ERROR_BODY);

export const SET_TABLES_LIST = 'SET_TABLES_LIST';
export const setTablesList = createAction(SET_TABLES_LIST);

export const ADD_TABLE = 'ADD_TABLE';
export const addTable = createAction(ADD_TABLE);

export const DELETE_TABLE = 'DELETE_TABLE';
export const deleteItem = createAction(DELETE_TABLE);

export const getTableList = (params) => (dispatch, getState) => {
  dispatch(setTableListLoading(true));
  getListByParams(params)
    .then((data) => {
      dispatch(setTablesList(data));
      dispatch(setTablesError(false));
      dispatch(setTablesErrorBody({}));      
    })
    .catch((error) => {
      console.error(error);
      dispatch(setTablesError(true));
      dispatch(setTablesErrorBody(error));      
    })
    .finally(() => {
      dispatch(setTableListLoading(false));
    });
};

export const addItem = (item) => (dispatch, getState) => {
  dispatch(setTableListLoading(true));
  addTableToDataList(item)
    .then((data) => {
      dispatch(addTable(data));
      dispatch(setTablesError(false));
      dispatch(setTablesErrorBody({}));      
    })
    .catch((error) => {
      console.error(error);
      dispatch(setTablesError(true));
      dispatch(setTablesErrorBody(error));      
    })
    .finally(() => {
      dispatch(setTableListLoading(false));
    });
};

export const deleteTable = (id) => (dispatch, getState) => {
  dispatch(setTableListLoading(true));
  removeTableFromDataList(id)
    .then(() => {
      dispatch(deleteItem(id));
      dispatch(setTablesError(false));
      dispatch(setTablesErrorBody({}));      
    })
    .catch((error) => {
      console.error(error);
      dispatch(setTablesError(true));
      dispatch(setTablesErrorBody(error));      
    })
    .finally(() => {
      dispatch(setTableListLoading(false));
    });
};
