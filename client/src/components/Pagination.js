import React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    pagination: {
        '& .MuiPaginationItem-root': {
            color: theme.palette.primary.main, // колір неактивних сторінок
        },
        '& .MuiPaginationItem-page.Mui-selected': {
            backgroundColor: theme.palette.primary.main, // колір активної сторінки
            color: theme.palette.common.white, // колір тексту активної сторінки
            border: `1px solid ${theme.palette.primary.main}`, // колір бордера для активної сторінки
        },
    },
}));

export default function PagePagination({ pages, onPageChange }) {
    const handlePageChange = (event, newPage) => {
        onPageChange(newPage);
    };

    const classes = useStyles();

    return (
        <Stack spacing={12}>
            <Pagination
                className={`${classes.pagination} mx-auto`}
                count={pages}
                onChange={handlePageChange}
                variant="outlined"
            />
        </Stack>
    );
}