import { createAction } from '../actionsCreator';
import {
  addEmploeeToTheDataList,
  getFetchListByCategories,
  removeEmploeeFromTheDataList,
} from '../api';

export const SET_LOADING = 'SET_LOADING';
export const setPersonnelListLoading = createAction(SET_LOADING);

export const SET_ERROR = 'SET_ERROR';
export const setPersonnelsError = createAction(SET_ERROR);

export const SET_ERROR_BODY = 'SET_ERROR_BODY';
export const setPersonnelsErrorBody = createAction(SET_ERROR_BODY);

export const SET_PERSONNELS_LIST = 'SET_PERSONNELS_LIST';
export const setPersonellList = createAction(SET_PERSONNELS_LIST);

export const ADD_EMPLOYEE = 'ADD_EMPLOYEE';
export const addEmployee = createAction(ADD_EMPLOYEE);

export const DELETE_EMPLOYEE = 'DELETE_EMPLOYEE';
export const deleteEmployee = createAction(DELETE_EMPLOYEE);

export const getPersonnelsList = (params) => (dispatch, getState) => {
  dispatch(setPersonnelListLoading(true));
  getFetchListByCategories(params)
    .then((data) => {
      dispatch(setPersonellList(data));
      dispatch(setPersonnelsError(false));
      dispatch(setPersonnelsErrorBody({}));
    })
    .catch((error) => {
      console.error(error);
      dispatch(setPersonnelsError(true));
      dispatch(setPersonnelsErrorBody(error));
    })
    .finally(() => {
      dispatch(setPersonnelListLoading(false));
    });
};

export const addUser = (user) => (dispatch, getState) => {
  dispatch(setPersonnelListLoading(true));
  addEmploeeToTheDataList(user)
    .then((data) => {
      dispatch(addEmployee(data));
      dispatch(setPersonnelsError(false));
      dispatch(setPersonnelsErrorBody({}));      
    })
    .catch((error) => {
      console.error(error);
      dispatch(setPersonnelsError(true));
      dispatch(setPersonnelsErrorBody(error));      
    })
    .finally(() => {
      dispatch(setPersonnelListLoading(false));
    });
};

export const fireAnEmployee = (id) => (dispatch, getState) => {
  dispatch(setPersonnelListLoading(true));
  removeEmploeeFromTheDataList(id)
    .then(() => {
      dispatch(deleteEmployee(id));
      dispatch(setPersonnelsError(false));
      dispatch(setPersonnelsErrorBody({}));      
    })
    .catch((error) => {
      console.error(error);
      dispatch(setPersonnelsError(true));
      dispatch(setPersonnelsErrorBody(error));      
    })
    .finally(() => {
      dispatch(setPersonnelListLoading(false));
    });
};
