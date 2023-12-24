import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectMenuList,
  selectPagesLimit,
  selectSearchString,
  selectTotalPages,
} from '../store/selectors/selectors';
import { getMenuList, getOrderList } from '../store/actions/servicesActions';
import { Container } from '@mui/system';
import { Box } from '@mui/material';
import MenuListItem from '../components/Items/MenuListItem';
import OrderPopupBtn from '../components/Popup/PopupBtn/OrderPopupBtn';
import { ALL_MENU_LIST_PARAM } from '../config/consts';
import updateList from '../utils/updateList';
import PagePagination from '../components/Pagination';

export default function HomePage() {
  const dispatch = useDispatch();
  const menu = useSelector(selectMenuList);
  const searchValue = useSelector(selectSearchString);
  const list = updateList(menu, searchValue);
  const [page, setPage] = useState(1);
  const limit = useSelector(selectPagesLimit);
  const total = useSelector(selectTotalPages);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    dispatch(getMenuList(ALL_MENU_LIST_PARAM, page, limit));
    dispatch(getOrderList());
  }, [dispatch, page, limit]);
  
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
        <PagePagination pages={total} onPageChange={handlePageChange} />
      </Container>
      <OrderPopupBtn />
    </>
  );
}
