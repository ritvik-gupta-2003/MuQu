import * as AWS from 'aws-sdk';

const docClient = new AWS.DynamoDB.DocumentClient({region: 'us-east-2', accessKeyId: 'AKIAY5LDIFZX6JKWLB5H', secretAccessKey: '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'});

export const fetchData = (tableName) => {
    var params = {
        TableName: tableName
    }

    docClient.scan(params, function(err, data) {
        if (!err) {
            console.log(data)
        }
    })
}

export const putData = (tableName , data) => {
    var params = {
        TableName: tableName,
        Item: data
    }
    
    docClient.put(params, function(err, data) {
        if (err) {
            console.log(err);
        }
        else {
            console.log(data);
        }
    })
}