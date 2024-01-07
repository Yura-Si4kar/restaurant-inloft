import { Container, Grid } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectTablesList } from '../store/selectors/selectors';
import { getTableList } from '../store/actions/tablesActions';
import { getPersonnelsList } from '../store/actions/personnelsActions';
import TablesItem from '../components/Items/TablesItem';
import { PERSONNELS_LIST_PARAM, TABLES_LIST_PARAM } from '../config/consts';

export default function TablesPage() {
  const dispatch = useDispatch();
  const tables = useSelector(selectTablesList);

  useEffect(() => {
    dispatch(getTableList(TABLES_LIST_PARAM));
    dispatch(getPersonnelsList(PERSONNELS_LIST_PARAM));
  }, [dispatch]);

  return (
    <Container className="tables-container">
      <Grid container spacing={1}>
        <Grid container item xs={12} spacing={3}>
          {tables.map((item) => (
            <TablesItem key={item._id} table={item} />
          ))}
        </Grid>
      </Grid>
    </Container>
  );
}
