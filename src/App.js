import React, { useState, useEffect } from "react";

import ELCBLanding from "./components/ELCBSignIn";
import ELCBAdminLanding from "./components/ELCBAdminLanding";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import "@fontsource/josefin-sans";
import { Amplify } from "aws-amplify";
import ELCBNewMemberLanding from "./components/ELCBNewMemberLanding";
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
          <Route path="/signup" element={<ELCBSignUp />} />
          <Route path="/signin" element={<ELCBSignIn />} />
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
