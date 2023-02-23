
import React from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import { Link } from "react-router-dom";
import NewMember from './NewMember'

export default function Header() {


    return (
        <>
            <Container disableGutters padding="0" >
                <Grid height='100%' container spacing={0} justifyContent="space-between" marginX={0} paddingX={0}>
                    <Grid

                        align="top"

                        marginX={0}
                        paddingX={0}
                        container
                      

                        sx={{

                            width: '100vw',
                            paddingY: 0,
                            marginX: '0',
                            marginY: '12px',
                            flexDirection: 'column',
                            justify: 'top',
                            paddingX: 0,
                            height: '500px'
                        }}
                    >


                        <NewMember />



                    </Grid>
                    <Grid
                        height='60vh'
                        sx={{
                            width: '100vw',
                            paddingY: 0,
                            marginX: '0',
                            marginY: '12px',
                            flexDirection: 'column',
                            justify: 'top',
                            paddingX: 0,
                            align: 'center'
                        }}
                        container
                        >
                        <Typography sx={{
                            display: 'flex',
                            marginX: '10',
                            align: 'center'
                        }} variant="h6" >
                            Your registration details will appear here.
                        </Typography>


                    </Grid>

                </Grid>


            </Container >
        </>
    );
}