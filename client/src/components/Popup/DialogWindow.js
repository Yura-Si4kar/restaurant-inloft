import React, { useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel,
  List,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { styled } from '@mui/material/styles';
import OrderListItem from '../Items/OrderListItem';
import CloseIcon from '@mui/icons-material/Close';
import {
  selectOrdersList,
  selectTablesList,
} from '../../store/selectors/selectors';
import { clearStorage, tieOrder } from '../../store/actions/servicesActions';

const Demo = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

export default function DialogWindow({ open, handleClose }) {
  const list = useSelector(selectOrdersList);
  const tables = useSelector(selectTablesList);
  const dispatch = useDispatch();

  const [table, setTable] = useState('');

  const getOrdersSum = () => {
    return list
      .reduce((acc, item) => acc + item.price * item.numbers, 0)
      .toFixed(2);
  };

  const handleChange = (event) => {
    setTable(event.target.value);
  };

  function onSubmit() {
    let order = {
      id: Date.now(),
      list,
      name: table,
    };

    if (table) {
      dispatch(tieOrder(order));
      dispatch(clearStorage());
      handleClose();
    }
  }

  function onCansel() {
    dispatch(clearStorage());
    handleClose();
  }

  return (
    <Dialog open={open} className="dialog__window">
      <DialogTitle className="dialog__window-title" id="draggable-dialog-title">
        <Typography variant="span">Замовлення</Typography>
        <CloseIcon className="dialog__window-icon" onClick={handleClose} />
      </DialogTitle>
      <DialogContent className="dialog__window-content">
        <Box className="dialog__window-content">
          <Grid container className="dialog__window-list">
            <Grid item xs={12}>
              <Demo>
                <List>
                  {list.map((item) => (
                    <OrderListItem key={item._id} item={item} />
                  ))}
                </List>
              </Demo>
            </Grid>
          </Grid>
          <Typography paragraph className="dialog__window-total">
            Загальна сума: {getOrdersSum() + ' $'}
          </Typography>
          <Box>
            <Typography
              variant="h6"
              className={table === '' ? 'error' : 'hide'}
            >
              Стіл не вибрано!
            </Typography>
            <FormControl className="dialog__window-form">
              <InputLabel id="demo-simple-select-helper-label">
                Стіл №
              </InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={table}
                label="Ім'я"
                onChange={handleChange}
              >
                {tables.map((table) => (
                  <MenuItem key={table._id} value={table.name}>
                    {table.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={onCansel}>Відмінити</Button>
        <Button onClick={onSubmit}>Підтвердити</Button>
      </DialogActions>
    </Dialog>
  );
}
