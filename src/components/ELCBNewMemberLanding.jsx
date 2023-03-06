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
import StarIcon from "@mui/icons-material/StarBorder";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Link from "@mui/material/Link";
import GlobalStyles from "@mui/material/GlobalStyles";
import Container from "@mui/material/Container";
import { Auth } from "aws-amplify";
import moment from "moment";
import { API } from "aws-amplify";
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
  const navigate = useNavigate();
  const [user, setUser] = React.useState({});
  const [groups, setGroups] = React.useState([]);
  const [session, setSession] = React.useState({});
  const [isLoaded, setIsLoaded] = React.useState(false);
  React.useEffect(() => {
    // Update the document title using the browser API
    console.log("heres all the enrolments I see");
    API.graphql({ query: queries.listEnrolments }).then(console.log);
    Auth.currentAuthenticatedUser().then((user) => {
      setUser(user);
      setIsLoaded(true);
      console.log("user info");
      console.log(user);
    });

    Auth.currentSession().then((session) => {
      setSession(session);
      setGroups(session.getIdToken().payload["cognito:groups"] || []);
    });
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
            <Link color="text.primary" href="/" sx={{ my: 1, mx: 1.5 }}>
              East London Community Band
            </Link>
          </Typography>

          <nav>
            {groups.includes("Admin") ? (
              <Link
                variant="button"
                color="text.primary"
                href="/profile"
                sx={{ my: 1, mx: 1.5 }}
              >
                Admin
              </Link>
            ) : null}
            <Link
              variant="button"
              color="text.primary"
              href="/profile"
              sx={{ my: 1, mx: 1.5 }}
            >
              Profile
            </Link>
          </nav>
          <Button href="/signout" variant="outlined" sx={{ my: 1, mx: 1.5 }}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      {/* Hero unit */}
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
          {isLoaded ? user.attributes.name + ", " : ""} Sign Up For Term
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
      {/* End hero unit */}
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
                    <Typography
                      component="h2"
                      variant="h3"
                      color="text.primary"
                    >
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
                  <Button
                    onClick={() => {
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
                    {tier.buttonText}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
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
