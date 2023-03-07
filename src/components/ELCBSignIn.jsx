import React, { useState, useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";

import Link from "@mui/material/Link";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { Formik, ErrorMessage, Field } from "formik";
import { Auth } from "aws-amplify";
import * as yup from "yup";
import CircularProgress from "@mui/material/CircularProgress";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

import GlobalStyles from "@mui/material/GlobalStyles";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" to="https://www.eastlondoncommunityband.co.uk">
        East London Community Band
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function ELCBSignIn() {
  const [error, setError] = useState({ error: false, message: "" });
  const [formObject, setFormObject] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();

  Hub.listen("auth", ({ payload }) => {
    const { event } = payload;
    if (event === "autoSignIn") {
      console.log("hub got giddy");
      navigate("/landing");
    } else if (event === "autoSignIn_failure") {
      // redirect to sign in page
    }
  });

  const initialValues = {
    username: formObject.username || "",
    password: formObject.password || "",
  };

  const handleClose = () => {
    setError({ error: false });
    setFormObject({ username: "", password: "" });
  };

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    console.log("is loaded is" + isLoaded);
    console.log("sign in page moutning");
    // if logged in redirect to real page
    Auth.currentAuthenticatedUser()
      .then((user) => {
        console.log("logged in!");
        navigate("/landing");
      })
      .catch(() => {
        setIsLoaded(true);
      });
  });

  return isLoaded ? (
    <>
      <GlobalStyles
        styles={{ ul: { margin: 0, padding: 0, listStyle: "none" } }}
      />

      <CssBaseline />

      <Grid container component="main" sx={{ height: "100vh" }}>
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://pbs.twimg.com/media/FBv9fhvXEGAfrKL?format=jpg&name=large)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        <Formik
          enableReinitialize
          validationSchema={yup.object().shape({
            username: yup.string().required("Required"),
            password: yup.string().required("Required"),
          })}
          initialValues={initialValues}
          onSubmit={(values) => {
            setIsSubmitting(true);
            setFormObject({
              ...formObject,
              ...values,
            });
            try {
              Auth.signIn(values.username, values.password)
                .then((user) => {
                  navigate("/landing");
                  setIsSubmitting(false);
                })
                .catch((error) => {
                  setError({ error: true, message: error.message });
                  setIsSubmitting(false);
                  console.log("error signing in", error);
                });
            } catch (error) {}
          }}
        >
          {({
            handleSubmit,
            values,
            touched,
            isValid,
            errors,
            handleChange,
            handleBlur,
            setFieldValue,
            setFieldTouched,
            resetForm,
          }) => (
            <>
              <Grid
                item
                xs={12}
                sm={8}
                md={5}
                component={Paper}
                elevation={0}
                square
              >
                <AppBar
                  position="static"
                  color="default"
                  elevation={0}
                  sx={{
                    borderBottom: (theme) =>
                      `1px solid ${theme.palette.divider}`,
                  }}
                >
                  <Toolbar sx={{ flexWrap: "wrap" }}>
                    <Typography
                      variant="h6"
                      color="inherit"
                      sx={{ flexGrow: 1 }}
                    >
                      East London Community Band
                    </Typography>
                  </Toolbar>
                </AppBar>
                <Box
                  sx={{
                    my: 8,
                    mx: 4,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Box
                    component="img"
                    sx={{
                      height: 73,
                      width: 80,
                      my: 1,
                    }}
                    alt="The house from the offer."
                    src="/elcblogo.png"
                  />
                  <Typography component="h1" variant="h5">
                    Sign in
                  </Typography>
                  <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                    <TextField
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="username"
                      label="User Name"
                      value={values.username}
                      autoComplete="off"
                      fullWidth
                      error={errors.username && touched.username}
                      type="text"
                      helperText={<ErrorMessage name="username" />}
                    />

                    <TextField
                      onChange={handleChange}
                      onBlur={handleBlur}
                      margin="normal"
                      required
                      name="password"
                      label="Password"
                      value={values.password}
                      autoComplete="off"
                      fullWidth
                      error={errors.password && touched.password}
                      type="password"
                      helperText={<ErrorMessage name="password" />}
                    />

                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                      disabled={
                        !isValid ||
                        (Object.keys(touched).length === 0 &&
                          touched.constructor === Object) ||
                        isSubmitting
                      }
                    >
                      {isSubmitting ? (
                        <CircularProgress
                          size={20}
                          color="secondary"
                          sx={{ marginX: "20px" }}
                        />
                      ) : null}
                      Sign In
                    </Button>

                    <Grid container>
                      <Grid item xs>
                        {/*<Link href="#" variant="body2">
                        Forgot password?
                      </Link>*/}
                      </Grid>
                      <Grid item>
                        <Link href="/signup" variant="body2">
                          {"Don't have an account? Sign Up"}
                        </Link>
                      </Grid>
                    </Grid>
                    <Copyright sx={{ mt: 5 }} />
                  </Box>
                </Box>
              </Grid>
              <Snackbar
                open={error.error}
                autoHideDuration={6000}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                onClose={() => {
                  handleClose();
                }}
              >
                <Alert
                  onClose={() => {
                    handleClose();
                  }}
                  severity="error"
                  sx={{ width: "100%" }}
                >
                  Login failed ({error.message})
                </Alert>
              </Snackbar>
            </>
          )}
        </Formik>
      </Grid>
    </>
  ) : null;
}
