const AWS = require('aws-sdk');
const s3 = new AWS.S3({apiVersion: '2006-03-01'});

const params = {
    Bucket: "dschmitz/devcon/schedule",
    Key: "schedule.json"
 };


const sortTalks = function (talks) {
    const now = new Date();

    return talks.sort(
                (talkA, talkB) => {
                    const aStart = Date.parse(talkA.startsAt);
                    const bStart = Date.parse(talkB.startsAt);
                    return aStart > bStart;
                });
};


const findNextTalk = function (now, sortedTalks) {
    console.log('Find next', sortedTalks);
    return sortedTalks.find(talk => Date.parse(talk.startsAt) > now.getTime());
};

module.exports = {
    getNextTalk(currentTime) {
        return new Promise((resolve, reject) => {
            s3.getObject(params, function(err, data) {

                if (err) {
                    console.log('Cannot read schedule', err);

                    reject(err);
                }
                else {
                    const devcon = JSON.parse(data.Body.toString());
                    console.log('Finding next talk in ', devcon);
                    resolve( devcon.schedule[0]);//findNextTalk(new Date(), sortTalks(devcon.schedule)));
                }
            });
        });
    },
    getTalkSummary(currentTime) {
        return {

        };
    }
};