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
        style={{ color: 'red' }}
        sx={{
          mr: 2,
          display: { xs: 'none', md: 'flex' },
          fontFamily: 'Inter',
          fontWeight: 700,
          letterSpacing: '.1rem',
          color: 'inherit',
          textDecoration: 'none',
        }}
      >
        <Icon path={mdiFood} title="logo" size={2} horizontal color="red" />
        Loft
      </Typography>
      <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
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
          sx={{
            display: { xs: 'block', md: 'none' },
          }}
        >
          <MenuItem>
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
              Restaurant Menu
            </Link>
          </MenuItem>
          <MenuItem>
            <Link
              to="/tables"
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              Tables
            </Link>
          </MenuItem>
          <MenuItem>
            <Link
              to="/personnels"
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              Personnel
            </Link>
          </MenuItem>
          <MenuItem>
            <Link
              to="/statistics"
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              Statistics
            </Link>
          </MenuItem>
        </Menu>
      </Box>
    </>
  );
}
