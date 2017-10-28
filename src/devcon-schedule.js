const sortTalks = function (talks) {
    return talks.sort(
                (talkA, talkB) => {
                    const aStart = Date.parse(talkA.startsAt);
                    const bStart = Date.parse(talkB.startsAt);
                    return aStart > bStart;
                });
};

const findNextTalk = function (now, sortedTalks) {
    return sortedTalks.find(talk => Date.parse(talk.startsAt) > now);
};

module.exports = {
    getNextTalk(currentTime, schedule) {
        return schedule
            .then(s =>  {
                return findNextTalk(currentTime, sortTalks(s));
            });
    }
};