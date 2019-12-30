'use strict';

const AWS = require('aws-sdk');

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.list = async (event, context) => {

  const params = {
    TableName: process.env.DYNAMODB_TABLE,
  };

  try {
    const result = await dynamoDb.scan(params).promise();
    return {
        statusCode: 200,
        body: JSON.stringify(result.Items),
    };
  } catch (err) {
    console.error(err);
    return {
        statusCode: 500,
        body: 'Couldn\'t fetch the users.',
    };
  }
};