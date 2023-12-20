import React, { useEffect } from 'react'
import { Container, Grid } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { selectStatisticsList } from '../store/selectors/selectors';
import { getSalesList } from '../store/actions/servicesActions';
import { getTableList } from '../store/actions/tablesActions';
import { getPersonnelsList } from '../store/actions/personnelsActions';
import SalesAtTables from '../components/Сharts/SalesAtTables';
import AmountOfSalesByWaiters from '../components/Сharts/AmountOfSalesByWaiters';
import WaitersSalary from '../components/Сharts/WaitersSalary';

export default function Statistics() {
  const dispatch = useDispatch();
  const salesList = useSelector(selectStatisticsList);

  useEffect(() => {
    dispatch(getSalesList('sales'));
    dispatch(getTableList('tables'));
    dispatch(getPersonnelsList('personnels'));
  }, [dispatch])

  return (
    <Container>
      <Grid container spacing={2}>
        <SalesAtTables sales={salesList} />
        <AmountOfSalesByWaiters sales={salesList} />
        <WaitersSalary sales={salesList}/>
      </Grid>
    </Container>
  )
}
