import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import AppBar from '@mui/material/AppBar'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import IconButton from '@mui/material/IconButton'

import React, { useState, useEffect } from "react";
import { Typography } from '@mui/material';

function ELCBHeader({ signOut }) {
    const [openDrawer, setOpenDrawer] = useState(false);

    return (
        <>
            <AppBar position={'static'} sx={{ backgroundColor: 'black' }}>
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
                            spacing={0} height={'100%'} container justifyContent={'center'} flexDirection={'column'} xs={6}>
                            <Typography height={'100%'} justifyContent={'center'} marginY={0} color={"orange"} fontWeight={'bold'} flexWrap={'wrap'}>EAST LONDON COMMUNITY BAND</Typography>
                        </Grid>
                        <Grid height={'100%'} paddingY={'6px'} container justify={'center'} flexDirection={'column'} item xs={6} align="right" marginX={0}>
                            <Button marginY={"6px"} size={'small'} onClick={() => setOpenDrawer(!openDrawer)} color="primary" variant="contained"  >Menu</Button>
                        </Grid>

                    </Grid>

                    <Drawer open={openDrawer} onClose={() => setOpenDrawer(false)} >
                        <List>
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
                            <ListItem onClick={() => setOpenDrawer(false)}>
                                <ListItemText>
                                    Signout
                                </ListItemText>
                            </ListItem>
                        </List>
                    </Drawer>

                </Container>
            </AppBar >
            <AppBar />
        </>
    );
}

export default ELCBHeader;