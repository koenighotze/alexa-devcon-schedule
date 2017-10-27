const Lab = require('lab');
const lab = exports.lab = Lab.script();
const chai = require('chai');
chai.should();
const expect = chai.expect;

const S3Schedule = require('../src/s3-schedule');

lab.experiment('the schedule', () => {
    lab.beforeEach((done) => {
        done();
    });
});
