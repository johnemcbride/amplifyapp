import React, { useState, useEffect } from "react";

import ELCBHeader from "./components/ELCBHeader";
import ELCBFooter from "./components/ELCBFooter";
import ELCBLanding from "./components/ELCBLanding"
import Container from "@mui/material/Container"
import Box from "@mui/material/Box"
import { ThemeProvider } from '@mui/material/styles';
import "@fontsource/josefin-sans";
import { API, Amplify } from 'aws-amplify';
import { listMembers } from "./graphql/queries";
import ELCBNewMember from "./components/ELCBNewMember"
import { Routes, Route } from "react-router-dom"
import CssBaseline from "@mui/material/CssBaseline";

import {
  createTheme
} from '@mui/material/styles';

import { withAuthenticator } from "@aws-amplify/ui-react";
import awsconfig from './aws-exports';


Amplify.configure(awsconfig);


let theme = createTheme({
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
    grid: {
      height: "100%"
    },
    palette: {
      mode: 'light',
      primary: {
        main: '#e65100',
      },
      secondary: {
        main: '#f50057',
      },
    },
    overrides: {
      MuiAppBar: {
        colorDefault: {
          backgroundColor: "black",
        },
      },
    },
  }
});

const App = ({ signOut }) => {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    fetchMembers();
  }, []);

  async function fetchMembers() {
    const apiData = await API.graphql({ query: listMembers, authMode: "AMAZON_COGNITO_USER_POOLS" });
    const membersFromAPI = apiData.data.listMembers.items;
    setMembers(membersFromAPI);
    console.log(membersFromAPI)
  }


  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box height="100vh" display="flex" flexDirection="column">

          <ELCBHeader signOut={signOut} />
          <Routes>

            <Route path="/newmember" element={<ELCBNewMember />} />
            <Route path="/" element={<ELCBLanding />} />
          </Routes>



          <ELCBFooter />


        </Box>
      </ThemeProvider>
    </>
  );
};


export default App;