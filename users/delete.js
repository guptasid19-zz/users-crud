'use strict';

const AWS = require('aws-sdk');

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.delete = async (event, context) => {

  const params = {
    TableName: 'sls-users',
    Key: {
      id: event.pathParameters.id,
    },
  };

  try {
    await dynamoDb.delete(params).promise();
    return {
      statusCode: 200,
      body: JSON.stringify({}),
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      body: 'Couldn\'t delete the user.',
    };
  }
};