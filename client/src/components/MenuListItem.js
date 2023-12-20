import React, { useState } from 'react'
import { styled } from '@mui/material/styles';
import { Badge, Box, Button, ButtonGroup, Card, CardActions, CardContent, CardHeader, CardMedia, Collapse, IconButton, Rating, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useDispatch } from 'react-redux';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { addMenuItems, changeItemRating } from '../store/actions/servicesActions';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.up('xs')]: {
      width: '100%',
    },
    [theme.breakpoints.up('sm')]: {
      width: '50%',
    },
    [theme.breakpoints.up('md')]: {
      width: '33.33%',
    },
    [theme.breakpoints.up('lg')]: {
      width: '25%',
    },
  },
}));

export default function MenuListItem({ item }) {
  const dispatch = useDispatch();
  const [expanded, setExpanded] = useState(false);
  const [rating, setRating] = useState(item.rate);
  const [count, setCount] = useState(1);

  const changeRating = (newValue) => {
    setRating(newValue);
    dispatch(changeItemRating(item.type, item._id, newValue));
  }

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleAddClick = () => {
    dispatch(addMenuItems({ ...item, numbers: count }))
  }

  const classes = useStyles();

  return (
    <>
      <div className={`dishes-list-box ${classes.root}`}>
        <Card className='dishes-list-item' sx={{ width: '100%' }}>
          <CardHeader></CardHeader>
          <CardMedia
            component="img"
            height="194"
            image={item.img}
            alt="Paella dish"
          />
          <CardContent>
            <Typography variant="h6" color="text.secondary">
              {item.name}
            </Typography>
          </CardContent>
          <CardActions>
            <Typography variant='p' color='yellowgreen'>
              Ціна: {item.price} $
            </Typography>
            <Typography variant='span'>
              <Rating
                name="simple-controlled"
                value={rating}
                onChange={(event, newValue) => {
                  changeRating(newValue);
                }}
              />
            </Typography>
            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </ExpandMore>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              {item.dsc && 
                <Typography paragraph>
                  Опис: {item.dsc}
                </Typography>
              }              
              <Box>
                <Box style={{marginBottom: 20}}>
                  <Typography variant='span'>Кількість:</Typography>
                  <Badge style={{left: 20}} color="secondary" badgeContent={count}></Badge>
                </Box>
                <Box
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between'
                  }}
                >
                  <ButtonGroup>
                    <Button
                      aria-label="reduce"
                      onClick={() => {
                        setCount(Math.max(count - 1, 0));
                      }}
                    >
                      <RemoveIcon fontSize="small" />
                    </Button>
                    <Button
                      aria-label="increase"
                      onClick={() => {
                        setCount(count + 1);
                      }}
                    >
                      <AddIcon fontSize="small" />
                    </Button>
                  </ButtonGroup>
                  <Button variant='contained' onClick={handleAddClick}>Add</Button>
                </Box>
              </Box>
            </CardContent>
          </Collapse>
        </Card>
      </div>
    </>
  );
}