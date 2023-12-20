import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Grid, ListItem, Typography } from '@mui/material';
import useStyles from '../hooks/useStyles';
import { pages } from '../config/consts';

export default function Categories() {
  const classes = useStyles();
  return (
    <Container style={{ paddingTop: '30px' }}>
      <Grid container spacing={2}>
        {pages.map((page, index) => (
          <Grid item xs={6} sm={4} md={3} lg={2} key={index}>
            <Link to={page} className={classes.listItemLink}>
              <ListItem className={classes.listItem}>
                <Typography variant="h5" className={classes.listItemText}>
                  {page}
                </Typography>
              </ListItem>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
