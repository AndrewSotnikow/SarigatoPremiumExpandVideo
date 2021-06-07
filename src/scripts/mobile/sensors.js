/** Stores Sensors/Gyroscope/Accelerometer classes
* @file
* @name sensors.js
* @copyright (c) 2017, Sarigato Sp z o. o. All rights reserved.
* @version 2.0.0
*/

/**
* @class Sensors
* @param {function} callback Function to invoke when sensor is available
* @param {function} fallback Function to invoke when sensor is disabled
* @description Test if sensor is available and if true run it
* @version 1.0.0
*/
function Sensors(callback, fallback) {
    var self = this.stkExt({
        callback: callback,
        fallback: fallback
    });
    return self;
}

Sensors.prototype = {
    /** Function to invoke when sensor is available
    * @type {function}
    * @name Sensors#callback
    */
    callback: null,
    /** Function to invoke when sensor is disabled
    * @type {function}
    * @name Sensors#fallback
    */
    fallback: null,
    /** Defines if sensor is active
    * @type {boolean}
    * @name Sensors#active
    */
    active: false,
    /** Name of the event to start listening to
    * @type {string}
    * @name Sensors#eventName
    */
    eventName: null,
    /** Maximum time of performed tests
    * @type {number}
    * @name Sensors#checkoutTimeout
    */
    checkoutTimeout: 1000,
    /** Stores last registered event values
    * @type {array}
    * @name Sensors#data
    */
    data: [null, null, null],
    /** Function to invoke when event is triggered
    * @function Sensors#onUpdate
    * @returns {undefined}
    */
    onUpdate: function(evt) {
        var self = this;
        self.data = self.eventName === 'devicemotion' ? [evt.x, evt.y, evt.z] : [evt.alpha, evt.beta, evt.gamma];
    },
    /** Performs tests to check if target sensor is available
    * @function Sensors#run
    * @returns {undefined}
    */
    run: function() {
        var self = this;

        if(window[self.eventName === 'devicemotion' ? 'DeviceMotionEvent' : 'DeviceOrientationEvent'] === undefined) {
            if(self.fallback) { self.fallback(); }
            return;
        }

        (function() {
            /**
            * @inner
            * @name that
            * @type {object}
            * @memberof Sensors
            * @property {array} data Stores last N sensor event data
            * @property {number} timeout Max duration of performed tests
            * @property {function} kill Kills the sensor listener
            * @property {function} validate Validate sensor data
            * @property {function} handler Function that invokes on sensor update
            */
            var that = {
                data: [],
                timeout: null,
                kill: function() {
                    clearTimeout(that.timeout);
                    window.stkStopListening(self.eventName, that.handler, true);
                    if(self.fallback) { self.fallback(); }
                },
                validate: function() {
                    var sum = [0, 0, 0];
                    var index = that.data.length - 1;

                    if(that.data.length === 0) { return false; }

                    that.data.stkIterate(function(val, key) {
                        val.stkIterate(function(_val, _key) {
                            sum[_key] += _val;
                        });
                    });

                    sum.stkIterate(function(val, key) {
                        sum[key] /= that.data.length;
                    });

                    for(var i = 0; i < that.data[0].length; i++) {
                        if(that.data[index][i] === null) { return false; }
                        if(sum[i] === that.data[index][i]) { return false; }
                        if(Math.ceil(that.data[index][i]) === that.data[index][i]) { return false; }
                        if(Math.floor(that.data[index][i]) === that.data[index][i]) { return false; }
                    }

                    return true;
                },
                handler: function(event) {
                    if(self.eventName === 'devicemotion' && self.type === undefined) {
                        self.type = event.accelerationIncludingGravity ? 'accelerationIncludingGravity' : event.acceleration ? 'acceleration' : -1;
                        if(self.type === -1) {
                            that.kill();
                            return;
                        }
                    }

                    if(self.active) {
                        var evt = self.eventName === 'devicemotion' ? event[self.type] : event;
                        if(self.onUpdate) { self.onUpdate(evt); }
                        if(self.callback) { self.callback(self.data); }
                        return;
                    }

                    that.data.push(
                        self.eventName === 'devicemotion' ? [
                            isNaN(event[self.type].x) ? null : event[self.type].x,
                            isNaN(event[self.type].y) ? null : event[self.type].y,
                            isNaN(event[self.type].z) ? null : event[self.type].z
                        ] : [
                            isNaN(event.alpha) ? null : event.alpha,
                            isNaN(event.beta) ? null : event.beta,
                            isNaN(event.gamma) ? null : event.gamma
                        ]
                    );

                    if(that.validate()) {
                        clearTimeout(that.timeout);
                        self.active = true;
                    }
                },
            };

            window.stkListen(self.eventName, that.handler, true);
            that.timeout = setTimeout(that.kill, self.checkoutTimeout);
        })();

        return self;
    },
};
/**
* @class Gyroscope
* @extends Sensors
* @param {function} callback Function to invoke when gyroscope is available
* @param {function} fallback Function to invoke when gyroscope is disabled
* @param {object} [limitParameters] Parameters to limit gyroscope angles
* @param {number} limitParameters.maxValue Maximum value returned by gyroscope update handler
* @param {number} limitParameters.maxDeviation Maximum gyroscope angle deviation
* @param {number} [limitParameters.ease] Easing to apply
* @description Runs gyroscope if available
* @version 1.0.0
*/
function Gyroscope(callback, fallback, limitParameters) {
    var self = this.stkExt({
        callback: callback,
        fallback: fallback
    });

    if(limitParameters) {
        self.stkExt(limitParameters);
        self.isLimitedMode = true;
    }

    return self.run();
}

Gyroscope.prototype = new Sensors;
Gyroscope.prototype.stkExt({
    /** Maximum value returned by gyroscope update handler
    * @type {number}
    * @name Gyroscope#maxValue
    */
    maxValue: null,
    /** Maximum gyroscope angle deviation
    * @type {number}
    * @name Gyroscope#maxDeviation
    */
    maxDeviation: null,
    /** Defines if gyroscope is working on limeted angles
    * @type {boolean}
    * @name Gyroscope#isLimitedMode
    */
    isLimitedMode: false,
    /** Name of the event to start listening to
    * @type {string}
    * @name Gyroscope#eventName
    */
    eventName: 'deviceorientation',
    /** Default easing for gyroscope values
    * @type {array}
    * @name Gyroscope#ease
    */
    ease: STK_EASE.linear,
    /** Normalizes original angle values from gyroscope
    * @function Gyroscope#getNormalizedValues
    * @param {number} angleValue Value of target angle
    * @param {number} maxDeviation Maximum gyroscope angle deviation
    * @returns {number} Normalized angle value
    */
    getNormalizedValues: function(angleValue, maxDeviation) {
        return angleValue.stkGetSign()*(Math.min(Math.abs(angleValue), maxDeviation)/maxDeviation);
    },
    /** Gets eased value of target angle
    * @function Gyroscope#getEasedValues
    * @param {number} normalizedValue Normalized value of target angle
    * @param {array} ease Easing to apply
    * @returns {number} Eased value of angle
    */
    getEasedValues: function(normalizedValue, ease) {
        if(normalizedValue > 1) { return 1; }
        if(normalizedValue < -1) { return -1; }
        return normalizedValue.stkGetSign()*Math.stkBezierSpline(Math.abs(normalizedValue), ease || this.ease);
    },
    /** Combination of getNormalizedValues & getEasedValues methods
    * @function Gyroscope#getValues
    * @param {number} angleValue Value of target angle
    * @param {number} maxDeviation Maximum gyroscope angle deviation
    * @param {number} maxValue Maximum value returned by gyroscope update handler
    * @param {array} ease Easing to apply
    * @returns {number} Normalized and eased value of angle
    */
    getValues: function(angleValue, maxDeviation, maxValue, ease) {
        var self = this;
        return maxValue*self.getEasedValues(self.getNormalizedValues(angleValue, maxDeviation), ease);
    },
    /** Event update handler
    * @function Gyroscope#onUpdate
    * @param {object} evt Event data
    * @returns {undefined}
    */
    onUpdate: (function() {
        /**
        * @inner
        * @name that
        * @type {object}
        * @memberof Gyroscope
        * @property {array} records Stores last N damped data
        * @property {array} history Stores last N double damped data
        * @property {number} maxRecords Maximum length of that.records
        * @property {number} maxHistory Maximum length of that.history
        * @property {boolean} flipMode Defines if device flips values on gamma angle
        * @property {string} orientation Defines orientation of device
        * @property {boolean} firstUpdate Defines if first update is done
        * @property {boolean} isUpsidedown Defines if device is handled upsidedown
        * @property {number} originOrientationY Stores device orientation on start
        * @property {boolean} shouldSwitchAngles Defines if angles should be switched when value crosses 90deg
        * @property {array} origin Stores device angles on start
        * @property {array} cached Stores current angles for calc purposes
        * @property {array} damped Stores current damped angles
        * @property {array} dampedOnceMore Stores current double damped angles
        * @property {array} rawData Stores current raw angles values
        * @property {array} normalized Stores current normalized angles values
        * @property {array} calibrated Stores current calibrated angles values
        */
        var that = {
            records: [],
            history: [],
            maxRecords: 10,
            maxHistory: 10,
            flipMode: null,
            orientation: null,
            firstUpdate: true,
            isUpsidedown: false,
            originOrientationY: null,

            shouldSwitchAngles: true,

            origin: [null, null, null],
            cached: [null, null, null],
            damped: [null, null, null],
            dampedOnceMore: [null, null, null],
            rawData: [null, null, null],
            normalized: [null, null, null],
            calibrated: [null, null, null],
        };
        /**
        * @inner
        * @name _that
        * @type {object}
        * @memberof Gyroscope
        * @property {function} checkIfDeviceUpsidedown Check if device is handled upsidedown
        * @property {function} normalizeAngle Normalizes target angle value
        * @property {function} setOriginDeviation Reads current angle values and stores it as origin position
        * @property {function} validateFlipedGamma Checks if device is switching angles when crossing 90deg values
        * @property {function} getCalibratedData Gets calibrated data of target angle value
        * @property {function} getDampedData Gets damped data of target angle value
        */
        var _that = {
            checkIfDeviceUpsidedown: function() {
                if(that.rawData[1] < -90 || that.rawData[1] > 90) { return true; }
                if(that.rawData[2] < -90 || that.rawData[2] > 90) { return true; }
                return false;
            },
            normalizeAngle: function(value) {
                var result = Math.abs(value) > 90 ? value.stkGetSign()*180 - value : value;
                if(that.isUpsidedown) { result = result.stkGetSign()*180 - result; }

                result = Math.abs(result) > 90
                    ? result.stkGetSign()*180 - Math.sin(Math.stkToRadians(result))*90
                    : Math.sin(Math.stkToRadians(result))*90;

                return result;
            },
            setOriginDeviation: function() {
                that.origin = [
                    that.normalized[0],
                    that.normalized[1],
                    that.normalized[2]
                ];
                that.originOrientationY = that.isUpsidedown;
            },
            validateFlipedGamma: function() {
                that.cached.stkIterate(function(val, key) {
                    if(val === null) {
                        that.cached[key] = that.normalized[key];
                    }
                });

                if(that.originOrientationY !== that.isUpsidedown) {
                    if(that.flipMode === null) {
                        that.flipMode = false;
                        if(that.cached[2].stkGetSign() !== that.normalized[2].stkGetSign()) {
                            that.flipMode = true;
                        }
                    }
                    if(that.flipMode) { that.normalized[2] *= -1; }
                }

                that.cached.stkIterate(function(val, key) {
                    that.cached[key] = that.normalized[key];
                });
            },
            getCalibratedData: function() {
                var calibrated = [
                    that.normalized[0] - that.origin[0],
                    that.normalized[1] - that.origin[1],
                    that.normalized[2] - that.origin[2]
                ];

                calibrated.stkIterate(function(val, key) {
                    if(Math.abs(val) > 180) {
                        calibrated[key] = that.origin[key].stkGetSign()*360 + calibrated[key];
                    }

                    if(key === 2 && that.shouldSwitchAngles && that.originOrientationY !== that.isUpsidedown) {
                        calibrated[key] = calibrated[key].stkGetSign()*180 - calibrated[key];
                        calibrated[key] *= -1;
                    }
                });

                return calibrated;
            },
            getDampedData: function(storageArray, dataToPush, maxRecords) {
                var sum = [0, 0, 0];

                storageArray.push(dataToPush);

                while(storageArray.length > maxRecords) {
                    storageArray.shift();
                }

                storageArray.stkIterate(function(record, key) {
                    record.stkIterate(function(val, index) {
                        sum[index] += val;
                    });
                });

                sum.stkIterate(function(val, key) {
                    sum[key] /= storageArray.length;
                });

                return sum;
            },
        };

        return function(evt) {
            var self = this;

            self.data = [evt.alpha, evt.beta, evt.gamma];
            that.rawData = self.data;
            that.isUpsidedown = _that.checkIfDeviceUpsidedown();
            that.normalized = [
                _that.normalizeAngle(that.rawData[0]),
                _that.normalizeAngle(that.rawData[1]),
                _that.normalizeAngle(that.rawData[2])
            ];
            _that.validateFlipedGamma();
            if(that.firstUpdate) {
                that.firstUpdate = false;
                that.orientation = window.deviceorientation;
                _that.setOriginDeviation();
            }
            if(that.orientation !== window.deviceorientation) {
                that.orientation = window.deviceorientation;
                _that.setOriginDeviation();
            }
            that.calibrated = _that.getCalibratedData();
            that.damped = _that.getDampedData(that.records, that.calibrated, that.maxRecords);
            that.dampedOnceMore = _that.getDampedData(that.history, that.damped, that.maxRecords);

            if(self.isLimitedMode) {
                that.dampedOnceMore.stkIterate(function(val, key) {
                    that.dampedOnceMore[key] = self.getValues(val, self.maxDeviation, self.maxValue, self.ease);
                });
            }

            self.data = that.orientation === 'portrait'
                ? [that.dampedOnceMore[0], that.dampedOnceMore[1], that.dampedOnceMore[2]]
                : [that.dampedOnceMore[0], that.dampedOnceMore[2], that.dampedOnceMore[1]];
        };
    })(),
});
/** Creates new Gyroscope and run it with default setup based on {@link Sataku.config} creationType property
* @function Gyroscope.runDefaultGyroscopeSetup
* @param {number} creationType creationType property from {@link Sataku.config}
* @param {object} [config] Configuration data of created Gyroscope
* @param {number} config.maxValue Maximum value returned by gyroscope update handler
* @param {number} config.maxDeviation Maximum gyroscope angle deviation
* @param {number} [config.ease] Easing to apply
* @param {array} [nodes] Nodes that will react to gyroscope updates
* @returns {object} Gyroscope new instance
*/
Gyroscope.runDefaultGyroscopeSetup = function(creationType, config, nodes) {
    var that = {
        step: null,
        gyroscope: null,
        activeNode: null,
        currentNode: null,
        isGyroscopeReady: false,
        creationType: creationType,
        wrapper: document.stkQuery('#display'),
        gestureIcon: document.stkQuery('#mobileGestureIcon'),
        nodes: nodes || document.stkQuery('#display-content img, canvas, video', true),
        isPortrait: creationType === CREATION_TYPE_MOBILE_ONEPAGE_PORTRAIT ? true : false,
        config: config || {
            maxValue: 100,
            maxDeviation: 30,
            ease: STK_EASE.softInOut,
        },
        calculateIndexOfNode: function(val) {
            for(var i = 0, idx = 0, pos = -that.config.maxValue; i < that.nodes.length; i++, pos += that.step) {
                if(val >= pos) {
                    idx = i;
                }
            }
            return idx;
        },
        transform: function(val) {
            val = val > that.config.maxValue ? that.config.maxValue : val;
            if(that.creationType === CREATION_TYPE_MOBILE_MULTI_RECTANGLE) {
                that.currentNode = that.calculateIndexOfNode(val);
                if(that.currentNode !== that.activeNode) {
                    that.nodes[that.activeNode].style.display = 'none';
                    that.nodes[that.currentNode].style.display = 'block';
                    that.activeNode = that.currentNode;
                }
                return;
            }

            that.nodes.stkIterate(function(node, key) {
                node.stkTransform('translate' + (that.isPortrait ? 'Y' : 'X') + '(' + (val < 0 ? 0 : -val) + '%)');
            });
        },
        showGestureIcon: function() {
            if(that.isGyroscopeReady) { return; }
            that.isGyroscopeReady = true;

            that.gestureIcon.src = "https://4stk.com/sataku/szablon/images/mobile/" + ( that.gyroscope.active ? "gyro" : ( "swipe_" + (that.isPortrait ? "v" : "h") ) ) + ".png?version=0.0";
            that.gestureIcon.style.display = "block";
            that.gestureIcon.stkAddClass('animation' + (that.gyroscope.active ? "G" : (that.isPortrait ? "Y" : "X")));
            if(that.gyroscope.active) {
                setTimeout(function() {
                    that.killGestureIcon();
                }, 5000);
            }
        },
        killGestureIcon: function() {
            that.gestureIcon.remove();
        },
        callback: function(event) {
            that.showGestureIcon();
            that.transform(that.isPortrait ? event[1] : event[2]);
        },
        fallback: function(event) {
            var wasDisplayTouched = false;
            that.showGestureIcon();
            new Gestures(that.wrapper).trackSwipeHandler = function(event) {
                if(!wasDisplayTouched) {
                    wasDisplayTouched = true;
                    that.killGestureIcon();
                }
                that.transform(that.isPortrait ? event[1] : event[0]);
            };
        },
    };

    that.stkExt({
        step: (2*that.config.maxValue)/that.nodes.length,
        activeNode: Math.floor(that.nodes.length/2),
        gyroscope: new Gyroscope(that.callback, that.fallback, that.config),
    });

    return that.gyroscope;
};
/**
* @class Accelerometer
* @extends Sensors
* @param {function} callback Function to invoke when gyroscope is available
* @param {function} fallback Function to invoke when gyroscope is disabled
* @description Runs accelerometer if available
* @version 1.0.0
*/
function Accelerometer(callback, fallback) {
    var self = this.stkExt({
        callback: callback,
        fallback: fallback
    });
    return self.run();
}

Accelerometer.prototype = new Sensors;
Accelerometer.prototype.stkExt({
    /** Type of event acceleration (accelerationIncludingGravity || acceleration)
    * @type {string}
    * @name Accelerometer#type
    */
    type: undefined,
    /** Minimum value to interpret measures as shake action
    * @type {number}
    * @name Accelerometer#captureShakePower
    */
    captureShakePower: 9,
    /** Name of the event to start listening to
    * @type {string}
    * @name Accelerometer#eventName
    */
    eventName: 'devicemotion',
    /**
    * @function Accelerometer#captureShake
    * @param {function} callback Function to invoke when shake captured
    * @param {boolean} isSingleInvocation Flag that defines if callback should be invoked once or every time shake occurs
    * @returns {undefined}
    */
    captureShake: function(callback, isSingleInvocation) {
        var self = this;
        (function() {
            var that = {
                diff: [null, null, null],
                power: self.captureShakePower,
                previousCallback: self.callback,
                deltaMessure: [null, null, null],
                currentMessure: [null, null, null],
                lastMeasure: [undefined, undefined, undefined],
                handler: function(evt) {
                    if(that.lastMeasure.indexOf(undefined) !== -1) {
                        that.lastMeasure = [evt[0], evt[1], evt[2]];
                    }

                    that.currentMessure = [evt[0], evt[1], evt[2]];
                    that.deltaMessure.stkIterate(function(val, key) {
                        that.deltaMessure[key] = that.currentMessure[key] - that.lastMeasure[key];
                    });

                    if(Math.abs(that.deltaMessure[0]) >= that.power || Math.abs(that.deltaMessure[2]) >= that.power) {
                        if(isSingleInvocation) { self.callback = that.previousCallback; }
                        if(callback) { callback(); }
                    }

                    that.lastMeasure = that.currentMessure;
                }
            };
            self.callback = that.handler;
        })();
    },
});
