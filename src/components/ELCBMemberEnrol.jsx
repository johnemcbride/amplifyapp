import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
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
import InputLabel from "@mui/material/InputLabel";
import CircularProgress from "@mui/material/CircularProgress";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Checkbox from "@mui/material/Checkbox";
import ToggleButton from "@mui/material/ToggleButton";
import GroupAdd from "@mui/icons-material/GroupAdd";
import { Formik, ErrorMessage, Field } from "formik";
import { FormHelperText } from "@mui/material";
import * as yup from "yup";
import { Auth } from "aws-amplify";
import { useNavigate } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import moment from "moment";

import { API } from "aws-amplify";

import { createEnrolment as createEnrolmentMutation } from "../graphql/mutations";

function createData(band: string, start: string, finish: string) {
  return { band, start, finish };
}

const rows = [
  createData("Stompers", "5pm", "6pm"),
  createData("Early", "5pm", "6pm"),
  createData("Main", "6pm", "7pm"),
  createData("Jazz", "6pm", "7pm"),
  createData("Premier", "6pm", "7pm"),
];

function isUnder30(momentDate) {
  if (momentDate instanceof moment) {
    console.log(
      (-1 * momentDate.diff(Date())) / (60 * 60 * 24 * 365.2425 * 1000)
    );
    return (
      (-1 * momentDate.diff(Date())) / (60 * 60 * 24 * 365.2425 * 1000) < 30
    );
  } else {
    console.log("not a moment");
    return false;
  }
}

function oneSmallBandOnly(bands) {
  console.log(bands[0] in ["Stompers"]);
  return bands.length === 1 && ["Stompers", "Early Music"].includes(bands[0]);
}

function calculateMembershipRate(dateofbirth, bands, siblings) {
  if (isUnder30(dateofbirth) && (oneSmallBandOnly(bands) || siblings)) {
    return [
      "£26.25 - (QUARTER) - YOUNG PEOPLE IN ONE SMALL BAND OR WITH SIBLINGS UNDER 30",
      26.25,
    ];
  } else if (isUnder30(dateofbirth) || oneSmallBandOnly(bands)) {
    return ["£52.50 - (HALF) - YOUNG PEOPLE OR ONE SMALL BAND", 52.2];
  } else {
    return ["£105.00 - (FULL)", 105];
  }
}

export default function ELCBMemberEnrol({ user }) {
  const [formObject, setFormObject] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mode, setMode] = useState("pickbands");
  const navigate = useNavigate();

  async function createEnrolment(bands, term, ratedescription, rate, memberId) {
    const data = {
      status: "pending",
      bands: bands,
      term: term,
      ratedescription: ratedescription,
      rate: rate,
      enrolmentMemberId: memberId,
    };
    console.log("publishing " + JSON.stringify(data));
    try {
      await API.graphql({
        query: createEnrolmentMutation,
        variables: { input: data },
        authMode: "AMAZON_COGNITO_USER_POOLS",
      }).then((result) => {
        //get id
        const id = result.data.createEnrolment.id;
        console.log(result);
        API.post("checkout", "/checkout", {
          body: {
            id: id,
          },
        }).then((res) => {
          setIsSubmitting(false);
          window.location.replace(res);
        });
      });
    } catch (e) {
      console.log(e);
      // handler later
    }
  }
  const options = [
    { id: "stompers", description: "Stompers" },
    { id: "early", description: "Early Music" },
    { id: "main", description: "Main Band" },
    { id: "jazz", description: "Jazz" },
    { id: "premier", description: "Premier" },
  ];

  const columns = ["Band", "Start Time", "End Time"];

  const handleForward = () => {};
  const handleBack = () => {};

  return (
    <Formik
      validationSchema={yup.object().shape({
        bands: yup
          .array()
          .of(yup.string())
          .required("Required")
          .test({
            message: "You must pick at least one band",
            test: (arr) => arr.length !== 0,
          }),
      })}
      initialValues={{
        bands: formObject.bands || [],
      }}
      onSubmit={(values) => {
        // pay
        setIsSubmitting(true);
        createEnrolment(
          values.bands,
          "2023 Term 2 (2nd Jan - 3rd Mar)",
          calculateMembershipRate(
            moment(user.dateofbirth, "YYYY-MM-DD"),
            values.bands,
            false
          )[0],
          calculateMembershipRate(
            moment(user.dateofbirth, "YYYY-MM-DD"),
            values.bands,
            false
          )[1],
          user.id
        );
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
      }) => (
        <>
          <Grid
            container
            align="center"
            marginX={0}
            xs={12}
            flexDirection="column"
            justifyContent="space-around"
            spacing={0}
            paddingX={{
              xs: "10px",
              sm: "100px",
            }}
            paddingY={{
              xs: "10px",
              sm: "10px",
            }}
          >
            {mode == "pickbands" ? (
              <>
                <TableContainer component={Paper}>
                  <Table
                    marginY={"10px"}
                    size="small"
                    aria-label="a dense table"
                  >
                    <TableHead>
                      <TableRow>
                        <TableCell>Band</TableCell>
                        <TableCell align="right">Start Time</TableCell>
                        <TableCell align="right">Finish Time</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows.map((row) => (
                        <TableRow
                          key={row.band}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell component="th" scope="row">
                            {row.band}
                          </TableCell>
                          <TableCell align="right">{row.start}</TableCell>
                          <TableCell align="right">{row.finish}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>

                <FormControl marginY={"10px"} fullWidth>
                  <InputLabel id="bands">Pick bands</InputLabel>

                  <Select
                    marginY={"10px"}
                    component="Select"
                    name="bands"
                    id="bands"
                    value={values.bands}
                    label="Pick bands"
                    labelId="bands"
                    // You need to set the new field value
                    onChange={handleChange("bands")}
                    onClose={handleBlur("bands")}
                    multiple={true}
                    fullWidth
                  >
                    {options.map((s) => (
                      <MenuItem key={s.id} value={s.description}>
                        {s.description}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText error="true" type="invalid">
                    <ErrorMessage name={"bands"} />
                  </FormHelperText>
                </FormControl>

                <Grid container marginY={"10px"} spacing={1}>
                  <Grid item xs={6}>
                    <Button
                      fullWidth
                      onClick={() => {
                        navigate("/landing");
                      }}
                      variant="outlined"
                    >
                      Go Back
                    </Button>
                  </Grid>
                  <Grid item xs={6}>
                    <Button
                      fullWidth
                      onClick={() => setMode("ss")}
                      variant="contained"
                      disabled={
                        !isValid ||
                        (Object.keys(touched).length === 0 &&
                          touched.constructor === Object)
                      }
                    >
                      Next
                    </Button>
                  </Grid>
                </Grid>
              </>
            ) : (
              <>
                <TableContainer component={Paper}>
                  <Table
                    marginY={"10px"}
                    size="small"
                    aria-label="a dense table"
                  >
                    <TableBody>
                      <TableRow
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          Name
                        </TableCell>
                        <TableCell align="right">
                          {user.forename} {user.surname}
                        </TableCell>
                      </TableRow>
                      <TableRow
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          Bands
                        </TableCell>
                        <TableCell align="right">
                          {values.bands.join(", ")}
                        </TableCell>
                      </TableRow>
                      <TableRow
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          Term
                        </TableCell>
                        <TableCell align="right">
                          2023 Term 2 (2nd Jan - 3rd Mar)
                        </TableCell>
                      </TableRow>
                      <TableRow
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          Membership Rate
                        </TableCell>
                        <TableCell align="right">
                          {
                            calculateMembershipRate(
                              moment(user.dateofbirth, "YYYY-MM-DD"),
                              values.bands,
                              false
                            )[0]
                          }
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>

                <Grid container marginY={"10px"} spacing={1}>
                  <Grid item xs={6}>
                    <Button
                      fullWidth
                      onClick={() => {
                        setMode("pickbands");
                      }}
                      variant="outlined"
                    >
                      Go Back
                    </Button>
                  </Grid>
                  <Grid item xs={6}>
                    <Button
                      fullWidth
                      onClick={handleSubmit}
                      variant="contained"
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
                      PAY
                    </Button>
                  </Grid>
                </Grid>
              </>
            )}
          </Grid>
        </>
      )}
    </Formik>
  );
}
