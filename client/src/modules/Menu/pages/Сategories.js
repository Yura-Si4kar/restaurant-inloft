import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Grid, ListItem, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

const pages = ['bbqs', 'best', 'breads', 'burgers', 'chocolates', 'desserts', 'drinks', 'fried-chicken', 'ice-cream', 'pizzas', 'porks', 'sandwiches', 'sausages', 'steaks'];

const useStyles = makeStyles((theme) => ({
  listItemLink: {
    textDecoration: 'none',
    width: '100%',
  },
  listItem: {
    height: '150px',
    backgroundColor: '#121212',
    borderRadius: '15px',
    [theme.breakpoints.up('xs')]: {
      height: '150px',
    },
    [theme.breakpoints.up('sm')]: {
      height: '150px',
    },
    [theme.breakpoints.up('md')]: {
      height: '150px',
    },
  },
  listItemText: {
    color: 'red',
  },
}))

export default function Categories() {
  const classes = useStyles();
  return (
    <Container style={{paddingTop: '30px'}}>
      <Grid container spacing={2}>
        {pages.map((page, index) => (
          <Grid item xs={6} sm={4} md={3} lg={2} key={index}>
            <Link to={page} className={classes.listItemLink}>
              <ListItem className={classes.listItem}>
                <Typography variant="h5" className={classes.listItemText}>{page}</Typography>
              </ListItem>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}
