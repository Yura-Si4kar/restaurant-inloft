import React from 'react';
import { Button, useMediaQuery } from '@mui/material';

export default function ModalButton({ modalOpen, children }) {
  const smallScreen = useMediaQuery('(max-width: 600px)');
  return (
    <Button onClick={modalOpen} variant="contained" className="navbar__modals">
      {smallScreen ? '+' : children}
    </Button>
  );
}
