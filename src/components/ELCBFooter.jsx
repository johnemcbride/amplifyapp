import React from 'react';
import { Link, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { SocialIcon } from 'react-social-icons';
export default function Footer() {
    return (
        <Grid
            container
            marginTop="auto"

            align="center"
            marginBottom="10px"

            flexDirection="column"
            justifyContent="center"
        >

            <Container align="center" >
                <SocialIcon style={{ height: 30, width: 30, marginRight: '5px' }} bgColor="#036A32" fgColor="#FFC314" url="https://twitter.com/elcb_social" />
                <SocialIcon style={{ height: 30, width: 30, marginRight: '5px' }} bgColor="#036A32" fgColor="#FFC314" url="https://www.instagram.com/elcb_social" />
                <SocialIcon style={{ height: 30, width: 30, marginRight: '5px' }} bgColor="#036A32" fgColor="#FFC314" url="https://www.facebook.com/eastlondoncommunityband" />
                <SocialIcon style={{ height: 30, width: 30, marginRight: '5px' }} bgColor="#036A32" fgColor="#FFC314" url="https://www.youtube.com/channel/UCh6URKrR3xWxXkIRkejHLDg" />
            </Container>

            <Typography marginTop={'5px'} variant="body2" color="textSecondary" align="center" >
                Copyright © &nbsp;
                <Link color="inherit" href="https://www.eastlondoncommunityband.co.uk">
                    East London Community Band</Link>&nbsp;

                {new Date().getFullYear()}
            </Typography>


        </Grid >
    );
}