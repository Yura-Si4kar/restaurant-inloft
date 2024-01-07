import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Grid, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { useMediaQuery } from '@mui/material';
import { selectPersonnelsList } from '../../store/selectors/selectors';
import { generateChartConfig } from '../../utils/chartUtils';
import { createBackgroundsColor } from '../../utils/hexColorGenerator';

export default function AmountOfSalesByWaiters({ sales }) {
  const waiters = useSelector(selectPersonnelsList);
  const smallScreen = useMediaQuery('(max-width:600px)');

  const calculateTheWaitersProfit = () => {
    let profit = [];
    let totalAmount = sales.reduce((acc, item) => acc + item.sum, 0);

    for (let i = 0; i < waiters.length; i++) {
      let waiterSales = sales.filter((item) => item.waiter === waiters[i].name);
      let salesPercentage =
        (waiterSales.reduce((acc, item) => acc + item.sum, 0) * 100) /
        totalAmount;

      profit.push(salesPercentage.toFixed(2));
    }

    return profit;
  };

  const labels = waiters.map((waiter) => waiter.name);
  const salary = calculateTheWaitersProfit();
  const label = 'Прибуток з офіціантів';
  const data = generateChartConfig(
    labels,
    salary,
    label,
    createBackgroundsColor(waiters),
  );

  return (
    <Grid item xs={12} sm={6} className="chart-container">
      <Typography variant={smallScreen ? 'h5' : 'h4'} className="chart-title">
        Дохід від офіціантів
      </Typography>
      <Pie data={data} className="chart-pie" />
    </Grid>
  );
}
