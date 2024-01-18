import React, { useState } from 'react';
import personnelImage from '../../img/unlogin-user-avatars.jpg';
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
import { useDispatch } from 'react-redux';
import { fireAnEmployee } from '../../store/actions/personnelsActions';
import ExpandMore from '../UI/ExpandMore/ExpandMore';

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
        <Paper className="personnel__item">
          <CardMedia component="img" image={personnelImage} alt={`emploee`} />
          <CardContent>
            <Button
              onClick={deleteWorkerCard}
              variant="text"
              className="personnel__item-delete"
            >
              &#8722;
            </Button>
            <Typography>Ім'я: {person.name}</Typography>
          </CardContent>
          <CardActions className="personnel__item-action" disableSpacing>
            <Typography>Детальна інформація</Typography>
            <ExpandMore
              expanded={expanded}
              handleExpandClick={handleExpandClick}
            />
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