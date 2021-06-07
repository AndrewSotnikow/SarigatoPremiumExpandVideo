/**
* @file Stores SatakuTicker namespace
* @name ticker.js
* @copyright (c) 2017, Sarigato Sp z o. o. All rights reserved.
* @version 2.0.0
*/

/**
* @namespace SatakuTicker
* @description Ticker function to handle all requestAnimationFrame tasks
* @version 1.0.0
*/
var SatakuTicker = (function() {
    /**
    * @inner
    * @name _that
    * @type {object}
    * @memberof SatakuTicker
    * @property {boolean} SINGLE_MODE Value for single invocation mode
    * @property {boolean} MULTI_MODE Value for multi invocation mode
    * @property {object} data Stores tasks to fire and raf reference
    * @property {array} data.tasks Stores tasks to fire
    * @property {number} data.rafReference Stores current raf reference
    * @property {function} remove Removes task with given id
    * @property {function} update raf update handler
    */
    var _that = {
        SINGLE_MODE: true,
        MULTI_MODE: false,
        data: {
            tasks: [],
            rafReference: 0,
        },
        isRunning: false,
        remove: function(id) {
            _that.data.tasks.splice(id, 1);
            if (_that.data.tasks.length === 0) {
              that.stop();
            }
        },
        update: function() {
            _that.data.rafReference = stkRAF(_that.update);
            that.time.now = window.performance.now();
            that.time.flow = that.time.now - that.time.start;
            _that.data.tasks.stkIterate(function(entry, key) {
                if(entry[1] === _that.SINGLE_MODE) {
                    entry[0](that.time);
                    _that.remove(key);
                } else if(entry[1] === _that.MULTI_MODE) { entry[0](that.time); }
            });
        },
    };

    var that = {
        /** Stores the time data information
        * @type {object}
        * @name SatakuTicker.time
        * @property {number} start Timestamp of initialization
        * @property {number} flow Time difference from start to now
        * @property {number} now Current timestamp
        */
        time: {
            start: 0,
            flow: 0,
            now: 0
        },
        /** Starts the ticker
        * @function SatakuTicker.start
        * @returns {boolean} true
        */
        start: function() {
            stkCAF(_that.data.rafReference);
            that.time.start = window.performance.now();
            _that.isRunning = true;
            _that.update();
            return true;
        },
        /** Stops the ticker
        * @function SatakuTicker.stop
        * @returns {boolean} true
        */
        stop: function() {
            stkCAF(_that.data.rafReference);
            _that.isRunning = false;
            return true;
        },
        /** Kill the ticker task
        * @function SatakuTicker.kill
        * @param {string} identifier Id of a target task
        * @returns {boolean} true
        */
        kill: function(identifier) {
            _that.data.tasks.stkIterate(function(entry, key) {
                if(entry[2] === identifier) { _that.remove(key); }
            });
            return true;
        },
        /** Pushes new task to the ticker
        * @function SatakuTicker.push
        * @param {function} task_handler Function to invoke on frame update
        * @param {boolean} update_mode If true the task will fire on every frame, if false the task will fire only once
        * @returns {string} Task identifier
        */
        push: function(task_handler, update_mode) {
            if(task_handler === null || task_handler === undefined || task_handler.constructor !== Function) {
                console.error("Check Your task handler!");
                return;
            }
            var identifier = stkGenerateUniqueID(8);
            if (_that.data.tasks.length === 0) {
              that.start();
            }
            _that.data.tasks.push([ task_handler, update_mode !== undefined ? update_mode : false, identifier ]);
            return identifier;
        },
    };

    return that;
})();
