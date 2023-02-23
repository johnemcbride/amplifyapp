
import React from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import { Link } from "react-router-dom";

export default function Header() {


    return (
        <>
            <Container disableGutters padding="0" >
                <Grid height='100%' container spacing={0} justifyContent="space-between" marginX={0} paddingX={0}>
                    <Grid

                        align="center"
                        order={{ xs: 2, sm: 1 }}
                        marginX={0}

                        paddingX={0}
                        xs={12}
                        sm={6}
                        item

                        flexDirection="column"
                        justifyContent="center">


                        <Typography marginX={0} paddingX={0} align="center" variant="h6" color="inherit" noWrap>
                            East London Community Band
                        </Typography>



                        <Button
                            align="center"
                            variant="outline"
                            component={Link}
                            to="/newmember"> Register </Button>
                        <Button
                            align="center"
                            variant="outline"
                            component={Link}
                            to="/signin"> Sign In </Button>




                    </Grid>
                    <Grid
                        height='50vh'
                        order={{ xs: 1, sm: 2 }}
                        item
                        sx={{

                            width: '100vw',
                            verticalAlign: 'center',
                            paddingY: 0,
                            marginX: '0',
                            marginY: '0',
                            flexDirection: 'column',
                            justify: 'center',
                            paddingX: 0,
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat',
                            backgroundImage:
                                "url('https://static.wixstatic.com/media/ee0576_f4cd463325c24230b8a3b818ae93711a~mv2.jpg/v1/crop/x_9,y_0,w_874,h_764/fill/w_638,h_558,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/new_site_bandstand_03.jpg')"
                        }}
                        xs={12}
                        sm={6}
                        >
                        <Typography sx={{
                            display: 'flex',

                            color: 'white',
                            verticalAlign: 'center',
                            marginY: 'auto',
                            marginX: '10px'
                        }} align="center" variant="h4" >
                            Celebrating 50 years of community music-making in 2024
                        </Typography>


                    </Grid>

                </Grid>


            </Container >
        </>
    );
}