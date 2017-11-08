/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/
'use strict';

const Alexa = require('alexa-sdk');
const DevconSchedule = require('devcon-schedule');
const BuildOutput = require('build-output');

const languageStrings = {
    'de': {
        translation: {
            SKILL_NAME: 'Devcon Konferenzplaner',
            HELP_MESSAGE: 'Du kannst mich alles zur Devcon 2017 fragen. Zum Beispiel: Welcher Vortrag kommt als nächstes?',
            HELP_REPROMPT: 'Womit kann ich helfen?',
            STOP_MESSAGE: 'Auf Wiedersehen und fröhliches Programmieren!',
            CANNOT_FETCH: 'Entschuldigung, ich kann aktuell nicht wirklich helfen!',
            NO_TALKS: 'Entschuldigung, aber es kommt kein Vortrag um '
        }
    }
};

const schedule = require('./s3-schedule').schedule;

const handlers = {
    'LaunchRequest': function () {
        this.emit(':ask', "Willkommen beim Senacor Devcon Konferenzhelfer. " + this.t('HELP_MESSAGE'), this.t('HELP_REPROMPT'));
    },
    'GetNextTalk': function () {
        const now = new Date();
        const self = this;
        DevconSchedule.getNextTalk(now, schedule)
            .then( talk => {
                const output = BuildOutput.nextTalkToSpeech(talk);
                self.emit(':tellWithCard', output);
            })
            .catch( error => {
                console.log('Cannot fetch', error);
                self.emit(':tellWithCard', self.t('CANNOT_FETCH'));
            });
    },
    'GetSchedule': function () {
        const self = this;
        schedule
            .then( talks => {
                const output = BuildOutput.scheduleToSpeech(talks);
                self.emit(':tellWithCard', output);

            })
            .catch( error => {
                console.log('Cannot fetch', error);
                self.emit(':tellWithCard', self.t('CANNOT_FETCH'));
            });
    },
    'AMAZON.HelpIntent': function () {
        const speechOutput = this.t('HELP_MESSAGE');
        const reprompt = this.t('HELP_MESSAGE');
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
};

exports.handler = function (event, context) {
    const alexa = Alexa.handler(event, context);
    alexa.APP_ID = undefined;
    // To enable string internationalization (i18n) features, set a resources object.
    alexa.resources = languageStrings;
    alexa.registerHandlers(handlers);
    alexa.execute();
};
