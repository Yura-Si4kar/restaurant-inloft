import { Box, Button, Menu, Typography } from '@mui/material';
import Icon from '@mdi/react';
import { mdiFood } from '@mdi/js';
import { useSelector } from 'react-redux';
import { selectIsAuth } from '../../store/selectors/selectors';
import { NavigationMenuButtons } from '../UI/MyButton/NavigationMenuButtons';
import { NavigationMenuLinks } from '../UI/MyButton/NavigationMenuLinks';

export function DesktopMenu({ anchorEl, handleOpen, handleClose }) {
  const isAuth = useSelector(selectIsAuth);

  return (
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
          <NavigationMenuLinks styleName={"navbar__submenu-items"} path={'/foods'} handleClose={handleClose}>Меню</NavigationMenuLinks>
          <NavigationMenuLinks styleName={"navbar__submenu-items"} path={'/categories'} handleClose={handleClose}>За категоріями</NavigationMenuLinks>
        </Menu>
        {isAuth && <NavigationMenuButtons path={'/tables'} handleClose={handleClose}>Tables</NavigationMenuButtons>}
        {isAuth && <NavigationMenuButtons path={'/personnels'} handleClose={handleClose}>Personnel</NavigationMenuButtons>}
        {isAuth && <NavigationMenuButtons path={'/statistics'} handleClose={handleClose}>Statistics</NavigationMenuButtons>}
      </Box>
    </>
  );
}
