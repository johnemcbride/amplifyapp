import React, { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Toast from 'react-bootstrap/Toast'
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

import Header from './components/header'
import Service from './components/service'
import About from './components/about'
import { withAuthenticator } from "@aws-amplify/ui-react";
import awsconfig from './aws-exports';

import { Formik, ErrorMessage } from 'formik';
import * as yup from "yup";


const schema = yup.object().shape({
  forename: yup.string().required(),
  surname: yup.string().required(),
  dateofbirth: yup.string().required(),
  town: yup.string().required(),
  postcode: yup.string().required(),
  addressLine1: yup.string().required(),
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
      <ELCBHeader />
      <div className="App container">
        {members.map(member => (
          <Card className='mt-1 mb-1'>
            {member.forename}
            <br />

            {member.owner}
          </Card>)

        )}


        <Formik
          validationSchema={schema}
          onSubmit={console.log}
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
          }) =>
          (<Form onSubmit={createMember} className="card">
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Forename</Form.Label>
                <Form.Control onChange={handleChange} name="forename" isInvalid={!!errors.forename} />
                <Form.Control.Feedback type="invalid">
                  {errors.forename}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Surname</Form.Label>
                <Form.Control onChange={handleChange} name="surname" isInvalid={!!errors.surname} />
                <Form.Control.Feedback type="invalid">
                  {errors.surname}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Form.Group className="mb-3" controlId="formGridAddress1">
              <Form.Label>Address Line 1</Form.Label>
              <Form.Control onChange={handleChange} name="addressLine1" isInvalid={!!errors.addressLine1} />
              <Form.Control.Feedback type="invalid">
                {errors.addressLine1}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGridAddress1">
              <Form.Label>Address Line 2</Form.Label>
              <Form.Control onChange={handleChange} name="addressLine2" isInvalid={!!errors.addressLine2} />
              <Form.Control.Feedback type="invalid">
                {errors.addressLine2}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGridAddress1">
              <Form.Label>Date Of Birth</Form.Label>
              <Form.Control onChange={handleChange} name="dateofbirth" type="date" isInvalid={!!errors.dateofbirth} />
              <Form.Control.Feedback type="invalid">
                {errors.dateofbirth}
              </Form.Control.Feedback>
            </Form.Group>


            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridCity">
                <Form.Label>Town/City</Form.Label>
                <Form.Control onChange={handleChange} name="town" isInvalid={!!errors.town} />
                <Form.Control.Feedback type="invalid">
                  {errors.town}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} controlId="formGridState">
                <Form.Label>Post Code</Form.Label>
                <Form.Control onChange={handleChange} className="bg-light" name="postcode" isInvalid={!!errors.postcode} />
                <Form.Control.Feedback type="invalid">
                  {errors.postcode}
                </Form.Control.Feedback>
              </Form.Group>

            </Row>


            <Button variant="primary" type="submit">
              Add Member
            </Button>
          </Form>)}
        </Formik>


      </div >
    </>
  );
};


export default withAuthenticator(App);