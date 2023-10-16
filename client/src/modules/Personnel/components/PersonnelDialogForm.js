import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { Typography } from '@mui/material';
import { addUser } from '../../../store/actions/personnelActions';

const INITIAL_VALUE = {
  name: '',
  position: '',
  salary: '',
  error: false,
}

export default function PersonnelDialogForm({ open, handleClose }) {
  const dispatch = useDispatch();
  const [formState, setFormState] = useState(INITIAL_VALUE);

  const getInput = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    })
  }

  const onSubmitForm = (e) => {
    e.preventDefault();

    if(validateFilds(formState.name) ||
      validateFilds(formState.position) ||
      validateFilds(formState.salary)
    ) {
      return setFormState({
        ...formState, 
        name: '',
        position: '',
        salary: '',
        error: true,
      })
    }
    delete formState.error;
    dispatch(addUser(formState));
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
            <Form.Label>Введіть ім'я працівника: </Form.Label>
            <Form.Control type='text' name='name' placeholder="Ім'я" onChange={getInput}/>  
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
            <Form.Label>Посада працівника: </Form.Label>
            <Form.Control type='text' name='position' placeholder="нвзва посади"onChange={getInput}/>  
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
            <Form.Label>Оплата: </Form.Label>
            <Form.Control type='text' name='salary' placeholder="відсоток від продажу"onChange={getInput}/>  
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