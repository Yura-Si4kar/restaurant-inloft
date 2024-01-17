export const STORAGE_KEY = 'orders';
export const menuApi = 'https://shy-antelope.cyclic.app/';

export const initialValue = {
  isLoading: false,
  isAuth: false,
  error: false,
  errorBody: {},
  user: {},
  list: [],
  orders: [],
  tables: [],
  personnels: [],
  sales: [],
  search: '',
  pagesLimit: 12,
  total: 1,
};