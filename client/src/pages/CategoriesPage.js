import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Grid, ListItem, Typography } from '@mui/material';
import { pages } from '../config/consts';

export default function Categories() {
  return (
    <Container className="categories-container">
      <Grid container spacing={2}>
        {pages.map((page, index) => (
          <Grid item xs={6} sm={4} md={3} lg={2} key={index}>
            <Link to={page} className="categories-link">
              <ListItem className="categories-item">
                <Typography variant="h5" className="categories-text">
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
