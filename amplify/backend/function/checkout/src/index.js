/* Amplify Params - DO NOT EDIT
	API_AMPLIFYAPP_GRAPHQLAPIENDPOINTOUTPUT
	API_AMPLIFYAPP_GRAPHQLAPIIDOUTPUT
	API_AMPLIFYAPP_GRAPHQLAPIKEYOUTPUT
	AUTH_AMPLIFYAPP0CB91442_USERPOOLID
	ENV
	REGION
Amplify Params - DO NOT EDIT *//* Amplify Params - DO NOT EDIT
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



// const {
//   createMember
// } = require( "../../../../../src/graphql/mutations");
const moment = require('moment')


const {
  CognitoIdentityProviderClient,
 GetUserCommand, ListUsersCommand,
} = require("@aws-sdk/client-cognito-identity-provider");
const fetch = require('node-fetch');
const Stripe = require('stripe');

const GRAPHQL_ENDPOINT = process.env.API_AMPLIFYAPP_GRAPHQLAPIENDPOINTOUTPUT;
const AWS_REGION = process.env.AWS_REGION || 'us-east-1';

const { Request } = fetch
const { Sha256 } = crypto;




const query = /* GraphQL */ `
mutation CreateEnrolment(
  $input: CreateEnrolmentInput!
  $condition: ModelEnrolmentConditionInput
) {
  createEnrolment(input: $input, condition: $condition) {
    id
    bands
    status
    term
    ratedescription
    rate
    stripeRef
    member {
      id
      forename
      surname
      dateofbirth
      ethnicity
      instruments
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
    }
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    enrolmentMemberId
    owner
  }
}
`;

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
//
// Takes in
// Full Or Partial
// With Or Without Lessons
// Derives Age
// Derives Siblings

const createSwipe = async (referenceid, term,  email, rate, ratedescription) => {

  let url = "https://api.stripe.com/v1/checkout/sessions";
  const privatekey = "sk_test_51MPqHgHsYPcD7OHQied7QODzII5wiNOzL6LqzTBLDWyuxdEzTlvsLLUtmANmorVGJwS5yIemWOlW3hQzcut43kLF00RNmzxG8a"
  const stripe = Stripe('sk_test_51MPqHgHsYPcD7OHQied7QODzII5wiNOzL6LqzTBLDWyuxdEzTlvsLLUtmANmorVGJwS5yIemWOlW3hQzcut43kLF00RNmzxG8a');
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: 'GBP',
          unit_amount: (rate * 100).toString().split('.')[0],
          product_data: { name: ratedescription  }
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


exports.handler = async (event) => {
  // console.log(`EVENT: ${JSON.stringify(event)}`);
  // console.log(JSON.stringify(JSON.parse(event.body)))
// a client can be shared by different commands.
  const client = new CognitoIdentityProviderClient({ region: "eu-west-2" });
  const bands = JSON.parse(event.body).bands  // big or small
  const lessons = JSON.parse(event.body).lessons  //true or fale
  const params = {
    //AccessToken: JSON.parse(event.body).accesskey.jwtToken
    AccessToken: 'eyJraWQiOiJwQlhVNkplYkE1QkF5Q3FZNjl3OExTZWRQd3VBZDEyTUtwWTJocGZMQm44PSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiIxNTUwYmRjNi1jYWM0LTQyNGUtYTI1ZC1kMDhlMTIzNjZmMGEiLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuZXUtd2VzdC0yLmFtYXpvbmF3cy5jb21cL2V1LXdlc3QtMl9iOHp6bUtKYkkiLCJjbGllbnRfaWQiOiJzbTF1bGFiM25lYnJ0M2E4YWI0Z3J0MDE2Iiwib3JpZ2luX2p0aSI6ImI1MzFmNjIyLTIwNWUtNGJjMi05ZGIzLTkyMGY3YTAzMzNlYyIsImV2ZW50X2lkIjoiNDNlYWZjMDMtMDU4Zi00ZDllLWI3ODQtZGZmMDE3MmY5ZTc1IiwidG9rZW5fdXNlIjoiYWNjZXNzIiwic2NvcGUiOiJhd3MuY29nbml0by5zaWduaW4udXNlci5hZG1pbiIsImF1dGhfdGltZSI6MTY3Nzg2MjE2OSwiZXhwIjoxNjc3OTcxMTU5LCJpYXQiOjE2Nzc5Njc1NTksImp0aSI6ImIxZDYxZDA1LTBlOTEtNDg3NS05YWU0LTE0YTdjNmVmYzRiNyIsInVzZXJuYW1lIjoiam9obmJhbmQifQ.VG9qAM7041b-WdBnTyW6shHdsUZTA_hp3_9rz3PrCHrXpjfR5eG6abNlxvbHmTEiSsxVAFwJ458faOF58syh2jKNxkRF-wxFFP6c36O2LeN6y6VvYszqwXeJokAan-tjCyjUWEUCfdjjYGl3vqfxSuv_zjO4c62HFznLIsgHErHvRVYXMzco097v9GVYH7sqKoCKATUVT6Ut5jMbjVMALrmCukNM-QAb9MvPKXGuzriveUNgUtb-nJ6KhymZg06NTn0U9yRexdOPmCWfwdSfHT7uzPwzOMxQ0a986XsNqdIXi6kxx-BjPB5ZqikMy67SfUZco8fYBb_mJ9rHcTzWTg'
  };

  console.log(JSON.stringify(params))
  // - this works: const command = new ListUsersCommand({UserPoolId:'eu-west-2_b8zzmKJbI'});
  const command = new GetUserCommand(params);
  // const id = JSON.parse(event.body).id
  // console.log(JSON.parse(event.body).id)

  let data = {}
  try {
    data = await client.send(command);
    console.log(data)
    const age = moment().diff(moment(data.UserAttributes.filter(attr => attr.Name === 'birthdate')[0].Value, "DD/MM/YYYY"), "years");
    const hasSiblings = data.UserAttributes.filter(attr => attr.Name === 'profile')[0].Value === 'siblings' ? true: false;
    const email = data.UserAttributes.filter(attr => attr.Name === 'email')[0].Value 
    console.log(data.UserAttributes.filter(attr => attr.Name === 'birthdate')[0].Value)


    const bandDesc = bands === 'big'? 'Full band membership' : 'Limited band membership (one small band only)'
    let bandPrice = 0
    if(age > 30){
      if(bands === 'big'){
        bandPrice = 105.00
      }
      else{
        bandPrice = 52.50
      }
    }
    else {
      if(hasSiblings || bands === 'small'){
        bandPrice = 26.25
      }
      else{
        bandPrice = 52.50
      }
    }
    //----




  const endpoint = new URL(GRAPHQL_ENDPOINT);

  const signer = new SignatureV4({
    credentials: defaultProvider(),
    region: AWS_REGION,
    service: 'appsync',
    sha256: Sha256
  });

  const variables = {
    input: {status:'pending'}
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
    console.log(body)
  } catch (error) {
    console.log(error)
  }


    //----
    const session = await createSwipe('ref_id','This term', email, bandPrice, bandDesc)
    return {
      "statusCode": 200,
      //  Uncomment below to enable CORS requests
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*"
      },
      body: JSON.stringify(session)
    };
  } catch (error) {
    return {
      "statusCode": 400,
      //  Uncomment below to enable CORS requests
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*"
      },
      body: JSON.stringify(error)
    };
  } 



//   const query = /* GraphQL */ `
//   query GetEnrolment($id: ID!) {
//     getEnrolment(id: $id) {
//       id
//       bands
//       status
//       term
//       ratedescription
//       rate
//       stripeRef
//       createdAt
//       updatedAt
//       owner
//     }
//   }
// `;


//   const endpoint = new URL(GRAPHQL_ENDPOINT);

//   const signer = new SignatureV4({
//     credentials: defaultProvider(),
//     region: AWS_REGION,
//     service: 'appsync',
//     sha256: Sha256
//   });

//   const variables = {
//     id: id,
//   }
//   const requestToBeSigned = new HttpRequest({
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       host: endpoint.host
//     },
//     hostname: endpoint.host,
//     body: JSON.stringify({ query, variables }),
//     path: endpoint.pathname
//   });

//   const signed = await signer.sign(requestToBeSigned);
//   const request = new Request(endpoint, signed);

//   let statusCode = 200;
//   let body;
//   let response;
//   let swiperesp;

//   try {
//     response = await fetch(request);
//     body = await response.json();

//     //referenceid, term, bands, email, rate, ratedescription
//     swiperesp = await createSwipe(
//       id,
//       body.data.getEnrolment.term,
//       body.data.getEnrolment.bands,
//       'john.e.mcbride@icloud.com',
//       body.data.getEnrolment.rate,
//       body.data.getEnrolment.ratedescription)

//     if (body.errors) statusCode = 400;

//     return {
//       statusCode,
//       //  Uncomment below to enable CORS requests
//       headers: {
//         "Access-Control-Allow-Origin": "*",
//         "Access-Control-Allow-Headers": "*"
//       },
//       body: JSON.stringify(swiperesp.url)
//     };
//   } catch (error) {
//     statusCode = 500;
//     body = {
//       errors: [
//         {
//           body: body,
//           message: error.message
//         }
//       ]
//     };


//     return {
//       statusCode,
//       //  Uncomment below to enable CORS requests
//       headers: {
//         "Access-Control-Allow-Origin": "*",
//         "Access-Control-Allow-Headers": "*"
//       },
//       body: JSON.stringify(body)
//     };
//   }

};