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
            Item: {
                ID: uuid.v4(),
                NAME: body.name || '',
                SURNAME: body.surname || '',
                AGE: body.age || '',
            },
        };

        docClient.put(params, function (err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(200);
            }
        });
    });
};
