import React from 'react'
import { Link } from 'react-router-dom'
import { HOME_ROUTE } from '../config/consts'
import { Backdrop } from '@mui/material'

export default function ErrorPage() {
    return (
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={true}
        >
            <div className="error-page">
            <div>
                <h1 data-h1="404">Opps...</h1>
                <p data-p="NOT FOUND">Something goes wrong...</p>
            </div>

            <Link to={HOME_ROUTE} className="back">
                Go Back
            </Link>
            </div>
        </Backdrop>
    )
}