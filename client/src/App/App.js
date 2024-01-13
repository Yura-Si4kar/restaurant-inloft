import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import AppRouter from './AppRouter';
import NavigationBar from '../components/NavigationBar';
import {
  selectIsAuth,
  selectIsError,
  selectIsLoading,
} from '../store/selectors/selectors';
import { getTableList } from '../store/actions/tablesActions';
import { Grid, ThemeProvider, createTheme } from '@mui/material';
import { TABLES_LIST_PARAM } from '../config/consts';
import Loading from '../components/Loading';
import Error from '../components/Error';
import { check } from '../http/userApi';
import { setIsAuth, setLoading, setUser } from '../store/actions/servicesActions';

const darkTheme = createTheme({ palette: { mode: 'dark' } });

export default function App() {
  const dispatch = useDispatch();
  const loading = useSelector(selectIsLoading);
  const error = useSelector(selectIsError);
  const isAuth = useSelector(selectIsAuth);
  
  useEffect(() => {
    dispatch(setLoading(true))
    check()
      .then(data => {
        dispatch(setUser(data));
        dispatch(setIsAuth(true));
      })
      .catch(() => {
        dispatch(setUser({}));
        dispatch(setIsAuth(false));
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  }, [dispatch])  

  useEffect(() => {
    dispatch(getTableList(TABLES_LIST_PARAM));
  }, [dispatch]);

  return (
    <Grid container spacing={12}>
      {[darkTheme].map((theme, index) => (
        <Grid item xs={12} key={index}>
          <ThemeProvider theme={theme}>
            <BrowserRouter>
              {loading && <Loading />}
              {error && <Error />}
              {isAuth && <NavigationBar />}
              <AppRouter />
            </BrowserRouter>
          </ThemeProvider>
        </Grid>
      ))}
    </Grid>
  );
}