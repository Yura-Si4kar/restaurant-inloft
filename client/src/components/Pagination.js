import React from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const darkTheme = createTheme({ palette: { mode: 'dark' } });

export default function PagePagination({ pages, onPageChange }) {
    const pagesArray = Array.from({ length: pages }, (_, index) => index + 1);

    const handlePageChange = (e) => {
        const newPage = e.target.value;
        onPageChange(newPage);
    };

    return (
        <ThemeProvider theme={darkTheme}>
            <ButtonToolbar aria-label="Toolbar with button groups">
                <ButtonGroup className="mx-auto" aria-label="First group">
                    {pagesArray.map((page) => (
                        <Button key={page} value={page} onClick={(e) => handlePageChange(e)}>
                            {page}
                        </Button>
                    ))}
                </ButtonGroup>
            </ButtonToolbar>
        </ThemeProvider>
    );
}