import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch } from 'react-redux';
import { FormControl, TextField, Typography } from '@mui/material';
import { addUser } from '../../store/actions/personnelsActions';

const INITIAL_VALUE = {
  name: '',
  position: '',
  salary: '',
  error: false,
};

export default function PersonnelDialogForm({ open, handleClose }) {
  const dispatch = useDispatch();
  const [formState, setFormState] = useState(INITIAL_VALUE);

  const getInput = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmitForm = (e) => {
    e.preventDefault();

    if (
      validateFilds(formState.name) ||
      validateFilds(formState.position) ||
      validateFilds(formState.salary)
    ) {
      return setFormState({
        ...formState,
        name: '',
        position: '',
        salary: '',
        error: true,
      });
    }
    delete formState.error;
    dispatch(addUser(formState));
    setFormState(INITIAL_VALUE);
    handleClose();
  };

  function validateFilds(input) {
    return input === '';
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Заповніть поля</DialogTitle>
      <DialogContent>
        <form>
          <FormControl fullWidth className="modal-form">
            <TextField
              type="text"
              id="name"
              name="name"
              placeholder="Ім'я"
              onChange={getInput}
            />
          </FormControl>
          <FormControl fullWidth className="modal-form">
            <TextField
              type="text"
              id="position"
              name="position"
              placeholder="нвзва посади"
              onChange={getInput}
            />
          </FormControl>
          <FormControl fullWidth className="modal-form">
            <TextField
              type="text"
              id="salary"
              name="salary"
              placeholder="відсоток від продажу"
              onChange={getInput}
            />
          </FormControl>
          <Typography paragraph className={formState.error ? 'error' : 'hide'}>
            Wrong! Fill in all fields!
          </Typography>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={onSubmitForm}>Subscribe</Button>
      </DialogActions>
    </Dialog>
  );
}