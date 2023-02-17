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
            <Grid container
                align="center"
                marginX={0}
                xs={12}
                flexDirection="column"
                justifyContent="center" spacing={0} marginY={1}
                paddingX={{
                    'xs': '10px',
                    'sm': '100px'
                }} >
                <Typography color={'green'} variant="h7" >
                    Welcome!
                </Typography>
                <Button
                    align="center"
                    variant="outline"
                    component={Link}
                    to="/enrol"> Enrol For This Term </Button>
                <Button
                    align="center"
                    variant="outline"
                    component={Link}
                    to="/profile"> Update Your Profile</Button>
            </Grid >
        </>
    );
}