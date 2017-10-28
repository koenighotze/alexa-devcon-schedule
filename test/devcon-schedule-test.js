const Lab = require('lab');
const lab = exports.lab = Lab.script();
const chai = require('chai');
chai.should();
const expect = chai.expect;

const DevconSchedule = require('../src/devcon-schedule');
const testSchedule = require('./test-schedule');

lab.experiment('the schedule', () => {
    lab.test('should return the next talk after the current timestamp', (done) => {
        const now = Date.parse('2017-11-10T10:00:10.262Z');

        const talk = DevconSchedule.getNextTalk(now, Promise.resolve(testSchedule.schedule));
        return talk.then(t => expect(t.talkId).to.be.equal('3'));
    });

    lab.test('should return undefined if schedule is empty', (done) => {
        const now = Date.parse('2017-11-10T10:00:10.262Z');

        const talk = DevconSchedule.getNextTalk(now, Promise.resolve([]));
        return talk.then(t => expect(t).to.be.undefined);
    });

    lab.test('should return undefined if no talk is found', (done) => {
        const now = Date.parse('2017-11-11T10:00:10.262Z');

        const talk = DevconSchedule.getNextTalk(now, Promise.resolve(testSchedule.schedule.slice(0, 1)));
        return talk.then(t => expect(t).to.be.undefined);
    });

});