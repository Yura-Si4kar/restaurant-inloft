import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';
import React from 'react';

export default function CheckWithdrawalWindow({ open, handleClose, check }) {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle className="dialog-title">
        <Typography variant="span">Чек: {check.table}</Typography>
        <Button variant="outline">Друк</Button>
      </DialogTitle>
      <DialogContent className="dialog__content">
        <Box>
          {check.order.map((element) => (
            <Typography
              key={element._id}
              paragraph
              className="dialog__content-details"
            >
              <Typography variant="span">{element.name}</Typography>
              <Typography variant="span">{element.numbers} шт.</Typography>
              <Typography variant="span">
                {element.numbers * element.price} $
              </Typography>
            </Typography>
          ))}
        </Box>
        <Box>
          <Typography variant="h6" className="dialog-waiter">
            Офіціант: {check.waiter}
          </Typography>
        </Box>
        <Box>
          <Typography paragraph className="payment-details">
            <Typography variant="span" className="payment-amount">
              Сума до сплати:
            </Typography>
            <Typography variant="span" className="dashed-line"></Typography>
            <Typography variant="span" className="total-amount">
              {check.sum} $
            </Typography>
          </Typography>
        </Box>
        <Typography paragraph className="non-fiscal-message">
          ! НЕ ФІСКАЛЬНИЙ !
        </Typography>
      </DialogContent>
    </Dialog>
  );
}
