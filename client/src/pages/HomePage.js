import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectMenuList, selectSearchString } from '../store/selectors/selectors';
import { getMenuList, getOrderList } from '../store/actions/servicesActions';
import { Container } from '@mui/system';
import { Box } from '@mui/material';
import MenuListItem from '../components/Items/MenuListItem';
import OrderPopupBtn from '../components/Popup/PopupBtn/OrderPopupBtn';
import { ALL_MENU_LIST_PARAM } from '../config/consts';
import updateList from '../utils/updateList';

export default function HomePage() {
  const dispatch = useDispatch();
  const menu = useSelector(selectMenuList);
  const searchValue = useSelector(selectSearchString);
  const list = updateList(menu, searchValue)

  useEffect(() => {
    dispatch(getMenuList(ALL_MENU_LIST_PARAM));
    dispatch(getOrderList());
  }, [dispatch]);

  return (
    <>
      <Container maxWidth="1300px">
        <Box
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justiryContent: 'center',
            margin: '0 auto',
          }}
        >
          {list.map((item) => (
            <MenuListItem key={item._id} item={item} />
          ))}
        </Box>
      </Container>
      <OrderPopupBtn />
    </>
  );
}
