import React, { useEffect, useState } from 'react';
import {
  Box,
  FormControl,
  InputLabel,
  Menu,
  MenuItem,
  Select,
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import MoreIcon from '@mui/icons-material/MoreVert';
import { useDispatch, useSelector } from 'react-redux';
import {
  setIsAuth,
  setPagesLimit,
  setUser,
} from '../../store/actions/servicesActions';
import MyButton from '../UI/MyButton/MyButton';
import { useNavigate } from 'react-router-dom';
import { HOME_ROUTE, LOGIN_ROUTE } from '../../config/consts';
import { endSession } from '../../storages/cookie';
import { selectIsAuth } from '../../store/selectors/selectors';

const limitElements = [4, 8, 12, 16, 20];

export default function SettingMenu() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [limit, setLimit] = useState(12);
  const isAuth = useSelector(selectIsAuth);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    const number = +e.target.value;
    setLimit(number);
    handleClose();
  };

  useEffect(() => {
    dispatch(setPagesLimit(limit));
  }, [dispatch, limit]);

  const logOut = () => {
    if (isAuth) {
      dispatch(setUser({}));
      dispatch(setIsAuth(false));
      navigate(HOME_ROUTE);
      endSession();
      handleClose();
    } else {
      navigate(LOGIN_ROUTE);
    }
  };

  return (
    <>
      <Box sx={{ flexGrow: 0 }}>
        <IconButton
          size="large"
          aria-label="display more actions"
          edge="end"
          color="inherit"
          onClick={handleOpen}
        >
          <MoreIcon />
        </IconButton>
        <Menu
          sx={{ mt: '45px' }}
          id="menu-appbar"
          anchorEl={open ? () => document.body : null}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(open)}
          onClose={handleClose}
        >
          <MenuItem>
            <div>
              <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-helper-label">
                  Кі-сть позицій
                </InputLabel>
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  value={limit}
                  label="limit"
                  onChange={(e) => handleChange(e)}
                >
                  {limitElements.map((el) => (
                    <MenuItem key={el} value={el}>
                      {el}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          </MenuItem>
          <MenuItem>
            <MyButton
              variant="contained"
              color="error"
              style={{ width: '100%' }}
              onClick={logOut}
            >
              {isAuth ? 'Exit' : 'Login'}
            </MyButton>
          </MenuItem>
        </Menu>
      </Box>
    </>
  );
}
