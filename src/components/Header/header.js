
import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

export default function Header() {


    return (
        <>
            <AppBar position="fixed" color="default" >
                <Toolbar>
                    <Typography variant="h6" color="inherit" noWrap>
                        East London Community Band
                    </Typography>
                </Toolbar>
            </AppBar>
            <Toolbar />
        </>
    );
}