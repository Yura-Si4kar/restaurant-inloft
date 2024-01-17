import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch } from 'react-redux';
import { FormControl, TextField, Typography } from '@mui/material';
import { addItem } from '../../store/actions/tablesActions';

const INITIAL_VALUE = {
  name: '',
  img: null,
  error: false,
};

export default function TableDialogForm({ open, handleClose }) {
  const dispatch = useDispatch();
  const [formState, setFormState] = useState(INITIAL_VALUE);
  const [file, setFile] = useState({});

  const getInput = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmitForm = (e) => {
    e.preventDefault();

    if (validateFilds(formState.name)) {
      return setFormState({
        ...formState,
        name: '',
        img: null,
        error: true,
      });
    }

    const formData = new FormData();
    formData.append('name', formState.name);
    formData.append('img', file);

    delete formState.error;
    
    dispatch(addItem(formData));
    setFormState(INITIAL_VALUE);
    setFile(null);
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
              placeholder="Введіть назву"
              onChange={getInput}
            />
          </FormControl>
          <FormControl fullWidth className="modal-form">
            <TextField
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={(e) => setFile(e.target.files[0])}
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