import React, { useState } from 'react';
import {
  Badge,
  Box,
  Button,
  ButtonGroup,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Collapse,
  Rating,
  Typography,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  addMenuItems,
  changeItemRating,
} from '../../store/actions/servicesActions';
import { ExpandMore } from '../../utils/customStyledElement';

export default function MenuListItem({ item }) {
  const dispatch = useDispatch();
  const [expanded, setExpanded] = useState(false);
  const [rating, setRating] = useState(item.rate);
  const [count, setCount] = useState(1);

  const changeRating = (newValue) => {
    setRating(newValue);
    dispatch(changeItemRating(item.type, item._id, newValue));
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleAddClick = () => {
    dispatch(addMenuItems({ ...item, numbers: count }));
  };

  return (
    <>
      <div className={`menu__item-container`}>
        <Card className="menu__item">
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
            <Typography variant="p" color="yellowgreen">
              Ціна: {item.price} $
            </Typography>
            <Typography variant="span" className='menu__item-rating'>
              <Rating
                name="simple-controlled"
                value={rating}
                precision={0.1}
                onChange={(event, newValue) => {
                  changeRating(newValue);
                }}
              />
              <Typography variant='span'>{ Math.floor(rating * 10) / 10 }</Typography>
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
              {item.dsc && <Typography paragraph>Опис: {item.dsc}</Typography>}
              <Box>
                <Box style={{ marginBottom: 20 }}>
                  <Typography variant="span">Кількість:</Typography>
                  <Badge
                    className='menu__item-badge'
                    color="secondary"
                    badgeContent={count}
                  ></Badge>
                </Box>
                <Box
                  className='menu__item-box'
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
                  <Button variant="contained" onClick={handleAddClick}>
                    Add
                  </Button>
                </Box>
              </Box>
            </CardContent>
          </Collapse>
        </Card>
      </div>
    </>
  );
}
