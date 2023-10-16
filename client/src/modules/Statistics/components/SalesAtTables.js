import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Grid, Typography, useMediaQuery } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectTablesList } from '../../../store/selectors/selectors';
import { makeStyles } from '@mui/styles';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const useStyles = makeStyles(() => ({
  chartContainer: {
    margin: '20px auto',
    maxWidth: 600,
  },
  chartTitle: {
    marginBottom: 10,
  },
}));

export default function SalesAtTables({sales}) {
  const labels = useSelector(selectTablesList).map((item) => item.name);
  const classes = useStyles();
  const smallScreen = useMediaQuery('(max-width:600px)');
  const getDataSales = () => {
    let salesSum = [];

    for (let i = 0; i < labels.length; i++) {
      salesSum.push(sales.filter((item) => item.table === labels[i]).reduce((acc, item) => acc + item.sum, 0))
    }

    return salesSum;
  }

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
  const data = {
    labels,
    datasets: [
      {
        label: 'Дохід по столиках в $',
        data: getDataSales(),
        backgroundColor: 'rgb(255, 99, 132)',
      },
    ],
  };
  return (
    <Grid item xs={12} className={classes.chartContainer}>
      <Typography variant={smallScreen ? 'h5' : 'h4'} className={classes.chartTitle} sx={{ textAlign: { xs: 'center' } }}>
        Дохід від столиків
      </Typography>
      <Bar options={options} data={data} style={{maxWidth: '100%'}} />
    </Grid>
  )
}
