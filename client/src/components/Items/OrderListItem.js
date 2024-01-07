import React, { useState } from 'react';
import {
  Badge,
  Button,
  ButtonGroup,
  Grid,
  IconButton,
  ListItem,
  ListItemText,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useDispatch } from 'react-redux';
import {
  overwriteOrderItem,
  removeOrderElement,
} from '../../store/actions/servicesActions';

export default function OrderListItem({ item }) {
  const dispatch = useDispatch();
  const [count, setCount] = useState(item.numbers);
  const [price, setPrice] = useState(item.price * item.numbers);

  const decrease = () => {
    if (count > 0) {
      setCount(count - 1);
      setPrice(price - item.price);
      dispatch(overwriteOrderItem(item._id, count - 1));
    }
  };

  const increase = () => {
    setCount(count + 1);
    setPrice(item.price * (item.numbers + 1));
    dispatch(overwriteOrderItem(item._id, count + 1));
  };

  const deleteItem = () => {
    dispatch(removeOrderElement(item._id));
  };

  return (
    <>
      <ListItem>
        <Grid container spacing={2} className="order__item">
          <Grid item xs={6} sm={6} md={6} lg={7}>
            <ListItemText primary={item.name} />
            <ListItemText primary={`${price.toFixed(2)} $`} />
          </Grid>
          <Grid item xs={1} sm={2} md={2} lg={1}>
            <ListItemText>
              <Badge color="secondary" badgeContent={count} />
            </ListItemText>
          </Grid>
          <Grid item xs={5} sm={4} md={4} lg={4} className="order__item">
            <ButtonGroup className="order__item-buttons">
              <Button
                aria-label="reduce"
                onClick={decrease}
                className="order__item-button"
              >
                <RemoveIcon fontSize="small" />
              </Button>
              <Button
                aria-label="increase"
                onClick={increase}
                className="order__item-button"
              >
                <AddIcon fontSize="small" />
              </Button>
            </ButtonGroup>
            <IconButton onClick={deleteItem} edge="end" aria-label="delete">
              <DeleteIcon />
            </IconButton>
          </Grid>
        </Grid>
      </ListItem>
    </>
  );
}
