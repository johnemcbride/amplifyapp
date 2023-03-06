import React, { useState, useEffect } from "react";

import ELCBHeader from "./components/ELCBHeader";
import ELCBFooter from "./components/ELCBFooter";
import ELCBLanding from "./components/ELCBLanding";
import ELCBAdminLanding from "./components/ELCBAdminLanding";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import "@fontsource/josefin-sans";
import { API, Amplify } from "aws-amplify";
import { listMembers } from "./graphql/queries";
import ELCBNewMember from "./components/ELCBNewMember";
import ELCBNewMemberLanding from "./components/ELCBNewMemberLanding";
import ELCBMemberEnrol from "./components/ELCBMemberEnrol";
import ELCBSignIn from "./components/ELCBSignIn";
import ELCBSignUp from "./components/ELCBSignUp";
import ELCBSignOut from "./components/ELCBSignOut";
import ELCBNewMemberProfile from "./components/ELCBNewMemberProfile";
import { Routes, Route } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";

import { orange, green } from "@mui/material/colors";

import awsconfig from "./aws-exports";
import { PrivateRoute } from "./components/PrivateRoute";
import * as queries from "./graphql/queries";

import {
  createMember as createMemberMutation,
  updateMember as updateMemberMutation,
} from "./graphql/mutations";

Amplify.configure(awsconfig);

let theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        contained: {
          backgroundColor: "#408948",
        },
      },
    },
  },
  typography: {
    fontFamily: [
      "Josefin Sans",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    grid: {
      height: "100%",
    },
    palette: {
      primary: {
        main: orange[500],
      },
      secondary: {
        main: "#408948",
      },
    },
    overrides: {
      MuiAppBar: {
        colorDefault: {
          backgroundColor: "black",
        },
      },
    },
  },
});

const App = ({ signOut }) => {
  const [members, setMembers] = useState([]);
  const [user, setUser] = useState({});
  const [userName, setUserName] = useState("guest");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  function logIn(userName) {
    setUserName(userName);
    setIsLoggedIn(true);
  }

  useEffect(() => {}, []);

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route path="/newmember" element={<ELCBNewMember />} />
          <Route path="/signup" element={<ELCBSignUp />} />
          <Route path="/signin" element={<ELCBLanding />} />
          <Route
            path="/landing"
            element={
              <PrivateRoute>
                <ELCBNewMemberLanding />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <PrivateRoute>
                <ELCBAdminLanding />
              </PrivateRoute>
            }
          />
          <Route
            path="/enrol"
            element={
              <PrivateRoute>
                <ELCBMemberEnrol user={user} />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <ELCBNewMemberProfile
                  formObject={user}
                  setFormObject={setUser}
                />
              </PrivateRoute>
            }
          />
          <Route path="/" element={<ELCBLanding />} />
          <Route path="/signout" element={<ELCBSignOut />} />
        </Routes>
      </ThemeProvider>
    </>
  );
};

export default App;
