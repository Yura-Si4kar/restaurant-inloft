import React, { useState } from 'react';
import { Button } from '@mui/material';
import DialogWindow from '../DialogWindow';
import { useSelector } from 'react-redux';
import { selectOrdersList } from '../../../store/selectors/selectors';

export default function OrderPopupBtn() {
  const [open, setOpen] = useState(false);
  const ordersList = useSelector(selectOrdersList);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {ordersList.length > 0 && (
        <Button
          onClick={handleClickOpen}
          variant="contained"
          className="order__popup-btn"
        >
          Замовлення ({ordersList.length})
        </Button>
      )}
      {ordersList.length === 0 || (
        <DialogWindow open={open} handleClose={handleClose} />
      )}
    </>
  );
}
