import * as React from "react";
import AppBar from "@mui/material/AppBar";

import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import FormLabel from "@mui/material/FormLabel";
import Button from "@mui/material/Button";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Link from "@mui/material/Link";
import Divider from "@mui/material/Divider";
import GlobalStyles from "@mui/material/GlobalStyles";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import { Auth } from "aws-amplify";
import Header from "./ELCBHeader";
import moment from "moment";
import { API } from "aws-amplify";
import ELCBLoading from "./ELCBLoading";
import CircularProgress from "@mui/material/CircularProgress";
import * as queries from "../graphql/queries";
import { useNavigate, Navigate } from "react-router-dom";
import { createEnrolment as createEnrolmentMutation } from "../graphql/mutations";

import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import FormGroup from "@mui/material/FormGroup";
import Checkbox from "@mui/material/Checkbox";
import FolderIcon from "@mui/icons-material/Folder";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { HorizontalRule } from "@mui/icons-material";
const age = (birthdate) => {
  return moment().diff(birthdate, "years");
};

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

export default function PricingContent() {
  const [user, setUser] = React.useState({});
  const [groups, setGroups] = React.useState([]);
  const [session, setSession] = React.useState({});
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [isEnrolled, setIsEnrolled] = React.useState(false);
  const [enrolment, setEnrolment] = React.useState(false);

  React.useEffect(() => {
    console.log("Landing Page mountee");
    const fetchedEnrolments = API.graphql({
      query: queries.listEnrolments,
      variables: {
        filter: { status: { eq: "paid" } },
      },
    });
    const fetchedUserDetails = Auth.currentAuthenticatedUser().catch(
      console.log("jamaim")
    );
    const fetchSession = Auth.currentSession();

    Promise.all([fetchedEnrolments, fetchedUserDetails, fetchSession])
      .then((values) => {
        const user = values[1];
        setUser(user);

        const enrolments = values[0];
        if (
          enrolments.data.listEnrolments.items.filter(
            (item) => item.owner === user.username
          ).length > 0
        ) {
          setIsEnrolled(true);
          setEnrolment(
            enrolments.data.listEnrolments.items.filter(
              (item) => item.owner === user.username
            )[0]
          );
          console.log("Is enrolled!");
        }

        const session = values[2];
        setSession(session);
        setGroups(session.getIdToken().payload["cognito:groups"] || []);

        setIsLoaded(true);
        console.log("shoudl have loaded");
        console.log(values);
      })
      .catch(console.log);
  }, []);

  let tiers = [];
  if (
    user.attributes?.profile === "siblings" &&
    age(user.attributes?.birthdate) < 30
  ) {
    tiers = [
      {
        title: "All Bands",
        subheader: "",
        price: "26.25",
        description: ["Includes"],
        buttonText: "Get started",
        buttonVariant: "contained",
        discount: "Discount: Sibling Under 30",
        bands: "big",
        lessons: false,
        included: [
          "Drumline",
          "Early Music",
          "Jazz Stompers",
          "Premier Band",
          "Main Band",
          "Big Band",
          "Chamber Band",
          "Jazz Combo",
        ],
      },
      {
        title: "Tuition Only",
        subheader: "",
        price: "26.25",
        description: ["Includes"],
        buttonText: "Get started",
        buttonVariant: "outlined",
        discount: "Discount: Sibling Under 30",
        bands: "big",
        lessons: true,
        included: [],
        notincluded: [
          "Drumline",
          "Early Music",
          "Jazz Stompers",
          "Premier Band",
          "Main Band",
          "Big Band",
          "Chamber Band",
          "Jazz Combo",
        ],
      },
    ];
  } else {
    tiers = [
      {
        title: "All Bands",
        subheader: "",
        price: age(user.attributes?.birthdate) <= 30 ? "52.50" : "105.00",
        description: ["Includes"],
        buttonText: "Get started",
        buttonVariant: "contained",
        discount:
          age(user.attributes?.birthdate) <= 30 ? "Discount: Under 30" : "",
        bands: "big",
        lessons: false,
        included: [
          "Drumline",
          "Early Music",
          "Jazz Stompers",
          "Premier Band",
          "Main Band",
          "Big Band",
          "Chamber Band",
          "Jazz Combo",
        ],
        notincluded: [],
      },
      {
        title: "One Small Band",
        subheader: "",
        price: age(user.attributes?.birthdate) <= 30 ? "26.25" : "52.50",
        description: ["Includes"],
        buttonText: "Get started",
        buttonVariant: "outlined",
        discount:
          age(user.attributes?.birthdate) <= 30 ? "Discount: Under 30" : "",
        bands: "small",
        lessons: false,
        included: ["Drumline", "Early Music", "Jazz Stompers", "Premier Band"],
        notincluded: ["Main Band", "Big Band", "Chamber Band", "Jazz Combo"],
      },
      {
        title: "Tuition Only",
        subheader: "",
        price: age(user.attributes?.birthdate) <= 30 ? 52.5 * 2 : 105.0 * 2,
        description: ["Includes"],
        buttonText: "Get started",
        buttonVariant: "outlined",
        discount:
          age(user.attributes?.birthdate) <= 30 ? "Discount: Under 30" : "",
        bands: "big",
        lessons: true,
        included: [],
        notincluded: [
          "Drumline",
          "Early Music",
          "Jazz Stompers",
          "Premier Band",
          "Main Band",
          "Big Band",
          "Chamber Band",
          "Jazz Combo",
        ],
      },
    ];
  }

  return isLoaded ? (
    <>
      <GlobalStyles
        styles={{ ul: { margin: 0, padding: 0, listStyle: "none" } }}
      />
      <CssBaseline />
      <Header groups={groups} />
      {isEnrolled ? (
        <>
          <HeroEnrolled user={user} enrolment={enrolment} />
          <MembershipSummary enrolment={enrolment} />
        </>
      ) : (
        <>
          <HeroUnenrolled user={user} />
          <MemberShipPicker tiers={tiers} session={session} />
        </>
      )}
      <Footer />
    </>
  ) : (
    <ELCBLoading />
  );
}

function Footer() {
  return (
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
  );
}

function HeroUnenrolled({ user }) {
  return (
    <Container
      // disableGutters
      maxWidth="sm"
      component="main"
      sx={{ pt: 2, pb: 2 }}
    >
      <Typography
        component="h1"
        variant="h5"
        align="left"
        color="text.primary"
        gutterBottom
      >
        {user.attributes.name}, please pay your membership fees for the term
      </Typography>
      <Typography
        variant="h5"
        align="left"
        color="text.secondary"
        component="p"
      >
        {age(user.attributes?.birthdate) <= 30
          ? "  Do you have a brother or sister in band?  Update your profile to make sure you pay the cheaper sibling rate.  "
          : null}
        Choose from these options:
      </Typography>
    </Container>
  );
}

function HeroEnrolled({ user, enrolment }) {
  return (
    <Container
      // disableGutters
      maxWidth="sm"
      component="main"
      sx={{ pt: 8, pb: 6 }}
    >
      <Typography
        component="h1"
        variant="h3"
        align="left"
        color="text.primary"
        gutterBottom
      >
        {user.attributes.name}, You've signed up!
      </Typography>
      <Typography
        variant="h5"
        align="left"
        color="text.secondary"
        component="p"
      >
        Your enrolment details are below for the term "{enrolment.term}"
      </Typography>
    </Container>
  );
}

function MemberShipPicker({ tiers, session }) {
  const [isLoading, setIsloading] = React.useState(false);

  const [value, setValue] = React.useState("");
  const [error, setError] = React.useState(false);
  const [helperText, setHelperText] = React.useState("");

  const handleRadioChange = (event) => {
    setValue(event.target.value);
    setHelperText(" ");
    setError(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setIsloading(true);
    if (value == "") {
      console.log("setting helper");
      setHelperText(
        "You must pick a band membership option before submitting."
      );
      setIsloading(false);
    } else {
      console.log("creating enrolment");
      API.graphql({
        query: createEnrolmentMutation,
        variables: {
          input: { bands: value, lessons: checked },
        },
      }).then((res) => {
        API.post("checkout", "/checkout", {
          body: {
            accesskey: session.accessToken,
            enrolmentId: res.data.createEnrolment.id,
          },
        }).then((res) => {
          window.location.replace(res.url);
        });
      });
    }

    console.log(value + checked + isLoading);
  };
  const [checked, setChecked] = React.useState(false);

  const handleChange = (event) => {
    setChecked(!checked);
  };
  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "baseline",
        mb: 2,
      }}
      container
      direction="column"
      alignItems="center"
      justifyItems="center"
    >
      <Grid disableGutters item xs={12}>
        <form onSubmit={handleSubmit}>
          <FormControl error={error} variant="standard">
            <table width="100%">
              <RadioGroup
                aria-labelledby="demo-error-radios"
                name="quiz"
                value={value}
                onChange={handleRadioChange}
              >
                <tr>
                  <td>
                    <FormControlLabel
                      style={{
                        paddingX: 0,
                        marginX: 0,
                        marginRight: 0,
                      }}
                      value="all"
                      control={<Radio />}
                    />
                  </td>
                  <td>
                    <Typography component="p" variant="h6" color="green">
                      <b>All Bands</b> includes <b>all</b> of:
                    </Typography>
                    <table style={{}}>
                      <tr>
                        <td
                          style={{
                            verticalAlign: "top",
                            width: "50%",
                          }}
                        >
                          {" "}
                          <List
                            dense={true}
                            component="nav"
                            aria-label="contacts"
                          >
                            <ListItem>
                              <ListItemText primary={"Percussion"} />
                            </ListItem>
                            <ListItem>
                              <ListItemText primary={"Early Music"} />
                            </ListItem>
                            <ListItem>
                              <ListItemText primary={"Premier Band"} />
                            </ListItem>
                            <ListItem>
                              <ListItemText primary={"Jazz Stompers"} />
                            </ListItem>
                          </List>
                        </td>
                        <td
                          style={{
                            verticalAlign: "top",
                            width: "50%",
                            paddingLeft: "10px",
                          }}
                        >
                          <Typography component="p" variant="body">
                            <List
                              dense={true}
                              component="nav"
                              aria-label="contacts"
                            >
                              <ListItem>
                                <ListItemText primary={"Main Band"} />
                              </ListItem>
                              <ListItem>
                                <ListItemText primary={"Big Band"} />
                              </ListItem>
                              <ListItem>
                                <ListItemText primary={"Chamber Band"} />
                              </ListItem>
                              <ListItem>
                                <ListItemText primary={"Jazz Combo"} />
                              </ListItem>
                            </List>
                          </Typography>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td>
                    {" "}
                    <FormControlLabel
                      style={{
                        paddingX: 0,
                        marginX: 0,
                        marginRight: 0,
                      }}
                      value="small"
                      control={<Radio />}
                    />
                  </td>
                  <td>
                    <Typography component="p" variant="h6" color="green">
                      <b>One Small Band Only</b> includes <b>one</b> of:
                    </Typography>
                    <table>
                      <tr>
                        <td
                          style={{
                            verticalAlign: "top",
                            width: "50%",
                          }}
                        >
                          <List
                            dense={true}
                            component="nav"
                            aria-label="contacts"
                          >
                            <ListItem>
                              <ListItemText primary={"Percussion"} />
                            </ListItem>
                            <ListItem>
                              <ListItemText primary={"Early Music"} />
                            </ListItem>
                            <ListItem>
                              <ListItemText primary={"Premier Band"} />
                            </ListItem>
                          </List>
                        </td>
                        <td
                          align="top"
                          style={{
                            verticalAlign: "top",
                            width: "50%",
                            paddingLeft: "10px",
                          }}
                        >
                          <List
                            dense={true}
                            component="nav"
                            aria-label="contacts"
                          >
                            <ListItem>
                              <ListItemText primary={"Jazz Stompers"} />
                            </ListItem>
                            <ListItem>
                              <ListItemText primary={"Chamber Band"} />
                            </ListItem>
                            <ListItem>
                              <ListItemText primary={"Jazz Combo"} />
                            </ListItem>
                          </List>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td>
                    <FormControlLabel
                      style={{
                        paddingX: 0,
                        marginX: 0,
                        marginRight: 0,
                      }}
                      value="none"
                      control={<Radio />}
                    />
                  </td>
                  <td>
                    <Typography component="p" variant="h6" color="green">
                      <b>No Bands</b> (tuition only)
                    </Typography>
                  </td>
                </tr>

                <tr>
                  <td>
                    <FormControlLabel
                      style={{
                        paddingX: 0,
                        marginX: 0,
                        marginRight: 0,
                      }}
                      value="all"
                      control={<Checkbox />}
                      onClick={handleChange}
                    />
                  </td>
                  <td>
                    <Typography
                      paddingY={2}
                      component="p"
                      variant="body"
                      color="green"
                    >
                      Select here to <b>Include Tuition</b> in addition to band
                      membership
                    </Typography>
                  </td>
                </tr>
              </RadioGroup>
            </table>
            <Button
              marginTop={"15px"}
              paddingY={2}
              fullWidth
              disabled={isLoading}
              type="submit"
              variant="contained"
            >
              {isLoading ? (
                <>
                  <CircularProgress size={20} /> &nbsp;
                </>
              ) : null}
              pay now
            </Button>
            <Typography paddingY={2} component="p" variant="body" color="red">
              {helperText}
            </Typography>
          </FormControl>
        </form>
      </Grid>
    </Container>
  );
}

function LoadingButton({ session, tier }) {
  const [isLoading, setIsloading] = React.useState(false);
  return (
    <Button
      disabled={isLoading}
      onClick={() => {
        setIsloading(true);
        // create enrolment
        API.graphql({
          query: createEnrolmentMutation,
          variables: {
            input: { bands: tier.bands, lessons: tier.lessons },
          },
        }).then((res) => {
          API.post("checkout", "/checkout", {
            body: {
              accesskey: session.accessToken,
              enrolmentId: res.data.createEnrolment.id,
            },
          }).then((res) => {
            window.location.replace(res.url);
          });
        });
      }}
      fullWidth
      variant={tier.buttonVariant}
    >
      {isLoading ? (
        <>
          <CircularProgress size={12} /> &nbsp;
        </>
      ) : null}
      {tier.buttonText}
    </Button>
  );
}
function MembershipSummary({ enrolment }) {
  return (
    <Container maxWidth="md" component="main">
      <Grid container spacing={5} direction="row" alignItems="center">
        <Grid item xs={12}>
          <Card>
            <CardHeader
              title={enrolment.bandDesc}
              subheader={enrolment.lessons}
              action={null}
              titleTypographyProps={{
                align: "left",
              }}
              subheaderTypographyProps={{
                align: "left",
              }}
              sx={{
                backgroundColor: (theme) =>
                  theme.palette.mode === "light"
                    ? theme.palette.grey[200]
                    : theme.palette.grey[700],
              }}
            />
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "left",
                  alignItems: "baseline",
                  mb: 2,
                }}
              >
                <Typography component="h2" variant="h3" color="text.primary">
                  £{enrolment.bandRate}
                </Typography>
                <Typography variant="h6" color="text.secondary">
                  /term
                </Typography>
              </Box>

              <Container align="left"> </Container>
            </CardContent>
            <CardActions>
              <Button fullWidth variant="contained">
                Mark Attendance (TODO)
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
