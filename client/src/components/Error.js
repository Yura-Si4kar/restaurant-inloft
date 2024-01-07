import React from 'react';
import { Backdrop, Box, Typography } from '@mui/material';
import errorPic from '../img/Error.png';

export default function Error() {
  return (
    <Backdrop open={true} className="error__page-backdrop">
      <Box
        style={{ backgroundImage: `url(${errorPic})` }}
        className="error__page"
      >
        <Typography variant="h2">ERROR</Typography>
        <Typography variant="p">Some text about error</Typography>
      </Box>
    </Backdrop>
  );
}
