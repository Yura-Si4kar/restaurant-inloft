import { Button, Container, Grid, useMediaQuery } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectPersonnelsList } from '../store/selectors/selectors';
import PersonnelDialogForm from '../components/Popup/PersonnelDialogForm';
import PersonnelItem from '../components/PersonnelItem';
import { getPersonnelsList } from '../store/actions/personnelsActions';

export default function PersonnelsPage() {
const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const personnel = useSelector(selectPersonnelsList);
  
  const smallScreen = useMediaQuery('(max-width: 600px');

  useEffect(() => {
    dispatch(getPersonnelsList('personnels'));
  }, [dispatch])  
  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Container style={{ display: 'flex', flexWrap: 'wrap' }}>
      <Grid container spacing={1} style={{marginTop: 20}}>
        <Grid container item xs={12} spacing={3}>
          {personnel.map((person) => <PersonnelItem key={person._id} person={person} />)}
        </Grid>
      </Grid>
      <PersonnelDialogForm open={open} handleClose={handleClose}/>
      <Button
        onClick={handleClickOpen}
        variant='contained'
          sx={{
            position: 'absolute',
            backgroundColor: '#121212',
            fontSize: {
              xs: 24,
              sm: 16
            },
            padding: 0,
            top: {
              xs: 4,
              sm: 6
            },
            right: {
              xs: 5,
              sm: 30
            },
            width: {
              xs: 30,
              sm: 120,
            },
            color: {
              xs: 'red',
            },
          }}
      >
        {smallScreen ? '+' : 'Додати працівника'}
      </Button>
    </Container>
  )
}
