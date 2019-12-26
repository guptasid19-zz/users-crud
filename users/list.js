'use strict';

const AWS = require('aws-sdk');

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.list = async (event, context) => {

  const params = {
    TableName: 'sls-users',
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
        message: 'Couldn\'t create the user.',
    };
  }
};