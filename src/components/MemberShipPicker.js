import React, { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import "@fontsource/josefin-sans";
import Icon from '@mui/material/Icon';
import { Boy, Girl } from '@mui/icons-material';

const memberships = [
    {
        'name': "Adult Multi-Band",
        'description': 'Access to all bands, for adults aged over 30',
        'price': "£105.00",
        'logo': <><Boy /><Girl /></>

    },

    {
        'name': "Adult Single-Band",
        'description': 'Access to a single band,for adults aged over 30',
        'price': "£52.50",
        'logo': <><Boy /><Girl /></>

    }
    ,
    {
        'name': "Siblings",
        'description': 'Access to all bands, for siblings of adult members younger than 30',
        'price': "£27.50",
        'logo': <><Boy /><Girl /></>

    }
]




const MemberShipPicker = ({ onClick, selected }) => {

    return (
        <Box sx={{
            gridAutoFlow: "row",
            display: 'flex',
            flexWrap: 'none',

        }} onSubmit={onClick}>

            {memberships.map(ms =>
                <MemberShipCard
                    {...ms} />
            )}




        </Box >
    );
};


function MemberShipCard({ name, description, price, logo }) {
    return (
        <Paper sx={{
            textAlign: 'center',
            padding: '10px',
            marginX: '5px',
            width: '200px'
        }} square elevation={3}>
            <Grid height="300px">
                <Grid height="270px">
                    <Typography variant="subtitle1" >{name}</Typography>
                    <br />
                    <Typography variant="subtitle2" >{description}</Typography>
                    <br />
                </Grid>
                <Grid height="30px">
                    <Typography variant="h4">{price}</Typography>
                    <br />
                    {logo}
                </Grid>
            </Grid>
        </Paper>)
}

export default MemberShipPicker;