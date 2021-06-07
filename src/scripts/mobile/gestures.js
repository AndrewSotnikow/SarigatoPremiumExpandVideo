/**
* @file Stores Gestures class
* @name gestures.js
* @copyright (c) 2017, Sarigato Sp z o. o. All rights reserved.
* @version 2.0.0
*/

/**
* @class Gestures
* @param {node} container Gestures event target node
* @description Detects user gestures on target container
* @version 1.0.0
*/
function Gestures(container) {
    var that = this;
    if(!container) { that.debug.error('container'); }
    that.stkExt({
        container: container,
        captureMode: stkBrowserSupportsPassiveEvents ? { passive: true } : false,
    }).initialize();
};

Gestures.prototype = {
    /** Stores event handlers
    * @type {object}
    * @name Gestures#handlers
    */
    handlers: {},
    /** Gestures event target node
    * @type {node}
    * @name Gestures#container
    */
    container: null,
    /** Defines listener capture mode
    * @type {object}
    * @name Gestures#captureMode
    */
    captureMode: null,
    /** Function that fires when swiping is in progress
    * @type {function}
    * @name Gestures#trackSwipeHandler
    */
    trackSwipeHandler: null,
    /** Function that fires when pinch-in/pinch-out is in progress
    * @type {function}
    * @name Gestures#trackSpreadHandler
    */
    trackSpreadHandler: null,
    /** Function that fires when swipe ends
    * @type {function}
    * @name Gestures#catchSwipeHandler
    */
    catchSwipeHandler: null,
    /** Function that fires when pinch-in/pinch-out ends
    * @type {function}
    * @name Gestures#catchSpreadHandler
    */
    catchSpreadHandler: null,
    /** Stores last user interactions
    * @type {array}
    * @name Gestures#touches
    */
    touches: [],
    /** Stores swipe data values
    * @type {array}
    * @name Gestures#swipe
    */
    swipe: [null, null],
    /** Stores pinch-in/pinch-out data values
    * @type {object}
    * @name Gestures#spread
    */
    spread: {
        sx: null,
        sy: null,
        cx: null,
        cy: null
    },
    /** {@link SatakuLogger} instance
    * @type {object}
    * @name Gestures#debug
    */
    debug: new SatakuLogger({
        error: {
            'container': ['{Gestures} Check your container', SatakuLogger.prototype.stylesheet.error],
        }
    }),
    /** Creates Gesture#handlers object
    * @function Gestures#buildHandlers
    * @returns {undefined}
    */
    buildHandlers: function() {
        var that = this;
        that.handlers = (function() {
            /**
            * @inner
            * @name self
            * @type {object}
            * @memberof Gestures
            * @property {object} touches Stores current touch data
            * @property {number} maxTouches Maximum length of touches
            * @property {number} touchIndex Index of current touch
            * @property {boolean} isMultitouch Flag that defines if multitouch mode
            * @property {boolean} preventTouch Flag that prevents execution of a function body
            * @property {object} handlers Object stores handlers
            * @property {function} handlers.touchstart Handler for touchstart event
            * @property {function} handlers.touchmove Handler for touchmove event
            * @property {function} handlers.touchend Handler for touchend event
            * @property {function} handlers.touchcancel Handler for touchcancel event
            */
            var self = {
                touches: null,
                maxTouches: 2,
                touchIndex: null,
                isMultitouch: null,
                preventTouch: false,
                handlers: {
                    touchstart: function(event) {
                        self.touches = event.touches || event.targetTouches;
                        self.touchIndex = self.touches.length - 1;

                        if(self.touchIndex === 0) { self.preventTouch = false; }
                        if(self.preventTouch) { return; }

                        if(self.touchIndex > 0) { self.isMultitouch = true; }

                        if(self.touchIndex > self.maxTouches - 1) { return; }

                        that.touches[self.touchIndex] = {
                            sx: self.touches[self.touchIndex].clientX,
                            sy: self.touches[self.touchIndex].clientY
                        };

                        if(self.touchIndex === self.maxTouches - 1) {
                            that.spread.stkExt({
                                sx: Math.abs((that.touches[self.touchIndex - 1].cx || that.touches[self.touchIndex - 1].sx) - that.touches[self.touchIndex].sx),
                                sy: Math.abs((that.touches[self.touchIndex - 1].cy || that.touches[self.touchIndex - 1].sy) - that.touches[self.touchIndex].sy)
                            });
                        }
                    },
                    touchmove: function(event) {
                        if(self.preventTouch) { return; }

                        self.touches = event.touches || event.targetTouches;
                        self.touchIndex = self.touches.length - 1;

                        if(self.touchIndex > self.maxTouches - 1) { return; }

                        for(var i = 0; i <= self.touchIndex; i++) {
                            if(!that.touches[i]) { continue; }
                            that.touches[i].stkExt({
                                cx: self.touches[i].clientX,
                                cy: self.touches[i].clientY
                            });
                        }

                        if(self.touchIndex === 0 && that.trackSwipeHandler && !self.isMultitouch) {
                            if(that.touches[self.touchIndex]) {
                                that.swipe = [
                                    that.touches[self.touchIndex].cx - that.touches[self.touchIndex].sx,
                                    that.touches[self.touchIndex].cy - that.touches[self.touchIndex].sy
                                ];
                                that.trackSwipeHandler(that.swipe);
                            }
                        }

                        if(self.touchIndex === 1 && that.trackSpreadHandler) {
                            that.spread.stkExt({
                                cx: Math.abs(that.touches[self.touchIndex - 1].cx - that.touches[self.touchIndex].cx) - that.spread.sx,
                                cy: Math.abs(that.touches[self.touchIndex - 1].cy - that.touches[self.touchIndex].cy) - that.spread.sy,
                            });
                            that.trackSpreadHandler([that.spread.cx, that.spread.cy]);
                        }
                    },
                    touchend: function(event) {
                        if(self.preventTouch) { return; }

                        self.touches = event.touches || event.targetTouches;
                        self.touchIndex = self.touches.length - 1;

                        if(self.touchIndex > self.maxTouches - 1) { return; }

                        if(self.touchIndex === -1) {
                            if(self.isMultitouch) {
                                self.isMultitouch = false;
                                return;
                            }
                            if(that.catchSwipeHandler) {
                                that.catchSwipeHandler(that.swipe);
                            }
                        } else if(self.touchIndex === 0) {
                            self.isMultitouch = true;
                            if(that.catchSpreadHandler) {
                                that.catchSpreadHandler([that.spread.cx, that.spread.cy]);
                            }
                        }
                    },
                    touchcancel: function(event) {
                        self.preventTouch = true;
                    },
                },
            };

            return self.handlers;
        })();
    },
    /** Binds this.handlers events to this.container
    * @function Gestures#setListeners
    * @returns {undefined}
    */
    setListeners: function() {
        var that = this;
        for(var i in that.handlers) {
            that.container.stkListen(i, that.handlers[i], that.captureMode);
        }
    },
    /** Removes binded events from target container
    * @function Gestures#kill
    * @returns {undefined}
    */
    kill: function() {
        var that = this;
        for(var i in that.handlers) {
            that.container.stkStopListening(i, that.handlers[i], that.captureMode);
        }
    },
    /** Initializes Gestures instance
    * @function Gestures#initialize
    * @returns {undefined}
    */
    initialize: function() {
        var that = this;
        that.buildHandlers();
        that.setListeners();
    },
};
