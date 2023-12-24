import React from 'react';
import { Button, useMediaQuery } from '@mui/material';

export default function ModalButton({ modalOpen, children }) {
  const smallScreen = useMediaQuery('(max-width: 600px)');
  return (
    <Button
      onClick={modalOpen}
      variant="contained"
      sx={{
        backgroundColor: '#121212',
        fontSize: {
          xs: 24,
          sm: 16,
        },
        padding: 0,
        marginLeft: {
          xs: 3,
        },
        width: {
          xs: 30,
          sm: 120,
        },
        color: {
          xs: 'red',
        },
      }}
    >
      {smallScreen ? '+' : children}
    </Button>
  );
}
