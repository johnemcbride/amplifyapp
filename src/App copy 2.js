import React, { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Toast from 'react-bootstrap/Toast'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import ELCBHeader from "./components/ELCBHeader";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import "@aws-amplify/ui-react/styles.css";
import "./App.css"
import "@fontsource/josefin-sans";
import { API, Amplify } from 'aws-amplify';
import { listMembers } from "./graphql/queries";

import {
  createNote as createNoteMutation,
  deleteNote as deleteNoteMutation,
  createMember as createMemberMutation
} from "./graphql/mutations";

import Header from './components/Header/header'
import Service from './components/service'
import About from './components/about'
import { withAuthenticator } from "@aws-amplify/ui-react";
import awsconfig from './aws-exports';

import { Formik, ErrorMessage } from 'formik';
import * as yup from "yup";


const schema = yup.object().shape({
  forename: yup.string().required("Required"),
  surname: yup.string().required("Required"),
  dateofbirth: yup.date().max(new Date(), "Date must be in the past").required("Required"),
  town: yup.string().required("Required"),
  postcode: yup.string().required("Required").matches(/([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9][A-Za-z]?))))\s?[0-9][A-Za-z]{2})/, "Incorrect format"),
  addressLine1: yup.string().required("Required"),
});

Amplify.configure(awsconfig);


function Home() {
  return (
    'hi'
  );
}

const App = ({ signOut }) => {
  const [members, setMembers] = useState([]);
  const [status, setStatus] = useState([]);

  useEffect(() => {
    fetchMembers();
  }, []);

  async function fetchMembers() {
    const apiData = await API.graphql({ query: listMembers, authMode: "AMAZON_COGNITO_USER_POOLS" });
    const membersFromAPI = apiData.data.listMembers.items;
    setMembers(membersFromAPI);
    console.log(membersFromAPI)
  }


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
    console.log(data)
    let result = '';
    try {
      result = await API.graphql({
        query: createMemberMutation,
        variables: { input: data },
        authMode: "AMAZON_COGNITO_USER_POOLS"
      });
    }
    catch (e) {

      setStatus(JSON.stringify(e.errors))

    }

    //setStatus(JSON.stringify(result))
    fetchMembers();
    event.target.reset();
  }

  return (
    <>
      <ELCBHeader signOut={signOut} />
      <div className="App container">
        <h3>Current Members</h3>
        {members.map(member => (
          <Card className='mt-1 mb-1'>
            {member.forename}
            <br />

            {member.surname}
          </Card>)

        )}


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
                <Form.Control
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="forename"
                  isInvalid={errors.forename && touched.forename}
                  type="text" />
                <Form.Control.Feedback type="invalid">
                  {errors.forename && touched.forename ? errors.forename : null}
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
                  {errors.surname && touched.surname ? errors.surname : null}
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
                  {errors.dateofbirth && touched.dateofbirth ? errors.dateofbirth : null}
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
                  {errors.addressLine1 && touched.addressLine1 ? errors.addressLine1 : null}
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
                  {errors.addressLine2 && touched.addressLine2 ? errors.addressLine2 : null}
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
                  {errors.town && touched.town ? errors.town : null}
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
                  {errors.postcode && touched.postcode ? errors.postcode : null}
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


      </div >
    </>
  );
};


export default withAuthenticator(App);