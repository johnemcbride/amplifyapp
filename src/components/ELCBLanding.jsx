import React, { useState, useEffect } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Formik, ErrorMessage, Field } from "formik";
import { Auth } from "aws-amplify";
import * as yup from "yup";
import { FormHelperText } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

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

export default function SignInSide() {
  const [error, setError] = useState({ error: false, message: "" });
  const [formObject, setFormObject] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();

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
    // if logged in redirect to real page
    Auth.currentAuthenticatedUser()
      .then((user) => {
        console.log("logged in!");
        navigate("/landing");
      })
      .catch(setIsLoaded(true));
  });

  return isLoaded ? (
    <>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
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
            console.log("Trying to log in");
            console.log(values);
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
                elevation={6}
                square
              >
                <Box
                  sx={{
                    my: 8,
                    mx: 4,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                    <LockOutlinedIcon />
                  </Avatar>
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
                        <Link to="/signup" variant="body2">
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
