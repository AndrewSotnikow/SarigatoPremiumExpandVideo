/**
* @file Stores SatakuManager class
* @name manager.js
* @copyright (c) 2017, Sarigato Sp z o. o. All rights reserved.
* @version 2.0.0
*/

/**
* @class SatakuManager
* @param {object} config {@link Sataku.config} object
* @param {object} doc {@link Sataku~_that} doc property
* @param {function} handler Function to invoke when event triggered
* @description Sets creation default listeners
* @version 1.0.0
*/

var SatakuManager = (function() {
    /**
    * @inner
    * @name _that
    * @type {object}
    * @memberof SatakuManager
    * @property {node} element Node to bind events
    * @property {function} onAction Handler invoked when action occurs
    * @property {boolean} captureMode Defines listener capture mode
    * @property {string} eventClickType Name of the used event ( click | touchend )
    * @property {boolean} isDisplayMode Defines if running in display mode
    * @property {boolean} isMobileDevice Defines if running on mobile device
    * @property {boolean} preventDefault Defines if handler should be stopped
    * @property {(object.<function>)} handler Stores handlers
    */
    var _that = {
        element: null,
        onAction: null,
        captureMode: null,
        eventClickType: '',
        isDisplayMode: null,
        isMobileDevice: null,
        preventDefault: false,
        handler: {
            click: function(event) {
                if(_that.preventDefault) { return; }
                if(_that.onAction) { _that.onAction(event); }
            },
            touchstart: function(event) { _that.preventDefault = (event.touches || event.targetTouches).length > 1 ? true : false; },
            touchmove: function(event) { _that.preventDefault = true; },
            mouseenter: function(event) { document.body.stkAddClass('active'); },
            mouseleave: function(event) { document.body.stkRemoveClass('active'); },
        },
    };

    var that = {
        /** Removes all listeners
        * @function SatakuManager#kill
        * @returns {undefined}
        */
        kill: function() {
            _that.element.stkStopListening(_that.eventClickType, _that.handler.click, _that.captureMode);
            _that.element.stkStopListening('mouseenter', _that.handler.mouseover, _that.captureMode);
            _that.element.stkStopListening('mouseleave', _that.handler.mouseover, _that.captureMode);
            if(_that.isMobileDevice && _that.isDisplayMode) {
                _that.element.stkStopListening('touchstart', _that.handler.touchstart, _that.captureMode);
                _that.element.stkStopListening('touchmove', _that.handler.touchmove, _that.captureMode);
            }
        },
        /** Sets new action handler
        * @function SatakuManager#newAction
        * @param {function} handler Function to invoke when event triggered
        * @returns {undefined}
        */
        newAction: function(handler) { _that.onAction = handler; },
    };

    return function(config, doc, handler) {
        SatakuManager = null;
        _that.stkExt({
            onAction: handler,
            isDisplayMode: config.place === RUN_MODE_DISPLAY,
            isMobileDevice: config.deviceType === DEVICE_TYPE_MOBILE,
            eventClickType: config.deviceType === DEVICE_TYPE_DESKTOP ? 'click' : 'touchend',
            captureMode: stkBrowserSupportsPassiveEvents ? { passive: true } : false,
            element: config.place === RUN_MODE_DISPLAY ? document : doc.closeExpand,
        });

        window.focus();

        _that.element.stkListen(_that.eventClickType, _that.handler.click, _that.captureMode);
        if(_that.isMobileDevice && _that.isDisplayMode) {
            _that.element.stkListen('touchstart', _that.handler.touchstart, _that.captureMode);
            _that.element.stkListen('touchmove', _that.handler.touchmove, _that.captureMode);
        }

        _that.element.stkListen('mouseenter', _that.handler.mouseenter, _that.captureMode);
        _that.element.stkListen('mouseleave', _that.handler.mouseleave, _that.captureMode);

        return that;
    };
})();
