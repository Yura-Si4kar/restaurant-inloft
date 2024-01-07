import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Grid, Typography, useMediaQuery } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectTablesList } from '../../store/selectors/selectors';
import { createBackgroundsColor } from '../../utils/hexColorGenerator';
import { generateChartConfig } from '../../utils/chartUtils';

export default function SalesAtTables({ sales }) {
  const labels = useSelector(selectTablesList).map((item) => item.name);
  const smallScreen = useMediaQuery('(max-width:600px)');

  const getDataSales = () => {
    let salesSum = [];

    for (let i = 0; i < labels.length; i++) {
      salesSum.push(
        sales
          .filter((item) => item.table === labels[i])
          .reduce((acc, item) => acc + item.sum, 0),
      );
    }

    return salesSum;
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };

  const data = generateChartConfig(
    labels,
    getDataSales(),
    'Дохід по столиках в $',
    createBackgroundsColor(labels),
  );

  return (
    <Grid item xs={12} className="chart-container">
      <Typography
        variant={smallScreen ? 'h5' : 'h4'}
        className="chart-title"
        sx={{ textAlign: { xs: 'center' } }}
      >
        Дохід від столиків
      </Typography>
      <Bar options={options} data={data} className="chart-bar" />
    </Grid>
  );
}
