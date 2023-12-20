import React, { useState } from 'react';
import { Button } from '@mui/material';
import './OrderPopupBtn.css';
import DialogWindow from '../DialogWindow';
import { useSelector } from 'react-redux';
import { selectOrdersList } from '../../../store/selectors/selectors';

export default function OrderPopupBtn() {
  const ordersList = useSelector(selectOrdersList);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => () => {
      setOpen(true);
  };

  const handleClose = () => {
      setOpen(false);
  };

  return (
    <>
      {ordersList.length > 0 &&
        <Button
            onClick={handleClickOpen('paper')}
            variant='contained'
            style={{ position: 'fixed', bottom: 23, width: 280, right: 28, fontSize: 18 }}
        >
        Замовлення ({ordersList.length})
        </Button>
      }
      {ordersList.length === 0 ||
        <DialogWindow
        open={open}
        handleClose={handleClose}
      />
      }
    </>
  )
}