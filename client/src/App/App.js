import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import AppRouter from './AppRouter';
import NavigationBar from '../components/NavigationBar';
import { selectIsAuth, selectIsLoading } from '../store/selectors/selectors';
import { getTableList } from '../store/actions/tablesActions';
import { Grid, ThemeProvider, createTheme } from '@mui/material';
import { TABLES_LIST_PARAM } from '../config/consts';
import Loading from '../components/Loading';
import ErrorPage from '../components/ErrorPage';

const darkTheme = createTheme({ palette: { mode: 'dark' } });

export default function App() {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();
  const loading = useSelector(selectIsLoading);
  const error = false;

  useEffect(() => {
    dispatch(getTableList(TABLES_LIST_PARAM));

  }, [dispatch]);

  return (
    <Grid container spacing={12}>
      {[darkTheme].map((theme, index) => (
        <Grid item xs={12} key={index}>
          <ThemeProvider theme={theme}>
            <BrowserRouter>
              {isAuth && <NavigationBar />}
              {loading && <Loading />}
              {error && <ErrorPage />}
              <AppRouter />
            </BrowserRouter>
          </ThemeProvider>
        </Grid>
      ))}
    </Grid>
  );
}
