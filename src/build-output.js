const buildSpeechOutput = function (translation, talk) {
    const output = talkToSpeech(talk) + " Viel Spass beim Vortrag!";
    return output;
};

const talkToSpeech = function (talk) {
    return "<p>Um " + dateToTimeSpeech(Date.parse(talk.startsAt)) + ": " + talk.speakers.join(' und ') + " mit '" + talk.title + "'</p>";
};

const dateToTimeSpeech = function (millis) {
    const date = new Date();
    date.setTime(millis);
    const [hour, minutes] = [ date.getHours(), pad(date.getMinutes(), 2)];
    return "<say-as interpret-as='time'>" + hour + ":" + minutes + "</say-as>";

};

function pad(num, size) {
    var s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
}

const dateToSpeech = function (date) {
    const [day, month] = [ date.getDate(), date.getMonth() + 1];
    return "<say-as interpret-as='date' format='dm'>" + day + "." + month + ".</say-as>";
};

module.exports = {
    buildSpeechOutput,
    dateToSpeech,
    talkToSpeech
};