import { Box, Button, Menu, MenuItem, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import Icon from '@mdi/react';
import { mdiFood } from '@mdi/js';

export const DesktopMenu = ({ anchorEl, handleOpen, handleClose }) => (
  <>
    <Typography
      variant="h5"
      noWrap
      component="a"
      href="/"
      className="navbar__logo"
    >
      <Icon
        path={mdiFood}
        title="logo"
        size={1.2}
        horizontal
        color="red"
        className="navbar__logo-icon"
      />
      Loft
    </Typography>
    <Box className="navbar__submenu">
      <Button
        id="basic-button"
        onClick={handleOpen}
        className="navbar__submenu-button"
      >
        Restaurant Menu
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose}>
          <Link className="navbar__submenu-items" to="/foods">
            Меню
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link className="navbar__submenu-items" to="/categories">
            За категоріями
          </Link>
        </MenuItem>
      </Menu>
      <Button onClick={handleClose} className="navbar__menu-buttons">
        <Link className="navbar__submenu-items" to="/tables">
          Tables
        </Link>
      </Button>
      <Button onClick={handleClose} className="navbar__menu-buttons">
        <Link className="navbar__submenu-items" to="/personnels">
          Personnel
        </Link>
      </Button>
      <Button onClick={handleClose} className="navbar__menu-buttons">
        <Link className="navbar__submenu-items" to="/statistics">
          Statistics
        </Link>
      </Button>
    </Box>
  </>
);
