import React, { useEffect } from 'react';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getTableList } from '../../store/actions/tablesActions';
import { selectError, selectLoading } from '../../store/selectors/selectors';
import Loading from '../../Components/Loading/Loading';
import Error from '../../Components/Error';

const darkTheme = createTheme({ palette: { mode: 'dark' } });

export default function App() {
  const TABLE_LIST_PARAM = 'tables';
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(getTableList(TABLE_LIST_PARAM));
  }, [dispatch]);

  return (
    <>
      {loading && <Loading />}
      {error && <Error/>}
      <Grid container spacing={12}>
        {[darkTheme].map((theme, index) => (
          <Grid item xs={12} key={index}>
            <ThemeProvider theme={theme}>
              <Outlet/>
            </ThemeProvider>
          </Grid>
        ))}
      </Grid>
    </>
  );
}