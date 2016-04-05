import AWS from 'aws-sdk';

var lambda = new AWS.Lambda({
  apiVersion: '2015-03-31',
  region: 'us-east-1',
});

export default function (options) {
  return new Promise((resolve, reject) => {
    var params = {
      FunctionName: options.pluginName,
      InvocationType: 'RequestResponse',
      LogType: 'Tail',
      Payload: JSON.stringify(options.payload),
    };

    lambda.invoke(params, function(err, data) {
      if (err) {
        return reject(err);
      }

      return resolve(data);
    });
  });
}