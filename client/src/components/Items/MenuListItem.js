import React, { useState } from 'react';
import {
  Badge,
  Box,
  Button,
  ButtonGroup,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Collapse,
  Typography,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import {
  addMenuItems,
} from '../../store/actions/servicesActions';
import ExpandMore from '../UI/ExpandMore/ExpandMore';
import { ItemRating } from '../UI/ItemRating';

export default function MenuListItem({ item }) {
  const dispatch = useDispatch();
  const [expanded, setExpanded] = useState(false);
  const [count, setCount] = useState(1);

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
          <CardActions className='menu__item-actions'>
            <Typography className='menu__item-price' variant="p" color="yellowgreen">
              Ціна: {item.price} $
            </Typography>
            <ItemRating item={item} nameOfClass={'menu__item-rating-element'} />
            <ExpandMore
              expanded={expanded}
              handleExpandClick={handleExpandClick}
            />
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              {item.dsc && <Typography paragraph>Опис: {item.dsc}</Typography>}
              <Box>
                <Box className="menu__item-block">
                  <Typography variant="span">Кількість:</Typography>
                  <Badge
                    className="menu__item-badge"
                    color="secondary"
                    badgeContent={count}
                  ></Badge>
                </Box>
                <Box className="menu__item-box">
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
