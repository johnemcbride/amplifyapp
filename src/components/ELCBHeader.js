import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import AppBar from '@mui/material/AppBar'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import IconButton from '@mui/material/IconButton'

import { Link, Navigate, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Typography } from '@mui/material';

function ELCBHeader({ userName, isLoggedIn, signOut }) {
    const [openDrawer, setOpenDrawer] = useState(false);
    const navigate = useNavigate()

    return (
        <>
            <AppBar position={'sticky'} sx={{ backgroundColor: 'black' }}>
                <Container height={'100%'}>
                    <Grid
                        sx={{
                            align: 'center',
                            paddingY: 0,
                            marginX: '0',
                            marginY: '0',
                            justify: 'center',
                            paddingX: 0,
                            height: '100%'
                        }}
                        spacing={0} container flexDirection={'row'} marginY={0} paddingY={0}>
                        <Grid paddingY={'6px'}
                            sx={{
                                verticalAlign: 'center',
                                marginX: '0',
                                marginY: 'auto',
                                flexDirection: 'column',
                                justify: 'center',
                                paddingX: 0,
                            }}
                            spacing={0} height={'100%'} container justifyContent={'center'} flexDirection={'column'} >
                            <Typography onClick={() => navigate("/")} height={'100%'} justifyContent={'center'} marginY={0} color={"orange"} fontWeight={'bold'} flexWrap={'wrap'}>


                                <img height="50px"  src="https://static.wixstatic.com/media/ee0576_f5a8145481604ef99ea186c9da35fa5f~mv2.png/v1/fill/w_376,h_240,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/ee0576_f5a8145481604ef99ea186c9da35fa5f~mv2.png" />MEMBERSHIP PORTAL</Typography>
                        </Grid>

                            

                    </Grid>

                    <Drawer open={openDrawer} onClose={() => setOpenDrawer(false)} >
                        <List>


                            <ListItem onClick={() => setOpenDrawer(false)}>
                                <ListItemText>
                                    Welcome, <b>{userName}</b>
                                </ListItemText>
                            </ListItem>

                            <ListItem onClick={() => setOpenDrawer(false)}>
                                <ListItemText>
                                    Members
                                </ListItemText>
                            </ListItem>
                            <ListItem onClick={() => setOpenDrawer(false)}>
                                <ListItemText>
                                    Attendance
                                </ListItemText>
                            </ListItem>
                            <ListItem onClick={() => setOpenDrawer(false)}>
                                <ListItemText>
                                    Subscriptions
                                </ListItemText>
                            </ListItem>
                            {!isLoggedIn ?
                                <ListItem onClick={() => setOpenDrawer(false)}>
                                    <ListItemText>
                                        Signout
                                    </ListItemText>
                                </ListItem> : null}
                        </List>
                    </Drawer>

                </Container>
            </AppBar >
            <AppBar />
        </>
    );
}

export default ELCBHeader;