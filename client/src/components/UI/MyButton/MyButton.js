import { Button } from '@mui/material';
import React from 'react';

export default function MyButton({ children, ...props }) {
  return <Button {...props}>{children}</Button>;
}
