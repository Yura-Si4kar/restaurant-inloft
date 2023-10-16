import { Box } from '@mui/material'
import React from 'react';
import './Loading.css';

export default function Loading() {
  return (
    <Box className='box'>
      <h1 className='loading' data-text='Loading...'>Loading...</h1>
    </Box>
  )
}
