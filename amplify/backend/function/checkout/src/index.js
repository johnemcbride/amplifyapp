/*
Use the following code to retrieve configured secrets from SSM:

const aws = require('aws-sdk');

const { Parameters } = await (new aws.SSM())
  .getParameters({
    Names: ["stripe_pk"].map(secretName => process.env[secretName]),
    WithDecryption: true,
  })
  .promise();

Parameters will be of the form { Name: 'secretName', Value: 'secretValue', ... }[]
*/
/* Amplify Params - DO NOT EDIT
	API_AMPLIFYAPP_GRAPHQLAPIENDPOINTOUTPUT
	API_AMPLIFYAPP_GRAPHQLAPIIDOUTPUT
	API_AMPLIFYAPP_GRAPHQLAPIKEYOUTPUT
	AUTH_AMPLIFYAPP0CB91442_USERPOOLID
	ENV
	REGION
Amplify Params - DO NOT EDIT */ /* Amplify Params - DO NOT EDIT
  API_AMPLIFYAPP_GRAPHQLAPIENDPOINTOUTPUT
  API_AMPLIFYAPP_GRAPHQLAPIIDOUTPUT
  API_AMPLIFYAPP_GRAPHQLAPIKEYOUTPUT
  ENV
  REGION
Amplify Params - DO NOT EDIT */
const GRAPHQL_API_KEY = process.env.API_AMPLIFYAPP_GRAPHQLAPIENDPOINTOUTPUT;
const crypto = require("@aws-crypto/sha256-js");
const { defaultProvider } = require("@aws-sdk/credential-provider-node");
const { SignatureV4 } = require("@aws-sdk/signature-v4");
const { HttpRequest } = require("@aws-sdk/protocol-http");

const { SSMClient, GetParameterCommand } = require("@aws-sdk/client-ssm");
const moment = require("moment");

const {
  CognitoIdentityProviderClient,
  GetUserCommand,
  ListUsersCommand,
} = require("@aws-sdk/client-cognito-identity-provider");
const fetch = require("node-fetch");
const Stripe = require("stripe");

const GRAPHQL_ENDPOINT = process.env.API_AMPLIFYAPP_GRAPHQLAPIENDPOINTOUTPUT;
const AWS_REGION = process.env.AWS_REGION || "us-east-1";

const { Request } = fetch;
const { Sha256 } = crypto;

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
//
// Takes in
// Full Or Partial
// With Or Without Lessons
// Derives Age
// Derives Siblings

const createStripe = async (
  referenceid,
  email,
  bandRate,
  bandDescription,
  lessonRate,
  lessonDescription,
  redirecthost
) => {
  //
  // get secret

  const ssmclient = new SSMClient({ region: "eu-west-2" });

  console.log("stripe - env is " + JSON.stringify(process.env));
  const params = {
    Name: process.env["stripe_pk"],
    WithDecryption: true,
  };
  const command = new GetParameterCommand(params);
  try {
    const data = await ssmclient.send(command);
    console.log("getting secret");
    console.log(data);
    const privatekey = data.Parameter.Value;
    // process data.

    let url = "https://api.stripe.com/v1/checkout/sessions";
    const stripe = Stripe(privatekey);
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "GBP",
            unit_amount: (bandRate * 100).toString().split(".")[0],
            product_data: { name: bandDescription },
          },
          quantity: 1,
        },
        {
          price_data: {
            currency: "GBP",
            unit_amount: (lessonRate * 100).toString().split(".")[0],
            product_data: { name: lessonDescription },
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: redirecthost,
      cancel_url: redirecthost,
      client_reference_id: referenceid,
      customer_email: email,
      billing_address_collection: "required",
      consent_collection: { terms_of_service: "required" },
      custom_fields: [
        {
          key: "giftaid",
          label: { custom: "Gift Aid Consent", type: "custom" },
          type: "dropdown",
          dropdown: {
            options: [
              { label: "I consent", value: true },
              { label: "I do not consent", value: false },
            ],
          },
          optional: false,
        },
      ],
    });
    return session;
  } catch (error) {
    // error handling.
    throw error;
  } finally {
    // finally.
  }
};

const fetchEnrolment = async (id) => {
  const getEnrolmentQuery = /* GraphQL */ `
    query GetEnrolment($id: ID!) {
      getEnrolment(id: $id) {
        id
        bands
        status
        term
        bandDesc
        bandRate
        lessons
        lessonDesc
        lessonRate
        stripeRef
        createdAt
        updatedAt
        owner
      }
    }
  `;
  const endpoint = new URL(GRAPHQL_ENDPOINT);

  const signer = new SignatureV4({
    credentials: defaultProvider(),
    region: AWS_REGION,
    service: "appsync",
    sha256: Sha256,
  });

  const variables = {
    id: id,
  };
  const requestToBeSigned = new HttpRequest({
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      host: endpoint.host,
    },
    hostname: endpoint.host,
    body: JSON.stringify({
      query: getEnrolmentQuery,
      variables,
      authMode: "AWS_IAM",
    }),
    path: endpoint.pathname,
  });

  const signed = await signer.sign(requestToBeSigned);
  const request = new Request(endpoint, signed);

  let statusCode = 200;
  let body;
  let response;
  let swiperesp;

  try {
    response = await fetch(request);
    const json = await response.json();
    return json;
  } catch (error) {
    //would only be an http error
    console.log(error);
  }
};

const updEnrolment = async (
  id,
  bands,
  firstname,
  familyname,
  email,
  siblings,
  bandDesc,
  bandPrice,
  lessonDesc,
  lessonPrice
) => {
  console.log("Startingupdatenrolment for " + id);
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
        bandDesc
        bandRate
        lessons
        lessonDesc
        lessonRate
        stripeRef
        createdAt
        updatedAt
        owner
      }
    }
  `;

  const endpoint = new URL(GRAPHQL_ENDPOINT);

  const signer = new SignatureV4({
    credentials: defaultProvider(),
    region: AWS_REGION,
    service: "appsync",
    sha256: Sha256,
  });

  const variables = {
    input: {
      id: id,
      status: "pending",
      bandMembershipType: bands,
      bandDesc: bandDesc,
      bandRate: bandPrice,
      term: "Summer Term - 2023",
      lessonDesc: lessonDesc,
      lessonRate: lessonPrice,
      firstname: firstname,
      familyname: familyname,
      siblings: siblings,
      email: email,
    },
  };
  const requestToBeSigned = new HttpRequest({
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      host: endpoint.host,
    },
    hostname: endpoint.host,
    body: JSON.stringify({
      query: update,
      variables: variables,
      authMode: "AWS_IAM",
    }),
    path: endpoint.pathname,
  });

  const signed = await signer.sign(requestToBeSigned);
  const request = new Request(endpoint, signed);

  let statusCode = 200;
  let body;
  let response;
  let swiperesp;

  try {
    response = await fetch(request);
    console.log("Just tried update enrolment");
    console.log(response);
    const json = await response.json();
    return json;
  } catch (error) {
    //would only be an http error
    console.log(error);
  }
};

exports.handler = async (event) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);
  // console.log(JSON.stringify(JSON.parse(event.body)))
  // a client can be shared by different commands.
  const client = new CognitoIdentityProviderClient({ region: "eu-west-2" });
  const enrolmentId = JSON.parse(event.body).enrolmentId; // big or small
  console.log("enroomentId is " + enrolmentId);
  const resp = await fetchEnrolment(enrolmentId);
  console.log(resp);
  const bands = resp.data.getEnrolment.bands;
  const lessons = resp.data.getEnrolment.lessons;
  console.log("shoudl have got bands and lessons from" + resp);
  //const lessons = JSON.parse(event.body).lessons; //true or fale

  const params = {
    AccessToken: JSON.parse(event.body).accesskey.jwtToken,
    //AccessToken:
    // "eyJraWQiOiJwQlhVNkplYkE1QkF5Q3FZNjl3OExTZWRQd3VBZDEyTUtwWTJocGZMQm44PSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiIxNTUwYmRjNi1jYWM0LTQyNGUtYTI1ZC1kMDhl"
  };
  console.log(JSON.stringify(params));
  // - this works: const command = new ListUsersCommand({UserPoolId:'eu-west-2_b8zzmKJbI'});
  const command = new GetUserCommand(params);
  // const id = JSON.parse(event.body).id
  // console.log(JSON.parse(event.body).id)

  let data = {};
  try {
    data = await client.send(command);
    console.log(data);
    console.log(
      data.UserAttributes.filter((attr) => attr.Name === "birthdate")[0].Value
    );
    const age = moment().diff(
      moment(
        data.UserAttributes.filter((attr) => attr.Name === "birthdate")[0]
          .Value,
        "DD/MM/YYYY"
      ),
      "years"
    );
    console.log("After age = " + age);
    const hasSiblings =
      data.UserAttributes.filter((attr) => attr.Name === "profile")[0]
        ?.Value === "siblings"
        ? true
        : false;

    console.log("Has siblings = " + hasSiblings);
    const email = data.UserAttributes.filter((attr) => attr.Name === "email")[0]
      .Value;

    console.log("Email = " + email);
    let bandDesc = "No band membership (tuition only)";
    let bandPrice = 0;

    if (age > 30) {
      if (bands === "all") {
        bandDesc = "All bands (over 30's rate)";
        bandPrice = 105.0;
      } else {
        bandDesc = "One small band only (over 30's rate)";
        bandPrice = 52.5;
      }
    } else if (!hasSiblings) {
      if (bands === "all") {
        bandDesc = "All bands (under 30's rate)";
        bandPrice = 52.5;
      } else {
        bandDesc = "One small band only (under 30's rate)";
        bandPrice = 26.25;
      }
    } else {
      bandDesc = "All bands (siblings rate)";
      bandPrice = 26.25;
    }

    if (bands === "none") {
      bandPrice = 0;
      bandDesc = "No band membership (tuition only)";
    }
    let lessonDesc = "No lessons included";
    let lessonPrice = 0;
    if (lessons) {
      if (age > 30) {
        lessonDesc = "Lessons (over 30's rate)";
        lessonPrice = 105;
      } else if (hasSiblings) {
        lessonDesc = "Lessons (siblings rate)";
        lessonPrice = 26.25;
      } else {
        lessonDesc = "Lessons (under 30's rate)";
        lessonPrice = 52.5;
      }
    }

    const updEnrolResp = await updEnrolment(
      enrolmentId,
      bands,
      data.UserAttributes.filter((attr) => attr.Name === "name")[0].Value,
      data.UserAttributes.filter((attr) => attr.Name === "family_name")[0]
        .Value,
      data.UserAttributes.filter((attr) => attr.Name === "email")[0].Value,
      true,
      bandDesc,
      bandPrice,
      lessonDesc,
      lessonPrice
    );

    console.log("Just updated enrolment - here is the response in line 217");
    console.log(updEnrolResp);
    // todo - handle if that doesn't happen!
    const session = await createStripe(
      updEnrolResp.data.updateEnrolment.id,
      email,
      bandPrice,
      bandDesc,
      lessonPrice,
      lessonDesc,
      event.headers.Referer
    );
    console.log("Initiating session with Stripe:" + session);
    return {
      statusCode: 200,
      //  Uncomment below to enable CORS requests
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
      },
      body: JSON.stringify(session),
    };
  } catch (error) {
    return {
      statusCode: 400,
      //  Uncomment below to enable CORS requests
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
      },
      body: JSON.stringify(error),
    };
  }
};
