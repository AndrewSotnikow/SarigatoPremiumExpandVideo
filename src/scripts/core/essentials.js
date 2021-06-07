/** File contains essential variables such as: constants, functions, extensions, overrides, polyfills etc.
* @file
* @name essentials.js
* @copyright (c) 2017, Sarigato Sp z o. o. All rights reserved.
* @version 2.0.0
*/

/* -------------------------------------------------------------------------- */

/** @constant {object} window.STK_EASE Stores ease values to use with {@link Math.stkBezierSpline} */
var STK_EASE = {
    linear: [{"x":[0,0.5,1],"y":[0,0.5,1]}],
    out: [{"x":[0,0.15,0.8,1],"y":[0,1,1.5,1]}],
    circOut: [{"x":[0,0,0.8,1],"y":[0,1.5,1.5,1]}],
    inOut: [{"x":[0,0.25,0.6,0.75,1],"y":[0,0,0.25,1.3,1]}],
    softInOut: [{"x":[0.00, 0.50, 1.00, 1.00], "y":[0.00, 0.00, 1.50, 1.00]}],
};

/** @constant {string} window.PIXEL_BASE_URL URL for pixels tracking */
var PIXEL_BASE_URL = "https://4stk.com/pxl/";

/** @constant {boolean} window.PIXELS_LOCAL_TESTING_MODE If set to true pixels will be tracked when working on localhost */
var PIXELS_LOCAL_TESTING_MODE = false;

/** @constant {number} window.CREATION_TYPE_VIDEO_DISPLAY_STANDARD Identifier of a Desktop Video Display Standard creation type, first click on all display area starts SatakuPlayer stage */
var CREATION_TYPE_VIDEO_DISPLAY_STANDARD = 1;

/** @constant {number} window.CREATION_TYPE_VIDEO_DISPLAY_STANDARD_REDIRECT Identifier of a Desktop Video Display Standard creation type, first click on video-wrapper area starts SatakuPlayer stage, rest of display space redirects */
var CREATION_TYPE_VIDEO_DISPLAY_STANDARD_REDIRECT = 2;

/** @constant {number} window.CREATION_TYPE_EXPAND_VIDEO Identifier of a Desktop Expand Video creation type */
var CREATION_TYPE_EXPAND_VIDEO = 3;

/** @constant {number} window.CREATION_TYPE_VIDEO_DISPLAY_LANDING_PAGE Identifier of a Desktop Video Display Landing Page creation type */
var CREATION_TYPE_VIDEO_DISPLAY_LANDING_PAGE = 4;

/** @constant {number} window.CREATION_TYPE_EXPAND_PREMIUM Identifier of a Desktop Expand Premium creation type */
var CREATION_TYPE_EXPAND_PREMIUM = 5;

/** @constant {number} window.CREATION_TYPE_RICH_EXPAND Identifier of a Desktop Rich Expand creation type */
var CREATION_TYPE_RICH_EXPAND = 6;

/** @constant {number} window.CREATION_TYPE_RICH_DISPLAY Identifier of a Desktop Rich Display creation type */
var CREATION_TYPE_RICH_DISPLAY = 7;

/** @constant {number} window.CREATION_TYPE_MOBILE_EXPAND_VIDEO Identifier of a Mobile Expand Video creation type */
var CREATION_TYPE_MOBILE_EXPAND_VIDEO = 8;

/** @constant {number} window.CREATION_TYPE_MOBILE_EXPAND_RICH Identifier of a Mobile Rich Expand creation type */
var CREATION_TYPE_MOBILE_EXPAND_RICH = 9;

/** @constant {number} window.CREATION_TYPE_MOBILE_EXPAND_PREMIUM Identifier of a Mobile Expand Premium creation type */
var CREATION_TYPE_MOBILE_EXPAND_PREMIUM = 10;

/** @constant {number} window.CREATION_TYPE_MOBILE_ONEPAGE_PORTRAIT Identifier of a Mobile Onepage Portrait creation type */
var CREATION_TYPE_MOBILE_ONEPAGE_PORTRAIT = 11;

/** @constant {number} window.CREATION_TYPE_MOBILE_ONEPAGE_LANDSCAPE Identifier of a Mobile Onepage Landscape creation type */
var CREATION_TYPE_MOBILE_ONEPAGE_LANDSCAPE = 12;

/** @constant {number} window.CREATION_TYPE_MOBILE_MULTI_RECTANGLE Identifier of a Mobile Multirectangle creation type */
var CREATION_TYPE_MOBILE_MULTI_RECTANGLE = 13;

/** @constant {number} window.CREATION_TYPE_MOBILE_VIDEO Identifier of a Mobile Video creation type */
var CREATION_TYPE_MOBILE_VIDEO = 14;

/** @constant {number} window.CREATION_TYPE_MOBILE_VIDEO_INTERACTIVE Identifier of a Mobile Video Interactive creation type */
var CREATION_TYPE_MOBILE_VIDEO_INTERACTIVE = 15;

/** @constant {number} window.CREATION_TYPE_SARIGATO_IFRAME Identifier of a display with iframe content creation type */
var CREATION_TYPE_SARIGATO_IFRAME = 16;

/** @constant {number} window.CREATION_TYPE_MOBILE_SARIGATO_IFRAME Identifier of a mobile display with iframe content creation type */
var CREATION_TYPE_MOBILE_SARIGATO_IFRAME = 17;

/** @constant {number} window.CREATION_TYPE_MOBILE_DISPLAY_COUNTER Identifier of a Mobile Display creation type */
var CREATION_TYPE_MOBILE_DISPLAY_COUNTER = 18;

/** @constant {number} window.CREATION_TYPE_MOBILE_REAL_VIEW Identifier of a Real View Video Mobile (RVVM) creation type */
var CREATION_TYPE_MOBILE_REAL_VIEW = 19;

/** @constant {number} window.CREATION_TYPE_REAL_VIEW Identifier of a Real View Video Desktop (RVVD) creation type */
var CREATION_TYPE_REAL_VIEW = 20;

/** @constant {number} window.CREATION_TYPE_MOBILE_FULL_REAL_VIEW Identifier of a Full View Video Mobile (FVVM) creation type */
var CREATION_TYPE_MOBILE_FULL_REAL_VIEW = 21;

/** @constant {number} window.CREATION_TYPE_FULL_REAL_VIEW Identifier of a Full View Video Desktop (FVVD) creation type */
var CREATION_TYPE_FULL_REAL_VIEW = 22;

/** @constant {number} window.CREATION_TYPE_MOBILE_SCROLL Identifier of a Scroll Mobile creation type, sets image background on the parent page */
var CREATION_TYPE_MOBILE_SCROLL = 23;

/** @constant {number} window.CREATION_TYPE_SCROLL Identifier of a Scroll creation type, sets image background on the parent page */
var CREATION_TYPE_SCROLL = 24;

/** @constant {number} window.CREATION_TYPE_MOBILE_SCROLL Identifier of a Motion Mobile creation type */
var CREATION_TYPE_MOBILE_MOTION = 25;

/** @constant {number} window.CREATION_TYPE_MOTION Identifier of a Motion creation type, */
var CREATION_TYPE_MOTION = 26;

/** @constant {number} window.CREATION_TYPE_MOBILE_RICH_DISPLAY Identifier of a Mobile Rich Display creation type */
var CREATION_TYPE_MOBILE_RICH_DISPLAY = 27;

/** @constant {number} window.CREATION_TYPE_MOBILE_VIDEO_LOOP Identifier of a Mobile Video Loop creation type, looped video handled by Player without tracking */
var CREATION_TYPE_MOBILE_VIDEO_LOOP = 28;

/** @constant {number} window.CREATION_TYPE_VIDEO_LOOP Identifier of a Video Loop creation type, looped video handled by Player without tracking */
var CREATION_TYPE_VIDEO_LOOP = 29;

/** @constant {object} window.CREATION_TYPE_ALIASES Stores the names of all creation types */
var CREATION_TYPE_ALIASES = {};
CREATION_TYPE_ALIASES[CREATION_TYPE_EXPAND_VIDEO] = 'Desktop Expand Video';
CREATION_TYPE_ALIASES[CREATION_TYPE_EXPAND_PREMIUM] = 'Desktop Expand Premium';
CREATION_TYPE_ALIASES[CREATION_TYPE_RICH_EXPAND] = 'Desktop Rich Expand';

CREATION_TYPE_ALIASES[CREATION_TYPE_RICH_DISPLAY] = 'Desktop Rich Display';
CREATION_TYPE_ALIASES[CREATION_TYPE_VIDEO_DISPLAY_STANDARD] = 'Desktop Video Display Standard';
CREATION_TYPE_ALIASES[CREATION_TYPE_VIDEO_DISPLAY_STANDARD_REDIRECT] = 'Desktop Video Display Standard Redirect';
CREATION_TYPE_ALIASES[CREATION_TYPE_VIDEO_DISPLAY_LANDING_PAGE] = 'Desktop Video Display Landing Page';
CREATION_TYPE_ALIASES[CREATION_TYPE_SARIGATO_IFRAME] = 'Desktop Sarigato Iframe';
CREATION_TYPE_ALIASES[CREATION_TYPE_REAL_VIEW] = 'Real View Video Desktop';
CREATION_TYPE_ALIASES[CREATION_TYPE_FULL_REAL_VIEW] = 'Full View Video Desktop';
CREATION_TYPE_ALIASES[CREATION_TYPE_SCROLL] = 'Scroll Desktop';
CREATION_TYPE_ALIASES[CREATION_TYPE_MOTION] = 'Motion Desktop';
CREATION_TYPE_ALIASES[CREATION_TYPE_VIDEO_LOOP] = 'Video Loop Desktop';

CREATION_TYPE_ALIASES[CREATION_TYPE_MOBILE_EXPAND_VIDEO] = 'Mobile Expand Video';
CREATION_TYPE_ALIASES[CREATION_TYPE_MOBILE_EXPAND_RICH] = 'Mobile Expand Rich';
CREATION_TYPE_ALIASES[CREATION_TYPE_MOBILE_EXPAND_PREMIUM] = 'Mobile Expand Premium';
CREATION_TYPE_ALIASES[CREATION_TYPE_MOBILE_ONEPAGE_PORTRAIT] = 'Mobile Onepage Portrait';
CREATION_TYPE_ALIASES[CREATION_TYPE_MOBILE_ONEPAGE_LANDSCAPE] = 'Mobile Onepage Landscape';
CREATION_TYPE_ALIASES[CREATION_TYPE_MOBILE_MULTI_RECTANGLE] = 'Mobile Multi Rectangle';
CREATION_TYPE_ALIASES[CREATION_TYPE_MOBILE_VIDEO] = 'Mobile Video';
CREATION_TYPE_ALIASES[CREATION_TYPE_MOBILE_VIDEO_INTERACTIVE] = 'Mobile Video Interactive';
CREATION_TYPE_ALIASES[CREATION_TYPE_MOBILE_SARIGATO_IFRAME] = 'Mobile Sarigato Iframe';
CREATION_TYPE_ALIASES[CREATION_TYPE_MOBILE_DISPLAY_COUNTER] = 'Mobile Display Counter';
CREATION_TYPE_ALIASES[CREATION_TYPE_MOBILE_REAL_VIEW] = 'Real View Video Mobile';
CREATION_TYPE_ALIASES[CREATION_TYPE_MOBILE_FULL_REAL_VIEW] = 'Full View Video Mobile';
CREATION_TYPE_ALIASES[CREATION_TYPE_MOBILE_SCROLL] = 'Scroll Mobile';
CREATION_TYPE_ALIASES[CREATION_TYPE_MOBILE_MOTION] = 'Motion Mobile';
CREATION_TYPE_ALIASES[CREATION_TYPE_MOBILE_RICH_DISPLAY] = 'Mobile Rich Display';
CREATION_TYPE_ALIASES[CREATION_TYPE_MOBILE_VIDEO_LOOP] = 'Mobile Video Loop';

/** @constant {array} window.EXPANDABLE_CREATION_TYPES Stores the expandable creation types */

var EXPANDABLE_CREATION_TYPES = [
    CREATION_TYPE_RICH_EXPAND,
    CREATION_TYPE_EXPAND_VIDEO,
    CREATION_TYPE_EXPAND_PREMIUM,
    CREATION_TYPE_MOBILE_EXPAND_VIDEO,
    CREATION_TYPE_MOBILE_EXPAND_RICH,
    CREATION_TYPE_MOBILE_EXPAND_PREMIUM,
];

/** @constant {array} window.STK_CREATION_TYPES_WITHOUT_COUNTER Stores creation types not using Counter */
var STK_CREATION_TYPES_WITHOUT_COUNTER = [
    CREATION_TYPE_REAL_VIEW,
    CREATION_TYPE_MOBILE_REAL_VIEW,
    CREATION_TYPE_FULL_REAL_VIEW,
    CREATION_TYPE_MOBILE_FULL_REAL_VIEW,
    CREATION_TYPE_SCROLL,
    CREATION_TYPE_MOBILE_SCROLL,
    CREATION_TYPE_MOTION,
    CREATION_TYPE_MOBILE_MOTION,
    CREATION_TYPE_SARIGATO_IFRAME,
    CREATION_TYPE_MOBILE_SARIGATO_IFRAME,
    CREATION_TYPE_RICH_DISPLAY,
    CREATION_TYPE_MOBILE_RICH_DISPLAY,
    CREATION_TYPE_MOBILE_VIDEO_LOOP,
    CREATION_TYPE_VIDEO_LOOP
];

/** @constant {object} window.PRODUCT_TYPES_BY_DEVICE Stores the creation types grouped by the device type */
var PRODUCT_TYPES_BY_DEVICE = {
    'desktop': [
        CREATION_TYPE_VIDEO_DISPLAY_LANDING_PAGE,
        CREATION_TYPE_VIDEO_DISPLAY_STANDARD,
        CREATION_TYPE_VIDEO_DISPLAY_STANDARD_REDIRECT,
        CREATION_TYPE_RICH_DISPLAY,
        CREATION_TYPE_EXPAND_VIDEO,
        CREATION_TYPE_EXPAND_PREMIUM,
        CREATION_TYPE_RICH_EXPAND,
        CREATION_TYPE_SARIGATO_IFRAME,
        CREATION_TYPE_REAL_VIEW,
        CREATION_TYPE_FULL_REAL_VIEW,
        CREATION_TYPE_SCROLL,
        CREATION_TYPE_MOTION,
        CREATION_TYPE_VIDEO_LOOP
    ],
    'mobile': [
        CREATION_TYPE_MOBILE_RICH_DISPLAY,
        CREATION_TYPE_MOBILE_VIDEO,
        CREATION_TYPE_MOBILE_VIDEO_INTERACTIVE,
        CREATION_TYPE_MOBILE_ONEPAGE_PORTRAIT,
        CREATION_TYPE_MOBILE_ONEPAGE_LANDSCAPE,
        CREATION_TYPE_MOBILE_MULTI_RECTANGLE,
        CREATION_TYPE_MOBILE_EXPAND_VIDEO,
        CREATION_TYPE_MOBILE_EXPAND_RICH,
        CREATION_TYPE_MOBILE_EXPAND_PREMIUM,
        CREATION_TYPE_MOBILE_SARIGATO_IFRAME,
        CREATION_TYPE_MOBILE_DISPLAY_COUNTER,
        CREATION_TYPE_MOBILE_REAL_VIEW,
        CREATION_TYPE_MOBILE_FULL_REAL_VIEW,
        CREATION_TYPE_MOBILE_SCROLL,
        CREATION_TYPE_MOBILE_MOTION,
        CREATION_TYPE_MOBILE_VIDEO_LOOP
    ]
};

/** @constant {number} window.DEVICE_TYPE_DESKTOP Identifier of a desktop device */
var DEVICE_TYPE_DESKTOP = 1;

/** @constant {number} window.DEVICE_TYPE_MOBILE Identifier of a mobile device */
var DEVICE_TYPE_MOBILE = 2;

/** @constant {number} window.RUN_MODE_DISPLAY Identifier of a display run mode */
var RUN_MODE_DISPLAY = 1;

/** @constant {number} window.RUN_MODE_EXPAND Identifier of a expand run mode */
var RUN_MODE_EXPAND = 2;

/** @constant {object} window.RUN_MODE_ALIASES Stores the names of all run modes */
var RUN_MODE_ALIASES = {};
RUN_MODE_ALIASES[RUN_MODE_DISPLAY] = 'Display';
RUN_MODE_ALIASES[RUN_MODE_EXPAND] = 'Expand';

/** @constant {number} window.MODE_PRODUCTION Identifier of a production mode */
var MODE_PRODUCTION = 1;

/** @constant {number} window.MODE_DEVELOPER Identifier of a developer mode */
var MODE_DEVELOPER = 2;

/** @constant {number} window.MODE_PREVIEW Identifier of a preview mode */
var MODE_PREVIEW = 3;

/** @constant {number} window.MODE_ARCHIVE Identifier of a archive mode */
var MODE_ARCHIVE = 4;

/** @constant {array} window.GLOBAL_COMPOSITE_OPERATIONS Array with CanvasRenderingContext2D.globalCompositeOperation options */
var GLOBAL_COMPOSITE_OPERATIONS = [
    'source-over',       //0
    'source-in',         //1
    'source-out',        //2
    'source-atop',       //3
    'destination-over',  //4
    'destination-in',    //5
    'destination-out',   //6
    'destination-atop',  //7
    'lighter',           //8
    'copy',              //9
    'xor',               //10
    'multiply',          //11
    'screen',            //12
    'overlay',           //13
    'darken',            //14
    'lighten',           //15
    'color-dodge',       //16
    'color-burn',        //17
    'hard-light',        //18
    'soft-light',        //19
    'difference',        //20
    'exclusion',         //21
    'hue',               //22
    'saturation',        //23
    'color',             //24
    'luminosity'         //25
];

/** @constant {array} window.JS_PREFIXES Array with JavaScript cross-browser prefixes */
var JS_PREFIXES = [ 'webkit', 'ms', 'MS', 'moz', 'o' ];

/** @constant {JS_ANIMATION_TYPES} window.JS_ANIMATION_TYPES Array with prefixed animation element property */
var JS_ANIMATION_TYPES = {
    "animation": "animationend",
    "OAnimation": "oAnimationEnd",
    "MozAnimation": "animationend",
    "WebkitAnimation": "webkitAnimationEnd"
};

/** @constant {JS_TRANSITIONS_TYPES} window.JS_TRANSITIONS_TYPES Array with prefixed transition element property */
var JS_TRANSITIONS_TYPES = {
   'WebkitTransition': 'webkitTransitionEnd',
   'MozTransition': 'transitionend',
   'OTransition': 'oTransitionEnd otransitionend',
   'transition': 'transitionend',
};

/* -------------------------------------------------------------------------- */

/**
* @namespace document
* @description JavaScript root node
* @see <a href="https://developer.mozilla.org/en/docs/Web/API/Document" target="_blank">MDN</a>
*/

/** jQuery $(document).ready() equivalent
* @function document.stkReady
* @param {function} handler Function to invoke on callback
* @returns {object} Returns this
* @example
* document.stkReady(function () { console.log('Document loaded'); });
*/
Object.defineProperty(document, 'stkReady', {
    enumerable: false,
    value: function (handler) {
        var self = this;
        if(self.readyState != 'loading') { handler(); }
        else { self.stkListen('DOMContentLoaded', handler); }
        return self;
    }
});
/** Creates new Node and sets it's attributes
* @function document.stkCreate
* @param {string} name Name of element tag
* @param {object} [attr] Object with attributes to apply
* @returns {object} Returns created node
* @example
* // Creates <div>
* document.stkCreate('div');
* // Creates <div id="foo">
* document.stkCreate('div', { id: 'foo' });
*/
Object.defineProperty(document, 'stkCreate', {
    enumerable: false,
    value: function (name, attr) {
        var self = this;
        return document.createElement(name).stkAttr(attr);
    }
});
/** Sends POST | GET XMLHttpRequest with custom data
* @function document.stkRequest
* @param {string} url URL of the request
* @param {string} method Request method POST | GET
* @param {object} components Data to send
* @param {function} callback Function to invoke on response
* @returns {object} Returns this
* @example
* document.stkRequest('log.php', 'POST', { foo: 'bar' }, function (response) {
*   console.log(response);
* })
*/
Object.defineProperty(document, 'stkRequest', {
    enumerable: false,
    value: function (url, method, components, callback) {
        var self = this,
            data = {
                componentsString: '',
                httpRequest: null,
            };

        if (method !== 'POST' && method !== 'GET') {
            console.error('Invalid method!');
            return self;
        }

        data.httpRequest = new XMLHttpRequest();
        data.httpRequest.onreadystatechange = function () {
            if (data.httpRequest.readyState === 4) {
                if (data.httpRequest.status === 200) { callback(data.httpRequest.responseText); }
            }
        };
        for (var i in components) { data.componentsString += i + '=' + components[i] + '&'; }
        data.componentsString += 'void=true';
        if (method === 'POST') {
            data.httpRequest.open(method, url, true);
            data.httpRequest.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        } else { data.httpRequest.open(method, encodeURI(url + '?' + data.componentsString)); }
        data.httpRequest.send( (method === 'POST' ? data.componentsString : null) );
        return self;
    }
});
/** Creates new XMLHttpRequest
* @function document.stkLoadHtmlFile
* @param {string} requestedFile URL of requested file
* @param {function} onLoad Handler to fire on success
* @param {function} onError Handler to fire on error
* @returns {object} Returns request
* @example
* document.stkLoadHtmlFile('index.html', function(event) {}, function(event) {});
*/
Object.defineProperty(document, 'stkLoadHtmlFile', {
    enumerable: false,
    value: function(requestedFile, onLoad, onError) {
        var request = new XMLHttpRequest();
        request.onreadystatechange = function (event, response) {
            if (request.readyState === 4) {
                if (request.status === 200) {
                    if (onLoad) { onLoad(event, response); }
                } else {
                    if (onError) { onError(event, response); }
                }
            }
        };
        request.open("GET", requestedFile);
        request.send();
        return request;
    },
});

/* -------------------------------------------------------------------------- */

/**
* @class Element
* @description JavaScript Element
* @see <a href="https://developer.mozilla.org/en-US/docs/Web/API/Element" target="_blank">MDN</a>
*/

/** Binds event 'stkOnTransitionEnd' to target element
* @function Element#stkOnTransitionEnd
* @param {function} handler Function to invoke when transition ends
* @param {boolean} [once=false] If set to true listener will self-destruct on callback
* @returns {object} Returns this
* @example
* document.body.stkOnTransitionEnd(function () { console.log('Transition ended'); });
* // Now each time body node ends transition, console will output 'Transition ended'
*/
Object.defineProperty(Element.prototype, 'stkOnTransitionEnd', {
    enumerable: false,
    value: function (handler, once) {
        var self = this, eventName, i, _handler;
        for (i in JS_TRANSITIONS_TYPES) {
            if (document.body.style[i] !== undefined) {
                eventName = JS_TRANSITIONS_TYPES[i];
                break;
            }
        }
        _handler = function (event) {
            if (event.target === self) {
                if (once) { self.stkStopListening(eventName, _handler); }
                handler();
            }
        };
        self.stkListen(eventName, _handler);
        return self;
    }
});
/** Binds event 'stkOnAnimationEnd' to target element
* @function Element#stkOnAnimationEnd
* @param {function} handler Function to invoke when animation ends
* @param {boolean} [once=false] If set to true listener will self-destruct on callback
* @returns {object} Returns this
* @example
* document.body.stkOnAnimationEnd(function () { console.log('Animation ended'); });
* // Now each time body node ends animation, console will output 'Animation ended'
*/
Object.defineProperty(Element.prototype, 'stkOnAnimationEnd', {
    enumerable: false,
    value: function (handler, once) {
        var self = this, eventName, i, _handler;
        for (i in JS_ANIMATION_TYPES) {
            if (document.body.style[i] !== undefined) {
                eventName = JS_ANIMATION_TYPES[i];
                break;
            }
        }
        _handler = function (event) {
            if (event.target === self) {
                if (once) { self.stkStopListening(eventName, _handler); }
                handler();
            }
        };
        self.stkListen(eventName, _handler);
        return self;
    },
});
/** jQuery $(document.body).css({}); equivalent
* @function Element#stkStyleElement
* @param {object} properties Object with properties to override
* @returns {object} Returns this
* @example
* document.body.stkStyleElement({ width: '100%' });
*/
Object.defineProperty(Element.prototype, 'stkStyleElement', {
    enumerable: false,
    value: function (properties) {
        var self = this, i, j, prefixedValue;
        for (i in properties) {
            if (self.style[i] !== undefined) { self.style[i] = properties[i]; continue; }
            for (j = 0; j < JS_PREFIXES.length; j++) {
                prefixedValue = String(JS_PREFIXES[j]) + String(i[0]).toUpperCase() + String(i).slice(1);
                if (self.style[prefixedValue] !== undefined) { self.style[prefixedValue] = properties[i]; break; }
            }
        }
        return self;
    }
});
/** Sets new value for element transform property
* @function Element#stkTransform
* @param {string} value String representing value of property
* @returns {object} Returns this
* @example
* document.body.stkTransform('translate(-50%, -50%)');
*/
Object.defineProperty(Element.prototype, 'stkTransform', {
    enumerable: false,
    value: function (value) {
        var self = this;
        self.stkStyleElement({ 'transform': value });
        return self;
    }
});
/** Sets new value for element transform property
* @function Element#stkTransition
* @param {string} value String representing value of property
* @returns {object} Returns this
* @example
* document.body.stkTransform('translate(-50%, -50%)');
*/
Object.defineProperty(Element.prototype, 'stkTransition', {
    enumerable: false,
    value: function (value) {
        var self = this,
            property = value.split(' ')[0];
        if (property == 'transform') {
            self.style['WebkitTransition'] = '-webkit-'+value;
            self.style['MozTransition'] = '-moz-'+value;
            self.style['msTransition'] = '-ms-'+value;
            self.style['OTransition'] = '-o-'+value;
            self.style['transition'] = value;
        } else { self.stkStyleElement({ 'transition': value }); }
        return self;
    }
});
/** Sets new attributes to target element
* @function Element#stkAttr
* @param {(string|object)} attrName Name of the attribute or object with multiple attributes
* @param {string} value Value of attribute if attrName type is string
* @returns {object} Returns this
* @example
* document.body.stkAttr('foo', 'bar');
* document.body.stkAttr({'foo': 'bar'});
*/
Object.defineProperty(Element.prototype, 'stkAttr', {
    enumerable: false,
    value: function (attrName, value) {
        var self = this;
        if (attrName === undefined) { return self; }
        if (!value && attrName.constructor !== Object) {
            return self.getAttribute(attrName);
        } else {
            if (attrName.constructor === Object) {
                for (var i in attrName) { self.setAttribute(i, attrName[i]); }
            } else { self.setAttribute(attrName, value); }
        }
        return self;
    }
});
/** Appends new element to target node
* @function Element#stkAppend
* @param {object} element Instance of Element
* @returns {object} Returns this
* @example
* var element = document.stkCreate('div');
* document.body.stkAppend(element);
*/
Object.defineProperty(Element.prototype, 'stkAppend', {
    enumerable: false,
    value: function (element) {
        var self = this;
        self.appendChild(element);
        return self;
    }
});
/** Prepends new element before target node
* @function Element#stkPrepend
* @param {object} element Instance of Element
* @returns {object} Returns this
* @example
* var element = document.stkCreate('div');
* document.body.stkPrepend(element);
*/
Object.defineProperty(Element.prototype, 'stkPrepend', {
    enumerable: false,
    value: function (element) {
        var self = this;
        self.insertBefore(element, self.firstChild);
        return self;
    }
});
/** Changes value of innerHTML element property
* @function Element#stkHtml
* @param {string} value New value of property
* @returns {object} Returns this
* @example
* document.body.stkHtml('Hello world');
*/
Object.defineProperty(Element.prototype, 'stkHtml', {
    enumerable: false,
    value: function ( value ) {
        var self = this;
        self.innerHTML = value;
        return self;
    }
});
/** Returns index of target element in parent node
* @function Element#stkIndexInParent
* @returns {number} Returns index of element or -1 if not found
* @example
* document.body.stkIndexInParent();
* // returns 1
*/
Object.defineProperty(Element.prototype, 'stkIndexInParent', {
    enumerable: false,
    value: function () {
        var self = this,
            num = 0,
            children = self.parentNode.childNodes;

       for (var i = 0; i < children.length; i++) {
            if (children[i] == self) { return num; }
            if (children[i].nodeType == 1) { ++num; }
       }
       return -1;
    }
});
/** Adds class to target element
* @function Element#stkAddClass
* @returns {undefined}
* @example
* document.body.stkAddClass('fullsize');
*/
Object.defineProperty(Element.prototype, 'stkAddClass', {
    enumerable: false,
    value: function (className) {
        if('classList' in this) {
            this.classList.add(className);
        } else {
            if(String(this.className) === '[object SVGAnimatedString]'){
                if(String(this.className.baseVal).indexOf(className) === -1){
                    this.className.baseVal += (this.className.baseVal.length ? " " : "") + className;
                }
            }else if(String(this.className).indexOf(className) === -1){
                this.className += ' ' + className;
            }
        }
    }
});
/** Removes class from target element
* @function Element#stkRemoveClass
* @returns {undefined}
* @example
* document.body.stkRemoveClass('fullsize');
*/
Object.defineProperty(Element.prototype, 'stkRemoveClass', {
    enumerable: false,
    value: function (className) {
        if('classList' in this) {
            this.classList.remove(className);
        } else {
            if(String(this.className).indexOf(className) !== -1) {
                this.className = this.className.stkReplaceAll(className, '');
            }
        }
    }
});
/** Removes node from DOM, IE11 polyfill
* @function Element#remove
* @returns {undefined}
*/
if(!('remove' in Element.prototype)) {
    Object.defineProperty(Element.prototype, 'remove', {
        enumerable: false,
        value: function () {
            if(this.parentNode) {
                this.parentNode.removeChild(this);
            }
        }
    });
}

/* -------------------------------------------------------------------------- */

/**
* @class Object
* @description JavaScript Object
* @see <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object" target="_blank">MDN</a>
*/

/** document.querySelector/document.querySelectorAll equivalent
* @function Object#stkQuery
* @param {string} query Selector
* @param {boolean} [shouldSelectAll=false] Depending on value will use querySelector | querySelectorAll
* @returns {(object|array.<object>)} Returns the queried node or nodeList
* @example
* document.stkQuery('body')
* // Returns document.body
* document.stkQuery('div', true)
* // Returns nodeList with all div's in document
*/
Object.defineProperty(Object.prototype, 'stkQuery', {
    enumerable: false,
    value: function (query, shouldSelectAll) {
        var self = this;
        return shouldSelectAll ? self.querySelectorAll(query) : self.querySelector(query);
    }
});
/** Extending properties of target Object instance
* @function Object#stkExt
* @param {...object} arguments Object/s that will extend target
* @returns {object} Returns extended target
* @example
* window.stkExt({ foo: 'bar' });
* // Extend instance of Object with { foo: 'bar' }
* var x = {}.stkExt({ foo: 'bar' });
* // Now window.foo and x.foo has value 'bar'
*/
Object.defineProperty(Object.prototype, 'stkExt', {
    enumerable: false,
    value: function () {
        var self = this, a, i;
        for(a in arguments) { for(i in arguments[a]) { self[i] = arguments[a][i]; } }
        return self;
    }
});
/** Deep extention of target Object instance
* @function Object#stkDeepext
* @param {...object} arguments Object/s that will extend target
* @returns {object} Returns extended target
* @example
* window.stkDeepext({ foo: 'bar' });
* // Extend instance of Object with { foo: 'bar' }
* var x = {}.stkDeepext({ foo: 'bar' });
* // Now window.foo and x.foo has value 'bar'
*/
Object.defineProperty(Object.prototype, 'stkDeepext', {
    enumerable: false,
    value: function () {
        var self = this;
        for(var a in arguments) {
            for(var i in arguments[a]) {
                if(arguments[a][i] !== null && arguments[a][i] !== undefined && (arguments[a][i].constructor == Object || arguments[a][i].constructor == Array)) {
                    if(self[i] === undefined) {
                        if(arguments[a][i].constructor == Object) { self[i] = new Object; }
                        if(arguments[a][i].constructor == Array) { self[i] = new Array; }
                    }
                    self[i].stkDeepext(arguments[a][i]);
                    continue;
                }
                self[i] = arguments[a][i];
            }
        }
        return self;
    }
});
/** Clones the target Object instance
* @function Object#stkClone
* @returns {object} Returns cloned instance
* @example
* var x = { foo: 'bar' };
* var y = x;
* var isEqual = x === y;
* // returns true
* y = x.stkClone();
* isEqual = x === y;
* // returns false
*/
Object.defineProperty(Object.prototype, 'stkClone', {
    enumerable: false,
    value: function () { return new Object().stkExt(this); }
});
/** Iterates over Array | Object instance. On every iteration two arguments of unknown type are passed to handler.
* @function Object#stkIterate
* @param {function} handler Handler function
* @returns {object} Returns this
* @example
* [1, 2, 3].stkIterate(function (val, key) { console.log(val); });
* // Outputs 1 2 3
* {a: 1, b: 2, c: 3}.stkIterate(function (val, key) { console.log(val); });
* // Outputs 1 2 3
*/
Object.defineProperty(Object.prototype, 'stkIterate', {
    enumerable: false,
    value: function (handler) {
        var self = this;
        if (self.constructor === Array || self.constructor === NodeList) {
            for (var i = 0; i < self.length; i++) { handler(self[i], i); }
        } else if (self.constructor === Object) {
            for (var i in self) { handler(self[i], i); }
        }
        return self;
    }
});
/** Adds listener of given type to target node
* @function Object#stkListen
* @param {string} eventName Name of the event
* @param {function} handler Function to invoke when event triggered
* @param {string} [opt=false] An options object that specifies characteristics about the event listener
* @see <a href="https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener" target="_blank">MDN</a>
* @returns {object} Returns this
* @example
* document.body.stkListen('click', function () { console.log('Body clicked'); });
*/
Object.defineProperty(Object.prototype, 'stkListen', {
    enumerable: false,
    value: function (eventName, handler, opt) {
       var self = this;
       if (self.addEventListener) { self.addEventListener(eventName, handler, opt || false); }
       else if (self.attachEvent) { self.attachEvent("on" + eventName, handler); }
       else { self["on" + eventName] = handler; }
       return self;
    }
});
/** Removes listener of given type from target node
* @function Object#stkStopListening
* @param {string} eventName Name of the event
* @param {function} handler Function reference to remove
* @param {string} [opt=false] An options object that specifies characteristics about the event listener
* @see <a href="https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/removeEventListener" target="_blank">MDN</a>
* @returns {object} Returns this
* @example
* var handler = function () { console.log('Click triggered'); };
* document.body.stkListen('click', handler);
* document.body.stkStopListening('click', handler);
*/
Object.defineProperty(Object.prototype, 'stkStopListening', {
    enumerable: false,
    value: function (eventName, handler, opt) {
       var self = this;
       if (self.removeEventListener) { self.removeEventListener(eventName, handler, opt || false); }
       else if (self.detachEvent) { self.detachEvent("on" + eventName, handler); }
       else { self["on" + eventName] = null; }
       return self;
    }
});
/** Gets width of target element
* @function Object#stkGetWidth
* @returns {number} Returns width of target element
* @example
* window.stkGetWidth();
* document.body.stkGetWidth();
*/
Object.defineProperty(Object.prototype, 'stkGetWidth', {
    enumerable: false,
    value: function () { return (this.innerWidth || this.clientWidth); }
});
/** Gets height of target element
* @function Object#stkGetHeight
* @returns {number} Returns height of target element
* @example
* window.stkGetHeight();
* document.body.stkGetHeight();
*/
Object.defineProperty(Object.prototype, 'stkGetHeight', {
    enumerable: false,
    value: function () { return (this.innerHeight || this.clientHeight); }
});
/** Gets width and height of target element
* @function Object#stkGetDims
* @returns {object.<string, number>} Returns object with width and height properties of target element
* @example
* window.stkGetDims();
* document.body.stkGetDims();
* // Both returns object { width: number, height: number }
*/
Object.defineProperty(Object.prototype, 'stkGetDims', {
    enumerable: false,
    value: function () {
        var self = this;
        return {
            width: self.stkGetWidth(),
            height: self.stkGetHeight()
        };
    }
});
/** Checks if target element has portrait aspect ratio
* @function Object#stkIsPortrait
* @returns {boolean} Returns true is target element has portrait aspect ratio
* @example
* window.stkIsPortrait();
* document.body.stkIsPortrait();
*/
Object.defineProperty(Object.prototype, 'stkIsPortrait', {
    enumerable: false,
    value: function () {
        return (this.innerHeight || this.clientHeight) > (this.innerWidth || this.clientWidth) ? true : false;
    }
});

/* -------------------------------------------------------------------------- */

/**
* @class Number
* @description JavaScript Number
* @see <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number" target="_blank">MDN</a>
*/

/** Converts Number instance target to given time unit type
* @function Number#stkConvertTimestampTo
* @param {string} mode Unit type ( year | quarter | month | day | hour | minute | second )
* @returns {(number|object)} Returns new time unit type value or this if error
* @example
* Date.now().stkConvertTimestampTo('year');
*/
Object.defineProperty(Number.prototype, 'stkConvertTimestampTo', {
    enumerable: false,
    value: function (mode) {
        var self = this,
            time = {
                year: self/(1000*60*60*24*356),
                quarter: self/((1000*60*60*24*356)/4),
                month: self/((1000*60*60*24*356)/12),
                day: self/(1000*60*60*24),
                hour: self/(1000*60*60),
                minute: self/(1000*60),
                second: self/(1000),
            };
        if(time[mode] !== undefined) { return time[mode]; }
        else { console.error('Check convert mode!'); return self; }
    }
});
/** Gets sign of a target number
* @function Number.stkGetSign
* @returns {number} Returns -1 if (value < 0) or 1 if (value >= 0)
* @example
* var foo = -10;
* var bar = 20;
* foo.stkGetSign()
* // Returns -1
* bar.stkGetSign()
* // Returns 1
*/
Object.defineProperty(Number.prototype, 'stkGetSign', {
    enumerable: false,
    value: function () {
        var self = this;
        return self < 0 ? -1 : 1;
    }
});

/* -------------------------------------------------------------------------- */

/**
* @interface CanvasRenderingContext2D
* @description JavaScript CanvasRenderingContext2D Interface
* @see <a href="https://developer.mozilla.org/en/docs/Web/API/CanvasRenderingContext2D" target="_blank">MDN</a>
*/

/** Sets properties of CanvasRenderingContext2D Interface
* @function CanvasRenderingContext2D#stkSet
* @param {object} param
* @param {array.<number>} center Transform origin coordinates in two dimensional space [x, y]
* @returns {object} Returns this
* @example
* // Rotates context @ (x = 960, y = 600)
* var context = document.stkCreate('canvas').getContext('2d');
* context.stkSet({ rotation: Math.PI }, [960, 600]);
*/
CanvasRenderingContext2D.prototype.stkSet = function (param, center) {
    var self = this;
    self.setTransform(param.scaleX, 0, 0, param.scaleY, center[0], center[1]);
    self.rotate(param.rotation);
    self.globalAlpha = param.alpha;
    self.globalCompositeOperation = GLOBAL_COMPOSITE_OPERATIONS[param.gco];
    self.shadowColor = 'rgba('+Math.round(param.shadowColorR)+','+Math.round(param.shadowColorG)+','+Math.round(param.shadowColorB)+','+param.shadowColorA+')';
    self.shadowBlur = Math.round(param.shadowBlur);
    self.shadowOffsetX = Math.round(param.shadowOffsetX);
    self.shadowOffsetY = Math.round(param.shadowOffsetY);
    return self;
}
/** Resets properties of CanvasRenderingContext2D Interface to it's default values
* @function CanvasRenderingContext2D#stkReset
* @returns {object} Returns this
* @example
* var context = document.stkCreate('canvas').getContext('2d');
* context.stkSet({ rotation: Math.PI }, [960, 600]);
* // [...]
* context.stkReset();
*/
CanvasRenderingContext2D.prototype.stkReset = function () {
    var self = this;
    self.globalCompositeOperation = GLOBAL_COMPOSITE_OPERATIONS[0];
    self.shadowColor = '#000';
    self.shadowOffsetX = 0;
    self.shadowOffsetY = 0;
    self.shadowBlur = 0;
    self.globalAlpha = 1;
    self.setTransform(1, 0, 0, 1, 0, 0);
    return self;
}

/* -------------------------------------------------------------------------- */

/**
* @class String
* @description JavaScript String
* @see <a href="https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/String" target="_blank">MDN</a>
*/

/** Cuts chars from target string if it's length is greater than given limit value
* @function String#stkShortenTheString
* @param {number} maxChars Maximum number of chars in target string
* @returns {string} Returns the changed string with added suspension points or unchanged target string
* @example
* var str = 'Sarigato';
* str.stkShortenTheString(4) // Returns 'Sari...'
*/
Object.defineProperty(String.prototype, 'stkShortenTheString', {
    enumerable: false,
    value: function (maxChars) {
        var self = this;
        if (self.length > maxChars) {
            for (var i = 0, outputString = ''; i < maxChars; i++) { outputString += self[i]; }
            outputString += '...';
            return outputString;
        }
        return self;
    }
});
/** Capitalizes first char in the string
* @function String.stkFirstLetterToUpperCase
* @param {string} inputString String to change
* @returns {string} Returns the changed string
* @example
* String.stkFirstLetterToUpperCase('sarigato');
* // Returns 'Sarigato'
*/
Object.defineProperty(String.prototype, 'stkFirstLetterToUpperCase', {
    enumerable: false,
    value: function (inputString) {
        var self = this;
        var outputString = '';
        for (var i in inputString) {
            if (i == 0) { outputString += inputString[i].toUpperCase(); }
            else { outputString += inputString[i].toLowerCase(); }
        }
        return outputString;
    }
});
/** Replaces substring with given replacement string
* @function String.stkReplaceAll
* @param {string} search String to change
* @param {string} replacement String replacement
* @returns {string} Replaced string
* @example
* var str = 'sarigato sataku sarigato';
* str.stkReplaceAll('sarigato', 'sataku');
* // Now str is equal to "sataku sataku sataku"
*/
String.prototype.stkReplaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

/* -------------------------------------------------------------------------- */

/**
* @namespace Math
* @description JavaScript Math Object
* @see <a href="https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math" target="_blank">MDN</a>
*/

/** Gets random integer from given range
* @function Math.stkRandomInt
* @param {number} min Minimum value
* @param {number} max Maximum value
* @returns {number} Returns random integer from given range
* @example
* Math.stkRandomInt(0, 10);
* // Will output integer from range 0 - 10
*/
Math.stkRandomInt = function (min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; };
/** Converts degrees to radians
* @function Math.stkToRadians
* @param {number} deg Value in degrees to convert
* @returns {number} Returns converted value
* @example
* Math.stkToRadians(180);
* // Returns Math.PI
*/
Math.stkToRadians = function (deg) { return deg*(Math.PI/180) };
/** Converts radians to degrees
* @function Math.stkToDegrees
* @param {number} rad Value in radians to convert
* @returns {number} Returns converted value
* @example
* Math.stkToDegrees(Math.PI);
* // Returns 180
*/
Math.stkToDegrees = function (rad) { return rad*(180/Math.PI) };
/** Gets the factorial of given number
* @function Math.stkGetFactorial
* @param {number} n Integer value
* @returns {number} Returns the factorial of given number
* @example
* Math.stkGetFactorial(2);
* // Returns 2
*/
Math.stkGetFactorial = function (n) {
    for (var i = 1, factorial = 1; i < n; i++) { factorial *= i; }
    return factorial;
}
/** Gets binominal coefficient of given numbers
* @function Math.stkGetBinominalCoefficient
* @param {number} n Integer value
* @param {number} k Integer value
* @returns {number} Returns the factorial of given numbers
* @example
* Math.stkGetBinominalCoefficient(4, 2);
* // Returns 6
*/
Math.stkGetBinominalCoefficient = function (n, k) { return Math.stkGetFactorial(n)/(Math.stkGetFactorial(k)*Math.stkGetFactorial(n - k)); };
/** Gets value of easing curve at current timestamp, which is float from range [0, 1]
* @function Math.stkBezierSpline
* @param {number} time Float from range [0, 1]
* @param {array.<object>} [userdata] Array of objects with control points, if not passed linear control points will be applied
* @returns {number} Returns float from range [0, 1]
* @see <a href="http://sataku.com/SatakuLibrary/components/Tools/Bezier_Splines/" target="_blank">BezierSpline Interface</a>
* @example
* var animationProgress = 0.1;
* Math.stkBezierSpline(animationProgress, [{ x: [0.0, 0.5, 1.0], y: [0.0, 0.6, 1.0] }]);
* // Returns 0.11422157287597656
* @example
* // {@link http://sataku.com/SatakuLibrary/components/Tools/Bezier_Splines/|BezierSpline Interface}
* // If you want to use "stkBezierSpline Interface" data, enter console and type
* JSON.stringify(bezierCurves.data)
* // then use result as your control points
*/
Math.stkBezierSpline = (function () {
    var that = {
        current: null,
        default: [{"x":[0,1],"y":[0,1]}],
        findCurrentSet: function (t) {
            var index = 0;
            for(var i = 0; i < that.current.length; i++) { if(t >= i*(1/that.current.length)) { index = i; } }
            return index;
        },
        searchForCurrentSet: function (t, active) {
            for(var n = active; n < that.current.length; n++) {
                if(t*that.current.length - n >= that.current[n].x[0] && t*that.current.length - n <= that.current[n].x[that.current[n].x.length - 1]) { return n; }
            }
            if(active != 0) { return active - 1; }
            else { return active; }
        },
        getPoints: function (time, n) {
            for(var i = 0, sum = [0, 0]; i < that.current[n].x.length; i++) {
                sum[0] += that.current[n].x[i]*Math.stkGetBinominalCoefficient(that.current[n].x.length - 1, i)*Math.pow(1 - time, that.current[n].x.length - 1 - i)*Math.pow(time, i);
                sum[1] += that.current[n].y[i]*Math.stkGetBinominalCoefficient(that.current[n].x.length - 1, i)*Math.pow(1 - time, that.current[n].x.length - 1 - i)*Math.pow(time, i);
            }
            return sum;
        },
    };
    return function (time, userdata) {
        that.current = userdata ? userdata : that.default;
        if(that.current === that.default) {
            return time;
        }
        var xTolerance = 0.0001,
            lower = 0, upper = 1,
            percent = (upper + lower)/2,
            n = that.findCurrentSet(time),
            n = that.searchForCurrentSet(time, n),
            _time = (time*that.current.length - n);
        if(_time < that.current[n].x[0] || _time > that.current[n].x[that.current[n].x.length - 1]) { return 0; }

        var x = that.getPoints(percent, n)[0];
        while(Math.abs(_time - x) > xTolerance) {
            if(_time > x) { lower = percent; }
            else { upper = percent; }
            percent = (upper + lower)/2;
            x = that.getPoints(percent, n)[0];
        }
        return that.getPoints(percent, n)[1];
    };
})();

/* -------------------------------------------------------------------------- */

/**
* @namespace getNSElement
* @description SVG elements creator
*/

var getNSElement = {
    SVG_NAMESPACE_URI: "http://www.w3.org/2000/svg",
    SVG_XMLNS_XLINK: "http://www.w3.org/1999/xlink",
    SVG_XMLNS: "http://www.w3.org/2000/svg",
}.stkExt({
    /** Gets SVG element with given tag name
    * @function getNSElement.get
    * @param {string} tagName Name of the created tag
    * @returns {node} Returns created tag
    * @example
    * getNSElement.get('path');
    */
    get: function (tagName) { return document.createElementNS(this.SVG_NAMESPACE_URI, tagName); },
    /** Gets SVG node
    * @function getNSElement.svg
    * @param {object} [param] Allowed properties: id | x | y | width | height
    * @returns {object} Returns SVG node with given attributes
    * @example
    * getNSElement.svg({ id: 'foo', x: 0, y: 0, width: 1920, height: 1200 });
    */
    svg: function (param) {
        var element = this.get("svg"),
            attributes = {
                version: "1.1",
                id: param && param.id || "svg-element-"+Math.stkRandomInt(0, 100000),
                "xmlns:xlink": this.SVG_XMLNS_XLINK,
                xmlns: this.SVG_XMLNS,
                style: param && param.style || '',
                x: param && param.x || 0,
                y: param && param.y || 0,
                "xml:space": "preserve"
            },
            width = param && param.width || 1920,
            height = param && param.height || 1200;
        element = this.setViewbox(element, width, height, width, height);
        return element.stkAttr(attributes);
    },
    /** Sets viewbox to target element
    * @function getNSElement.setViewbox
    * @param {node} element Target element
    * @param {number} width Width of element
    * @param {number} height Height of element
    * @param {number} [viewBoxWidth] Width of viewbox
    * @param {number} [viewBoxHeight] Height of viewbox
    * @returns {node} Returns tag with new attributes
    * @example
    * getNSElement.setViewbox(el, 1920, 1200);
    */
    setViewbox: function (element, width, height, viewBoxWidth, viewBoxHeight) {
        if(viewBoxWidth === undefined && viewBoxHeight === undefined) {
            viewBoxWidth = width;
            viewBoxHeight = height;
        }
        return element.stkAttr({
            width: width,
            height: height,
            viewBox: "0 0 " + viewBoxWidth + " " + viewBoxHeight
        });
    },
    /** Check if element has neccessary attributes
    * @function getNSElement.validateBasicAttributesIdentifier
    * @param {object} param Parameters to check
    * @param {number} identifier Identifier of element
    * @returns {object} Returns validated parameters object
    */
    validateBasicAttributesIdentifier: function (param, identifier) {
        if (!param) { param = { id: identifier }; }
        else if (!param.id) { param.stkExt({ id: identifier }); }
        return param;
    },
    /** Gets neccessary attributes
    * @function getNSElement.getBasicAttributes
    * @param {object} param Parameters to apply
    * @returns {object} Returns extended parameters object
    */
    getBasicAttributes: function (param) {
        return param.stkExt({
            class: param && param.class || '',
            id: param && param.id || "svg-unknown-element-"+Math.stkRandomInt(0, 100000),
            style: param && param.style || '',
        });
    },
    /** Gets SVG element of given type
    * @function getNSElement.newElement
    * @param {string} name Name of tag
    * @param {object} [param] Object with attributes to set. Allowed properties: class | id | style
    * @returns {object} Returns SVG element of given name
    * @example
    * getNSElement.newElement('rect', { width: 1920, height: 1200 });
    */
    newElement: function (name, param) {
        var element = this.get(name),
            identifier = "svg-"+name+"-element-"+Math.stkRandomInt(0, 100000);
        return element.stkAttr( this.getBasicAttributes(this.validateBasicAttributesIdentifier(param, identifier)) );
    },
});

/* -------------------------------------------------------------------------- */

/**
* @global
* @namespace window
*/

window.stkExt({
    /** <a href="https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame" target="_blank">requestAnimationFrame</a> polyfill
    * @function window.stkRAF
    * @param {function} callback Function to invoke on the next frame
    * @returns {number} Request reference
    * @example
    * var sayHello = function () { console.log('Hello'); };
    * stkRAF(sayHello);
    * // Will output 'Hello' when browser ready to render next frame
    */
   stkRAF: (function (){
        return window.requestAnimationFrame       ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        function (callback) { window.setTimeout(callback, 1000 / 30) };
    })(),
    /** <a href="https://developer.mozilla.org/en-US/docs/Web/API/window/cancelAnimationFrame" target="_blank">cancelAnimationFrame</a> polyfill
    * @function window.stkCAF
    * @param {number} rafReference stkRAF reference
    * @returns {undefined}
    * @example
    * var sayHello = function () { console.log('Hello'); };
    * var reference = stkRAF(sayHello);
    * stkCAF(reference);
    * // Request canceled
    */
    stkCAF: (function (){
        return window.cancelAnimationFrame       ||
        window.webkitCancelAnimationFrame ||
        window.mozCancelAnimationFrame    ||
        window.clearTimeout;
    })(),
    /** Generates random string identifier
    * @function window.stkGenerateUniqueID
    * @param {number} n Length of string to generate
    * @returns {string} Returns generated identifier
    * @example
    * stkGenerateUniqueID(5);
    * // Returns something like '5evTy'
    */
    stkGenerateUniqueID: (function () {
        var array = [];
        for (var i = 48; i <= 57; i++) { array.push(String.fromCharCode(i)); }
        for (var i = 65; i <= 90; i++) { array.push(String.fromCharCode(i)); }
        for (var i = 97; i <= 122; i++) { array.push(String.fromCharCode(i)); }
        return function (n) {
            var id = "";
            for (var i = 0; i < (n || 9); i++) { id += array[Math.stkRandomInt(0, array.length - 1)]; }
            return id;
        };
    })(),
    /** Equivalent of setTimeout based on <a href="https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame" target="_blank">requestAnimationFrame</a>
    * @function window.stkRafTimeout
    * @param {function} cb Callback to invoke when done
    * @param {number} timeout Value of timeout in milliseconds
    * @param {number} [startTime]
    * @returns {undefined}
    * @example
    * var sayHello = function () { console.log('Hello'); };
    * stkRafTimeout(sayHello, 1000);
    * // After 1000ms will output 'Hello'
    */
    stkRafTimeout: function (cb, timeout, startTime) {
        if (startTime === undefined) { startTime = window.performance.now(); }
        if (window.performance.now() - startTime >= timeout) {
            cb();
            return;
        }
        stkRAF(function () { stkRafTimeout(cb, timeout, startTime); });
    },
    /**
    * Reads URL to find the value of given parameter name
    * @function window.stkGetQueryVariable
    * @param {string} name Name of the parameter to search for in URL
    * @returns {string} Decoded value of given parameter or undefined if parameter don't exists
    * @example
    * Your URL is "http://sataku.dev/?campaign=template";
    * stkGetQueryVariable("campaign");
    * // Returns "template"
    */
    stkGetQueryVariable: function (name) {
        var tmp = [];
        var result = undefined;
        location.search.substr(1).split("&").forEach(function (item) {
            tmp = item.split("=");
            if (tmp[0] === name) { result = decodeURIComponent(tmp[1]); }
        });
        return result;
    },
    /**
    * Draws random display version
    * @function window.stkDrawDisplayVersion
    * @returns {object} Returns display version object
    */
    stkDrawDisplayVersion: function(format, config) {
        var defaultVersion = {id: 1, name: 'v1', redirect: 1};
        var displayVersion = defaultVersion;
        if (!config || !window.stkIsArray(config['format_' + format]) || config['format_' + format].length < 1) {
            return displayVersion;
        }
        var versions = config[`format_${format}`];
        var random = Math.random() * 1;
        var givenChanceSum = 0;
        var indexesWithoutGivenChance = [];
        var versionConfig;
        var chanceSum = 0;
        for (var i = 0; i < versions.length; i++) {
            versionConfig = versions[i];
            versionConfig.id = i + 1;
            if (typeof versionConfig.chance != 'undefined' && versionConfig.chance !== 'equal') {
                givenChanceSum += versionConfig.chance;
            } else {
                indexesWithoutGivenChance.push(i);
            }
            if (typeof versionConfig.name == 'undefined') {
                versionConfig.name = 'v' + versionConfig.id;
            }
            if (typeof versionConfig.redirect == 'undefined') {
                versionConfig.redirect = 1;
            }
        }
        if (givenChanceSum > 1) { // sum of 'chance' properties must not exceed 1
            console.error('stkDrawDisplayVersion: given chance percentages exceed 1');
        }

        for (var j = 0; j < indexesWithoutGivenChance.length; j++) {
            versions[indexesWithoutGivenChance[j]].chance = (1 - givenChanceSum) / indexesWithoutGivenChance.length;
        }

        for (var k = 0; k < versions.length; k++) {
            chanceSum += versions[k].chance;
            if (chanceSum > random) {
                displayVersion = versions[k];
                break;
            }
            // chanceSum given is less then 1 total, pool with random values between chanceSum and 1 will be spread evenly between all versions
            if (k === versions.length - 1) {
                return {id: window.stkGetRandomIntRange(1, versions.length), name: displayVersion.name, redirect: displayVersion.redirect};
            }
        }
        return {id: displayVersion.id, name: displayVersion.name, redirect: displayVersion.redirect};
    },
    /**
    * Reads userAgent to check if running on mobile device
    * @function window.stkIsMobile
    * @returns {boolean} Returns true if running on mobile device
    */
    stkIsMobile: function () {
        var a = navigator.userAgent || navigator.vendor || window.opera;
        return !!(/(android|bb\d+|meego).+mobile|android|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od|ad)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4)));
    },
    /**
    * Checks if param is an array
    * @function window.stkIsArray
    * @param {any} arr Value to test if it is an array
    * @returns {boolean} Returns true if param is an array
    */
    stkIsArray: function(arr) {
        return Object.prototype.toString.call(arr) === '[object Array]';
    },
    satakuAntiBot: function(){
        const insertionId = window.Sataku.config.campaign.insertionId;
        const pixel = function(url, log){
            if (!url) {
                console.error('Empty URL. Tracking excluded.');
                return;
            }
            url = url.replace("[timestamp]", stkGetRandomInt());
            url = url.replace("[TIMESTAMP]", stkGetRandomInt());
            var img = new Image();
            img.src = url;
        }
        window.addEventListener('click', (e)=>{
            var url = 'https://app.trackly.eu/event/sataku-view/'+ insertionId +'/7/'+new Date().getTime();
            if (e.clientX == 0 || e.clientY == 0 || !e.isTrusted){
                if (SATAKU_MODE == MODE_DEVELOPER && !PIXELS_LOCAL_TESTING_MODE) {
                    console.log('Tracking pixel excluded: ' + url);
                } else {
                    pixel(url);
                }
            }
        })
    },
    /**
    Returns broser version and name
    @function window.satakuBrowserDetect
    @returns {object} with information about user's browser
    **/
    satakuBrowserDetect: function(){
        var userAgent = navigator.userAgent,
            match = userAgent.match(/(opera|chrome|crios|safari|ucbrowser|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [],
            result = {},
            tem,
            isSupported = null;

        if (/trident/i.test(match[1])) {
            tem = /\brv[ :]+(\d+)/g.exec(userAgent) || [];
            result.name = "Internet Explorer";
        } else if (match[1] === "Chrome") {
            tem = userAgent.match(/\b(OPR|Edge)\/(\d+)/);

            if (tem && tem[1]) {
                result.name = tem[0].indexOf("Edge") === 0 ? "Edge" : "Opera";
            }
        }
        if (!result.name) {
            tem = userAgent.match(/version\/(\d+)/i); // iOS support
            result.name = match[0].replace(/\/.*/, "");

            if (result.name.indexOf("MSIE") === 0) {
                result.name = "Internet Explorer";
            }
            if (userAgent.match("CriOS")) {
                result.name = "Chrome";
            }

        }
        if (!result.isMobile){
            result.isMobile = userAgent.toLowerCase().indexOf('mobile') > -1;
        }
        if (tem && tem.length) {
            match[match.length - 1] = tem[tem.length - 1];
        }

        result.version = Number(match[match.length - 1]);
        isSupported = window.stkIsSupported(result)

        return isSupported;


    },
    enableLoaderFeature:function(name, link, formatId){
        if (link) {
            link = link.replace("[timestamp]", stkGetRandomInt());
            link = link.replace("[TIMESTAMP]", stkGetRandomInt());
        }
        var customFeatureMessage = {
            type:name,
            link:link,
            format: formatId
        }
        switch (name.toLowerCase().trim()){
            case 'meetrics':
                if (name && link && formatId){
                    window.parent.postMessage(customFeatureMessage,'*')
                } else{
                    console.error(`Loader feature details missing: type:${name}, link:${link}, formatId: ${formatId}`)
                }
            break;

            case 'rv':
                    window.parent.postMessage(customFeatureMessage,'*')
            break;

            case 'scroll':
                window.parent.postMessage(customFeatureMessage,'*')
                break;

            case 'gyro':
                    window.parent.postMessage(customFeatureMessage,'*')
            break;

            default:
                break;
        }
        return;
    },
    stkIsSupported: function(browser){
        // Chrome
        var result = true,
            name = browser.name,
            ver = browser.version,
            pixel = function(url, log){
                if (!url) {
                    console.error('Empty URL. Tracking excluded.');
                    return;
                }
                url = url.replace("[timestamp]", stkGetRandomInt());
                url = url.replace("[TIMESTAMP]", stkGetRandomInt());
                var img = new Image();
                img.src = url;
            }
        if (!browser.isMobile){
            if (name.toLowerCase().replace(' ', '_') == 'internet_explorer'){
                result = false;
                if (!window.satakuBrowserPixel){
                    pixel('https://app.trackly.eu/event/3089959/[TIMESTAMP]')
                }
            }
            if (name.toLowerCase() == 'chrome' && ver < 38){
                result = false;
                if (!window.satakuBrowserPixel){
                    pixel('https://app.trackly.eu/event/3089956/[TIMESTAMP]')
                }
            }
            if (name.toLowerCase() == 'safari' && ver < 9){
                result = false;
                if (!window.satakuBrowserPixel){
                    pixel('https://app.trackly.eu/event/3089958/[TIMESTAMP]')
                }
            }
            if (name.toLowerCase() == 'firefox' && ver < 60){
                result = false;
                if (!window.satakuBrowserPixel){
                    pixel('https://app.trackly.eu/event/3089957/[TIMESTAMP]')
                }
            }
            if (name.toLowerCase() == 'edge' && ver < 15){
                result = false;
                if (!window.satakuBrowserPixel){
                    pixel('https://app.trackly.eu/event/3089961/[TIMESTAMP]')
                }
            }
            if (name.toLowerCase() == 'edge'){
                window.stkShouldStartTeaserManually = true;
            }
            if (name.toLowerCase() == 'opera' && ver < 50){
                result = false;
                if (!window.satakuBrowserPixel){
                    pixel('https://app.trackly.eu/event/3089960/[TIMESTAMP]')
                }
            }
        }
        window.satakuBrowserPixel = true;

        return result;
    },
    /**
    * Play teaser's video element
    * @function window.stkStartTeaserManually
    * @returns {undefined}
    */
    stkStartTeaserManually: function() {
        var teaser = document.querySelector('#teaser');
        if (teaser && teaser.play) {
            teaser.play();
        }
    },
    /**
    * Reads userAgent to check if running on iOS mobile device
    * @function window.stkIsIphone
    * @returns {boolean} Returns true if running on iOS mobile device
    */
    stkIsIphone: function() {
        return !!/iPhone|iPad|iPod/i.test(navigator.userAgent);
    },
    /**
    * Reads userAgent and vendor to check if running on Safari browser (fix for Safari 11.0 security update)
    * @function window.stkIsSafari
    * @returns {boolean} Returns true if running on Safari browser
    */
    stkIsSafari: function() {
        return (navigator.vendor.indexOf("Apple")==0 && /\sSafari\//.test(navigator.userAgent));
    },
    /**
    * Waits for window.satakuParams property
    * @function window.waitForSatakuParameters
    * @param {function} callback Function to fire on success
    * @returns {undefined}
    */
    waitForSatakuParameters: function(callback) {
        if(window.satakuParams === undefined) {
            setTimeout(function() { waitForSatakuParameters(callback); }, 16);
        } else { callback(); }
    },
    /**
    * Loads NodeList collection and fires callback when all are loaded
    * @function window.stkLazyLoad
    * @param {(string|array)} selectorOrNodelist Selector of target nodes or nodeList
    * @param {function} callback Function to fire on success
    * @returns {undefined}
    * @example
    * stkLazyLoad('[data-src]', function() { console.log('loaded'); });
    */
    stkLazyLoad: function(selectorOrNodelist, callback) {
        var that = {
            count: 0,
            length: null,
            nodes: selectorOrNodelist === null ? [] : selectorOrNodelist.constructor === String ? document.stkQuery(selectorOrNodelist, true) : selectorOrNodelist,
            callback: function(eventName) {
                if(callback && that.count === that.length) {
                    callback();
                }
            },
            errorHandler: function(error) {
                this.stkStopListening('error', that.errorHandler, false);
                --that.length
                console.error(error);
                that.callback();
            },
            loadHandler: function(event) {
                this.stkStopListening('load', that.loadHandler, false);
                ++that.count;
                that.callback();
            },
        };
        that.length = that.nodes.length;
        if(that.length === 0) {
            console.info('Empty request');
            if(callback) { callback(); }
            return;
        }
        that.nodes.stkIterate(function(node, key) {
            var dataSrc = node.getAttribute('data-src');
            if(dataSrc === null || dataSrc === undefined)  {
                console.info('Element data-src %o attribute missing', node);
                return;
            }
            node.stkListen('load', that.loadHandler, false);
            node.stkListen('error', that.errorHandler, false);
            node.src = dataSrc;
        });
    },
    /**
    * Opens a new window and fires callback on success
    * @function window.stkOpenWindow
    * @param {string} url URL to open
    * @param {string} target Target attribute, most cases = "_blank"
    * @param {function} callback Function to fire on success
    * @param {function} fallback Function to fire on error
    * @returns {undefined}
    * @example
    * stkOpenWindow('http://google.pl', '_blank', function() {}, function() {});
    */
    stkOpenWindow: function(url, target, callback, fallback) {
        var newWin = window.open(url, target);
        if(!newWin || newWin.closed || typeof newWin.closed=='undefined') {
            if(fallback) { fallback(); }
        } else {
            if(callback) { callback(); }
        }
    },
    /**
    * Function gets random integer
    * @function window.stkGetRandomInt
    * @returns {number} Random integer
    */
    stkGetRandomInt: function() { return Math.floor((Math.random() * 10000) + 1); },
    /**
    * Function gets random integer in range
    * @function window.stkGetRandomIntRange
    * @param {number} min Min value inclusive
    * @param {number} max Max value inclusive
    * @returns {number} Random integer in given range
    */
    stkGetRandomIntRange: function(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
});

/**
* Wraps native window.console.log so that it is only called in MODE_DEVELOPER or MODE_PREVIEW
* @function window.console.log
* @returns {undefined}
*/
(function(){
    if(window.console && window.console.log){
        var old = window.console.log;
        window.console.log = function(){
            if ([window.MODE_DEVELOPER, window.MODE_PREVIEW].indexOf(window.SATAKU_MODE) !== -1) {
                old.apply(this, arguments)
            }
        }
    }
})();

/**
* Keeps information if browser supports passive events
* @name window.stkBrowserSupportsPassiveEvents
* @type {boolean}
*/
window.stkBrowserSupportsPassiveEvents = false;
(function() {
    try {
        var opts = Object.defineProperty({}, 'passive', { get: function() { window.stkBrowserSupportsPassiveEvents = true; } });
        window.stkListen('supportsPassive', null, opts);
    } catch(error) { console.error(error); }
})();

/* -------------------------------------------------------------------------- */
