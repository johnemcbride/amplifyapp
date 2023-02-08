import React, { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import Typography from "@mui/material/Typography";
import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container'
import TextField from '@mui/material/TextField'
import FormControl, { formControlClasses } from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel"
import Checkbox from "@mui/material/Checkbox"
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';


import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import "@fontsource/josefin-sans";

import { Formik, ErrorMessage, Field } from 'formik';
import * as yup from "yup";
import { FormHelperText } from "@mui/material";



//  for radio group questions
import FormLabel from "@mui/material/FormLabel"
import FormControlLabel from "@mui/material/FormControlLabel"
import RadioGroup from "@mui/material/RadioGroup"
import Radio from "@mui/material/Radio"
import { SettingsEthernetSharp } from "@mui/icons-material";



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
    const [formObject, setFormObject] = useState({})
    const [step, setStep] = useState(0)



    return (
        <Container height="100vh" component="main" maxWidth="">
            <CssBaseline />
            <Typography variant="h6">
                New Members Registration
            </Typography>


            {(() => {
                switch (step) {

                    case 0:
                    default:
                        console.log('default')
                        return <YouOrThemForm
                            formObject={formObject}
                            handleYouOrThem={
                                (youOrThem) => {
                                    setFormObject({
                                        ...formObject,
                                        'youOrThem': youOrThem
                                    })
                                    setStep(1)
                                    console.log('Setting step 1')
                                }} />

                    case 1:
                        return <CaptureName
                            formObject={formObject}
                            handleBack={() => {
                                console.log('Back from names')
                                setStep(0)
                            }}
                            handleForward={
                                (values) => {
                                    setFormObject({
                                        ...formObject,
                                        ...values
                                    })
                                    setStep(2)
                                    console.log('Setting step 2')
                                }} />
                    case 2:
                        return <CaptureDOB
                            formObject={formObject}
                            handleBack={() => setStep(1)}
                            handleForward={
                                (values) => {
                                    setFormObject({
                                        ...formObject,
                                        ...values
                                    })
                                    setStep(3)
                                    console.log('Setting step 3')
                                }} />
                    case 3:
                        return <ChooseMultiBand
                            formObject={formObject}
                            handleBack={() => setStep(2)}
                            handleForward={
                                (values) => {
                                    setFormObject({
                                        ...formObject,
                                        ...values
                                    })
                                    setStep(4)
                                    console.log('Setting step 4')
                                }} />
                    case 4:
                        return <ChooseBands
                            formObject={formObject}
                            handleBack={() => setStep(2)}
                            handleForward={
                                (values) => {
                                    setFormObject({
                                        ...formObject,
                                        ...values
                                    })
                                    setStep(5)
                                    console.log('Setting step 5')
                                }} />


                }
            })()

            }
            {JSON.stringify(formObject)}

        </Container >
    );
};


function YouOrThemForm({ formObject, handleYouOrThem }) {
    let touched = null
    if (formObject.youOrThem != null) {
        console.log('you or them is not null, you know')
        touched = ['youOrThem']
    }

    return (
        <Formik
            validationSchema={
                yup.object().shape({
                    youOrThem: yup.string().required("Please select an option")
                })}

            initialTouched={touched}

            initialValues={{
                youOrThem: formObject.youOrThem || ''
            }}
            onSubmit={(values) => { console.log('submitting!!'); console.log(values); handleYouOrThem(values.youOrThem) }}
        >
            {({
                handleSubmit,
                values,
                touched,
                isValid,
                errors,
                setFieldValue,
                setFieldTouched
            }) =>
            (
                <>
                    <Typography color={'green'} variant="h7">
                        Are you completing this form for yourself or someone else?
                    </Typography>
                    <Grid container direction="column" justiyContent='space-between' component="form" spacing={2} onSubmit={handleSubmit}>

                        <Grid item xs={12} >
                            <FormControl   >
                                <RadioGroup
                                    name={"youOrThem"}
                                    value={values.youOrThem.toString()}
                                    isInvalid={errors.youOrThem}
                                    onChange={(event) => {
                                        console.log(event)
                                        setFieldValue('youOrThem', event.target.value.toString(), true)
                                        setFieldTouched('youOrThem', true, false)
                                    }}>
                                    <FormControlLabel value="you" control={<Radio />} label="Yourself" />
                                    <FormControlLabel value="them" control={<Radio />} label="Someone Else" />
                                </RadioGroup>
                            </FormControl>
                            <FormHelperText>
                                <ErrorMessage name={"youOrThem"} />
                            </FormHelperText>
                        </Grid>
                        <Grid item xs={12} >
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                disabled={!isValid || (Object.keys(touched).length === 0 && touched.constructor === Object)}>
                                Next
                            </Button>
                        </Grid>
                    </Grid>
                </>
            )
            }
        </Formik >

    )
}


function CaptureName({ formObject, handleBack, handleForward }) {
    let touched = null
    if (formObject.forename != null) {
        touched = ['forename']
    }
    return (
        <Formik

            //initialTouched={formObject.forename == '' ? true : false}
            //initialValid={formObject.forename == '' ? true : false}

            validationSchema={
                yup.object().shape({
                    forename: yup.string().required("Required"),
                    surname: yup.string().required("Required"),
                })
            }

            initialTouched={touched}
            initialValues={{
                forename: formObject.forename || '',
                surname: formObject.surname || ''
            }
            }
            onSubmit={(values) => {
                console.log('submitting name!!');
                console.log(values);
                handleForward(values)
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
                setFieldTouched
            }) =>
            (<>
                <Typography color={'green'} variant="h7" variant="h7">
                    What is {formObject.youOrThem == 'you' ? 'your' : 'their'} name?
                </Typography>
                <Grid container component="form" spacing={2} marginTop={2} onSubmit={handleSubmit}>

                    <Grid item xs={6} >

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
                    <Grid item xs={6}>

                        <TextField
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name="surname"
                            label="Family Name"
                            value={values.surname.capitalize()}

                            autocomplete='off'
                            fullWidth
                            isInvalid={errors.surname && touched.surname}
                            type="text" />
                        <FormHelperText error="true" type="invalid">
                            <ErrorMessage name="surname" />
                        </FormHelperText>

                    </Grid>
                </Grid>

                <Grid container marginTop={'10px'} spacing={1}>
                    <Grid item xs={6}>
                        <Button
                            fullWidth
                            onClick={handleBack}
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
                            disabled={!isValid || (Object.keys(touched).length === 0 && touched.constructor === Object)}>
                            Next
                        </Button>
                    </Grid>
                </Grid>

            </>
            )
            }
        </Formik >

    )
}



function CaptureDOB({ formObject, handleBack, handleForward }) {
    const minDate = new Date(new Date(new Date().setFullYear(new Date().getFullYear() - 100)).setDate(1))
    console.log(minDate)
    console.log(formObject.dateofbirth)
    let touched = null
    if (formObject.dateofbirth != null) {
        touched = ['dateofbirth']
    }
    return (
        <Formik
            validationSchema={
                yup.object().shape({
                    dateofbirth: yup
                        .date()
                        .max(new Date(), "Date must be in the past")
                        .min(minDate, "Check the year....")
                        .required("Required")
                        .typeError('Invalid Date - Expecting date in the format e.g "26th September 2001"'),
                })}

            initialTouched={touched}


            isTouched={(formObject.dateofbirth == null ? false : true)
            }
            initialValues={{
                dateofbirth: formObject.dateofbirth || ''

            }
            }
            onSubmit={(values) => {
                console.log('submitting dob!!');
                console.log(values);
                handleForward(values)
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
                setFieldTouched
            }) =>
            (<>
                <Typography color={'green'} variant="h7" variant="h7">
                    What is {formObject.youOrThem == 'you' ? 'your' : 'their'} date of birth? <br />
                </Typography>
                <Grid container component="form" spacing={2} marginTop={2} onSubmit={handleSubmit}>

                    <Grid item xs={12}>
                        <LocalizationProvider dateAdapter={AdapterMoment}>

                            <DatePicker
                                onChange={(value) => {
                                    setFieldValue("dateofbirth", value, true)
                                    setFieldTouched('dateofbirth', true, false)
                                }}
                                inputFormat="Do MMMM yyyy"
                                label="Date Of Birth"
                                autocomplete='off'
                                value={values.dateofbirth || null}
                                fullWidth
                                renderInput={(params) =>
                                    <TextField



                                        onBlur={(value) => {
                                            setFieldTouched('dateofbirth', true, false)
                                        }}


                                        fullWidth
                                        name="dateofbirth"
                                        isInvalid={errors.dateofbirth && touched.dateofbirth}

                                        {...params} />}

                            />
                        </LocalizationProvider>

                        <FormHelperText error="true" type="invalid">
                            <ErrorMessage name="dateofbirth" />
                        </FormHelperText>


                    </Grid>
                </Grid>

                <Grid container marginTop={'10px'} spacing={1}>
                    <Grid item xs={6}>
                        <Button
                            fullWidth
                            onClick={handleBack}
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
                            disabled={!isValid || (Object.keys(touched).length === 0 && touched.constructor === Object)}
                        >
                            Next
                        </Button>
                    </Grid>
                </Grid>

            </>
            )
            }
        </Formik >

    )
}


function ChooseMultiBand({ formObject, handleBack, handleForward }) {

    let isTouched = null
    let ageInYears = -1 * formObject.dateofbirth.diff(Date()) / (60 * 60 * 24 * 365.2425 * 1000)
    console.log(ageInYears)
    let youOrName = formObject.youOrThem == 'you' ? 'you' : formObject.forename
    let youOrThey = formObject.youOrThem == 'you' ? 'you' : 'they'
    let areIs = formObject.youOrThem == 'you' ? 'are' : 'is'
    if (formObject.multiBand != null) {
        isTouched = ['multiBand']
    }
    return (
        <Formik
            validationSchema={
                yup.object().shape({
                    multiBand: yup.string().required("Required"),
                })}

            initialTouched={isTouched}
            initialValues={{
                multiBand: formObject.multiBand || ''

            }}
            onSubmit={(values) => {
                console.log('submitting multibanb!!');
                console.log(values);
                handleForward(values)
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
                setFieldTouched
            }) =>
            (<>
                <Typography color={'green'} variant="h7" >
                    {ageInYears < 30 ?
                        'As an adult under 30, ' + youOrName + ' ' + areIs + ' entitled to a half-price discount (£52.50).  '
                        + youOrThey.capitalize() + ' are further entitled to an additional half-price discount if  ' + youOrThey + '  only sign up for one band.' :
                        'As an adult over 30,  ' + youOrName + ' eligible for full price membership only (£105.00).\
                        However, if '+ youOrThey + ' opt to join only one band,  ' + youOrName + ' ' + areIs + '  entitled to a half-price discount.'}
                    <br /> Please choose whether {youOrName} would like to sign up for one band or have full membership.
                </Typography>
                <Grid container component="form" spacing={2} onSubmit={handleSubmit}>

                    <Grid item xs={12} >
                        <FormControl   >
                            <RadioGroup
                                name={"multiBand"}
                                value={values.multiBand.toString()}
                                isInvalid={errors.multiBand}
                                onChange={(event) => {
                                    console.log(event)
                                    setFieldValue('multiBand', event.target.value.toString(), true)
                                    setFieldTouched('multiBand', true, false)
                                }}>
                                <FormControlLabel value="singleband" control={<Radio />} label="One Band Only" />
                                <FormControlLabel value="multiband" control={<Radio />} label="Multiple Bands" />
                            </RadioGroup>
                        </FormControl>
                        <FormHelperText>
                            <ErrorMessage name={"multiBand"} />
                        </FormHelperText>
                    </Grid>

                </Grid>

                <Grid container marginTop={'10px'} spacing={1}>
                    <Grid item xs={6}>
                        <Button
                            fullWidth
                            onClick={handleBack}
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
                            disabled={!isValid || (Object.keys(touched).length === 0 && touched.constructor === Object)}
                        >
                            Next
                        </Button>
                    </Grid>
                </Grid>

            </>
            )
            }
        </Formik >

    )
}


function ChooseBands({ formObject, handleBack, handleForward }) {
    let touched = null
    let ageInYears = -1 * formObject.dateofbirth.diff(Date()) / (60 * 60 * 24 * 365.2425 * 1000)
    console.log(ageInYears)
    let youOrName = formObject.youOrThem == 'you' ? 'you' : formObject.forename
    let youOrThey = formObject.youOrThem == 'you' ? 'you' : 'they'
    let areIs = formObject.youOrThem == 'you' ? 'are' : 'is'


    const options = [
        {
            label: "Uno",
            value: "one"
        },
        {
            label: "Dos",
            value: "two"
        },
        {
            label: "Tres",
            value: "three"
        }
    ];

    return (
        <Formik
            validationSchema={
                yup.object().shape({
                    bands: yup.array().of(yup.string()).required("Required"),
                })}
            initialValues={{
                bands: formObject.bands || []

            }}
            onSubmit={(values) => {
                console.log('submitting multibanb!!');
                console.log(values);
                handleForward(values)
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
                setFieldTouched
            }) =>
            (<>
                <Typography color={'green'} variant="h7">
                    {formObject.multiBand == 'multiband' ?
                        'Choose which bands ' + youOrName + ' would like to attend, or select "Don\'t Know Yet".' :
                        'Choose which band ' + youOrName + ' would like to attend, or select "Don\'t Know Yet".'}
                </Typography>
                <Grid container component="form" spacing={2} onSubmit={handleSubmit}>

                    <Grid item xs={12} >
                        <FormControl   >

                            {options.map(opt => (
                                <Field
                                    type="checkbox"
                                    control={Checkbox}
                                    name="bands"
                                    key={opt.value}
                                    value={opt.value}
                                    label='boo' />
                            ))}

                        </FormControl>
                        <FormHelperText>
                            <ErrorMessage name={"bands"} />
                            <pre>{JSON.stringify(values, 0, 2)}</pre>

                        </FormHelperText>
                    </Grid>

                </Grid>

                <Grid container marginY={'auto'} spacing={1}>
                    <Grid item xs={6}>
                        <Button
                            fullWidth
                            onClick={handleBack}
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
                            disabled={!isValid || (Object.keys(touched).length === 0 && touched.constructor === Object)}
                        >
                            Next
                        </Button>
                    </Grid>
                </Grid>

            </>
            )
            }
        </Formik >

    )
}
export default AddUpdateMember;