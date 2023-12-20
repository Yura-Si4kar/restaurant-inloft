import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import Icon from '@mdi/react';
import { mdiFood } from '@mdi/js';

const useStyles = makeStyles(() => ({
  navBar: {
    position: 'relative',
    backgroundColor: '#121212 !important',
  },
  mobileMenu: {
    display: 'flex',
    flexDirection: 'column',
  },
  mobileMenuLinks: {
    alignSelf: 'flex-start',
    textDecoration: 'none',
    marginBottom: 10 + 'px',
    color: '#121212',
    '&:hover': {
      textDecoration: 'underline'
    }
  },
  restaurantSubMenu: {
    color: '#121212',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    }
  },
  subMenuBtn: {
    color: '#ffffff !important'
  },
  mainMenuLinks: {
    color: 'white',
    textDecoration: 'none'
  }
}))

export default function NavigationBar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorElNav, setAnchorElNav] = useState(null);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const classes = useStyles();

  return (
    <AppBar position="static" className={classes.navBar}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            style={{color: 'red'}}
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.1rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <Icon path={mdiFood}
              title="logo"
              size={2}
              horizontal
              color="red"
            />
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
              <MenuItem className={classes.mobileMenu} onClick={handleCloseNavMenu}>
                <Link to='/' className={classes.mobileMenuLinks}>Restaurant Menu</Link>
                <Link to='/tables' className={classes.mobileMenuLinks}>Tables</Link>
                <Link to='/personnels' className={classes.mobileMenuLinks}>Personnel</Link>
                <Link to='/statistics' className={classes.mobileMenuLinks}>Statistics</Link>
              </MenuItem>
            </Menu>
          </Box>
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
            <Icon path={mdiFood}
              title="logo"
              size={1.2}
              horizontal
              color="red"
              style={{marginRight: 20}}
            />
            Loft
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Button
              id="basic-button"
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
              className={classes.subMenuBtn}
            >
              Restaurant Menu
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <MenuItem onClick={handleClose}>
                <Link className={classes.restaurantSubMenu} to='/foods'>Меню</Link>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Link className={classes.restaurantSubMenu} to='/categories'>За категоріями</Link>
              </MenuItem>
            </Menu>
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                <Link className={classes.mainMenuLinks} to='/tables'>Tables</Link>
              </Button>
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                <Link className={classes.mainMenuLinks} to='/personnels'>Personnel</Link>
              </Button>
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                <Link className={classes.mainMenuLinks} to='/statistics'>Statistics</Link>
              </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}