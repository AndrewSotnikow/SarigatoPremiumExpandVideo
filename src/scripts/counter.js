/**
* @file Stores SatakuCounter class
* @name counter.js
* @copyright (c) 2017, Sarigato Sp z o. o. All rights reserved.
* @version 2.0.0
*/

/**
* @class SatakuCounter
* @param {object} config {@link Sataku.config} object
* @param {object} [param] Configuration parameters of counter (any property from prototype)
* @description Creates new counter element on canvas
* @version 1.0.0
*/
var SatakuCounter = (function() {
    return function(config, params) {
        /**
        * @inner
        * @name _that
        * @type {object}
        * @memberof SatakuCounter
        * @property {node} canvas Canvas element
        * @property {CanvasRenderingContext2D} context Canvas element 2D context
        * @property {number} progress Progress of count down
        * @property {number} fontSize Font size
        * @property {number} iterations Number of seconds to the end of count down
        * @property {string} tickerReference Reference for SatakuTicker task
        * @property {(array.<array>)} triangleAnchors Positions of triangle anchors
        * @property {object} time Stores time information
        * @property {(object.<function>)} sketches Contains draw functions
        * @property {(object.<function>)} handlers Contains counter handlers
        * @property {function} setContext Sets properties of target context
        * @property {function} prepareContext Creates canvas, sets it's attributes, gets context and appends to wrapper
        * @property {function} setListeners Binds events to SatakuCounter#area
        * @property {function} update Update handler invoked on mouseenter action
        */
        var _that = {
            canvas: null,
            context: null,
            progress: null,
            fontSize: null,
            iterations: null,
            tickerReference: null,
            triangleAnchors: [
                [null, null],
                [null, null],
                [null, null]
            ],
            time: {
                start: null,
                flow: null,
            },
            sketches: {
                arc: function(param, context) {
                    _that.setContext(param, context);
                    context.beginPath();
                    context.arc(0, 0, param.radius || 100, -0.5*Math.PI, (param.endAngle || 0)*2*Math.PI - 0.5*Math.PI);
                    context[param.strokeOnly === true ? 'stroke' : 'fill']();
                    return _that.sketches;
                },
                triangle: function(param, context) {
                    _that.setContext(param, context);
                    context.beginPath();
                    context.moveTo(_that.triangleAnchors[0][0], _that.triangleAnchors[0][1]);
                    context.lineTo(_that.triangleAnchors[1][0], _that.triangleAnchors[1][1]);
                    context.lineTo(_that.triangleAnchors[2][0], _that.triangleAnchors[2][1]);
                    context.closePath();
                    context.fill();
                    return _that.sketches;
                },
                text: function(param, context) {
                    _that.setContext(param, context);
                    context.fillText(param.text || 3, 0, 0);
                    return _that.sketches;
                }
            },
            handlers: {
                onMouseEnter: function(event) {
                    that.reset();
                    _that.tickerReference = SatakuTicker.push(_that.update);
                },
                onMouseLeave: function(event) { that.reset(); },
            },
            setContext: function(param, context) {
                context = context || _that.context;
                param.stkExt({
                    lineWidth: param.lineWidth || 1,
                    font: param.font || "46px Arial",
                    fillStyle: param.fillStyle || '#fff',
                    textAlign: param.textAlign || 'center',
                    strokeStyle: param.strokeStyle || '#fff',
                    textBaseline: param.textBaseline || 'middle',
                    scale: param.scale === undefined ? [1, 1] : param.scale,
                    translate: param.translate === undefined ? [0.5*that.size, 0.5*that.size] : param.translate,
                });
                context.stkExt({
                    font: param.font,
                    textAlign: param.textAlign,
                    lineWidth: param.lineWidth,
                    fillStyle: param.fillStyle,
                    strokeStyle: param.strokeStyle,
                    textBaseline: param.textBaseline,
                });
                context.setTransform(param.scale[0], 0, 0, param.scale[1], param.translate[0], param.translate[1]);
            },
            prepareContext: function() {
                _that.canvas = document.stkCreate('canvas', {
                    width: that.size,
                    height: that.size
                });
                _that.context = _that.canvas.getContext('2d');
                that.wrapper.appendChild(_that.canvas);
            },
            setListeners: function() {
                that.area.stkListen('mouseenter', _that.handlers.onMouseEnter, false);
                that.area.stkListen('mouseleave', _that.handlers.onMouseLeave, false);
            },
            update: function() {
                _that.time.flow = window.performance.now() - _that.time.start;
                _that.progress = _that.time.flow/that.timeout;
                if(_that.progress > 1) { _that.progress = 1; }
                that.draw();
                if(_that.progress === 1) {
                    that.reset();
                    if(that.onActionHandler && !that.static) { that.onActionHandler(undefined, true, that.id); }
                }
            },
        };

        var that = {
            /** Id
            * @type {number}
            * @name SatakuCounter#id
            */
            id: 1,
            /** Size of a counter
            * @type {number}
            * @name SatakuCounter#size
            */
            size: 100,
            /** Time to wait before counter action invocation
            * @type {number}
            * @name SatakuCounter#timeout
            */
            timeout: 3000,
            /** Font size in percents
            * @type {number}
            * @name SatakuCounter#textSize
            */
            textSize: 0.5,
            /** Event target node
            * @type {node}
            * @name SatakuCounter#area
            */
            area: document,
            /** Size of counter inner triangle in percents
            * @type {number}
            * @name SatakuCounter#triangleSize
            */
            triangleSize: 0.25,
            /** Function to invoke on counter action
            * @type {function}
            * @name SatakuCounter#onActionHandler
            */
            onActionHandler: null,
            /** Fill color of counter text
            * @type {string}
            * @name SatakuCounter#textFillStyle
            */
            textFillStyle: '#fff',
            /** Counter element wrapper
            * @type {node}
            * @name SatakuCounter#wrapper
            */
            wrapper: document.body,
            /** Fill color of counters triangle
            * @type {string}
            * @name SatakuCounter#triangleFillStyle
            */
            triangleFillStyle: '#fff',
            /** Stroke color of counter outer rim
            * @type {string}
            * @name SatakuCounter#outerRimStrokeStyle
            */
            outerRimStrokeStyle: '#fff',
            /** Stroke color of counter static outer rim
            * @type {string}
            * @name SatakuCounter#staticOuterRimStrokeStyle
            */
            staticOuterRimStrokeStyle: '#fff',
            /** Stroke color of counter inner rim
            * @type {string}
            * @name SatakuCounter#innerRimStrokeStyle
            */
            innerRimStrokeStyle: '#fff',
            /** Fill color of counter background layer
            * @type {string}
            * @name SatakuCounter#layerFillStyle
            */
            layerFillStyle: 'rgba(0, 0, 0, 0.5)',
            /** Fill color of static counter background layer
            * @type {string}
            * @name SatakuCounter#staticLayerFillStyle
            */
            staticLayerFillStyle: 'rgba(0, 0, 0, 0.5)',
            /** Line width of counter outer rim
            * @type {number}
            * @name SatakuCounter#outerRimLineWidth
            */
            outerRimLineWidth: 3,
            /** Line width of counter inner rim
            * @type {number}
            * @name SatakuCounter#innerRimLineWidth
            */
            innerRimLineWidth: 1,
            /** Length ratio of inner radius compared to counter size
            * @type {number}
            * @name SatakuCounter#innerRadiusSize
            */
            innerRadiusSize: 0.45,
            /** Resets counter to it's default state
            * @function SatakuCounter#reset
            * @returns {undefined}
            */
            reset: function() {
                _that.progress = null;
                _that.time.start = window.performance.now();
                SatakuTicker.kill(_that.tickerReference);
                that.draw();
            },
            /** Removes listeners bound to counter
            * @function SatakuCounter#kill
            * @returns {undefined}
            */
            kill: function() {
                that.area.stkStopListening('mouseenter', _that.handlers.onMouseEnter, false);
                that.area.stkStopListening('mouseleave', _that.handlers.onMouseLeave, false);
                that.wrapper.remove();
            },
            /** Draws counter on target context
            * @function SatakuCounter#draw
            * @param {CanvasRenderingContext2D} [context] Context to draw counter
            * @returns {undefined}
            */
            draw: function(context) {
                context = context || _that.context;
                context.setTransform(1, 0, 0, 1, 0, 0);
                context.clearRect(0, 0, that.size + 1, that.size + 1);
                if(_that.progress === null) {
                    _that.sketches.arc({
                        radius: 0.45*that.size,
                        fillStyle: that.staticLayerFillStyle,
                        endAngle: 1
                    }, context);
                } else {
                    _that.sketches.arc({
                        fillStyle: that.layerFillStyle,
                        lineWidth: that.outerRimLineWidth,
                        strokeStyle: 'transparent',
                        radius: 0.45*that.size,
                        endAngle: 1
                    }, context);
                }
                _that.sketches.arc({
                    strokeOnly: true,
                    radius: 0.45*that.size,
                    lineWidth: that.outerRimLineWidth,
                    strokeStyle: _that.progress === null ? that.staticOuterRimStrokeStyle : that.outerRimStrokeStyle,
                    endAngle: _that.progress === null ? 1 : (_that.progress*_that.iterations - Math.floor(_that.progress*_that.iterations))
                }, context).arc({
                    strokeOnly: true,
                    lineWidth: that.innerRimLineWidth,
                    strokeStyle: that.innerRimStrokeStyle,
                    radius: that.innerRadiusSize * that.size - that.outerRimLineWidth,
                    endAngle: _that.progress === null ? 0 : _that.progress
                }, context);

                if(_that.progress === null) { _that.sketches.triangle({ fillStyle: that.triangleFillStyle, }, context); }
                else {
                    _that.sketches.text({
                        fillStyle: that.textFillStyle,
                        font: _that.fontSize + 'px Arial',
                        text: Math.ceil(_that.iterations - _that.progress*_that.iterations),
                    }, context);
                }
                context.setTransform(1, 0, 0, 1, 0, 0);
            },
        };

        if(params !== undefined) { that.stkExt(params); }
        _that.stkExt({
            iterations: that.timeout/1000,
            fontSize: Math.round(that.textSize*that.size),
            triangleAnchors: (function() {
                var sideLength = that.triangleSize*that.size,
                height = 0.5*sideLength*Math.sqrt(3);
                return [
                    [-(1/3)*height, -0.5*sideLength],
                    [-(1/3)*height, +0.5*sideLength],
                    [+(2/3)*height, 0]
                ];
            })(),
        });

        if(config.runMode === 2) { return that; }

        _that.prepareContext();
        if(!that.static && config.deviceType === 1 && config.runMode === 1) { _that.setListeners(); }
        that.reset();

        return that;
    };
})();
