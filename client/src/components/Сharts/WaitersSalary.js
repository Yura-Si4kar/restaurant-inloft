import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Grid, Typography, useMediaQuery } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectPersonnelsList } from '../../store/selectors/selectors';
import { createBackgroundsColor } from '../../utils/hexColorGenerator';
import { generateChartConfig } from '../../utils/chartUtils';

export default function WaitersSalary({ sales }) {
  const waiters = useSelector(selectPersonnelsList);
  const smallScreen = useMediaQuery('(max-width:600px)');

  const calculateSalary = () => {
    let salary = [];

    for (let i = 0; i < waiters.length; i++) {
      let waiterSales = sales.filter((item) => item.waiter === waiters[i].name);
      let waitersSalary =
        (waiterSales.reduce((acc, item) => acc + item.sum, 0) *
          waiters[i].salary) /
        100;

      salary.push(waitersSalary);
    }

    let totalWaitersSalary = salary.reduce((acc, val) => acc + val, 0);
    let salaryPercentage = salary.map((item) =>
      ((item * 100) / totalWaitersSalary).toFixed(2),
    );

    return salaryPercentage;
  };

  const labels = waiters.map((waiter) => waiter.name);
  const salary = calculateSalary();
  const label = 'Відсоток від всієї виручки в %';
  const data = generateChartConfig(
    labels,
    salary,
    label,
    createBackgroundsColor(waiters),
  );

  return (
    <Grid xs={12} sm={6} item className="chart-container">
      <Typography variant={smallScreen ? 'h5' : 'h4'} className="chart-title">
        Активність працівників
      </Typography>
      <Doughnut data={data} className="chart-pie" />
    </Grid>
  );
}
