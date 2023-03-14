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
import Stack from "@mui/material/Stack";

import Header from "./ELCBHeader";
import { Auth } from "aws-amplify";
import moment from "moment";
import { API } from "aws-amplify";
import {
  DataGrid,
  GridColDef,
  GridToolbar,
  GridValueGetterParams,
} from "@mui/x-data-grid";
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

export default function ELCBAdminLanding() {
  const navigate = useNavigate();
  const [user, setUser] = React.useState({});
  const [groups, setGroups] = React.useState([]);
  const [session, setSession] = React.useState({});
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [isEnrolled, setIsEnrolled] = React.useState(false);
  const [enrolments, setEnrolments] = React.useState(false);

  React.useEffect(() => {
    const fetchedEnrolments = API.graphql({
      query: queries.listEnrolments,
    });
    const fetchedUserDetails = Auth.currentAuthenticatedUser();
    const fetchSession = Auth.currentSession();

    Promise.all([fetchedEnrolments, fetchedUserDetails, fetchSession]).then(
      (values) => {
        const user = values[1];
        setUser(user);

        const enrolments = values[0];

        setEnrolments(enrolments.data.listEnrolments.items);
        console.log("Got enrolments");

        const session = values[2];
        setSession(session);
        setGroups(session.getIdToken().payload["cognito:groups"] || []);

        setIsLoaded(true);
        console.log("shoudl have loaded");
        console.log(values);
      }
    );
  }, []);

  return isLoaded ? (
    <>
      <GlobalStyles
        styles={{ ul: { margin: 0, padding: 0, listStyle: "none" } }}
      />
      <CssBaseline />
      <Header groups={groups} />

      <Hero user={user} />
      <MembershipGrid enrolments={enrolments} />

      <Footer />
    </>
  ) : (
    <Stack alignItems="center">
      <CircularProgress size={120} />
    </Stack>
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

function Hero({ user }) {
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
        {user.attributes.name}, Welcome to the Admin Portal.
      </Typography>
      <Typography
        variant="h5"
        align="left"
        color="text.secondary"
        component="p"
      >
        “I play the orchestra. And you’re a good musician.” Steve Jobs
      </Typography>
    </Container>
  );
}

function MembershipGrid({ enrolments }) {
  const columns: GridColDef[] = [
    { field: "status", headerName: "Status", resizable: true, width: 100 },
    {
      field: "total",
      headerName: "Total fees (£)",
      width: 100,
      valueFormatter: (params) => "£" + Number(params.value).toFixed(2),
      resizable: true,
    },
    {
      field: "firstname",
      headerName: "First name",
      width: 100,
      resizable: true,
    },
    {
      field: "familyname",
      headerName: "Family name",
      width: 100,
      resizable: true,
    },

    { field: "email", headerName: "Email", width: 300 },
    { field: "siblings", headerName: "Siblings", width: 100 },

    { field: "line1", headerName: "Address Line 1", width: 150 },
    { field: "line2", headerName: "Address Line 2", width: 150 },
    { field: "city", headerName: "City", width: 100 },
    { field: "postCode", headerName: "Post Code", width: 100 },

    { field: "stripeRef", headerName: "Stripe", resizable: true, width: 250 },
    { field: "term", headerName: "Term", resizable: true, width: 200 },
    {
      field: "bandDesc",
      headerName: "Band Membership Level",
      width: 300,
      resizable: true,
    },
    {
      field: "bandRate",
      headerName: "Band Rate Paid (£)",
      width: 200,
      valueFormatter: (params) => "£" + Number(params.value).toFixed(2),
      resizable: true,
    },
    { field: "lessonDesc", headerName: "Lessons", width: 200, resizable: true },
    {
      field: "lessonRate",
      headerName: "Lesson rate paid (£)",
      width: 200,
      valueFormatter: (params) => "£" + Number(params.value).toFixed(2),
      resizable: true,
    },

    { field: "giftAidConsent", headerName: "Gift Aid Consent", width: 150 },
    // total: Float
    // giftAidConsent: Boolean
    // city:String
    // line1:String
    // line2:String
    // postCode:String
    // email:String
    // siblings: Boolean
    // firstname:String
    // familyname:String
  ];

  const rows = enrolments;
  console.log(enrolments);
  return (
    <>
      <Grid
        container
        flexDirection="column"
        justifyContent="center"
        spacing={0}
        marginY={1}
        paddingX={{
          xs: "10px",
          sm: "100px",
        }}
      >
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            components={{ Toolbar: GridToolbar }}
            key={Math.random()}
            title="Enrolments"
            rows={rows}
            columns={columns}
            pageSize={2}
            rowsPerPageOptions={[2]}
            disableSelectionOnClick
          />
        </div>
      </Grid>
    </>
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
