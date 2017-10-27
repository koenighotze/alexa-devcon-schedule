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
    getNextTalk(currentTime, schedule) {
        return schedule
            .then(s =>  s[0]);
             //findNextTalk(new Date(), sortTalks(devcon.schedule)));
    },
    getTalkSummary(currentTime) {
        return {

        };
    }
};