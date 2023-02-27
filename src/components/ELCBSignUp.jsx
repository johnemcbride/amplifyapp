import React, { useState, useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
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
import moment from "moment";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://www.eastlondoncommunityband.co.uk">
        East London Community Band
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function SignUpSide() {
  const [error, setError] = useState({ error: false, message: "" });
  const [formObject, setFormObject] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const initialValues = {
    forename: formObject.forename || "",
    surname: formObject.surname || "",
    dateofbirth:
      formObject.dateofbirth != null
        ? moment(formObject.dateofbirth, "YYYY-MM-DD")
        : null,
    ethnicity: formObject.ethnicity || "",
  };

  const handleClose = () => {
    setError({ error: false });
    setFormObject({ username: "", password: "" });
  };
  // if logged in redirect to real page
  Auth.currentAuthenticatedUser()
    .then((user) => {
      console.log("logged in!");
      navigate("/landing");
    })
    .catch(console.log);

  const minDate = new Date(
    new Date(new Date().setFullYear(new Date().getFullYear() - 100)).setDate(1)
  );

  return (
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
              "url(https://pbs.twimg.com/media/E_31ryNVIAg0kxw?format=jpg&name=large)",
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
          //enableReinitialize
          validationSchema={yup.object().shape({
            username: yup
              .string()
              .required("Required")
              .matches(
                /[a-zA-Z0-9]/,
                "Username can only contain non-special letters and numbers."
              ),
            password: yup
              .string()
              .required("No password provided.")
              .min(8, "Password is too short - should be 8 chars minimum.")
              .matches(
                /[a-zA-Z0-9]/,
                "Password can only contain non-special letters and numbers."
              ),
            confirmpassword: yup
              .string()
              .oneOf([yup.ref("password"), null], "Passwords must match"),
            email: yup
              .string()
              .required("Please provide contact Email")
              .email("Not a valid email"),
            forename: yup.string().required("Required"),
            surname: yup.string().required("Required"),
            ethnicity: yup
              .string()
              .required(
                "Please advise ethnic group for inclusion monitoring purposes"
              ),
            dateofbirth: yup
              .date()
              .max(new Date(), "Date must be in the past")
              .min(minDate, "Check the year....")
              .required("Required")
              .typeError(
                'Invalid Date - Expecting date in the format e.g "26th September 2001"'
              ),
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
                    Sign up
                  </Typography>
                  <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                    <Grid spacing={2} container>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          onChange={handleChange}
                          onBlur={handleBlur}
                          name="forename"
                          margin="normal"
                          label="Fore Name"
                          value={values.forename}
                          autoFocus
                          autoComplete="off"
                          fullWidth
                          error={errors.forename && touched.forename}
                          type="text"
                          helperText={<ErrorMessage name="forename" />}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          onChange={handleChange}
                          onBlur={handleBlur}
                          margin="normal"
                          name="surname"
                          label="Surname"
                          value={values.surname}
                          autoComplete="off"
                          fullWidth
                          error={errors.surname && touched.surname}
                          type="text"
                          helperText={<ErrorMessage name="surname" />}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <LocalizationProvider dateAdapter={AdapterMoment}>
                          <DatePicker
                            onChange={(value) => {
                              setFieldValue("dateofbirth", value, true);
                              setFieldTouched("dateofbirth", true, false);
                            }}
                            inputFormat="DD/MM/yyyy"
                            autocomplete="off"
                            value={values.dateofbirth || null}
                            fullWidth
                            renderInput={(params) => (
                              <TextField
                                onBlur={(value) => {
                                  setFieldTouched("dateofbirth", true, false);
                                }}
                                fullWidth
                                name="dateofbirth"
                                isInvalid={
                                  errors.dateofbirth && touched.dateofbirth
                                }
                                {...params}
                              />
                            )}
                          />
                        </LocalizationProvider>
                      </Grid>

                      <Grid item xs={12} align="center">
                        <ToggleButtonGroup
                          fullWidth
                          name="sex"
                          color="primary"
                          value={values.sex}
                          exclusive
                          onChange={(event, sex) => {
                            setFieldValue("sex", sex);
                          }}
                        >
                          <ToggleButton value="male">Male</ToggleButton>
                          <ToggleButton value="female">Female</ToggleButton>
                          <ToggleButton value="prefernotsay">
                            Prefer Not Say
                          </ToggleButton>
                        </ToggleButtonGroup>
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          onChange={handleChange}
                          onBlur={handleBlur}
                          margin="normal"
                          name="username"
                          label="Pick A Username For Logging In"
                          value={values.username}
                          autoComplete="off"
                          fullWidth
                          error={errors.username && touched.username}
                          type="text"
                          helperText={<ErrorMessage name="username" />}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          onChange={handleChange}
                          onBlur={handleBlur}
                          margin="normal"
                          name="email"
                          label="Email Address"
                          value={values.email}
                          autoComplete="off"
                          fullWidth
                          error={errors.email && touched.email}
                          type="email"
                          helperText={<ErrorMessage name="email" />}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          onChange={handleChange}
                          margin="normal"
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
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          onChange={handleChange}
                          margin="normal"
                          onBlur={handleBlur}
                          required
                          name="confirmpassword"
                          label="Confirm Password"
                          value={values.confirmpassword}
                          autoComplete="off"
                          fullWidth
                          error={
                            errors.confirmpassword && touched.confirmpassword
                          }
                          type="password"
                          helperText={<ErrorMessage name="confirmpassword" />}
                        />
                      </Grid>
                    </Grid>
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
                      Sign Up
                    </Button>
                    <Grid container justifyContent="flex-end">
                      <Grid item>
                        <Link href="/" variant="body2">
                          {"Already have an account? Sign in"}
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
                  resetForm(initialValues);
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
              {console.log(JSON.stringify(errors))}
            </>
          )}
        </Formik>
      </Grid>
    </>
  );
}
