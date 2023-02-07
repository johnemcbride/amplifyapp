import React, { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import Typography from "@mui/material/Typography";
import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container'
import TextField from '@mui/material/TextField'
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel"
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import MemberShipPicker from "./MemberShipPicker";

import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import "@fontsource/josefin-sans";
import { API } from 'aws-amplify';
import {
    createMember as createMemberMutation
} from "../graphql/mutations";
import { Formik, ErrorMessage, Field } from 'formik';
import * as yup from "yup";
import { FormHelperText } from "@mui/material";
import { create } from "yup/lib/Reference";




String.prototype.capitalize = function (lower) {
    return (lower ? this.toLowerCase() : this)
        .replace(/(?:^|\s|['`‘’.-])[^\x00-\x60^\x7B-\xDF](?!(\s|$))/g, function (a) {
            return a.toUpperCase();
        });
};

const theme = createTheme({

    typography: {
        fontFamily: [
            'Josefin Sans',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
    }
});

const schema = yup.object().shape({
    forename: yup.string().required("Required"),
    surname: yup.string().required("Required"),
    dateofbirth: yup.date().max(new Date(), "Date must be in the past").required("Required"),
    town: yup.string().required("Required"),
    postcode: yup.string().required("Required").matches(/([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9][A-Za-z]?))))\s?[0-9][A-Za-z]{2})/, "Not a valid postcode."),
    addressLine1: yup.string().required("Required"),
});

const AddUpdateMember = () => {

    async function createMember(values) {


        console.log(values.dateofbirth)
        const data = {
            forename: values.forename,
            surname: values.surname,
            dateOfBirth: values.dateofbirth.format('YYYY-MM-DDZ'),
            addressLine1: values.addressLine1,
            addressLine2: values.addressLine2,
            town: values.town,
            postCode: values.postcode,
        };
        try {
            await API.graphql({
                query: createMemberMutation,
                variables: { input: data },
                authMode: "AMAZON_COGNITO_USER_POOLS"
            });
        }
        catch (e) {
            console.log(e)
            // handler later

        }

    }

    return (
        <Formik
            validationSchema={schema}
            initialValues={{
                forename: '',
                surname: '',
                addressLine1: '',
                addressLine2: '',
                town: '',
                postcode: '',
                instruments: [],
                //
                //  forename: 'bla'  - for pre-filled

            }}
            onSubmit={(values, actions) => {

                createMember(values).then(actions.setSubmitting(false))


            }}
        >
            {({
                handleSubmit,
                handleChange,
                handleBlur,
                values,
                touched,
                isValid,
                errors,
                validateForm,
                setFieldValue
            }) =>
            (
                <ThemeProvider theme={theme}>
                    <LocalizationProvider dateAdapter={AdapterMoment}>

                        <MemberShipPicker />
                        <Container component="main" maxWidth="xs">
                            <CssBaseline />
                            <Typography variant="h5">
                                New Members Registration
                            </Typography>
                            <Typography variant="h6">
                                Sign Up & Pay For You & Your Family's Term Membership
                            </Typography>
                            <Box
                                sx={{
                                    marginTop: 8,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                }}>

                                <Box component="form" sx={{ mt: 3 }} onSubmit={handleSubmit}>
                                    <Grid container spacing={2}>

                                        <Grid item xs={12} >
                                            <FormControl fullWidth>
                                                <InputLabel id="demo-simple-select-label">Membership Type</InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    value={values.type}
                                                    label="Membership Type"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                >
                                                    <MenuItem value={'fullover30'}>£105.00 - Adult Over 30 Membership Of Multiple Bands</MenuItem>
                                                    <MenuItem value={'halfover30'}>£52.50 - Adult Over 30 Membership Of One Small Band</MenuItem>
                                                    <MenuItem value={'fullunder30'}>£52.50 - Adult Under 30 Membership Of Multiple Bands</MenuItem>
                                                    <MenuItem value={'halfunder30'}>£26.25 - Adult Under 30 Membership Of One Small Band</MenuItem>
                                                    <MenuItem value={'siblingunder30'}>£26.25 - Siblings Of Young Persons Under 30</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </Grid>


                                        <Grid item xs={12} sm={6}>

                                            <TextField
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                name="forename"
                                                label="First Name"
                                                value={values.forename.capitalize()}
                                                autoFocus
                                                autocomplete='off'
                                                fullWidth
                                                isInvalid={errors.forename && touched.forename}
                                                type="text" />
                                            <FormHelperText error="true" type="invalid">
                                                <ErrorMessage name="forename" />
                                            </FormHelperText>

                                        </Grid>
                                        <Grid item xs={12} sm={6}>

                                            <TextField
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                name="forename"
                                                label="First Name"
                                                value={values.forename.capitalize()}
                                                autoFocus
                                                autocomplete='off'
                                                fullWidth
                                                isInvalid={errors.forename && touched.forename}
                                                type="text" />
                                            <FormHelperText error="true" type="invalid">
                                                <ErrorMessage name="forename" />
                                            </FormHelperText>

                                        </Grid>
                                        <Grid item xs={12} sm={6}>

                                            <TextField
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.surname}
                                                name="surname"
                                                label="Surname"
                                                autocomplete='off'
                                                value={values.surname.capitalize()}
                                                fullWidth
                                                isInvalid={errors.surname && touched.surname}
                                                type="text" />
                                            <FormHelperText error="true" type="invalid">
                                                <ErrorMessage name="surname" />
                                            </FormHelperText>


                                        </Grid>
                                        <Grid item xs={12}>

                                            <DatePicker
                                                onChange={(value) => setFieldValue("dateofbirth", value, true)}
                                                onBlur={handleBlur}
                                                inputFormat="Do MMM yyyy"
                                                label="Date Of Birth"
                                                autocomplete='off'
                                                value={values.dateofbirth || null}
                                                fullWidth
                                                renderInput={(params) =>
                                                    <TextField
                                                        fullWidth
                                                        name="dateofbirth"

                                                        {...params} />}
                                                isInvalid={errors.dateofbirth && touched.dateofbirth}
                                            />

                                            <FormHelperText error="true" type="invalid">
                                                <ErrorMessage name="dateofbirth" />
                                            </FormHelperText>


                                        </Grid>
                                        <Grid item xs={12} >


                                            <TextField
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                name="addressLine1"
                                                autocomplete='off'
                                                label="Address Line 1"
                                                value={values.addressLine1.capitalize()}
                                                fullWidth
                                                isInvalid={errors.addressLine1 && touched.addressLine1}
                                                type="text" />

                                            <FormHelperText error="true" type="invalid">
                                                <ErrorMessage name="addressLine1" />
                                            </FormHelperText>


                                        </Grid>
                                        <Grid item xs={12} >


                                            <TextField
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                name="addressLine2"
                                                label="Address Line 2"
                                                autocomplete='off'
                                                value={values.addressLine2.capitalize()}
                                                fullWidth
                                                isInvalid={errors.addressLine2 && touched.addressLine2}
                                                type="text" />

                                            <FormHelperText error="true" type="invalid">
                                                <ErrorMessage name="addressLine2" />
                                            </FormHelperText>

                                        </Grid>
                                        <Grid item xs={12} >

                                            <TextField
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                name="town"
                                                label="Town"
                                                autocomplete='off'
                                                value={values.town.capitalize()}
                                                fullWidth
                                                isInvalid={errors.town && touched.town}
                                                type="text" />
                                            <FormHelperText error="true" type="invalid">
                                                <ErrorMessage name="town" />
                                            </FormHelperText>

                                        </Grid>
                                        <Grid item xs={12} sm={6}>

                                            <TextField
                                                onChange={handleChange}
                                                className="bg-light"
                                                onBlur={handleBlur}
                                                name="postcode"
                                                label="Post Code"
                                                fullWidth
                                                autocomplete='off'
                                                value={values.postcode.toUpperCase()}
                                                isInvalid={errors.postcode && touched.postcode}
                                                type="text" />

                                            <FormHelperText error="true" type="invalid">
                                                <ErrorMessage name="postcode" />
                                            </FormHelperText>


                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            {/* <FormControl fullWidth>
                                                <InputLabel id="demo-simple-select-label">Instruments</InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    multiple="true"
                                                    label="Age"
                                                    onChange={handleChange}
                                                    name="instruments"
                                                >
                                                    <MenuItem value={10}>Ten</MenuItem>
                                                    <MenuItem value={20}>Twenty</MenuItem>
                                                    <MenuItem value={30}>Thirty</MenuItem>
                                                </Select>
                                            </FormControl> */}

                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <Button
                                                fullWidth
                                                disabled={!isValid || (Object.keys(touched).length === 0 && touched.constructor === Object)}
                                                variant="contained" type="submit">
                                                Add Member
                                            </Button>
                                        </Grid>
                                    </Grid>

                                </Box>
                            </Box>
                        </Container>
                    </LocalizationProvider>
                </ThemeProvider >)
            }
        </Formik >
    );
};


export default AddUpdateMember;