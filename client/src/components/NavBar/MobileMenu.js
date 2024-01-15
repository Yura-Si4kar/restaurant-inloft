import React from 'react';
import Menu from '@mui/material/Menu';
import IconButton from '@mui/material/IconButton';
import { Box, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Icon from '@mdi/react';
import { mdiFood } from '@mdi/js';
import { useSelector } from 'react-redux';
import { selectIsAuth } from '../../store/selectors/selectors';
import { NavigationMenuLinks } from '../UI/MyButton/NavigationMenuLinks';

export function MobileMenu({
  handleOpenNavMenu,
  handleCloseNavMenu,
  anchorElNav,
}) {
  const isAuth = useSelector(selectIsAuth);
  
  return (
    <>
      <Typography
        variant="h6"
        noWrap
        component="a"
        href="/"
        className="navbar__logo-main"
      >
        <Icon path={mdiFood} title="logo" size={2} horizontal color="red" />
        Loft
      </Typography>
      <Box className="navbar__mobile">
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
          className="navbar__mobile-list"
        >
          <NavigationMenuLinks styleName={"navbar__mobile-item"} path={'/'} handleClose={handleCloseNavMenu}>Меню</NavigationMenuLinks>
          <NavigationMenuLinks styleName={"navbar__mobile-item"} path={'/categories'} handleClose={handleCloseNavMenu}>За категоріями</NavigationMenuLinks>
          {isAuth && <NavigationMenuLinks styleName={"navbar__mobile-item"} path={'/tables'} handleClose={handleCloseNavMenu}>Tables</NavigationMenuLinks> }
          {isAuth && <NavigationMenuLinks styleName={"navbar__mobile-item"} path={'/personnels'} handleClose={handleCloseNavMenu}>Personnel</NavigationMenuLinks> }
          {isAuth && <NavigationMenuLinks styleName={"navbar__mobile-item"} path={'/statistics'} handleClose={handleCloseNavMenu}>Statistics</NavigationMenuLinks> }
        </Menu>
      </Box>
    </>
  );
}
