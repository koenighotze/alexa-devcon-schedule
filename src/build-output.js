const nextTalkToSpeech = function (talk) {
    return talkToSpeech(talk) + "<p>" + talk.summary + "</p>" + " <p>Viel Spass beim Vortrag!</p>";
};

const talkToSpeech = function (talk) {
    return "<p>Um " + dateToTimeSpeech(Date.parse(talk.startsAt)) + ": " + talk.speakers.join(' und ') + " mit " + talk.title + "</p>";
};

const dateToTimeSpeech = function (millis) {
    const date = new Date();
    date.setTime(millis);
    const [hour, minutes] = [ date.getHours(), date.getMinutes()];
    return "<say-as interpret-as='time'>" + hour + ":" + (minutes < 10 ? "0" : "") + minutes + "</say-as>";
};

const dateToSpeech = function (date) {
    const [day, month] = [ date.getDate(), date.getMonth() + 1];
    return "<say-as interpret-as='date' format='dm'>" + day + "." + month + ".</say-as>";
};

const scheduleToSpeech = function (schedule) {
    const output = schedule.map(talk => talkToSpeech(talk))
                     .join();
    return "<p>Auf der Devcon werden die folgenden Vorträge stattfinden.</p>" +
            output +
            " <p>Viel Spass auf der Konferenz</p>";
};

module.exports = {
    dateToSpeech,
    talkToSpeech,
    scheduleToSpeech,
    nextTalkToSpeech,
    dateToTimeSpeech
};