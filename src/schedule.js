const DevconSchedule = require('devcon-schedule');
const schedule = require('./s3-schedule').schedule;

exports.handler = (event, context, callback) => {
  console.log('Try to fetch the schedule');
  schedule.then(talks => callback(null,
      {
        headers: {
          "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
          "Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS
        },
        body: JSON.stringify({ talks: talks })
      }))
          .catch(err => {
            console.log('Fetching the schedule failed', err);
            callback("Cannot fetch schedule.");
          });
};