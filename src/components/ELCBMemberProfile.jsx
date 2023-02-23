import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import { Link } from "react-router-dom";
import NewMember from './NewMember'
import React, { useState, useEffect } from "react";
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import TextField from '@mui/material/TextField'
import FormControl, { formControlClasses } from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel"

import CircularProgress from "@mui/material/CircularProgress"
import { API } from 'aws-amplify';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Checkbox from "@mui/material/Checkbox"
import ToggleButton from "@mui/material/ToggleButton"
import GroupAdd from "@mui/icons-material/GroupAdd"
import { Formik, ErrorMessage, Field } from 'formik';
import { FormHelperText } from "@mui/material";
import * as yup from "yup";
import { Auth } from 'aws-amplify';
import { useNavigate } from "react-router-dom";

import * as queries from '../graphql/queries';
import { LocalizationProvider } from '@mui/x-date-pickers';
import moment from 'moment';
import {
    createMember as createMemberMutation,
    updateMember as updateMemberMutation,
} from "../graphql/mutations";


String.prototype.capitalize = function (lower) {
    return (lower ? this.toLowerCase() : this)
        .replace(/(?:^|\s|['`‘’.-])[^\x00-\x60^\x7B-\xDF](?!(\s|$))/g, function (a) {
            return a.toUpperCase();
        });
};



function isUnder30(momentDate) {
    if (momentDate instanceof moment) {
        return (-1 * momentDate.diff(Date()) / (60 * 60 * 24 * 365.2425 * 1000) < 30)

    }
    else return false
}


const ethnicGroups = [
    'Indian',
    'Pakistani',
    'Bangladeshi',
    'Chinese',
    'Asian Other',
    'Caribbean',
    'African',
    'Black British',
    'Mixed Caribbean',
    'Mixed African',
    'Mixed Asian',
    'White - British',
    'White - Irish',
    'White - Gypsy ',
    'White - Roma',
    'White - Other',
    'Arab',
    'Other'
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

export default function ELCBMemberEnrol({ formObject, setFormObject }) {

    const [mode, setMode] = useState('view')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate();



    async function createMember(values) {
        const data = {
            forename: values.forename,
            surname: values.surname,
            dateofbirth: values.dateofbirth.format('YYYY-MM-DDZ'),
            ethnicity: values.ethnicity,
            instruments: values.instruments
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


    async function updateMember(values) {
        const data = {
            ...values,
            dateofbirth: values.dateofbirth.format('YYYY-MM-DDZ'),

        };
        try {
            await API.graphql({
                query: updateMemberMutation,
                variables: { input: data },
                authMode: "AMAZON_COGNITO_USER_POOLS"
            }).then(
                () => setFormObject({
                    ...formObject,
                    ...values
                })
            )
                ;
        }
        catch (e) {
            console.log(e)
            // handler later
        }
    }

    const minDate = new Date(new Date(new Date().setFullYear(new Date().getFullYear() - 100)).setDate(1))

    const options = [
        { 'id': 'stompers', 'description': 'Stompers' },
        { 'id': 'early', 'description': 'Early Music' },
        { 'id': 'main', 'description': 'Main Band' },
        { 'id': 'jazz', 'description': 'Jazz' },
        { 'id': 'premier', 'description': 'Premier' },
    ]

    const columns = ['Band', 'Start Time', 'End Time']
    const handleForward = () => { }
    const handleBack = () => { }
    const updateProfile = () => { }

    console.log(formObject)

    return (
        <Formik
            enableReinitialize
            validationSchema={
                yup.object().shape({
                    forename: yup.string().required("Required"),
                    surname: yup.string().required("Required"),
                    ethnicity: yup.string().required("Please advise ethnic group for inclusion monitoring purposes"),
                    instruments: yup.array().of(yup.string()).required("Required").test({
                        message: 'Pick one!',
                        test: arr => arr.length !== 0,
                    }),
                    dateofbirth: yup
                        .date()
                        .max(new Date(), "Date must be in the past")
                        .min(minDate, "Check the year....")
                        .required("Required")
                        .typeError('Invalid Date - Expecting date in the format e.g "26th September 2001"'),
                })}

            initialValues={{
                forename: formObject.forename || '',
                surname: formObject.surname || '',
                dateofbirth: formObject.dateofbirth != null ? moment(formObject.dateofbirth, 'YYYY-MM-DD') : null,
                ethnicity: formObject.ethnicity || '',
                instruments: formObject.instruments || []
            }}

            onSubmit={(values) => {
                setIsSubmitting(true)
                if (formObject.hasOwnProperty('id')) {
                    //update
                    const newvalues = { ...formObject, ...values }
                    const { updatedAt, owner, ...updatevalues } = newvalues
                    console.log('updating')
                    console.log(updatevalues)
                    updateMember(updatevalues).then(
                        () => {
                            setIsSubmitting(false)
                            setMode('view')

                        }
                    )
                }
                else {
                    //insert
                    createMember(values).then(() => {
                        setIsSubmitting(false)
                        setMode('view')
                    })
                }



            }}
        >
            {({
                handleSubmit,
                values,
                touched,
                isValid,
                dirty,
                errors,
                handleChange,
                handleBlur,
                setFieldValue,
                setFieldTouched,
                resetForm
            }) =>
            (
                <>

                    <Grid container
                        align="center"
                        marginX={0}
                     
                        xs={12}
                        flexDirection="column"
                        justifyContent="space-around" spacing={0}
                        paddingX={{
                            'xs': '10px',
                            'sm': '100px'
                        }}
                        paddingY={{
                            'xs': '10px',
                            'sm': '10px'
                        }}
                    >
                        <TableContainer component={Paper}>
                            <Table  size="small" aria-label="a dense table">
                                <TableBody>
                                    <TableRow
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell width={'40px'} component="th" scope="row">
                                            Forename
                                        </TableCell>
                                        <TableCell align="left">
                                            {mode == 'update' ? <TextField autocomplete='off' onChange={handleChange} onBlur={handleBlur} name="forename" value={values.forename.capitalize()} variant="standard" size="small" fullWidth /> :
                                                <Loadable isLoading={isLoading}>{values.forename}</Loadable>}
                                        </TableCell>
                                        <TableCell width='50px'>
                                            {mode == 'update' ? <FormHelperText error="true" type="invalid">
                                                <ErrorMessage name="forename" />
                                            </FormHelperText> : null}
                                        </TableCell>

                                    </TableRow>
                                    <TableRow

                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            Surname
                                        </TableCell>
                                        <TableCell align="left">

                                            {mode == 'update' ? <TextField autocomplete='off' onChange={handleChange} onBlur={handleBlur} name="surname" value={values.surname.capitalize()} variant="standard" size="small" fullWidth /> :
                                                <Loadable isLoading={isLoading}>{values.surname}</Loadable>}

                                        </TableCell>

                                        <TableCell >
                                            {mode == 'update' ? <FormHelperText error="true" type="invalid">
                                                <ErrorMessage name="surname" />
                                            </FormHelperText> : null}
                                        </TableCell>
                                    </TableRow>

                                    <TableRow

                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            Date Of Birth
                                        </TableCell>
                                        <TableCell align="left">
                                            {mode == 'update' ?

                                                <LocalizationProvider dateAdapter={AdapterMoment}>

                                                    <DatePicker
                                                        onChange={(value) => {
                                                            setFieldValue("dateofbirth", value, true)
                                                            setFieldTouched('dateofbirth', true, false)
                                                        }}
                                                        inputFormat="Do MMMM yyyy"

                                                        variant="standard" size="small"
                                                        autocomplete='off'
                                                        value={values.dateofbirth || null}
                                                        fullWidth
                                                        renderInput={(params) =>
                                                            <TextField
                                                                onBlur={(value) => {
                                                                    setFieldTouched('dateofbirth', true, false)
                                                                }}
                                                                fullWidth
                                                                variant="standard" size="small"
                                                                name="dateofbirth"
                                                                multiline
                                                                isInvalid={errors.dateofbirth && touched.dateofbirth}
                                                                {...params} />}

                                                    />
                                                </LocalizationProvider>
                                                :
                                                <Loadable isLoading={isLoading}>{values.dateofbirth?.format('Do MMM YYYY')}</Loadable>}



                                        </TableCell>
                                        <TableCell  >
                                            {mode == 'update' ? <FormHelperText error="true" type="invalid">
                                                <ErrorMessage name="dateofbirth" />
                                            </FormHelperText> : null}
                                        </TableCell>
                                    </TableRow>

                                    <TableRow

                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            Ethnicity
                                        </TableCell>
                                        <TableCell align="left">

                                            {mode == 'update' ?

                                                <FormControl fullWidth >

                                                    <Select


                                                        variant="standard" size="small"
                                                        name="ethnicity"

                                                        value={values.ethnicity}
                                                        // You need to set the new field value
                                                        align="left"
                                                        onChange={handleChange}
                                                        onClose={() => {

                                                            setFieldTouched('ethnicity', true, true)
                                                        }}
                                                        multiple={false}

                                                    >
                                                        {ethnicGroups.map(s => (
                                                            <MenuItem key={s} value={s}>
                                                                {s}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>

                                                </FormControl> :
                                                <Loadable isLoading={isLoading}>{values.ethnicity}</Loadable>}



                                        </TableCell>
                                        <TableCell  >
                                            {mode == 'update' ? <FormHelperText error="true" type="invalid">
                                                <ErrorMessage name="ethnicgroup" />
                                            </FormHelperText> : null}
                                        </TableCell>
                                    </TableRow>

                                    <TableRow
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                                        <TableCell component="th" scope="row">
                                            Instruments
                                        </TableCell>
                                        <TableCell align="left">

                                            {mode == 'update' ?
                                                <FormControl fullWidth >
                                                    <Select
                                                        component="Select"
                                                        name="instruments"
                                                        fullWidth
                                                        align="left"

                                                        multiline="true"
                                                        variant="standard" size="small"
                                                        id="instruments"
                                                        value={values.instruments}
                                                        // You need to set the new field value
                                                        onChange={handleChange}
                                                        onClose={handleBlur('instruments')}
                                                        multiple={true}
                                                    >
                                                        {instruments.map(s => (
                                                            <MenuItem key={s} value={s}>
                                                                {s}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>

                                                </FormControl> :

                                                <Loadable isLoading={isLoading}>{values.instruments.join(', ')}</Loadable>}
                                        </TableCell>
                                        <TableCell  >
                                            {mode == 'update' ? <FormHelperText error="true" type="invalid">
                                                <ErrorMessage name="instruments" />
                                            </FormHelperText> : null}
                                        </TableCell>
                                    </TableRow>

                                </TableBody>
                            </Table>
                        </TableContainer>


                        <Grid container  spacing={1}>

                            {mode == 'update' ?
                                <>
                                    <Grid item xs={6}>
                                        <Button
                                            fullWidth
                                            onClick={() => {
                                                resetForm();
                                                setMode('view')

                                            }}
                                            variant="outlined"
                                        >
                                            Cancel
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Button
                                            fullWidth
                                            type="submit"
                                            onClick={handleSubmit}
                                            variant="contained"
                                            disabled={!dirty || !isValid || (Object.keys(touched).length === 0 && touched.constructor === Object || isSubmitting)}
                                        >
                                            {isSubmitting ? <CircularProgress size={20} color="secondary" sx={{ marginX: '20px' }} /> : null}
                                            Confirm
                                        </Button>
                                    </Grid>
                                </>
                                : <>
                                    <Grid item xs={6}>
                                        <Button
                                            fullWidth
                                            onClick={() => {

                                                navigate('/landing')
                                            }}
                                            variant="outlined"
                                        >
                                            Back
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Button
                                            fullWidth
                                            onClick={() => { setMode('update') }}
                                            variant="contained"

                                        >
                                            Update
                                        </Button>
                                    </Grid></>
                            }  </Grid>


                    </Grid >
                </>
            )
            }
        </Formik >
    )

}


function Loadable({ children, isLoading }) {
    return isLoading ? <CircularProgress size={20} color="secondary" sx={{ marginX: '20px' }} /> : children
}