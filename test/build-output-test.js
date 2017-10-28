const Lab = require('lab');
const lab = exports.lab = Lab.script();
const chai = require('chai');
chai.should();
const expect = chai.expect;

const BuildOutput = require('../src/build-output');
const testSchedule = require('./test-schedule').schedule;

lab.experiment('the speechoutput for schedules should', () => {
    lab.test('contain all talks', (done) => {
        const result = BuildOutput.scheduleToSpeech(testSchedule);

        testSchedule.forEach(talk => expect(result).to.contain(talk.title));

        done();
    });

    lab.test('Prepend an introduction', (done) => {
        const result = BuildOutput.scheduleToSpeech(testSchedule);

        expect(result).to.contain('<p>Auf der Devcon');

        done();
    });

    lab.test('Append an enjoy message', (done) => {
        const result = BuildOutput.scheduleToSpeech(testSchedule);

        expect(result).to.contain('Viel Spass auf der Konferenz</p>');

        done();
    });
});

lab.experiment('the speechoutput for dates should', () => {
    lab.test('say dates as date using the german format', (done) => {
        const now = new Date();
        now.setMonth(11);
        now.setDate(24);

        const result = BuildOutput.dateToSpeech(now);

        expect(result).to.contain("interpret-as='date'");
        expect(result).to.contain(">24.12.<");

        done();
    });
});

lab.experiment('the speechoutput for time should', () => {
    lab.test('say time in hour:minutes', (done) => {
        const now = new Date();
        now.setHours(11);
        now.setMinutes(24);

        const result = BuildOutput.dateToTimeSpeech(now);

        expect(result).to.contain("interpret-as='time'");
        expect(result).to.contain(">11:24<");

        done();
    });

    lab.test('pad minutes if needed', (done) => {
        const now = new Date();
        now.setHours(11);
        now.setMinutes(9);

        const result = BuildOutput.dateToTimeSpeech(now);

        expect(result).to.contain(">11:09<");

        done();
    });
});


lab.experiment('the speechoutput for a talk should', () => {
    const now = new Date();
    now.setHours(11);
    now.setMinutes(9);

    const talk = {
        startsAt: now,
        speakers: [ "foo", "bar" ],
        title: "Bazamm really good"
    };

    lab.test('include the start time', (done) => {
        const output = BuildOutput.talkToSpeech(talk);

        expect(output).to.contain("11:09");

        done();
    });

    lab.test('include the speakers', (done) => {
        const output = BuildOutput.talkToSpeech(talk);

        expect(output).to.contain("foo und bar");

        done();
    });

    lab.test('include the title', (done) => {
        const output = BuildOutput.talkToSpeech(talk);

        expect(output).to.contain("mit Bazamm really good");

        done();

    });
});

lab.experiment('the speechoutput for the next talk should', () => {
    const talk = {
        startsAt: new Date(),
        speakers: [ "foo", "bar" ],
        title: "Bazamm really good"
    };

    lab.test('contain the talk info', (done) => {
        const output = BuildOutput.nextTalkToSpeech(talk);

        expect(output).to.contain("mit Bazamm really good");

        done();
    });

    lab.test('append an additional good luck message', (done) => {
        const output = BuildOutput.nextTalkToSpeech(talk);

        expect(output).to.contain('Viel Spass');

        done();
    });
});