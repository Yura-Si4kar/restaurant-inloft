export function selectIsAuth(state) {
  return state.isAuth;
}

export function selectIsLoading(state) {
  return state.isLoading;
}

export function selectIsError(state) {
  return state.error;
}

export function selectErrorBody(state) {
  return state.errorBody;
}

export function selectUser(state) {
  return state.user;
}

export function selectMenuList(state) {
  return state.list;
}

export function selectOrdersList(state) {
  return state.orders;
}

export function selectTablesList(state) {
  return state.tables;
}

export function selectPersonnelsList(state) {
  return state.personnels;
}

export function selectStatisticsList(state) {
  return state.sales;
}

export function selectSearchString(state) {
  return state.search;
}

export function selectPagesLimit(state) {
  return state.pagesLimit;
}

export function selectCurrentPage(state) {
  return state.page;
}

export function selectTotalPages(state) {
  return state.total;
}
