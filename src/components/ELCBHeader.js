import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Nav from 'react-bootstrap/Nav';
import Button from '@mui/material/Button';
import Navbar from 'react-bootstrap/Navbar';
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import IconButton from '@mui/material/IconButton'

import React, { useState, useEffect } from "react";
import { Typography } from '@mui/material';

function ELCBHeader({ signOut }) {
    const [openDrawer, setOpenDrawer] = useState(false);

    return (
        <Navbar className="mb-0 mt-0" bg="black" expand="lg">
            <Container>
                <Grid container flexDirection={'row'}>
                    <Grid container justify={'center'} paddingY={0} marginY={0} flexDirection={'column'} xs={6}>
                        <Typography color="orange" fontWeight={'bold'} flexWrap={'wrap'}>EAST LONDON COMMUNITY BAND</Typography>
                    </Grid>
                    <Grid container justify={'center'} flexDirection={'column'} item xs={6} align="right" marginX={0}>
                        <Button onClick={() => setOpenDrawer(!openDrawer)} color="primary" variant="outlined"  >Menu</Button>
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
        </Navbar >
    );
}

export default ELCBHeader;