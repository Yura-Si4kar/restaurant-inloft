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
import { Grid, ThemeProvider, createTheme } from '@mui/material';
import Loading from '../components/Loading';
import Error from '../components/Error';
import { setIsAuth, setLoading, setUser } from '../store/actions/servicesActions';
import { check } from '../http/userApi';

const darkTheme = createTheme({ palette: { mode: 'dark' } });

export default function App() {
  const loading = useSelector(selectIsLoading);
  const error = useSelector(selectIsError);
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();

  useEffect(() => {
  console.log("Before API call");
  dispatch(setLoading(true))
  check()
    .then(data => {
      console.log("API call successful");
      dispatch(setUser(data));
      dispatch(setIsAuth(true));
    })
    .catch(error => {
      console.error("API call error:", error);
      dispatch(setUser({}));
      dispatch(setIsAuth(false));
    })
    .finally(() => {
      console.log("API call completed");
      dispatch(setLoading(false));
    });
  }, [dispatch])

  return (
    <Grid container spacing={12}>
      <Grid item xs={12}>
        <ThemeProvider theme={darkTheme}>
          <BrowserRouter>
            {loading && <Loading />}
            {error && <Error />}
            {isAuth && <NavigationBar />}
            <AppRouter />
          </BrowserRouter>
        </ThemeProvider>
      </Grid>
    </Grid>
  );
}