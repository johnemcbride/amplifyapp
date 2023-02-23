import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import NewMember from "./NewMember";
import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import TextField from "@mui/material/TextField";
import FormControl, { formControlClasses } from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import InputLabel from "@mui/material/InputLabel";
import Checkbox from "@mui/material/Checkbox";
import ToggleButton from "@mui/material/ToggleButton";
import GroupAdd from "@mui/icons-material/GroupAdd";
import CircularProgress from "@mui/material/CircularProgress";
import { Formik, ErrorMessage, Field } from "formik";
import { FormHelperText } from "@mui/material";
import * as yup from "yup";
import { Auth } from "aws-amplify";
import { useNavigate, Navigate } from "react-router-dom";
import { ResetTvRounded } from "@mui/icons-material";

export default function ELCBSignin({ handleLogin }) {
  const [error, setError] = useState({ error: false, message: "" });
  const [formObject, setFormObject] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleClose = () => {
    setError({ error: false });
  };
  // if logged in redirect to real page
  Auth.currentAuthenticatedUser()
    .then((user) => {
      console.log("logged in!");
      navigate("/landing");
    })
    .catch(console.log);

  const initialValues = {
    username: formObject.username || "",
    password: formObject.password || "",
  };
  return (
    <>
      <Grid
        container
        spacing={0}
        paddingX={{
          xs: "10px",
          sm: "100px",
        }}
      >
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
                  handleLogin(user.username);
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
                container
                component="form"
                marginTop={1}
                spacing={3}
                onSubmit={handleSubmit}
              >
                <Grid item xs={12}>
                  <TextField
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="username"
                    label="User Name"
                    value={values.username}
                    autoFocus
                    autoComplete="off"
                    fullWidth
                    error={errors.username && touched.username}
                    type="text"
                  />

                  <FormHelperText error={true} type="invalid">
                    <ErrorMessage name="forename" />
                  </FormHelperText>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="password"
                    label="Password"
                    value={values.password}
                    autoComplete="off"
                    fullWidth
                    error={errors.password && touched.password}
                    type="password"
                  />
                  <FormHelperText error={true} type="invalid">
                    <ErrorMessage name="password" />
                  </FormHelperText>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    fullWidth
                    type="submit"
                    variant="contained"
                    color="primary"
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
                    Log In
                  </Button>
                </Grid>
              </Grid>

              <Snackbar
                open={error.error}
                autoHideDuration={6000}
                onClose={() => {
                  handleClose();
                  resetForm(initialValues);
                }}
              >
                <Alert
                  onClose={() => {
                    handleClose();
                    resetForm(initialValues);
                  }}
                  severity="error"
                  sx={{ width: "100%" }}
                >
                  Login failed - bum note ({error.message})
                </Alert>
              </Snackbar>
            </>
          )}
        </Formik>
      </Grid>
    </>
  );
}
