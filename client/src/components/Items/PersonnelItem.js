import React, { useState } from 'react';
import pic from '../../img/unlogin-user-avatars.jpg';
import {
  Box,
  Button,
  CardActions,
  CardContent,
  CardMedia,
  Collapse,
  Grid,
  Paper,
  Typography,
} from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useDispatch } from 'react-redux';
import { fireAnEmployee } from '../../store/actions/personnelsActions';

export default function PersonnelItem({ person }) {
  const dispatch = useDispatch();
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  function deleteWorkerCard(e) {
    e.stopPropagation();
    dispatch(fireAnEmployee(person._id));
  }

  return (
    <React.Fragment>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <Paper className='personnel__item'>
          <CardMedia
            component="img"
            image={pic}
            alt={`emploee`}
          />
          <CardContent>
            <Button
              onClick={deleteWorkerCard}
              variant="text"
              className='personnel__item-delete'
            >
              &#8722;
            </Button>
            <Typography>Ім'я: {person.name}</Typography>
          </CardContent>
          <CardActions
            className='personnel__item-action'
            disableSpacing
          >
            <Typography>Детальна інформація</Typography>
            <ExpandMore
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </ExpandMore>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Box>Посада: {person.position}</Box>
              <Box>
                <Box>
                  <Typography variant="span">
                    Оплата: {person.salary} %, від суми.
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Collapse>
        </Paper>
      </Grid>
    </React.Fragment>
  );
}
