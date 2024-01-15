import { MenuItem } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

export const NavigationMenuLinks = ({children, styleName, path, handleClose}) => {
  return (
    <MenuItem onClick={handleClose}>
      <Link className={styleName} to={path}>
        {children}
      </Link>
    </MenuItem>
  )
}