import React from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';

export default function PagePagination({ pages, onPageChange }) {
    const pagesArray = Array.from({ length: pages }, (_, index) => index + 1);

    const handlePageChange = (e) => {
        const newPage = e.target.value;
        onPageChange(newPage);
    };

    return (
        <ButtonToolbar aria-label="Toolbar with button groups">
            <ButtonGroup className="mx-auto" aria-label="First group">
                {pagesArray.map((page) => <Button key={page} value={page} onClick={(e) => handlePageChange(e)}>{page}</Button>)}
            </ButtonGroup>
        </ButtonToolbar>
    )
}