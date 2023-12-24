import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import useStyles from '../hooks/useStyles';
import { MobileMenu } from './NavBar/MobileMenu';
import { DesktopMenu } from './NavBar/DesktopMenu';
import { SearchBar } from './NavBar/SearchBar';
import { useLocation } from 'react-router-dom';
import {
  CATEGORIES_ROUTE,
  PERSONNELS_ROUTE,
  STATISTICS_ROUTE,
  TABLES_ROUTE,
} from '../config/consts';
import { Box } from '@mui/material';
import TableDialogForm from './Popup/TableDialogForm';
import ModalButton from './NavBar/ModalButton';
import PersonnelDialogForm from './Popup/PersonnelDialogForm';
import IconButton from '@mui/material/IconButton';
import MoreIcon from '@mui/icons-material/MoreVert';

export default function NavigationBar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorElNav, setAnchorElNav] = useState(null);
  const classes = useStyles();
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [openPersonnel, setOpenPersonnel] = useState(false);

  const modalOpen = () => setOpen(true);
  const modalClose = () => setOpen(false);

  const modalOpenPersonnel = () => setOpenPersonnel(true);
  const modalClosePersonnel = () => setOpenPersonnel(false);

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
  const handleCloseNavMenu = () => setAnchorElNav(null);

  return (
    <AppBar position="static" className={classes.navBar}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <MobileMenu
            handleOpenNavMenu={handleOpenNavMenu}
            handleCloseNavMenu={handleCloseNavMenu}
            anchorElNav={anchorElNav}
          />
          <DesktopMenu
            anchorEl={anchorEl}
            classes={classes}
            handleOpen={handleClick}
            handleClose={handleClose}
          />
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {pathname === CATEGORIES_ROUTE ||
              pathname === TABLES_ROUTE ||
              pathname === PERSONNELS_ROUTE ||
              pathname === STATISTICS_ROUTE || <SearchBar />}
            {pathname === TABLES_ROUTE && (
              <ModalButton modalOpen={modalOpen}>Додати столик</ModalButton>
            )}
            {pathname === PERSONNELS_ROUTE && (
              <ModalButton modalOpen={modalOpenPersonnel}>
                Додати працівника
              </ModalButton>
            )}
          </Box>
          <IconButton
            size="large"
            aria-label="display more actions"
            edge="end"
            color="inherit"
          >
            <MoreIcon />
          </IconButton>
        </Toolbar>
        <TableDialogForm open={open} handleClose={modalClose} />
        <PersonnelDialogForm
          open={openPersonnel}
          handleClose={modalClosePersonnel}
        />
      </Container>
    </AppBar>
  );
}
