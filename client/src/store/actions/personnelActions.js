import { addEmploeeToTheDataList, getFetchListByCategories, removeEmploeeFromTheDataList } from "../api";
import { createAction } from "../utils";

export const SET_PERSONNEL_LIST_LOADING = 'SET_PERSONNEL_LIST_LOADING';
export const setPersonnelListLoading = createAction(SET_PERSONNEL_LIST_LOADING);

export const SET_PERSONNEL_ERROR = 'SET_PERSONNEL_ERROR';
export const setPersonnelError = createAction(SET_PERSONNEL_ERROR);

export const SET_PERSONELL_LIST = 'SET_PERSONELL_LIST';
export const setPersonellList = createAction(SET_PERSONELL_LIST);

export const ADD_EMPLOYEE = 'ADD_EMPLOYEE';
export const addEmployee = createAction(ADD_EMPLOYEE);

export const DELETE_EMPLOYEE = 'DELETE_EMPLOYEE';
export const deleteEmployee = createAction(DELETE_EMPLOYEE);

export const getPersonnelList = (params) => (dispatch, getState) => {
    dispatch(setPersonnelListLoading(true));
    getFetchListByCategories(params).then((data) => {
        dispatch(setPersonellList(data))
        dispatch(setPersonnelError(false));
    }).catch((error) => {
        console.error(error);    
        dispatch(setPersonnelError(true));
    })
    .finally(() => {
        dispatch(setPersonnelListLoading(false))
    })
}

export const addUser = (user) => (dispatch, getState) => {
    dispatch(setPersonnelListLoading(true));
    addEmploeeToTheDataList(user)
        .then((data) => {
            dispatch(addEmployee(data));
            dispatch(setPersonnelError(false));            
        }).catch((error) => {
            console.error(error);
            dispatch(setPersonnelError(true));          
        })
        .finally(() => {
            dispatch(setPersonnelListLoading(false));
    })
}

export const fireAnEmployee = (id) => (dispatch, getState) => {
    dispatch(setPersonnelListLoading(true));
    removeEmploeeFromTheDataList(id)
        .then(() => {
            dispatch(deleteEmployee(id));
            dispatch(setPersonnelError(false));
        }).catch((error) => {
            console.error(error);
            dispatch(setPersonnelError(true));
        })
        .finally(() => {
            dispatch(setPersonnelListLoading(false));
    })
}