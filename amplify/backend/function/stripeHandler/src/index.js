
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

const GRAPHQL_ENDPOINT = process.env.API_AMPLIFYAPP_GRAPHQLAPIENDPOINTOUTPUT;
const AWS_REGION = process.env.AWS_REGION || 'us-east-1';
const { Sha256 } = crypto;

const { Request } = fetch

const query = /* GraphQL */ `
  query ListEnrolments(
    $filter: ModelEnrolmentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listEnrolments(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }`

const update = /* GraphQL */ `
mutation UpdateEnrolment(
  $input: UpdateEnrolmentInput!
  $condition: ModelEnrolmentConditionInput
) {
  updateEnrolment(input: $input, condition: $condition) {
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
`

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */



exports.handler = async (event) => {
  console.log(`EVENT: ${JSON.stringify(event)} `);

  const id = JSON.parse(event.body).data.object.client_reference_id
  console.log(`ID: ${id} `);


  const variables = {
    input: {
      id: id,
      status: 'paid'
    }

  }
  const endpoint = new URL(GRAPHQL_ENDPOINT);

  const signer = new SignatureV4({
    credentials: defaultProvider(),
    region: AWS_REGION,
    service: 'appsync',
    sha256: Sha256
  });

  const requestToBeSigned = new HttpRequest({
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      host: endpoint.host
    },
    hostname: endpoint.host,
    body: JSON.stringify({ "query": update, "variables": variables }),
    path: endpoint.pathname
  });

  const signed = await signer.sign(requestToBeSigned);
  const request = new Request(endpoint, signed);

  let statusCode = 200;
  let body;
  let response;

  try {
    response = await fetch(request);
    body = await response.json();
    if (body.errors) statusCode = 400;
  } catch (error) {
    statusCode = 500;
    body = {
      errors: [
        {
          message: error.message
        }
      ]
    };
  }

  return {
    statusCode,
    //  Uncomment below to enable CORS requests
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "*"
    },
    body: JSON.stringify(body)
  };
};