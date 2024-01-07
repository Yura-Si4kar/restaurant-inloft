import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  selectMenuList,
  selectPagesLimit,
  selectSearchString,
  selectTotalPages,
} from '../store/selectors/selectors';
import { getMenuList } from '../store/actions/servicesActions';
import { Box, Container, Typography } from '@mui/material';
import MenuListItem from '../components/Items/MenuListItem';
import OrderPopupBtn from '../components/Popup/PopupBtn/OrderPopupBtn';
import PagePagination from '../components/Pagination';

export default function CategoryPage() {
  const dispatch = useDispatch();
  const params = useParams();
  const list = useSelector(selectMenuList);
  const searchValue = useSelector(selectSearchString);
  const [page, setPage] = useState(1);
  const limit = useSelector(selectPagesLimit);
  const total = useSelector(selectTotalPages);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    dispatch(getMenuList(params.item, page, limit, searchValue));
  }, [dispatch, params.item, limit, page, searchValue]);

  return (
    <>
      <Container maxWidth="xl" className="category-container">
        <Box>
          <Typography variant="h1" className="category-title">
            {params.item.toLocaleUpperCase()}
          </Typography>
        </Box>
        <div className="category-list">
          {list.map((item) => (
            <MenuListItem key={item._id} item={item} />
          ))}
        </div>
        {list.length === 0 || (
          <PagePagination pages={total} onPageChange={handlePageChange} />
        )}
        <OrderPopupBtn />
      </Container>
    </>
  );
}
