import React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export default function PagePagination({ pages, onPageChange }) {
  const handlePageChange = (event, newPage) => {
    onPageChange(newPage);
  };

  return (
    <Stack spacing={12}>
      <Pagination
        className="pagination"
        count={pages}
        onChange={handlePageChange}
        variant="outlined"
      />
    </Stack>
  );
}
