/**
* @file Dwell tracking for expands
* @name dwell.js
* @copyright (c) 2017, Sarigato Sp z o. o. All rights reserved.
* @version 2.0.0
*/

/**
* @class SatakuDwell
* @param {object} config {@link Sataku.config} object
* @param {object} tracking {@link SatakuTracking} instance
* @description Counts how much time user spends on expand
* @version 1.0.0
*/
var SatakuDwell = (function() {
    var that = {
        /** Stores timestamp of expand launch
        * @type {number}
        * @name SatakuDwell#launchExpandTimestamp
        */
        launchExpandTimestamp: null,
        /** Start dwell counting
        * @function SatakuDwell#initialize
        * @returns {undefined}
        */
        initialize: function() {
            _that.debug.log('init');
            _that.interval = setInterval(_that.dwellLoop, 5000);
        }
    };
    /**
    * @inner
    * @name _that
    * @type {object}
    * @memberof SatakuDwell
    * @property {object} config {@link Sataku.config} object
    * @property {object} tracking {@link SatakuTracking} instance
    * @property {number} interval Reference returned by setInterval function
    * @property {object} debug {@link SatakuLogger} instance
    * @property {function} dwellLoop Tracks dwell pixel
    */
    var _that = {
        config: null,
        tracking: null,
        interval: null,
        debug: new SatakuLogger({
            log: {
                'init': ['{DwellTime} DwellTime Init', SatakuLogger.prototype.stylesheet.tracking],
            },
        }),
        dwellLoop: function() {
            var currentTime = Math.round(Date.now() / 10) / 100;
            var time = Math.round((currentTime - that.launchExpandTimestamp) * 100) / 100;
            time < 300 ? _that.tracking.dwellCount(time) : clearInterval(_that.interval);
        },
    };

    return function(config, tracking) {
        SatakuDwell = null;
        that.launchExpandTimestamp = Math.round(Date.now() / 10) / 100;
        _that.stkExt({
            config: config,
            tracking: tracking
        });
        return that;
    };
})();
