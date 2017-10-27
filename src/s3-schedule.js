const AWS = require('aws-sdk');
const s3 = new AWS.S3({apiVersion: '2006-03-01'});

const params = {
    Bucket: "dschmitz/devcon/schedule",
    Key: "schedule.json"
 };

module.exports = {
    'schedule': new Promise((resolve, reject) => {
        s3.getObject(params, function(err, data) {
            if (err) {
                console.log('Cannot read schedule', err);
                reject(err);
            }
            else {
                const devcon = JSON.parse(data.Body.toString());
                resolve(devcon.schedule);
            }
        });
    })
};
