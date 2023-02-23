import React, { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import Typography from "@mui/material/Typography";
import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container'
import TextField from '@mui/material/TextField'
import FormControl, { formControlClasses } from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel"
import Checkbox from "@mui/material/Checkbox"
import ToggleButton from "@mui/material/ToggleButton"
import GroupAdd from "@mui/icons-material/GroupAdd"
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';


import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import "@fontsource/josefin-sans";

import { Formik, ErrorMessage, Field } from 'formik';
import * as yup from "yup";
import { FormHelperText } from "@mui/material";
import moment from 'moment';
import { Auth } from 'aws-amplify';


//  for radio group questions
import FormLabel from "@mui/material/FormLabel"
import FormControlLabel from "@mui/material/FormControlLabel"
import RadioGroup from "@mui/material/RadioGroup"
import Radio from "@mui/material/Radio"
import { SettingsEthernetSharp } from "@mui/icons-material";

function isUnder30(momentDate) {
    if (momentDate instanceof moment) {
        return (-1 * momentDate.diff(Date()) / (60 * 60 * 24 * 365.2425 * 1000) < 30)

    }
    else return false
}

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




    async function signUp() {
        try {
            const { user } = await Auth.signUp({
                username: formObject.username,
                password: formObject.password,
                attributes: {
                    email: formObject.email          // optional

                },
                autoSignIn: { // optional - enables auto sign in after user is confirmed
                    enabled: true,
                }
            });
            console.log(user);
        } catch (error) {
            console.log('error signing up:', error);
        }
    }
    return (
        <Container height="100vh" component="main" maxWidth="">
            <CssBaseline />
            <Typography variant="h6">
                New Member Registration
            </Typography>


            {(() => {
                switch (step) {

                    case 0:

                    case 1:
                    default:
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
                        return <ConfirmName
                            formObject={formObject}
                            handleBack={() => setStep(1)}
                            handleForward={
                                (values) => {
                                    setFormObject({
                                        ...formObject,
                                        ...values
                                    })
                                    setStep(3)
                                    signUp()
                                    console.log('Setting step 3')
                                }} />

                    case 3:
                        return <ConfirmCode
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
            {
                console.log(formObject)}


        </Container >
    );
};



function CaptureName({ formObject, handleBack, handleForward }) {

    const minDate = new Date(new Date(new Date().setFullYear(new Date().getFullYear() - 100)).setDate(1))
    const ethnicGroups = [
        'Indian',
        'Pakistani',
        'Bangladeshi',
        'Chinese',
        'Any other Asian background',
        'Caribbean',
        'African',
        'Any other Black, Black British, or Caribbean background',
        'White and Black Caribbean',
        'White and Black African',
        'White and Asian',
        'White - English, Welsh, Scottish, Northern Irish or British',
        'White - Irish',
        'White - Gypsy or Irish Traveller',
        'White - Roma',
        'Any other White background',
        'Arab',
        'Any other ethnic group'
    ]
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
                    ethnicgroup: yup.string().required("Please advise ethnic group for inclusion monitoring purposes"),
                    dateofbirth: yup
                        .date()
                        .max(new Date(), "Date must be in the past")
                        .min(minDate, "Check the year....")
                        .required("Required")
                        .typeError('Invalid Date - Expecting date in the format e.g "26th September 2001"'),
                    username: yup.string()
                        .required("Required")
                        .matches(/[a-zA-Z0-9]/, 'Username can only contain non-special letters and numbers.'),
                    password: yup.string()
                        .required('No password provided.')
                        .min(8, 'Password is too short - should be 8 chars minimum.')
                        .matches(/[a-zA-Z0-9]/, 'Password can only contain non-special letters and numbers.'),
                    email: yup.string().required("Please provide contact Email").email("Not a valid email")

                })
            }

            initialTouched={touched}
            initialValues={{
                forename: formObject.forename || '',
                surname: formObject.surname || '',
                ethnicgroup: formObject.ethnicgroup || '',
                dateofbirth: formObject.dateofbirth || '',
                username: formObject.username || '',
                password: formObject.password || '',
                email: formObject.email || ''

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


                <Typography color={'green'} variant="h7" >
                    Create an account in order to manage membership and attendance.
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
                            error={errors.forename && touched.forename}
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
                            error={errors.surname && touched.surname}
                            type="text" />
                        <FormHelperText error="true" type="invalid">
                            <ErrorMessage name="surname" />
                        </FormHelperText>

                    </Grid>


                    <Grid item xs={12}>
                        <LocalizationProvider dateAdapter={AdapterMoment}>

                            <DatePicker
                                onChange={(value) => {
                                    setFieldValue("dateofbirth", value, true)
                                    setFieldTouched('dateofbirth', true, false)
                                    setFieldValue("isUnder30", isUnder30(value), false)
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




                    <Grid item xs={12} >
                        <FormControl fullWidth >
                            <InputLabel id="ethnicitylabel">Which ethnic group you belong to?</InputLabel>


                            <Select
                                component="Select"
                                labelId="ethnicitylabel"
                                label="Which ethnic group you belong to?"
                                name="ethnicgroup"
                                value={values.ethnicGroup}
                                // You need to set the new field value
                                fullWidth
                                onChange={handleChange}
                                onBlur={handleBlur('ethnicgroup')}
                                multiple={false}
                            >
                                {ethnicGroups.map(s => (
                                    <MenuItem key={s} value={s}>
                                        {s}
                                    </MenuItem>
                                ))}
                            </Select>

                            <FormHelperText error="true" type="invalid">
                                <ErrorMessage name={"ethnicgroup"} />

                            </FormHelperText>
                        </FormControl>

                    </Grid>



                    <Grid item xs={6} >

                        <TextField
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name="username"
                            label="User Name"
                            value={values.username.toLowerCase()}
                            autoFocus
                            autocomplete='off'
                            fullWidth
                            error={errors.username && touched.username}
                            type="text" />
                        <FormHelperText error="true" type="invalid">
                            <ErrorMessage name="username" />
                        </FormHelperText>

                    </Grid>
                    <Grid item xs={6}>

                        <TextField
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name="password"
                            label="Password"
                            value={values.password}
                            autocomplete='off'
                            fullWidth
                            error={errors.password && touched.password}
                            type="password" />
                        <FormHelperText error="true" type="invalid">
                            <ErrorMessage name="password" />
                        </FormHelperText>

                    </Grid>

                    <Grid item xs={12}>

                        <TextField
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name="email"
                            label="Email"
                            value={values.email.toLowerCase()}
                            autocomplete='off'
                            fullWidth
                            error={errors.email && touched.email}
                            type="text" />
                        <FormHelperText error="true" type="invalid">
                            <ErrorMessage name="email" />
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




function ConfirmCode({ formObject, handleBack, handleForward }) {


    async function confirmCode(code) {
        try {
            const { response } = await Auth.confirmSignUp(formObject.username, code)
            console.log(response);
        } catch (error) {
            console.log('error signing up:', error);
        }
    }

    return (
        <Formik

            //initialTouched={formObject.forename == '' ? true : false}
            //initialValid={formObject.forename == '' ? true : false}

            validationSchema={
                yup.object().shape({
                    code: yup
                        .number('Must be a number')
                        .required('Provide number')
                        .min(6, 'Must be six digits')


                })
            }


            initialValues={{
                code: formObject.code || ''

            }
            }


            onSubmit={(values) => {
                console.log('validating code');
                console.log(values);
                confirmCode(values.code).then(
                    console.log('done code')
                )

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
                    Check your email for confirmation code and enter it here to confirm signup.
                </Typography>
                <Grid container component="form" spacing={2} marginTop={2} onSubmit={handleSubmit}>

                    <Grid item xs={12} >

                        <TextField
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name="code"
                            label="Confirmation Code"
                            value={values.code}
                            autoFocus
                            autocomplete='off'
                            fullWidth
                            isInvalid={errors.code && touched.code}
                            type="text" />
                        <FormHelperText error="true" type="invalid">
                            <ErrorMessage name="code" />
                        </FormHelperText>

                    </Grid>


                    <Grid container marginTop={'10px'} spacing={1}>
                        <Grid item xs={6}>
                            <Button
                                fullWidth
                                onClick={handleBack}
                                variant="outlined"
                            >
                                Resend Code
                            </Button>
                        </Grid>
                        <Grid item xs={6}>
                            <Button
                                fullWidth
                                onClick={handleSubmit}
                                variant="contained"
                                disabled={!isValid || (Object.keys(touched).length === 0 && touched.constructor === Object)}>
                                Confirm SignUp
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>

            </>
            )
            }
        </Formik >

    )
}



function ConfirmName({ formObject, handleBack, handleForward }) {

    let touched = null
    if (formObject.forename != null) {
        touched = ['forename']
    }
    return (
        <>


            <Typography color={'green'} variant="h7" >
                Confirm your details.
            </Typography>
            <br />


            <Typography variant="h6" >
                Name
            </Typography>


            <Typography variant="main" >
                {formObject.forename} {formObject.surname}
            </Typography>
            <br />

            <Typography variant="h6" >
                Date Of Birth
            </Typography>


            <Typography variant="main" >
                {formObject.dateofbirth.format('Do MMMM yyyy')}
            </Typography>
            <br />
            <Typography variant="h6" >
                Ethnicity
            </Typography>


            <Typography variant="main" >
                {formObject.ethnicgroup}
            </Typography>
            <br />
            <Typography variant="h6" >
                Username
            </Typography>


            <Typography variant="main" >
                {formObject.username}
            </Typography>
            <br />

            <Typography variant="h6" >
                Email
            </Typography>


            <Typography variant="main" >
                {formObject.email}
            </Typography>
            <br />




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
                        onClick={handleForward}
                        variant="contained"
                        Next>
                        Confirm
                    </Button>
                </Grid>

            </Grid>
        </>
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
        { 'id': 'stompers', 'description': 'Stompers' },
        { 'id': 'early', 'description': 'Early Music' },
        { 'id': 'main', 'description': 'Main Band' },
        { 'id': 'jazz', 'description': 'Jazz' },
        { 'id': 'premier', 'description': 'Premier' },
    ]

    const instruments = ['Piano',
        'Flute',
        'Veena',
        'Drums',
        'Mridangam',
        'Violin',
        'Guitar',
        'Triangle',
        'Trumpet',
        'Saxophone',
        'Mouth organ',
        'Cello',
        'Xylophone',
        'Clap box',
        'Electric guitar',
        'Bass guitar',
        'Bugle',
        'Harp',
        'Harmonium',
        'Oboe',
        'Maracas',
        'Cymbal',
        'Accordion',
        'Bongo drums',
        'Bell',
        'French horn',
        'Banjo',
        'Conga drums',
        'Keyboard',
        'Gong',
        'Pipe organ',
        'Comet',
        'Tambourine',
        'Trombone',
        'Ukulele',
        'Electronic drums',
        'Drum pad',
        'Clarinet',
        'Harmonica',
        'Tuba',
        'Bass drum',
        'Snare drum',
        'Euphonium',
        'Piccolo',
        'Lute',
        'Marimba',
        'Bassoon',
        'Cornet',
        'Celesta',
        'Spinet',
        'Oud',
        'Yueqin',
        'Dholak',
        'Tabla',
        'Damru',
        'Sarangi',
        'Sitar',
        'Gu-zheng',
        'Ektara',
        'Shehnai',
        'Sarod',
        'Pungi',
        'Gramophone',
        'Tubular Chimes']

    return (
        <Formik
            validationSchema={
                yup.object().shape({
                    bands: yup.array().of(yup.string()).required("Required"),
                })}
            initialValues={{
                bands: formObject.bands || [],
                instruments: formObject.instruments || [],

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
                        <FormControl fullWidth >
                            <InputLabel id="bands">Which bands do you wish to enrol in this term?</InputLabel>

                            <Select
                                component="Select"
                                name="bands"
                                value={values.bands}
                                label="Which bands do you wish to enrol in this term?"
                                labelId="bands"
                                // You need to set the new field value
                                onChange={handleChange}
                                onBlur={handleBlur('bands')}
                                multiple={true}
                                fullWidth
                            >
                                {options.map(s => (
                                    <MenuItem key={s.id} value={s.description}>
                                        {s.description}
                                    </MenuItem>
                                ))}
                            </Select>
                            <FormHelperText>
                                <ErrorMessage name={"bands"} />

                            </FormHelperText>
                        </FormControl>
                    </Grid>

                </Grid>

                <Grid container component="form" spacing={2} onSubmit={handleSubmit}>

                    <Grid item xs={12} marginTop={2}>
                        <FormControl fullWidth >
                            <InputLabel id="instruments">Which instruments do you play?</InputLabel>

                            <Select
                                label="Which instruments do you play?"
                                component="Select"
                                name="instruments"
                                fullWidth
                                id="instruments"
                                value={values.instruments}
                                // You need to set the new field value
                                onChange={handleChange}
                                onBlur={handleBlur('instruments')}
                                multiple={true}
                            >
                                {instruments.map(s => (
                                    <MenuItem key={s} value={s}>
                                        {s}
                                    </MenuItem>
                                ))}
                            </Select>
                            <FormHelperText>
                                <ErrorMessage name={"instruments"} />

                            </FormHelperText>
                        </FormControl>
                    </Grid>

                </Grid>

                <Grid container  spacing={1}>
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