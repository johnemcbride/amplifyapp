import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
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
import Checkbox from "@mui/material/Checkbox"
import ToggleButton from "@mui/material/ToggleButton"
import GroupAdd from "@mui/icons-material/GroupAdd"
import { Formik, ErrorMessage, Field } from 'formik';
import { FormHelperText } from "@mui/material";
import * as yup from "yup";
import { Auth } from 'aws-amplify';
import { useNavigate } from "react-router-dom";

export default function ELCBMemberLanding() {
    const [formObject, setFormObject] = useState({})
    const [isSubmitting, setIsSubmitting] = useState(false)
    const navigate = useNavigate();



    return (
        <>

            <Grid container spacing={0} marginY={1} paddingX={{
                'xs': '10px',
                'sm': '100px'
            }} >


                <Formik
                    validationSchema={
                        yup.object().shape({
                            username: yup.string().required("Required"),
                            password: yup.string().required("Required"),

                        })
                    }

                    initialValues={{
                        username: formObject.username || '',
                        password: formObject.password || '',
                    }
                    }
                    onSubmit={(values) => {
                        console.log('Trying to log in');
                        console.log(values);
                        setIsSubmitting(true)
                        setFormObject({
                            ...formObject,
                            ...values
                        })

                        try {
                            Auth.signIn(values.username, values.password).then(
                                navigate("/landing")
                            )
                        } catch (error) {
                            console.log('error signing in', error);
                        }
                        setIsSubmitting(false)


                        // do stuff - log in!
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
                            Logged In!
                        </Typography>
                        <Grid container component="form" marginTop={1} spacing={3} onSubmit={handleSubmit}>

                            <Grid item xs={12} >

                                <TextField
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    name="username"
                                    label="User Name"
                                    value={values.username}
                                    autoFocus
                                    autocomplete='off'
                                    fullWidth
                                    isInvalid={errors.username && touched.username}
                                    type="text" />
                                <FormHelperText error="true" type="invalid">
                                    <ErrorMessage name="forename" />
                                </FormHelperText>

                            </Grid>

                            <Grid item xs={12} >

                                <TextField
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    name="password"
                                    label="Password"
                                    value={values.password}
                                    autoFocus
                                    autocomplete='off'
                                    fullWidth
                                    isInvalid={errors.password && touched.password}
                                    type="password" />
                                <FormHelperText error="true" type="invalid">
                                    <ErrorMessage name="password" />
                                </FormHelperText>

                            </Grid>

                            <Grid item xs={12}>
                                <Button
                                    fullWidth
                                    tabIndex="3"
                                    type="submit"
                                    variant="contained"
                                    disabled={!isValid || (Object.keys(touched).length === 0 && touched.constructor === Object || isSubmitting)}

                                >
                                    Log In
                                </Button>
                            </Grid>

                        </Grid>

                    </>
                    )}
                </Formik >




            </Grid>
        </>
    );
}