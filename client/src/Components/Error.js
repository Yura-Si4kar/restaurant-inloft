import { Box, Typography } from '@mui/material'
import React from 'react'

export default function Error() {
  return (
    <Box style={{
      display: 'flex',
      height: 100 + 'vh',
      justifyContent: 'center',
      alignItems: 'center',
      color: 'red',
      backgroundColor: 'black',
      flexDirection: 'column'
    }}>
      <Typography variant='h1'>ERROR</Typography>
    </Box>
  )
}
