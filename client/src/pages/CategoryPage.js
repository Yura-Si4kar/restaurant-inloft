import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { selectMenuList, selectSearchString } from '../store/selectors/selectors';
import { getMenuList } from '../store/actions/servicesActions';
import { Box, Container, Typography } from '@mui/material';
import MenuListItem from '../components/Items/MenuListItem';
import OrderPopupBtn from '../components/Popup/PopupBtn/OrderPopupBtn';
import updateList from '../utils/updateList';

export default function CategoryPage() {
  const dispatch = useDispatch();
  const params = useParams();
  const menu = useSelector(selectMenuList);
  const searchValue = useSelector(selectSearchString);
  const list = updateList(menu, searchValue);

  useEffect(() => {
    dispatch(getMenuList(params.item));
  }, [dispatch, params.item]);

  return (
    <>
      <Container maxWidth="xl">
        <Box>
          <Typography
            variant="h1"
            style={{
              fontWeight: 700,
              fontSize: '25px',
              textAlign: 'center',
            }}
          >
            {params.item.toLocaleUpperCase()}
          </Typography>
        </Box>
        <div className="dishes-list">
          {list.map((item) => (
            <MenuListItem key={item._id} item={item} />
          ))}
        </div>
        <OrderPopupBtn />
      </Container>
    </>
  );
}
