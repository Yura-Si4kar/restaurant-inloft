import { Box, Button, Menu, MenuItem, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import Icon from '@mdi/react';
import { mdiFood } from '@mdi/js';

export const DesktopMenu = ({ anchorEl, classes, handleOpen, handleClose }) => (
  <>
    <Typography
      variant="h5"
      noWrap
      component="a"
      href="/"
      sx={{
        mr: 2,
        display: { xs: 'flex', md: 'none' },
        flexGrow: 1,
        fontFamily: 'monospace',
        fontWeight: 700,
        letterSpacing: '.1rem',
        color: 'red',
        textDecoration: 'none',
      }}
    >
      <Icon
        path={mdiFood}
        title="logo"
        size={1.2}
        horizontal
        color="red"
        style={{ marginRight: 20 }}
      />
      Loft
    </Typography>
    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
      <Button
        id="basic-button"
        onClick={handleOpen}
        className={classes.subMenuBtn}
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
          <Link className={classes.restaurantSubMenu} to="/foods">
            Меню
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link className={classes.restaurantSubMenu} to="/categories">
            За категоріями
          </Link>
        </MenuItem>
      </Menu>
      <Button
        onClick={handleClose}
        sx={{ my: 2, color: 'white', display: 'block' }}
      >
        <Link className={classes.mainMenuLinks} to="/tables">
          Tables
        </Link>
      </Button>
      <Button
        onClick={handleClose}
        sx={{ my: 2, color: 'white', display: 'block' }}
      >
        <Link className={classes.mainMenuLinks} to="/personnels">
          Personnel
        </Link>
      </Button>
      <Button
        onClick={handleClose}
        sx={{ my: 2, color: 'white', display: 'block' }}
      >
        <Link className={classes.mainMenuLinks} to="/statistics">
          Statistics
        </Link>
      </Button>
    </Box>
  </>
);
