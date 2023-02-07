import {
    createTheme
} from '@mui/material/styles';

import { cyan } from '@mui/material/colors';
let theme = createTheme({
    palette: { type: 'dark', primary: cyan, secondary: cyan },

    typography: {
        fontFamily: [
            'Josefin Sans',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
    }
});

export { theme };