/* Amplify Params - DO NOT EDIT
  API_AMPLIFYAPP_GRAPHQLAPIENDPOINTOUTPUT
  API_AMPLIFYAPP_GRAPHQLAPIIDOUTPUT
  API_AMPLIFYAPP_GRAPHQLAPIKEYOUTPUT
  ENV
  REGION
Amplify Params - DO NOT EDIT */

const crypto = require('@aws-crypto/sha256-js');
const { defaultProvider } = require('@aws-sdk/credential-provider-node');
const { SignatureV4 } = require('@aws-sdk/signature-v4');
const { HttpRequest } = require('@aws-sdk/protocol-http');
const fetch = require('node-fetch');
const Stripe = require('stripe');

const GRAPHQL_ENDPOINT = process.env.API_AMPLIFYAPP_GRAPHQLAPIENDPOINTOUTPUT;
const AWS_REGION = process.env.AWS_REGION || 'us-east-1';

const { Request } = fetch
const { Sha256 } = crypto;


/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

exports.handler = async (event) => {
  //console.log(`EVENT: ${JSON.stringify(event)}`);
  const id = JSON.parse(event.body).id
  console.log(JSON.parse(event.body).id)

  const query = /* GraphQL */ `
  query GetEnrolment($id: ID!) {
    getEnrolment(id: $id) {
      id
      bands
      status
      term
      ratedescription
      rate
      stripeRef
      createdAt
      updatedAt
      owner
    }
  }
`;


  const createSwipe = async (referenceid, term, bands, email, rate, ratedescription) => {

    let url = "https://api.stripe.com/v1/checkout/sessions";
    const privatekey = "sk_test_51MPqHgHsYPcD7OHQied7QODzII5wiNOzL6LqzTBLDWyuxdEzTlvsLLUtmANmorVGJwS5yIemWOlW3hQzcut43kLF00RNmzxG8a"
    const stripe = Stripe('sk_test_51MPqHgHsYPcD7OHQied7QODzII5wiNOzL6LqzTBLDWyuxdEzTlvsLLUtmANmorVGJwS5yIemWOlW3hQzcut43kLF00RNmzxG8a');
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: 'GBP',
            unit_amount: (rate * 100).toString().split('.')[0],
            product_data: { name: ratedescription + ' (' + bands.join(', ') + ')' }
          },
          quantity: 1
        }
      ],
      mode: 'payment',
      success_url: "http://localhost:3000/payment/" + referenceid,
      cancel_url: "http://localhost:3000",
      client_reference_id: referenceid,
      customer_email: email,
    });
    return session
  }
  const endpoint = new URL(GRAPHQL_ENDPOINT);

  const signer = new SignatureV4({
    credentials: defaultProvider(),
    region: AWS_REGION,
    service: 'appsync',
    sha256: Sha256
  });

  const variables = {
    id: id,
  }
  const requestToBeSigned = new HttpRequest({
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      host: endpoint.host
    },
    hostname: endpoint.host,
    body: JSON.stringify({ query, variables }),
    path: endpoint.pathname
  });

  const signed = await signer.sign(requestToBeSigned);
  const request = new Request(endpoint, signed);

  let statusCode = 200;
  let body;
  let response;
  let swiperesp;

  try {
    response = await fetch(request);
    body = await response.json();

    //referenceid, term, bands, email, rate, ratedescription
    swiperesp = await createSwipe(
      id,
      body.data.getEnrolment.term,
      body.data.getEnrolment.bands,
      'john.e.mcbride@icloud.com',
      body.data.getEnrolment.rate,
      body.data.getEnrolment.ratedescription)

    if (body.errors) statusCode = 400;

    return {
      statusCode,
      //  Uncomment below to enable CORS requests
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*"
      },
      body: JSON.stringify(swiperesp.url)
    };
  } catch (error) {
    statusCode = 500;
    body = {
      errors: [
        {
          body: body,
          message: error.message
        }
      ]
    };


    return {
      statusCode,
      //  Uncomment below to enable CORS requests
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*"
      },
      body: JSON.stringify(body)
    };
  }

};