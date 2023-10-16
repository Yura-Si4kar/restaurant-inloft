import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectPersonnelList } from '../../store/selectors/selectors'
import { Button, Container, Grid, useMediaQuery } from '@mui/material';
import PersonnelItem from './components/PersonnelItem';
import PersonnelDialogForm from './components/PersonnelDialogForm';
import { getPersonnelList } from '../../store/actions/personnelActions';

export default function Personnel() {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const personnel = useSelector(selectPersonnelList);
  
  useEffect(() => {
    dispatch(getPersonnelList('personnel'));
  }, [dispatch])  
  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const smallScreen = useMediaQuery('(max-width: 600px');

  return (
    <Container style={{ display: 'flex', flexWrap: 'wrap' }}>
      <Grid container spacing={1} style={{marginTop: 20}}>
        <Grid container item xs={12} spacing={3}>
          {personnel.map((person) => <PersonnelItem key={person.id} person={person} />)}
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
