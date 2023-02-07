import React from 'react';
import { Link, Typography } from '@mui/material';
export default function Footer() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            Copyright ©
            <Link color="inherit" href="https://material-ui.com/">
                East London Community Band
            </Link>
            {new Date().getFullYear()}
        </Typography>
    );
}