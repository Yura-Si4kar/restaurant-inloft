import { menuApi } from '../config/config';

export function getFetchListByCategories(params, page, limit, search) {
  if (search) {
    const queryString = `${params}?page=${page}&limit=${limit}&search=${search}`;

    return fetch(menuApi + queryString).then((res) => res.json());
  } else if (paramsValidation(params)) {
    const queryString = `${params}?page=${page}&limit=${limit}`;

    return fetch(menuApi + queryString).then((res) => res.json());
  } else {
    return fetch(menuApi + params).then((res) => res.json());
  }
}

export function setNewRatingToTheMenuItem(params, id, newItem) {
  return fetch(menuApi + `${params}/` + id, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newItem),
  }).then((res) => res.json());
}

export function setOrdersListToTable(id, table) {
  return fetch(menuApi + 'tables/' + id, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(table),
  }).then((res) => res.json());
}

export function addEmploeeToTheDataList(user) {
  return fetch(menuApi + 'personnels', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  }).then((res) => res.json());
}

export function removeEmploeeFromTheDataList(id) {
  return fetch(menuApi + 'personnels/' + id, {
    method: 'DELETE',
  });
}

export function addTableToTheDataList(item) {
  return fetch(menuApi + 'tables', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(item),
  }).then((res) => res.json());
}

export function removeTableFromTheDataList(id) {
  return fetch(menuApi + 'tables/' + id, {
    method: 'DELETE',
  });
}

export function addSalesData(obj) {
  return fetch(menuApi + 'sales', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(obj),
  });
}

function paramsValidation(param) {
  return param !== 'tables' || param !== 'personnels' || param !== 'sales';
}
