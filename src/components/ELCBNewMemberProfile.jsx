import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Switch from "@mui/material/Switch";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import StarIcon from "@mui/icons-material/StarBorder";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import GlobalStyles from "@mui/material/GlobalStyles";
import Container from "@mui/material/Container";
import { Auth } from "aws-amplify";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { useNavigate, Navigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import PeopleIcon from "@mui/icons-material/PeopleOutlined";
import Avatar from "@mui/material/Avatar";
import { Formik, ErrorMessage, Field } from "formik";

import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import moment from "moment";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Alert from "@mui/material/Alert";
import * as yup from "yup";
import { FormHelperText } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Paper from "@mui/material/Paper";
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

const footers = [
  {
    title: "Company",
    description: ["Team", "History", "Contact us", "Locations"],
  },
  {
    title: "Features",
    description: [
      "Cool stuff",
      "Random feature",
      "Team feature",
      "Developer stuff",
      "Another one",
    ],
  },
  {
    title: "Resources",
    description: [
      "Resource",
      "Resource name",
      "Another resource",
      "Final resource",
    ],
  },
  {
    title: "Legal",
    description: ["Privacy policy", "Terms of use"],
  },
];

export default function PricingContent() {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const navigate = useNavigate();
  const handleClose = () => {
    setError({ error: false });
  };

  const age = (birthdate) => {
    return moment().diff(birthdate, "years");
  };
  const handleSaveProfile = (values) => {
    setIsSubmitting(true);
    console.log("handle svae profile" + JSON.stringify(values));
    const updated = {
      ...values,
      birthdate: moment(values.birthdate).format("MM/DD/YYYY"),
    };
    delete updated.sibling;
    Auth.updateUserAttributes(user, updated)
      .then((user) => {
        setIsSubmitting(false);
        navigate(0);
      })
      .catch((error) => {
        setError({ error: true, message: error.message });
        setIsSubmitting(false);
      });
  };

  const toggleSiblings = () => {
    console.log("toggling" + JSON.stringify(user));
    Auth.updateUserAttributes(user, {
      profile: user.attributes.profile === "siblings" ? "" : "siblings",
    })
      .then(() => {
        console.log("toggled successfully");
        navigate(0);
      })
      .catch((error) => {
        setError({ error: true, message: error.message });
        setIsSubmitting(false);
      });
  };

  const minDate = new Date(
    new Date(new Date().setFullYear(new Date().getFullYear() - 100)).setDate(1)
  );
  const [error, setError] = React.useState({ error: false, message: "" });
  const [user, setUser] = React.useState({});
  const [isLoaded, setIsLoaded] = React.useState(false);
  React.useEffect(() => {
    // Update the document title using the browser API
    Auth.currentAuthenticatedUser().then((user) => {
      setUser(user);
      setIsLoaded(true);
      console.log(JSON.stringify(user.attributes));
    });
  }, []);
  const initialValues = {
    name: user.attributes?.name || "",
    family_name: user.attributes?.family_name || "",
    birthdate: user.attributes?.birthdate || "",
    gender: user.attributes?.gender || "",
    sibling: user.attributes?.profile === "siblings" ? true : false,
  };
  console.log(initialValues);

  return (
    <>
      <GlobalStyles
        styles={{ ul: { margin: 0, padding: 0, listStyle: "none" } }}
      />
      <CssBaseline />
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
      >
        <Toolbar sx={{ flexWrap: "wrap" }}>
          <Typography variant="h6" color="inherit" sx={{ flexGrow: 1 }}>
            East London Community Band
          </Typography>
          <nav>
            <Link
              variant="button"
              color="text.primary"
              href="#"
              sx={{ my: 1, mx: 1.5 }}
            >
              Profile
            </Link>
            <Link
              variant="button"
              color="text.primary"
              href="#"
              sx={{ my: 1, mx: 1.5 }}
            >
              Membership
            </Link>
            <Link
              variant="button"
              color="text.primary"
              href="#"
              sx={{ my: 1, mx: 1.5 }}
            >
              Attendance
            </Link>
          </nav>
          <Button href="/signout" variant="outlined" sx={{ my: 1, mx: 1.5 }}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      {/* Hero unit */}
      <Container
        disableGutters
        maxWidth="sm"
        component="main"
        sx={{ pt: 0, pb: 0 }}
      ></Container>
      {/* End hero unit */}
      <Container maxWidth="md" component="main">
        <Grid
          container
          spacing={5}
          justifyContent="center"
          alignItems="flex-start"
        >
          <Formik
            enableReinitialize
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
                .required("You must confirm your password")
                .oneOf([yup.ref("password"), null], "Passwords must match"),
              email: yup
                .string()
                .required("Please provide contact Email")
                .email("Not a valid email"),
              name: yup.string().required("Required"),
              surname: yup.string().required("Required"),
              ethnicity: yup
                .string()
                .required(
                  "Please advise ethnic group for inclusion monitoring purposes"
                ),
              sex: yup.string().required(),
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
                {console.log(values)}
                <Grid item xs={12} sm={8} elevation={6} square>
                  <Box
                    sx={{
                      my: 8,
                      mx: 4,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <Accordion xs={12}>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                            <AccountCircleOutlinedIcon />
                          </Avatar>
                          <Typography alignItems={"center"}>
                            Manage Profile
                          </Typography>
                        </Box>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Box
                          component="form"
                          onSubmit={handleSubmit}
                          sx={{ mt: 1 }}
                        >
                          <Grid spacing={2} container>
                            <Grid item xs={12} sm={6}>
                              <TextField
                                onChange={handleChange}
                                onBlur={handleBlur}
                                name="name"
                                label="Forename"
                                value={values.name.capitalize()}
                                autoComplete="off"
                                fullWidth
                                error={errors.name && touched.name}
                                type="text"
                                helperText={<ErrorMessage name="name" />}
                              />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <TextField
                                onChange={handleChange}
                                onBlur={handleBlur}
                                name="family_name"
                                label="Surname"
                                value={values.family_name.capitalize()}
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
                                    setFieldValue("birthdate", value, true);
                                    setFieldTouched("birthdate", true, false);
                                  }}
                                  inputFormat="DD/MM/yyyy"
                                  autocomplete="off"
                                  label="Date Of Birth"
                                  value={values.birthdate || null}
                                  fullWidth
                                  renderInput={(params) => (
                                    <TextField
                                      onBlur={(value) => {
                                        setFieldTouched(
                                          "birthdate",
                                          true,
                                          false
                                        );
                                      }}
                                      fullWidth
                                      name="birthdate"
                                      error={
                                        errors.birthdate && touched.birthdate
                                      }
                                      {...params}
                                    />
                                  )}
                                />
                              </LocalizationProvider>
                              <FormHelperText error={true}>
                                <ErrorMessage name="birthdate" />
                              </FormHelperText>
                            </Grid>

                            <Grid item xs={12} align="center">
                              <ToggleButtonGroup
                                fullWidth
                                name="gender"
                                color="primary"
                                value={values.gender}
                                exclusive
                                onChange={(event, sex) => {
                                  setFieldValue("gender", sex);
                                }}
                              >
                                <ToggleButton value="male">Male</ToggleButton>
                                <ToggleButton value="female">
                                  Female
                                </ToggleButton>
                                <ToggleButton value="other">Other</ToggleButton>
                              </ToggleButtonGroup>
                              <FormHelperText error={true}>
                                <ErrorMessage name="gender" />
                              </FormHelperText>
                            </Grid>

                            <Grid item xs={12}>
                              {" "}
                              <Button
                                fullWidth
                                onClick={() => {
                                  handleSaveProfile(values);
                                }}
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                disabled={
                                  errors.code ||
                                  (Object.keys(touched).length === 0 &&
                                    touched.constructor === Object)
                                }
                              >
                                {isSubmitting ? (
                                  <CircularProgress
                                    size={20}
                                    color="secondary"
                                    sx={{ marginX: "20px" }}
                                  />
                                ) : null}
                                Save
                              </Button>
                            </Grid>
                          </Grid>
                        </Box>
                      </AccordionDetails>
                    </Accordion>
                    {age(user.attributes?.birthdate) < 30 ? (
                      <Accordion fullWidth>
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel1a-content"
                          id="panel1a-header"
                        >
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                              <PeopleIcon />
                            </Avatar>
                            <Typography alignItems={"center"}>
                              Manage Siblings
                            </Typography>
                          </Box>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Box
                            component="form"
                            onSubmit={handleSubmit}
                            sx={{ mt: 1 }}
                          >
                            <Grid spacing={2} container>
                              <Grid item xs={12}>
                                <FormControlLabel
                                  fullWidth
                                  onChange={() => {
                                    values.sibling = !values.sibling;
                                    toggleSiblings();
                                  }}
                                  control={
                                    <Switch
                                      checked={values.sibling}
                                      inputProps={{
                                        "aria-label": "controlled",
                                      }}
                                    />
                                  }
                                  label="I have at least one sibling under age 30 who is in the band"
                                />
                              </Grid>
                            </Grid>
                          </Box>
                        </AccordionDetails>
                      </Accordion>
                    ) : null}
                  </Box>
                </Grid>

                <Snackbar
                  open={error.error}
                  autoHideDuration={6000}
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  onClose={() => {
                    // handleClose();
                    // props.re(initialValues);
                  }}
                >
                  <Alert
                    onClose={() => {
                      handleClose();
                    }}
                    severity="error"
                    sx={{ width: "100%" }}
                  >
                    Update failed ({error.message})
                  </Alert>
                </Snackbar>
              </>
            )}
          </Formik>
        </Grid>
      </Container>
      {/* Footer */}
      <Container
        maxWidth="md"
        component="footer"
        sx={{
          borderTop: (theme) => `1px solid ${theme.palette.divider}`,
          mt: 8,
          py: [1, 1],
        }}
      >
        <Copyright sx={{ mt: 0 }} />
      </Container>
    </>
  );
}
