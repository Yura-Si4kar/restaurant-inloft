import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { Grid, Typography, useMediaQuery } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectPersonnelList } from '../../../store/selectors/selectors';
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

export default function WaitersSalary({ sales }) {
    const waiters = useSelector(selectPersonnelList);
    const classes = useStyles();
    const smallScreen = useMediaQuery('(max-width:600px)');
    const calculateSalary = () => {
        let salary = [];

        for (let i = 0; i < waiters.length; i++) {
            let waiterSales = sales.filter((item) => item.waiter === waiters[i].name);
            let waitersSalary = waiterSales.reduce((acc, item) => acc + item.sum, 0) * waiters[i].salary / 100;
            
            salary.push(waitersSalary)
        }
      
        let totalWaitersSalary = salary.reduce((acc, val) => acc + val, 0);
        let salaryPercentage = salary.map((item) => (item * 100 / totalWaitersSalary).toFixed(2))

        return salaryPercentage;
    }
    

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
    }

    const data = {
        labels: waiters.map((waiter) => waiter.name),
        datasets: [
            {
            label: 'Відсоток від всієї виручки в %',
            data: calculateSalary(),
            backgroundColor: createBackgroundsColor(),
            borderColor: createBackgroundsColor(),
            borderWidth: 1,
            },
        ],
    };

    return (
        <Grid xs={12} sm={6} item className={classes.chartContainer}>
            <Typography variant={smallScreen ? 'h5' : 'h4'} className={classes.chartTitle} sx={{ textAlign: { xs: 'center' } }}>
                Активність працівників
            </Typography>
            <Doughnut data={data} style={{maxWidth: '100%'}}/>
        </Grid>
    )
}
