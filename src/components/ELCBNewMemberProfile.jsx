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
import Header from "./ELCBHeader";
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

import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl, { formControlClasses } from "@mui/material/FormControl";

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

const ethnicGroups = [
  "Indian",
  "Pakistani",
  "Bangladeshi",
  "Chinese",
  "Any other Asian background",
  "Caribbean",
  "African",
  "Any other Black, Black British, or Caribbean background",
  "White and Black Caribbean",
  "White and Black African",
  "White and Asian",
  "White - English, Welsh, Scottish, Northern Irish or British",
  "White - Irish",
  "White - Gypsy or Irish Traveller",
  "White - Roma",
  "Any other White background",
  "Arab",
  "Any other ethnic group",
];

export default function PricingContent() {
  const navigate = useNavigate();
  const [user, setUser] = React.useState({});
  const [groups, setGroups] = React.useState([]);
  const [session, setSession] = React.useState({});
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [isEnrolled, setIsEnrolled] = React.useState(false);
  const [enrolments, setEnrolments] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

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
      "custom:ethnicity": values.ethnicity,
    };
    delete updated.sibling;
    delete updated.ethnicity;
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

  React.useEffect(() => {
    const fetchedUserDetails = Auth.currentAuthenticatedUser();
    const fetchSession = Auth.currentSession();

    Promise.all([fetchedUserDetails, fetchSession]).then((values) => {
      const user = values[0];
      setUser(user);

      const session = values[1];
      setSession(session);
      setGroups(session.getIdToken().payload["cognito:groups"] || []);

      setIsLoaded(true);
      console.log("shoudl have loaded");
      console.log(values);
    });
  }, []);

  const initialValues = {
    name: user.attributes?.name || "",
    family_name: user.attributes?.family_name || "",
    birthdate: user.attributes?.birthdate || "",
    gender: user.attributes?.gender || "",
    sibling: user.attributes?.profile === "siblings" ? true : false,
    ethnicity: user.attributes?.["custom:ethnicity"] || "",
  };
  console.log(initialValues);

  return (
    <>
      <GlobalStyles
        styles={{ ul: { margin: 0, padding: 0, listStyle: "none" } }}
      />
      <CssBaseline />
      <Header groups={groups} />
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
                  "Invalid Date - Expecting date in the format DD/MM/YYYY e.g. 31/08/2002"
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

                                <ToggleButton value="prefernotsay">
                                  Prefer not say
                                </ToggleButton>
                              </ToggleButtonGroup>
                              <FormHelperText error={true}>
                                <ErrorMessage name="gender" />
                              </FormHelperText>
                            </Grid>

                            <Grid
                              item
                              xs={12}
                              style={{
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              <FormControl
                                style={{
                                  whiteSpace: "unset",
                                  wordBreak: "break-all",
                                }}
                                fullWidth
                              >
                                <InputLabel
                                  id="ethnicitylabel"
                                  style={{
                                    whiteSpace: "unset",
                                    wordBreak: "break-all",
                                    width: "300px",
                                  }}
                                >
                                  Which ethnic group you belong to?
                                </InputLabel>

                                <Select
                                  component="TextAreaAutoSize"
                                  style={{
                                    whiteSpace: "unset",
                                    wordBreak: "break-all",
                                    width: "300px",
                                  }}
                                  labelId="ethnicitylabel"
                                  label="Which ethnic group you belong to?"
                                  name="ethnicity"
                                  value={values.ethnicity}
                                  // You need to set the new field value

                                  onChange={handleChange}
                                  onBlur={handleBlur("ethnicity")}
                                  multiple={false}
                                >
                                  {ethnicGroups.map((s) => (
                                    <MenuItem
                                      style={{
                                        whiteSpace: "unset",
                                        wordBreak: "break-word",
                                      }}
                                      key={s}
                                      value={s}
                                    >
                                      {s}
                                    </MenuItem>
                                  ))}
                                </Select>

                                <FormHelperText error="true" type="invalid">
                                  <ErrorMessage name={"ethnicity"} />
                                </FormHelperText>
                              </FormControl>
                            </Grid>

                            <Grid item xs={12}>
                              {" "}
                              <Button
                                color={"primary"}
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
