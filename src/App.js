import React, { useState, useEffect } from "react";

import ELCBHeader from "./components/ELCBHeader";
import ELCBFooter from "./components/ELCBFooter";
import ELCBLanding from "./components/ELCBLanding"
import Container from "@mui/material/Container"
import Box from "@mui/material/Box"
import { ThemeProvider, createTheme } from '@mui/material/styles';
import "@fontsource/josefin-sans";
import { API, Amplify } from 'aws-amplify';
import { listMembers } from "./graphql/queries";
import ELCBNewMember from "./components/ELCBNewMember"
import ELCBMemberLanding from "./components/ELCBMemberLanding"
import ELCBMemberEnrol from "./components/ELCBMemberEnrol"
import ELCBSignIn from "./components/ELCBSignIn"
import ELCBMemberProfile from "./components/ELCBMemberProfile"
import { Routes, Route } from "react-router-dom"
import CssBaseline from "@mui/material/CssBaseline";

import { orange, green } from '@mui/material/colors';


import { withAuthenticator } from "@aws-amplify/ui-react";
import awsconfig from './aws-exports';
import { PrivateRoute } from "./components/PrivateRoute";
import * as queries from './graphql/queries';

import {
  createMember as createMemberMutation,
  updateMember as updateMemberMutation,
} from "./graphql/mutations";

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

      primary: {
        main: '#353535',
      },
      secondary: {
        main: green,
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

async function getProfile() {
  try{
    return API.graphql({
      query: queries.listMembers,
      variables: {
        limit: 1,
        order: [['createdAt', 'ASC']]
      },
      authMode: "AMAZON_COGNITO_USER_POOLS"
    })
  }
  catch{
    console.log("Not logged in")
  }
 
}


const App = ({ signOut }) => {
  const [members, setMembers] = useState([]);
  const [user, setUser] = useState({})
  const [userName, setUserName] = useState('guest')
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  function logIn(userName) {
    setUserName(userName)
    setIsLoggedIn(true)
  }


  useEffect(() => {
    getProfile().then(
      d => {
        console.log('got profile');
        setUser(
          {
            ...user,
            ...d.data.listMembers.items[0]

          })


      }).catch(
      
      console.log)
  }, []);

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box height="100vh" display="flex" flexDirection="column">

          <ELCBHeader signOut={signOut} isLoggedIn={isLoggedIn} userName={userName} />
          <Routes>

            <Route path="/newmember" element={<ELCBNewMember />} />
            <Route path="/signin" element={<ELCBSignIn handleLogin={logIn} />} />
            <Route path="/landing" element={<PrivateRoute><ELCBMemberLanding /></PrivateRoute>} />
            <Route path="/enrol" element={<PrivateRoute><ELCBMemberEnrol user={user} /></PrivateRoute>} />
            <Route path="/profile" element={<PrivateRoute><ELCBMemberProfile formObject={user} setFormObject={setUser} /></PrivateRoute>} />
            <Route path="/" element={<ELCBLanding />} />
          </Routes>



          <ELCBFooter />


        </Box>
      </ThemeProvider>
    </>
  );
};


export default App;