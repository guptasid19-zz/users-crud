'use strict';

const AWS = require('aws-sdk');

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.update = async (event, context) => {

  const timestamp = new Date().getTime();
  const data = JSON.parse(event.body);

  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Key: {
      id: event.pathParameters.id,
    },
    ExpressionAttributeValues: {
      ':username': data.username,
      ':email': data.email,
      ':updatedAt': timestamp,
    },
    UpdateExpression: 'SET username = :username, email = :email, updatedAt = :updatedAt',
    ReturnValues: 'ALL_NEW',
  };

  try {
    const result = await dynamoDb.update(params).promise();
    // console.log(result);
    return {
      statusCode: 200,
      body: JSON.stringify(result.Item),
    };
  } catch (err) {
    console.error(err);
    return {
        statusCode: 500,
        body: 'Couldn\'t update the user.',
    };
  }
};
