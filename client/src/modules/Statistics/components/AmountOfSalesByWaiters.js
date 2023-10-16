import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { Grid, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectPersonnelList } from '../../../store/selectors/selectors';
import { useMediaQuery } from '@mui/material';
import { makeStyles } from '@mui/styles';

ChartJS.register(ArcElement, Tooltip, Legend);

const useStyles = makeStyles(() => ({
  chartContainer: {
    margin: '20px auto',
    maxWidth: 600,
  },
  chartTitle: {
    marginBottom: 10,
  },
}));

export default function AmountOfSalesByWaiters({ sales }) {
  const waiters = useSelector(selectPersonnelList);
  const classes = useStyles();
  const smallScreen = useMediaQuery('(max-width:600px)');

  const calculateTheWaitersProfit = () => {
    let profit = [];
    let totalAmount = sales.reduce((acc, item) => acc + item.sum, 0);

    for (let i = 0; i < waiters.length; i++) {
      let waiterSales = sales.filter((item) => item.waiter === waiters[i].name);
      let salesPercentage = waiterSales.reduce((acc, item) => acc + item.sum, 0) * 100 / totalAmount;

      profit.push(salesPercentage.toFixed(2));
    }

    return profit;
  };

  const createBackgroundsColor = () => {
    let colors = [];

    for (let i = 0; i < waiters.length; i++) {
      const hex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F'];
      let hexColor = '#';

      for (let i = 0; i < 6; i++) {
        hexColor += hex[getRandomHexColor()];
      }

      colors.push(hexColor);

      function getRandomHexColor() {
        return Math.floor(Math.random() * hex.length);
      }
    }

    return colors;
  };

  const data = {
    labels: waiters.map((waiter) => waiter.name),
    datasets: [
      {
        label: 'Прибуток з офіціантів',
        data: calculateTheWaitersProfit(),
        backgroundColor: createBackgroundsColor(),
        borderColor: createBackgroundsColor(),
        borderWidth: 1,
      },
    ],
  };

  return (
    <Grid item xs={12} sm={6} className={classes.chartContainer}>
      <Typography variant={smallScreen ? 'h5' : 'h4'} className={classes.chartTitle} sx={{textAlign:{xs:'center'}}}>
        Дохід від офіціантів
      </Typography>
      <Pie data={data} style={{maxWidth: '100%'}}/>
    </Grid>
  );
}
