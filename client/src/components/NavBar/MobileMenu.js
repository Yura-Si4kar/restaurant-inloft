import React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import { Link } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Icon from '@mdi/react';
import { mdiFood } from '@mdi/js';

export function MobileMenu({
  handleOpenNavMenu,
  handleCloseNavMenu,
  anchorElNav,
}) {
  return (
    <>
      <Typography
        variant="h6"
        noWrap
        component="a"
        href="/"
        className='navbar__logo-main'
      >
        <Icon path={mdiFood} title="logo" size={2} horizontal color="red" />
        Loft
      </Typography>
      <Box className='navbar__mobile'>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleOpenNavMenu}
          color="inherit"
        >
          <MenuIcon />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorElNav}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          open={Boolean(anchorElNav)}
          onClose={handleCloseNavMenu}
          className='navbar__mobile-list'
        >
          <MenuItem>
            <Link to="/" className='navbar__mobile-item' onClick={handleCloseNavMenu}>
              Menu
            </Link>
          </MenuItem>
          <MenuItem>
            <Link to="/categories" className='navbar__mobile-item' onClick={handleCloseNavMenu}>
              За категоріями
            </Link>
          </MenuItem>
          <MenuItem>
            <Link
              to="/tables"
              className='navbar__mobile-item'
              onClick={handleCloseNavMenu}
            >
              Tables
            </Link>
          </MenuItem>
          <MenuItem>
            <Link
              to="/personnels"
              className='navbar__mobile-item'
              onClick={handleCloseNavMenu}
            >
              Personnel
            </Link>
          </MenuItem>
          <MenuItem>
            <Link
              to="/statistics"
              className='navbar__mobile-item'
              onClick={handleCloseNavMenu}
            >
              Statistics
            </Link>
          </MenuItem>
        </Menu>
      </Box>
    </>
  );
}
