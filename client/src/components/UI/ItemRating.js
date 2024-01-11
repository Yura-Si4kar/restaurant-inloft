import { Rating, Typography } from '@mui/material';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { changeItemRating } from '../../store/actions/servicesActions';

export const ItemRating = ({ item, nameOfClass }) => {
    const dispatch = useDispatch();
    const [rating, setRating] = useState(Number.isFinite(item.rate) ? item.rate : 0);

    const changeRating = (newValue) => {
        setRating(newValue);
        dispatch(changeItemRating(item.type, item._id, newValue));
    };

    return (
        <Typography variant='span' className="menu__item-rating">
            <Rating
                name="simple-controlled"
                value={rating}
                precision={0.1}
                onChange={(event, newValue) => {
                    changeRating(newValue);
                }}
                className={nameOfClass}
            />
            <Typography className='menu__item-number' variant="span">
                {Math.floor(rating * 10) / 10}
            </Typography>
        </Typography>
    )
}
