var AWS = require('aws-sdk');
const uuid = require('uuid');

AWS.config.update({
    region: 'eu-central-1',
});

exports.lambdaHandler = async (event, context) => {
    return new Promise(function (resolve, reject) {
        var docClient = new AWS.DynamoDB.DocumentClient();

        const body = JSON.parse(event.body || '{}');

        var params = {
            TableName: process.env.TABLE_NAME,
            Key: {
                ID: body.id,
            },
            UpdateExpression: 'set #NAME = :n, SURNAME = :s, AGE = :a',
            ExpressionAttributeNames: {
                '#NAME': 'NAME',
            },
            ExpressionAttributeValues: {
                ':n': body.name || '',
                ':s': body.surname || '',
                ':a': body.age || '',
            },
        };

        docClient.update(params, function (err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(200);
            }
        });
    });
};
