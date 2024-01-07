import React from 'react';
import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function ExpandMore({ expanded, handleExpandClick }) {
  return (
    <div className={`expand-more ${expanded ? 'expanded' : ''}`}>
      <IconButton
        onClick={handleExpandClick}
        aria-expanded={expanded}
        aria-label="show more"
      >
        <ExpandMoreIcon />
      </IconButton>
    </div>
  );
}
