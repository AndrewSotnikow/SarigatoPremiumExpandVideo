/**
* @file Prototype of logging function
* @name logger.js
* @copyright (c) 2017, Sarigato Sp z o. o. All rights reserved.
* @version 2.0.0
*/

/**
* @class SatakuLogger
* @param {object} messagesObject Object with log messages
* @description Logs messages to console with given stylesheet
* @version 1.0.0
* @example
* var logger = new SatakuLogger({
*   log: { 0: ['Log#0', SatakuLogger.prototype.stylesheet.global] },
*   error: { 0: ['Error#0', SatakuLogger.prototype.stylesheet.error] }
* });
* logger.log(0);
* logger.error(0);
*/
var SatakuLogger = function (messagesObject) {
    var self = this;
    if(!messagesObject || messagesObject.constructor !== Object) {
        console.error('Parameter error. Preventing constructor.');
        return self;
    }
    self.messages = messagesObject;
    return self;
};

SatakuLogger.prototype = (function() {
    var _that = {
        types: [
            'log',
            'logPreview',
            'info',
            'infoPreview',
            'warn',
            'warnPreview',
            'error',
            'errorPreview'
        ],
    };
    var that = {
        /** Stores messages
        * @type {object}
        * @name SatakuLogger#messages
        */
        messages: null,
        /** Stores stylesheets for messages
        * @type {object}
        * @name SatakuLogger#stylesheet
        */
        stylesheet: {
            global: 'color: #999; background-color: #000; padding: 2px 10px; font-weight: bold; font-family: verdana, helvetica, arial, sans-serif; font-size: 13px;',
            tracking: 'color: #993; background-color: #000; padding: 2px 10px; font-weight: bold; font-family: verdana, helvetica, arial, sans-serif; font-size: 13px;',
            error: 'color: #750202; background-color: #999; padding: 2px 10px; font-weight: bold; font-family: verdana, helvetica, arial, sans-serif; font-size: 14px;',
            messenger: 'color: #ccc; background-color: rgba(0, 0, 0, 0.75); padding: 2px 5px; font-weight: normal; font-family: verdana, helvetica, arial, sans-serif; font-size: 12px;',
        },
        /** Logs the message
        * @function SatakuLogger#message
        * @param {*} arguments Messages to log
        * @returns {undefined}
        */
        message: function() {
            var self = this;
            var _arguments = arguments[0];
            var type = _arguments[_arguments.length - 1];
            var consoleType;
            if (type === 'log' || type === 'logPreview') {
                consoleType = 'log';
            } else if (type === 'info' || type === 'infoPreview') {
                consoleType = 'info';
            } else if (type === 'warn' || type === 'warnPreview') {
                consoleType = 'warn';
            } else if (type === 'error' || type === 'errorPreview') {
                consoleType = 'error';
            }
            var index = _arguments[0];
            var message = self.messages;
            var args = [];
            if (!DEBUG_MODE && type === 'log') { return; }
            if ([window.MODE_DEVELOPER, window.MODE_PREVIEW].indexOf(window.SATAKU_MODE) === -1 && (['logPreview', 'infoPreview', 'warnPreview', 'errorPreview'].indexOf(type) !== -1)) { return; }

            if(message[type] === undefined) {
                console.error('Undefined type');
                return;
            }
            if(message[type][index] === undefined) {
                console.error('Undefined index');
                return;
            }
            message = message[type][index];
            if(message.constructor === Array) {
                if(message.length === 2) {
                    message.stkIterate(function(msg, key) {
                        if (key === 0) { args.push('%c' + msg); }
                        else { args.push(msg); }
                    });
                } else {
                    console.error('Message length illegal');
                    return;
                }
            } else {
                args.push(message);
            }
            for (var i = 1; i < _arguments.length - 1; i++) {
                args.push(_arguments[i]);
            }
            console[consoleType].apply(console, args);
        }
    };

    _that.types.stkIterate(function(type) {
        that[type] = function() {
            arguments[arguments.length++] = type;
            this.message(arguments);
        };
    });

    _that = null;
    return that;
})();
