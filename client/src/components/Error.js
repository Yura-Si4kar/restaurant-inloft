import React from 'react';
import { Backdrop, Box, Typography } from '@mui/material';
import errorPic from '../img/Error.png';
import { useDispatch, useSelector } from 'react-redux';
import { selectErrorBody, selectIsError } from '../store/selectors/selectors';
import { setError, setErrorBody } from '../store/actions/servicesActions';

export default function Error() {
  const dispatch = useDispatch();
  const error = useSelector(selectIsError);
  const errorBody = useSelector(selectErrorBody);

  const handleClose = () => {
    dispatch(setError(false));
    dispatch(setErrorBody({}));
  }

  return (
    <Backdrop open={error} className="error__page-backdrop">
      <Box
        style={{ background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.2)), url(${errorPic}) no-repeat center/cover` }}
        className="error__page"
      >
        <Box className='error__page-close' onClick={handleClose}></Box>
        <Typography variant="h2" className='error__page-title'>Opps...</Typography>
        <Typography variant="p" className='error__page-text'>Something went wrong!</Typography>
        <Typography variant="p" className='error__page-text'>{`Error: ${errorBody.message}`}</Typography>
      </Box>
    </Backdrop>
  );
}
