import React from 'react';
import { Paper, CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import Header from '../Header/header';
import Footer from '../Footer';
import { theme } from './styles';
import "@fontsource/josefin-sans";




export default function MaterialLayout(props) {
    const { children } = props;

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Header />

            <div   >
                <Paper >{children}</Paper>
            </div>
            <Footer />
        </ThemeProvider>
    );
}