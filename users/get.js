'use strict';

const AWS = require('aws-sdk');

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.get = async (event, context) => {

  const params = {
    TableName: 'sls-users',
    Key: {
      id: event.pathParameters.id,
    },
  };

  try {
    const result = await dynamoDb.get(params).promise();
    console.log(result);
    if(result.Item){
      return {
        statusCode: 200,
        body: JSON.stringify(result.Item),
      };
    } else {
      return {
        statusCode: 400,
        body: 'User not found.',
      };
    }
  } catch (err) {
    console.error(err);
    return {
        statusCode: 500,
        body: 'Couldn\'t fetch the user.',
    };
  }
};