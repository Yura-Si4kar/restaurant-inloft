import { Container, Grid } from '@mui/material';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectPersonnelsList } from '../store/selectors/selectors';
import PersonnelItem from '../components/Items/PersonnelItem';
import { getPersonnelsList } from '../store/actions/personnelsActions';
import { PERSONNELS_LIST_PARAM } from '../config/consts';

export default function PersonnelsPage() {
  const dispatch = useDispatch();
  const personnel = useSelector(selectPersonnelsList);

  useEffect(() => {
    dispatch(getPersonnelsList(PERSONNELS_LIST_PARAM));
  }, [dispatch]);

  return (
    <Container className="personnels-container">
      <Grid container spacing={1}>
        <Grid container item xs={12} spacing={3}>
          {personnel.map((person) => (
            <PersonnelItem key={person._id} person={person} />
          ))}
        </Grid>
      </Grid>
    </Container>
  );
}
