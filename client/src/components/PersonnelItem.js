import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import pic from '../img/unlogin-user-avatars.jpg';
import {
  Box,
  Button,
  CardActions,
  CardContent,
  CardMedia,
  Collapse,
  Grid,
  Typography,
} from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useDispatch } from 'react-redux';
import { fireAnEmployee } from '../store/actions/personnelsActions';

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
        <Card style={{ position: 'relative' }}>
          <CardMedia
            component="img"
            image={pic}
            alt={`emploee`}
            style={{ height: 'auto', maxWidth: 100 + '%' }}
          />
          <CardContent>
            <Button
              onClick={deleteWorkerCard}
              variant="text"
              style={{
                position: 'absolute',
                top: 0,
                right: -10,
                color: 'blue',
                fontSize: 30,
                width: 40,
                padding: 0,
              }}
            >
              &#8722;
            </Button>
            <Typography>Ім'я: {person.name}</Typography>
          </CardContent>
          <CardActions
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              paddingLeft: 15,
            }}
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
                <Box style={{ marginBottom: 20 }}>
                  <Typography variant="span">
                    Оплата: {person.salary} %, від суми.
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Collapse>
        </Card>
      </Grid>
    </React.Fragment>
  );
}
