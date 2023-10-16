import { menuApi } from "../config";

export function getFetchListByCategories(params) {
    return fetch(menuApi + params).then((res) => res.json());
}

export function setNewRatingToTheMenuItem(params, id, newItem) {
    return fetch(menuApi + `${params}/` + id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newItem),
    }).then((res) => res.json())
}

export function setOrdersListToTable(id, order) {
    return fetch(menuApi + 'tables/' + id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(order),
    }).then((res) => res.json())
}

export function addEmploeeToTheDataList(user) {
    return fetch(menuApi + 'personnel', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    }).then((res) => res.json())
}

export function removeEmploeeFromTheDataList(id) {
    return fetch(menuApi + 'personnel/' + id, {
        method: 'DELETE',
    })
}

export function addTableToTheDataList(item) {
    return fetch(menuApi + 'tables', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(item),
    }).then((res) => res.json())
}

export function removeTableFromTheDataList(id) {
    return fetch(menuApi + 'tables/' + id, {
        method: 'DELETE',
    })
}

export function addSalesData(obj) {
    return fetch(menuApi + 'sales', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
    })
}