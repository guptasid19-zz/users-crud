'use strict';

const uuid = require('uuid');
const AWS = require('aws-sdk');

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.create = async (event, context) => {
  const timestamp = new Date().getTime();
  const { email, username } = JSON.parse(event.body);

  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Item: {
      id: uuid.v1(),
      username,
      email,
      createdAt: timestamp,
      updatedAt: timestamp,
    },
  };

  try {
    await dynamoDb.put(params).promise();
    return {
        statusCode: 200,
        body: JSON.stringify(params.Item),
    };
  } catch (err) {
    console.error(err);
    return {
        statusCode: 500,
        body: 'Couldn\'t create the user.',
    };
  }
};