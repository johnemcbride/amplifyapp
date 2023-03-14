/* Amplify Params - DO NOT EDIT
	AUTH_AMPLIFYAPP0CB91442_USERPOOLID
	ENV
	REGION
Amplify Params - DO NOT EDIT */

const {
  CognitoIdentityProviderClient,
  AdminGetUserCommand,
} = require("@aws-sdk/client-cognito-identity-provider");

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

exports.handler = async function (event, context) {
  const client = new CognitoIdentityProviderClient({ region: "eu-west-2" });

  console.log("Event body is  " + JSON.stringify(event));
  console.log("Event body is  " + JSON.stringify(event));

  const params = {
    Username: event.source.owner.split("::")[1],
    UserPoolId: process.env["AUTH_AMPLIFYAPP0CB91442_USERPOOLID"],
  };
  console.log("Params" + JSON.stringify(params));
  const command = new AdminGetUserCommand(params);

  let data = {};
  try {
    data = await client.send(command);
    return data;
  } catch (error) {
    return { Username: error };
  }
};
