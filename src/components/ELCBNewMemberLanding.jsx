import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Link from "@mui/material/Link";
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
        subheader: "Without Tuition",
        price: "26.25",
        description: ["Any band included"],
        buttonText: "Get started",
        buttonVariant: "contained",
        discount: "Discount: Sibling Under 30",
        bands: "big",
        lessons: false,
      },
    ];
  } else {
    tiers = [
      {
        title: "All Bands",
        subheader: "Without Tuition",
        price: age(user.attributes?.birthdate) <= 30 ? "52.50" : "105.00",
        description: ["Any band included"],
        buttonText: "Get started",
        buttonVariant: "contained",
        discount:
          age(user.attributes?.birthdate) <= 30 ? "Discount: Under 30" : "",
        bands: "big",
        lessons: false,
      },
      {
        title: "One Small Band Only",
        subheader: "Without Tuition",
        price: age(user.attributes?.birthdate) <= 30 ? "26.25" : "52.50",
        description: ["Access to one small band only"],
        buttonText: "Get started",
        buttonVariant: "outlined",
        discount:
          age(user.attributes?.birthdate) <= 30 ? "Discount: Under 30" : "",
        bands: "small",
        lessons: false,
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
      sx={{ pt: 8, pb: 6 }}
    >
      <Typography
        component="h1"
        variant="h3"
        align="left"
        color="text.primary"
        gutterBottom
      >
        {user.attributes.name}, Sign Up For Term
      </Typography>
      <Typography
        variant="h5"
        align="left"
        color="text.secondary"
        component="p"
      >
        Choose one of the membership options below to join one or more of our
        bands.
        {age(user.attributes?.birthdate) <= 30
          ? "  If you have any siblings in the band, please update your profile to avail of sibling discount."
          : null}
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
  return (
    <Container maxWidth="md" component="main">
      <Grid
        container
        spacing={5}
        direction="row"
        alignItems="center"
        justifyItems="center"
      >
        {tiers.map((tier) => (
          // Enterprise card is full width at sm breakpoint
          <Grid item key={tier.title} xs={12} sm={12 / tiers.length}>
            <Card>
              <CardHeader
                title={tier.title}
                subheader={tier.subheader}
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
                    £{tier.price}
                  </Typography>
                  <Typography variant="h6" color="text.secondary">
                    /term
                  </Typography>
                </Box>
                <ul>
                  {tier.description.map((line) => (
                    <Typography
                      component="li"
                      variant="subtitle1"
                      align="left"
                      key={line}
                    >
                      {line}
                    </Typography>
                  ))}
                </ul>
                <Container align="left">
                  {" "}
                  {tier.discount !== "" ? (
                    <Chip color="success" label={tier.discount} />
                  ) : null}
                </Container>
              </CardContent>
              <CardActions>
                <LoadingButton tier={tier} session={session} />
              </CardActions>
            </Card>
          </Grid>
        ))}
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
      <Grid
        container
        spacing={5}
        direction="row"
        alignItems="center"
        justifyItems="center"
      >
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
