import React from 'react';
import { useSelector } from 'react-redux';
import { selectIsAuth } from '../store/selectors/selectors';
import { privatePages, publicPages } from '../routers/routers';
import { Navigate, Route, Routes } from 'react-router-dom';
import { HOME_ROUTE } from '../config/consts';

export default function AppRouter() {
  const isAuth = useSelector(selectIsAuth);

  return (
    <Routes>
      {isAuth
        ? privatePages.map((page) => (
            <Route
              key={page.path}
              path={page.path}
              element={page.component}
              caseSensitive={page.caseSensitive}
            />
          ))
        : publicPages.map((page) => (
            <Route
              key={page.path}
              path={page.path}
              element={page.component}
              caseSensitive={page.caseSensitive}
            />
        ))}
      <Route path='/*' element={<Navigate to={HOME_ROUTE} />} />
    </Routes>
  );
}
