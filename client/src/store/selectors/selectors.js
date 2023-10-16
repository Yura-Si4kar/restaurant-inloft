export function selectLoading(state) {
    return state.isLoading;
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

export function selectPersonnelList(state) {
    return state.personnel;
}

export function selectStatisticsList(state) {
    return state.sales;
}

export function selectError(state) {
    return state.error;
}