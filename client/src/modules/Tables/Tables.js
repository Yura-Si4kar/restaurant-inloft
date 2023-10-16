import React, { useEffect, useState } from 'react';
import { Button, Container, Grid, useMediaQuery } from '@mui/material';
import { selectTablesList } from '../../store/selectors/selectors';
import TablesItem from './components/TablesItem';
import { useDispatch, useSelector } from 'react-redux';
import TableDialogForm from './components/TableDialogForm';
import { getTableList } from '../../store/actions/tablesActions';
import { getPersonnelList } from '../../store/actions/personnelActions';

export default function Tables() {
  const dispatch = useDispatch();
  const tables = useSelector(selectTablesList);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  }

  const smallScreen = useMediaQuery('(max-width: 600px');

  useEffect(() => {
    dispatch(getTableList('tables'));
    dispatch(getPersonnelList('personnel'));
  }, [dispatch])

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Container style={{ paddingTop: 20 }}>
      <Grid container spacing={1}>
        <Grid container item xs={12} spacing={3}>
          {tables.map((item) => <TablesItem key={item.id} table={item} />)}
        </Grid>
      </Grid>
      <TableDialogForm open={open} handleClose={handleClose}/>
      <Button
          onClick={handleOpen}
          variant='contained'
          sx={{
            position: 'absolute',
            backgroundColor: '#121212',
            padding: 0,
            fontSize: {
              xs: 24,
              sm: 16
            },
            top: {
              xs: 4,
              sm: 6
            },
            right: {
              xs: 5,
              sm: 30
            },
            width: {
              xs: 30,
              md: 50
            },
            color: {
              xs: 'red',
            },
          }}
      >
          {smallScreen ? '+' : 'Додати столик'}
      </Button>
    </Container>
  );
}