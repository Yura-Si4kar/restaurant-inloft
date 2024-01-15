import { Button } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

export const NavigationMenuButtons = ({children, path, handleClose}) => {
  return (
    <Button onClick={handleClose} className="navbar__menu-buttons">
        <Link className="navbar__submenu-items" to={path}>
            {children}
        </Link>
    </Button>
  )
}