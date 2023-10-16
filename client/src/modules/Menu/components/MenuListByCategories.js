import React, { useEffect } from 'react';
import { Box, Container, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import MenuListItem from './menu/MenuListItem';
import { selectMenuList } from '../../../store/selectors/selectors';
import { getMenuList } from '../../../store/actions/servicesActions';
import OrderPopupBtn from './Order/PopupBtn/OrderPopupBtn';

export default function MenuListByCategories() {
  const dispatch = useDispatch();
  const params = useParams();
  const list = useSelector(selectMenuList);

  useEffect(() => {
    dispatch(getMenuList(params.item))
  }, [dispatch, params.item])   

  return (
    <>
      <Container maxWidth='xl'>
        <Box>
          <Typography
            variant='h1'
            style={{
              fontWeight: 700,
              fontSize: '25px',
              textAlign: 'center'
            }}
          >{params.item.toLocaleUpperCase()}</Typography>
        </Box>
        <div className='dishes-list'>
          {list.map((item) => <MenuListItem key={item.id} item={item} />)}
        </div>
        <OrderPopupBtn/>
      </Container>
    </>
  )
}