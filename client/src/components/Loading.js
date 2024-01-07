import React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

export default function Loading() {
  return (
    <Backdrop className="loading-backdrop" open={true}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}
