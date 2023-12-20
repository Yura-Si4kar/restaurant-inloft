import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { selectMenuList } from '../store/selectors/selectors';
import { getMenuList } from '../store/actions/servicesActions';
import { Box, Container, Typography } from '@mui/material';
import MenuListItem from '../components/MenuListItem';
import OrderPopupBtn from '../components/Popup/PopupBtn/OrderPopupBtn';

export default function CategoryPage() {
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
          {list.map((item) => <MenuListItem key={item._id} item={item} />)}
        </div>
        <OrderPopupBtn/>
      </Container>
    </>
  )
}
