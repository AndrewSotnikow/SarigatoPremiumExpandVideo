/**
* @file Stores SatakuMessenger class
* @name messenger.js
* @copyright (c) 2017, Sarigato Sp z o. o. All rights reserved.
* @version 2.0.0
*/

/**
* @class SatakuMessenger
* @description Sends/Recives messages to/from loader.js
* @param {object} config {@link Sataku.config} object
* @version 1.0.0
*/

var SatakuMessenger = (function() {
    /**
    * @inner
    * @name _self
    * @type {object}
    * @memberof SatakuMessenger
    * @property {object} events Stores registered events
    * @property {object} debug {@link SatakuLogger} instance
    * @property {function} getSendMsgBasicDataObj Gets message data neccessary to comunicate with loader.js
    * @property {function} receiveMsg Recives message from loader.js
    */
    var _self = {
        events: {},
        debug: new SatakuLogger({
            warn: {
                'undef': ['%s Messenger - Event undefined, further execution prevented -> %s', SatakuLogger.prototype.stylesheet.messenger],
                'nullData': ['%s Messenger - Event invoked without any data -> %s', SatakuLogger.prototype.stylesheet.messenger],
                'override': ['%s Messenger - Event override! -> %s', SatakuLogger.prototype.stylesheet.messenger]
            },
            log: {
                'receive': ['%s Messenger - Receive frame -> %s %O', SatakuLogger.prototype.stylesheet.messenger],
                'sendMsg': ['%s Messenger - Sent frame -> %s %O', SatakuLogger.prototype.stylesheet.messenger],
                'register': ['%s Messenger - New event registered -> %s', SatakuLogger.prototype.stylesheet.messenger],
                'start': ['%s Messenger - Start listening for messages', SatakuLogger.prototype.stylesheet.messenger],
                'notMine': ['%s Messenger - Receive not mine frame', SatakuLogger.prototype.stylesheet.messenger],
                'notHandled': ['%s Messenger - Not handled -> %O', SatakuLogger.prototype.stylesheet.messenger],
            }
        }),
        getSendMsgBasicDataObj: function(subject, messageData) {
            return {
                subject: subject,
                data: messageData,
                satakuId: self.satakuId
            };
        },
        receiveMsg: function (event) {
            var key = event.message ? "message" : "data";
            var message = event[key];

            if (message.satakuId === undefined) {
                _self.debug.log('notHandled', self.name, message);
                return;
            }

            if (message.satakuId == self.satakuId) {
                _self.debug.log('receive', self.name, message.subject, message);
                if (typeof message.data != 'undefined') {
                    if(_self.events[message.subject] !== undefined) {
                        _self.events[message.subject](message.data);
                    } else {
                        _self.debug.warn('undef', self.name, message.subject);
                    }
                } else {
                    _self.events[message.subject]();
                    _self.debug.warn('nullData', self.name, message.subject);
                }
            } else {
                _self.debug.log('notMine', self.name);
            }
        }
    };
    var self = {
        /** Runned device alias
        * @type {string}
        * @name SatakuMessenger#name
        */
        name: null,
        /** Address of a host to communicate with
        * @type {string}
        * @name SatakuMessenger#host
        */
        host: null,
        /** Identifier used to share messages with loader.js
        * @type {number}
        * @name SatakuMessenger#satakuId
        */
        satakuId: null,
        /** Registers new event that messenger listens to
        * @function SatakuMessenger#register
        * @param {string} eventName Name of the event to register
        * @param {function} eventHandler Function to invoke when event triggered
        * @returns {undefined}
        */
        register: function(eventName, eventHandler) {
            if(_self.events[eventName] !== undefined) {
                _self.debug.warn('override', self.name, eventName);
            }
            _self.events[eventName] = eventHandler;
            _self.debug.log('register', self.name, eventName);
        },
        /** Sends message to loader.js
        * @function SatakuMessenger#sendMsg
        * @param {string} subject Name of message subject
        * @param {*} messageData Data that will be sended to loader.js
        * @returns {undefined}
        */
        sendMsg: function (subject, messageData) {
            var data = _self.getSendMsgBasicDataObj(subject, messageData);
            window.parent.postMessage(data, self.host);
            _self.debug.log('sendMsg', self.name, data.subject, data);
        },
    };

    return function(config) {
        self.stkExt({
            host: config.host,
            satakuId: config.satakuId,
            name: config.runModeAlias.toUpperCase(),
        });

        _self.debug.log('start', self.name);
        window.stkListen("message", _self.receiveMsg, false);

        SatakuMessenger = null;
        return self;
    };
})();
