import React, { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import "@aws-amplify/ui-react/styles.css";
import "../App.css"
import "@fontsource/josefin-sans";
import { API } from 'aws-amplify';
import {
    createMember as createMemberMutation
} from "../graphql/mutations";
import { Formik, ErrorMessage, Field } from 'formik';
import * as yup from "yup";


const schema = yup.object().shape({
    forename: yup.string().required("Required"),
    surname: yup.string().required("Required"),
    dateofbirth: yup.date().max(new Date(), "Date must be in the past").required("Required"),
    town: yup.string().required("Required"),
    postcode: yup.string().required("Required").matches(/([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9][A-Za-z]?))))\s?[0-9][A-Za-z]{2})/, "Incorrect format"),
    addressLine1: yup.string().required("Required"),
});

const AddUpdateMember = () => {

    async function createMember(event) {
        event.preventDefault();
        const form = new FormData(event.target);
        const data = {
            forename: form.get("forename"),
            surname: form.get("surname"),
            dateOfBirth: form.get("dateofbirth"),
            addressLine1: form.get("addressLine1"),
            addressLine2: form.get("addressLine2"),
            town: form.get("town"),
            postCode: form.get("postcode"),
        };
        try {
            await API.graphql({
                query: createMemberMutation,
                variables: { input: data },
                authMode: "AMAZON_COGNITO_USER_POOLS"
            });
        }
        catch (e) {
            // handler later

        }
        event.target.reset();
    }

    return (
        <Formik
            validationSchema={schema}
            initialValues={{
                //
                //  forename: 'bla'  - for pre-filled

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
                validateForm
            }) =>
            (<Form onSubmit={createMember} className="card">

                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={4}>Forename</Form.Label>
                    <Col sm={5}>
                        {/*<Field as={Form.Control} type="text" name="forename" />*/}
                        <Form.Control
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name="forename"
                            isInvalid={errors.forename && touched.forename}
                            type="text" />
                        <Form.Control.Feedback type="invalid">
                            <ErrorMessage name="forename" />
                        </Form.Control.Feedback>
                    </Col>
                </Form.Group>


                <Form.Group as={Row} className="mb-3" >
                    <Form.Label column sm={4}>Surname</Form.Label>
                    <Col sm={5}>
                        <Form.Control
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name="surname"
                            isInvalid={errors.surname && touched.surname}
                            type="text" />
                        <Form.Control.Feedback type="invalid">
                            <ErrorMessage name="surname" />
                        </Form.Control.Feedback>
                    </Col>
                </Form.Group>


                <Form.Group as={Row} className="mb-3" >
                    <Form.Label column sm={4}>Date Of Birth</Form.Label>
                    <Col sm={5}>
                        <Form.Control
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name="dateofbirth"
                            type="date"
                            isInvalid={errors.dateofbirth && touched.dateofbirth}
                        />

                        <Form.Control.Feedback type="invalid">
                            <ErrorMessage name="dateofbirth" />
                        </Form.Control.Feedback>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" >
                    <Form.Label column sm={4}>Address Line 1</Form.Label>
                    <Col sm={5}>
                        <Form.Control
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name="addressLine1"
                            isInvalid={errors.addressLine1 && touched.addressLine1}
                            type="text" />

                        <Form.Control.Feedback type="invalid">
                            <ErrorMessage name="addressLine1" />
                        </Form.Control.Feedback>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" >
                    <Form.Label column sm={4}>Address Line 2</Form.Label>
                    <Col sm={5}>
                        <Form.Control
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name="addressLine2"
                            isInvalid={errors.addressLine2 && touched.addressLine2}
                            type="text" />

                        <Form.Control.Feedback type="invalid">
                            <ErrorMessage name="addressLine2" />
                        </Form.Control.Feedback>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" >
                    <Form.Label column sm={4}>Town/City</Form.Label>
                    <Col sm={5}>
                        <Form.Control
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name="town"
                            isInvalid={errors.town && touched.town}
                            type="text" />
                        <Form.Control.Feedback type="invalid">
                            <ErrorMessage name="town" />
                        </Form.Control.Feedback>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={4}>Post Code</Form.Label>
                    <Col sm={5}>
                        <Form.Control
                            onChange={handleChange}
                            className="bg-light"
                            onBlur={handleBlur}
                            name="postcode"
                            isInvalid={errors.postcode && touched.postcode}
                            type="text" />

                        <Form.Control.Feedback type="invalid">
                            <ErrorMessage name="postcode" />
                        </Form.Control.Feedback>
                    </Col>
                </Form.Group>

                <Button
                    disabled={!isValid || (Object.keys(touched).length === 0 && touched.constructor === Object)}
                    variant="primary" type="submit">
                    Add Member
                </Button>
            </Form>)}
        </Formik>
    );
};


export default AddUpdateMember;