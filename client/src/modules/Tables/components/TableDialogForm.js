import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { Typography } from '@mui/material';
import { addItem } from '../../../store/actions/tablesActions';

const INITIAL_VALUE = {
  name: '',
  img: '',
  error: false,
}

export default function TableDialogForm({ open, handleClose }) {
  const dispatch = useDispatch();
  const [formState, setFormState] = useState(INITIAL_VALUE);

  const getInput = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
      img: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fdesign-homes.ru%2Fkomnaty%2Fkukhnya-i-stolovaya%2Fservirovka-stola&psig=AOvVaw1DeIH0KCyJOfppjCfO7wo2&ust=1681477956988000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCJjyz9b3pv4CFQAAAAAdAAAAABAI',
      order: [],
    })
  }

  const onSubmitForm = (e) => {
    e.preventDefault();

    if(validateFilds(formState.name)
    ) {
      return setFormState({
        ...formState, 
        name: '',
        img: '',
        error: true,
      })
    }
    delete formState.error;
    dispatch(addItem(formState));
    setFormState(INITIAL_VALUE);
    handleClose();
  }

  function validateFilds(input) {
    return input ==='';
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Заповніть поля</DialogTitle>
      <DialogContent>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Назва столику: </Form.Label>
            <Form.Control type='text' name='name' placeholder="Ім'я" onChange={getInput}/>  
          </Form.Group>
          <Typography paragraph className={formState.error ? 'error' : 'hide'}>Wrong! Fill in all fields!</Typography>
        </Form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={onSubmitForm}>Subscribe</Button>
      </DialogActions>
    </Dialog>
  );
}