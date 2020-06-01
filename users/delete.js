var AWS = require('aws-sdk');
const uuid = require('uuid');

AWS.config.update({
    region: 'eu-central-1',
});

exports.lambdaHandler = async (event, context) => {
    return new Promise(function (resolve, reject) {
        var docClient = new AWS.DynamoDB.DocumentClient();

        var params = {
            TableName: process.env.TABLE_NAME,
            Key: {
                ID: event.queryStringParameters.id,
            }
        };

        docClient.delete(params, function (err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(200);
            }
        });
    });
};
