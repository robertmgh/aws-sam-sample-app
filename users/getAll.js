var AWS = require('aws-sdk');

AWS.config.update({
    region: 'eu-central-1',
});

exports.lambdaHandler = async (event, context) => {
    return new Promise(function (resolve, reject) {
        var docClient = new AWS.DynamoDB.DocumentClient();

        var params = {
            TableName: process.env.TABLE_NAME,
            Select: "ALL_ATTRIBUTES"
        };

        docClient.scan(params, function (err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
};
