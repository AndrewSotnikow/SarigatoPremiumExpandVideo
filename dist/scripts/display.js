/*!
* screenfull
* v5.1.0 - 2020-12-24
* (c) Sindre Sorhus; MIT License
*/
(function () {
	'use strict';

	var document = typeof window !== 'undefined' && typeof window.document !== 'undefined' ? window.document : {};
	var isCommonjs = typeof module !== 'undefined' && module.exports;

	var fn = (function () {
		var val;

		var fnMap = [
			[
				'requestFullscreen',
				'exitFullscreen',
				'fullscreenElement',
				'fullscreenEnabled',
				'fullscreenchange',
				'fullscreenerror'
			],
			// New WebKit
			[
				'webkitRequestFullscreen',
				'webkitExitFullscreen',
				'webkitFullscreenElement',
				'webkitFullscreenEnabled',
				'webkitfullscreenchange',
				'webkitfullscreenerror'

			],
			// Old WebKit
			[
				'webkitRequestFullScreen',
				'webkitCancelFullScreen',
				'webkitCurrentFullScreenElement',
				'webkitCancelFullScreen',
				'webkitfullscreenchange',
				'webkitfullscreenerror'

			],
			[
				'mozRequestFullScreen',
				'mozCancelFullScreen',
				'mozFullScreenElement',
				'mozFullScreenEnabled',
				'mozfullscreenchange',
				'mozfullscreenerror'
			],
			[
				'msRequestFullscreen',
				'msExitFullscreen',
				'msFullscreenElement',
				'msFullscreenEnabled',
				'MSFullscreenChange',
				'MSFullscreenError'
			]
		];

		var i = 0;
		var l = fnMap.length;
		var ret = {};

		for (; i < l; i++) {
			val = fnMap[i];
			if (val && val[1] in document) {
				for (i = 0; i < val.length; i++) {
					ret[fnMap[0][i]] = val[i];
				}
				return ret;
			}
		}

		return false;
	})();

	var eventNameMap = {
		change: fn.fullscreenchange,
		error: fn.fullscreenerror
	};

	var screenfull = {
		request: function (element, options) {
			return new Promise(function (resolve, reject) {
				var onFullScreenEntered = function () {
					this.off('change', onFullScreenEntered);
					resolve();
				}.bind(this);

				this.on('change', onFullScreenEntered);

				element = element || document.documentElement;

				var returnPromise = element[fn.requestFullscreen](options);

				if (returnPromise instanceof Promise) {
					returnPromise.then(onFullScreenEntered).catch(reject);
				}
			}.bind(this));
		},
		exit: function () {
			return new Promise(function (resolve, reject) {
				if (!this.isFullscreen) {
					resolve();
					return;
				}

				var onFullScreenExit = function () {
					this.off('change', onFullScreenExit);
					resolve();
				}.bind(this);

				this.on('change', onFullScreenExit);

				var returnPromise = document[fn.exitFullscreen]();

				if (returnPromise instanceof Promise) {
					returnPromise.then(onFullScreenExit).catch(reject);
				}
			}.bind(this));
		},
		toggle: function (element, options) {
			return this.isFullscreen ? this.exit() : this.request(element, options);
		},
		onchange: function (callback) {
			this.on('change', callback);
		},
		onerror: function (callback) {
			this.on('error', callback);
		},
		on: function (event, callback) {
			var eventName = eventNameMap[event];
			if (eventName) {
				document.addEventListener(eventName, callback, false);
			}
		},
		off: function (event, callback) {
			var eventName = eventNameMap[event];
			if (eventName) {
				document.removeEventListener(eventName, callback, false);
			}
		},
		raw: fn
	};

	if (!fn) {
		if (isCommonjs) {
			module.exports = {isEnabled: false};
		} else {
			window.screenfull = {isEnabled: false};
		}

		return;
	}

	Object.defineProperties(screenfull, {
		isFullscreen: {
			get: function () {
				return Boolean(document[fn.fullscreenElement]);
			}
		},
		element: {
			enumerable: true,
			get: function () {
				return document[fn.fullscreenElement];
			}
		},
		isEnabled: {
			enumerable: true,
			get: function () {
				// Coerce to boolean in case of old WebKit
				return Boolean(document[fn.fullscreenEnabled]);
			}
		}
	});

	if (isCommonjs) {
		module.exports = screenfull;
	} else {
		window.screenfull = screenfull;
	}
})();

/*! npm.im/iphone-inline-video 2.2.2 */
var enableInlineVideo=function(){"use strict";/*! npm.im/intervalometer */
function e(e,i,n,r){function t(n){d=i(t,r),e(n-(a||n)),a=n}var d,a;return{start:function(){d||t(0)},stop:function(){n(d),d=null,a=0}}}function i(i){return e(i,requestAnimationFrame,cancelAnimationFrame)}function n(e,i,n){function r(r){n&&!n(e,i)||r.stopImmediatePropagation()}return e.addEventListener(i,r),r}function r(e,i,n,r){function t(){return n[i]}function d(e){n[i]=e}r&&d(e[i]),Object.defineProperty(e,i,{get:t,set:d})}function t(e,i,n){n.addEventListener(i,function(){return e.dispatchEvent(new Event(i))})}function d(e,i){Promise.resolve().then(function(){e.dispatchEvent(new Event(i))})}function a(e){var i=new Audio;return t(e,"play",i),t(e,"playing",i),t(e,"pause",i),i.crossOrigin=e.crossOrigin,i.src=e.src||e.currentSrc||"data:",i}function u(e,i,n){(m||0)+200<Date.now()&&(e[h]=!0,m=Date.now()),n||(e.currentTime=i),k[++T%3]=100*i|0}function o(e){return e.driver.currentTime>=e.video.duration}function s(e){var i=this;i.video.readyState>=i.video.HAVE_FUTURE_DATA?(i.hasAudio||(i.driver.currentTime=i.video.currentTime+e*i.video.playbackRate/1e3,i.video.loop&&o(i)&&(i.driver.currentTime=0)),u(i.video,i.driver.currentTime)):i.video.networkState===i.video.NETWORK_IDLE&&0===i.video.buffered.length&&i.video.load(),i.video.ended&&(delete i.video[h],i.video.pause(!0))}function c(){var e=this,i=e[g];if(e.webkitDisplayingFullscreen)return void e[E]();"data:"!==i.driver.src&&i.driver.src!==e.src&&(u(e,0,!0),i.driver.src=e.src),e.paused&&(i.paused=!1,0===e.buffered.length&&e.load(),i.driver.play(),i.updater.start(),i.hasAudio||(d(e,"play"),i.video.readyState>=i.video.HAVE_ENOUGH_DATA&&d(e,"playing")))}function v(e){var i=this,n=i[g];n.driver.pause(),n.updater.stop(),i.webkitDisplayingFullscreen&&i[w](),n.paused&&!e||(n.paused=!0,n.hasAudio||d(i,"pause"),i.ended&&!i.webkitDisplayingFullscreen&&(i[h]=!0,d(i,"ended")))}function p(e,n){var r={};e[g]=r,r.paused=!0,r.hasAudio=n,r.video=e,r.updater=i(s.bind(r)),n?r.driver=a(e):(e.addEventListener("canplay",function(){e.paused||d(e,"playing")}),r.driver={src:e.src||e.currentSrc||"data:",muted:!0,paused:!0,pause:function(){r.driver.paused=!0},play:function(){r.driver.paused=!1,o(r)&&u(e,0)},get ended(){return o(r)}}),e.addEventListener("emptied",function(){var i=!r.driver.src||"data:"===r.driver.src;r.driver.src&&r.driver.src!==e.src&&(u(e,0,!0),r.driver.src=e.src,i||!n&&e.autoplay?r.driver.play():r.updater.stop())},!1),e.addEventListener("webkitbeginfullscreen",function(){e.paused?n&&0===r.driver.buffered.length&&r.driver.load():(e.pause(),e[E]())}),n&&(e.addEventListener("webkitendfullscreen",function(){r.driver.currentTime=e.currentTime}),e.addEventListener("seeking",function(){k.indexOf(100*e.currentTime|0)<0&&(r.driver.currentTime=e.currentTime)}))}function l(e){var i=e[h];return delete e[h],!e.webkitDisplayingFullscreen&&!i}function f(e){var i=e[g];e[E]=e.play,e[w]=e.pause,e.play=c,e.pause=v,r(e,"paused",i.driver),r(e,"muted",i.driver,!0),r(e,"playbackRate",i.driver,!0),r(e,"ended",i.driver),r(e,"loop",i.driver,!0),n(e,"seeking",function(e){return!e.webkitDisplayingFullscreen}),n(e,"seeked",function(e){return!e.webkitDisplayingFullscreen}),n(e,"timeupdate",l),n(e,"ended",l)}function y(e,i){if(void 0===i&&(i={}),!e[g]){if(!i.everywhere){if(!b)return;if(!(i.iPad||i.ipad?/iPhone|iPod|iPad/:/iPhone|iPod/).test(navigator.userAgent))return}e.pause();var n=e.autoplay;e.autoplay=!1,p(e,!e.muted),f(e),e.classList.add("IIV"),e.muted&&n&&(e.play(),e.addEventListener("playing",function i(){e.autoplay=!0,e.removeEventListener("playing",i)})),/iPhone|iPod|iPad/.test(navigator.platform)||console.warn("iphone-inline-video is not guaranteed to work in emulated environments")}}var m,b="object"==typeof document&&"object-fit"in document.head.style&&!matchMedia("(-webkit-video-playable-inline)").matches,g="bfred-it:iphone-inline-video",h="bfred-it:iphone-inline-video:event",E="bfred-it:iphone-inline-video:nativeplay",w="bfred-it:iphone-inline-video:nativepause",k=[],T=0;return y}();

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

// Make sure pixel URLs are over 'https' protocol!

/** @constant {object} window.STK_PIXEL_HELPER_CONFIG Stores tracking data for SatakuPixelHelper */
var STK_PIXEL_HELPER_CONFIG = {
  // firstInteraction: { // pixelHelper
  //     type: 'custom', // 'custom', 'trackly' or 'smart'
  //     id: 1 // starting with 1
  // },
  custom: [ // pixelHelper
    // {description: '', label: 'first_interaction', once: true},
    // {description: '', label: '', once: false},
  ],
  trackly: [ // pixelHelper
      // {url: '', description: '', label: '', once: false},
  ],
  smart: [ // pixelHelper
      // {url: '', description: '', label: '', once: false},
  ],
}

// For testing purposes
// var product = window.parent.stkGetQueryVariable('product');

/** @constant {number} window.CREATION_TYPE */
// var CREATION_TYPE = product ? Number(product) : CREATION_TYPE_EXPAND_VIDEO;

// There is also a simple 'Display' type (mobile and desktop), which is CREATION_TYPE_RICH_DISPLAY or CREATION_TYPE_MOBILE_RICH_DISPLAY without teaser video

// var CREATION_TYPE = CREATION_TYPE_RICH_DISPLAY;
// var CREATION_TYPE = CREATION_TYPE_VIDEO_DISPLAY_LANDING_PAGE;
// var CREATION_TYPE = CREATION_TYPE_VIDEO_DISPLAY_STANDARD;
// var CREATION_TYPE = CREATION_TYPE_VIDEO_DISPLAY_STANDARD_REDIRECT;
// var CREATION_TYPE = CREATION_TYPE_REAL_VIEW;
// var CREATION_TYPE = CREATION_TYPE_FULL_REAL_VIEW;
// var CREATION_TYPE = CREATION_TYPE_SCROLL;
// var CREATION_TYPE = CREATION_TYPE_MOTION;
// var CREATION_TYPE = CREATION_TYPE_SARIGATO_IFRAME;
// var CREATION_TYPE = CREATION_TYPE_EXPAND_VIDEO;
var CREATION_TYPE = CREATION_TYPE_EXPAND_PREMIUM;
// var CREATION_TYPE = CREATION_TYPE_VIDEO_LOOP;

// var CREATION_TYPE = CREATION_TYPE_MOBILE_RICH_DISPLAY;
// var CREATION_TYPE = CREATION_TYPE_MOBILE_DISPLAY_COUNTER;
// var CREATION_TYPE = CREATION_TYPE_MOBILE_REAL_VIEW;
// var CREATION_TYPE = CREATION_TYPE_MOBILE_FULL_REAL_VIEW;
// var CREATION_TYPE = CREATION_TYPE_MOBILE_EXPAND_VIDEO;
// var CREATION_TYPE = CREATION_TYPE_MOBILE_EXPAND_PREMIUM;
// var CREATION_TYPE = CREATION_TYPE_MOBILE_SCROLL;
// var CREATION_TYPE = CREATION_TYPE_MOBILE_MOTION;
// var CREATION_TYPE = CREATION_TYPE_MOBILE_SARIGATO_IFRAME;
// var CREATION_TYPE = CREATION_TYPE_MOBILE_VIDEO_LOOP;

// legacy
// var CREATION_TYPE = CREATION_TYPE_RICH_EXPAND;
// var CREATION_TYPE = CREATION_TYPE_MOBILE_MULTI_RECTANGLE;
// var CREATION_TYPE = CREATION_TYPE_MOBILE_VIDEO_INTERACTIVE;
// var CREATION_TYPE = CREATION_TYPE_MOBILE_VIDEO;
// var CREATION_TYPE = CREATION_TYPE_MOBILE_ONEPAGE_PORTRAIT;
// var CREATION_TYPE = CREATION_TYPE_MOBILE_ONEPAGE_LANDSCAPE;
// var CREATION_TYPE = CREATION_TYPE_MOBILE_EXPAND_RICH;


/** @constant {boolean} window.STK_REAL_VIEW_WITH_REPLAY if true, show #rv-replay that controls spot replay */
var STK_REAL_VIEW_WITH_REPLAY = false;

/** @constant {object} window.STK_SCROLL_CAMPAIGN_DATA Stores image data sent to loader for Scroll campaign type */
var STK_SCROLL_CAMPAIGN_DATA = {
  format_300x250: {
    displayVersion_1: {
      url: 'media/300x250/300x250.jpg',
      width: 300,
      height: 250,
    },
    // displayVersion_2: {
    //   url: 'media/300x250/300x250_2.jpg',
    //   width: 300,
    //   height: 250,
    // },
  },
  format_300x400: {
    displayVersion_1: {
      url: 'media/300x400/300x400.jpg',
      width: 300,
      height: 400,
    }
  },
  format_300x600: {
    displayVersion_1: {
      url: 'media/300x600/300x600.jpg',
      width: 300,
      height: 600,
    }
  },
  format_750x200: {
    displayVersion_1: {
      url: 'media/750x200/750x200.jpg',
      width: 750,
      height: 200,
    }
  },
  format_750x300: {
    displayVersion_1: {
      url: 'media/750x300/750x300.jpg',
      width: 750,
      height: 300,
    }
  },
};

/** @constant {object} window.STK_MOTION_SEQUENCE_CONFIG Stores element sequence data needed for Motion campaign type */
var STK_MOTION_SEQUENCE_CONFIG = {
  format_300x250: {
    displayVersion_1: [
      {
        selector: '.motion-seq',
        // pixel value from top of the display where sequence animation starts, i.e.:
        // if startAt equals 0 then the animation starts when the display is emerging from bottom of the screen
        // else if startAt equals display height then the animation starts when the whole display is visible
        startAt: 0,
        // pixel value from bottom of the display where sequence animation ends, i.e.:
        // if endAt equals 0 then the animation ends when the display is just out of view above the viewport
        // else if endAt equals display height then the animation ends when the whole display is still visible, touching the top of viewport
        endAt: 0,
      },
      // {
      //   selector: '.motion-seq2',
      //   startAt: 0,
      //   endAt: 0,
      // }
    ],
    // displayVersion_2: [
    //   {
    //     selector: '.motion-seq',
    //     startAt: 0,
    //     endAt: 0,
    //   },
    // ]
  },
  format_300x400: {
    displayVersion_1: [
      {
        selector: '.motion-seq',
        startAt: 0,
        endAt: 0,
      },
    ],
  },
  format_300x600: {
    displayVersion_1: [
      {
        selector: '.motion-seq',
        startAt: 0,
        endAt: 0,
      },
    ],
  },
  format_750x200: {
    displayVersion_1: [
      {
        selector: '.motion-seq',
        startAt: 0,
        endAt: 0,
      },
    ],
  },
  format_750x300: {
    displayVersion_1: [
      {
        selector: '.motion-seq',
        startAt: 0,
        endAt: 0,
      },
    ],
  },
}

/** @constant {object} window.STK_DISPLAY_VERSION_CONFIG Stores data needed for setting correct display version */
var STK_DISPLAY_VERSION_CONFIG = {
  // name is optional, defaults to `v${index+1}`, used for setting display body css class
  // chance is optional, accepts values from 0 to 1, undefined or 'equal'
  // redirect is optional, defaults to 1, sets clickAction and player redirects
  format_300x250: [
    {name: 'v1', redirect: 1, chance: 'equal'},
    // {name: 'v2', redirect: 2, chance: 0.5},
  ],
  format_300x400: [
    {name: 'v1', redirect: 1, chance: 'equal'},
  ],
  format_300x600: [
    {name: 'v1', redirect: 1, chance: 'equal'},
  ],
  format_750x200: [
    {name: 'v1', redirect: 1, chance: 'equal'},
  ],
  format_750x300: [
    {name: 'v1', redirect: 1, chance: 'equal'},
  ],
}

/** @constant {object} window.STK_COUNTER_STYLE_CONFIG Stores styling data for SatakuCounter */
var STK_COUNTER_STYLE_CONFIG = {
  textSize: 0.5,
  triangleSize: 0.25,
  outerRimLineWidth: 4,
  innerRimLineWidth: 2,
  innerRadiusSize: 0.42,
  textFillStyle: '#fff',
  triangleFillStyle: '#fff',
  outerRimStrokeStyle: '#fff',
  staticOuterRimStrokeStyle: '#fff',
  innerRimStrokeStyle: '#fff',
  layerFillStyle: 'rgba(0, 0, 0, 0.66)',
  staticLayerFillStyle: 'rgba(0, 0, 0, 0.66)',
}

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

/**
* @file Stores SatakuTracking class
* @name tracking.js
* @copyright (c) 2017, Sarigato Sp z o. o. All rights reserved.
* @version 2.0.0
*/

/**
* @class SatakuTracking
* @param {object} config {@link Sataku.config} object
* @description Stores members/methods of creation tracking system
* @version 1.0.0
*/
var SatakuTracking = (function() {
    var that = {
        /** Stores default actions to track from Smart Ad Server
        * @type {object}
        * @name SatakuTracking#action
        */
        action: {},
        /** Stores default redirects from Smart Ad Server
        * @type {object}
        * @name SatakuTracking#redirect
        */
        redirect: {},
        wasDisplayClickPixelSent: false,
        // /** Tracks pixel when Video Display Standard initializes
        // * @function SatakuTracking#displayVDSinit
        // * @returns {undefined}
        // */
        // displayVDSinit: function () {
        //     _that.debug.log('VDSinit');
        //     // Tutaj wrzucamy wszystkie piksele inicjujące start video w VDS'ie
        //     // _that.pixel('[url piksela]');
        // },
        /** Sets redirects from Sataku click microservice, falls back to Smart Adserver
        * @function SatakuTracking#getNewLinks
        * @returns {undefined}
        */
        getNewLinks:function(){
            console.log('new link', _that.config.campaign.campaignId)
            window.SatakuNewLinks = [''];
            window.SatakuNewCustoms = [''];
            if (DEBUG_MODE) {
                that.load();
                return;
            }
            that.MSSClicksAPI();
            that.MSSCustomAPI();
        },
        MSSClicksAPI:function(){
            console.log('sending info to MSS Click')
            window.savedOldLinks = {
                MSSisActive:false,
                redirects:that.redirect.lp,
                customs:that.action.custom
            }
            console.log(window.savedOldLinks);
            let getter = new XMLHttpRequest();
            const changeLinks = function(payload){
                payload.data.map(el=>{
                let date = Date.now();
                    window.SatakuNewLinks.push(el.url.replace('[id_smart_insertion]', _that.config.campaign.insertionId).replace('[timestamp]', date));
                })
                window.SatakuNewLinks.map((link, index)=>{
                    that.redirect.lp[index] = link
                })
            }
            getter.onreadystatechange = function(){
                if (getter.readyState !== 4) return;
                if (getter.status >= 200 && getter.status < 300) {
                    const payload = JSON.parse(getter.responseText)
                    if (payload && payload.Success && payload.data && payload.data.length > 0) {
                        console.log('MSS Click reply success', payload);
                        !payload.data.using_smart ? changeLinks(payload) : that.MSSFallback();
                        window.savedOldLinks.MSSisActive = true;
                    } else {
                        console.log('MSS Click reply error',getter);
                    }
                    that.load();
                } else {
                    console.log('MSS Click reply error',getter);
                    that.load();
                }
            }
            getter.open('GET', `https://click.sataku.com/api/get_urls/${_that.config.campaign.campaignId}`);
            getter.send();
        },
        MSSFallback:function(){
            window.savedOldLinks.MSSisActive = false;
            that.redirect.lp = window.savedOldLinks.redirects;
            that.action.custom = window.savedOldLinks.customs;
        },
        MSSCustomAPI:function(){
            console.log('sending info to MSS Customs')
            let getter = new XMLHttpRequest();
            const changeCustoms = function(payload){
                payload.data.map(el=>{
                    let date = Date.now();
                    window.SatakuNewCustoms.push(el.url.replace('[id_smart_insertion]', _that.config.campaign.insertionId).replace('[timestamp]', date));
                })
                window.SatakuNewCustoms.map((link, index)=>{
                    that.action.custom[index] = link
                })
            }
            getter.onreadystatechange = function(){
                if (getter.readyState !== 4) return;
                if (getter.status >= 200 && getter.status < 300) {
                    const payload = JSON.parse(getter.responseText)
                    if (payload && payload.Success && payload.data && payload.data.length > 0) {
                        console.log('MSS Custom reply success', payload);
                        changeCustoms(payload);
                    } else {
                        console.log('MSS Custom reply error',getter);
                    }
                    that.load();
                } else {
                    console.log('MSS Custom reply error',getter);
                    console.log(that)
                    that.load();
                }
            }
            getter.open('GET', `https://video.sataku.com/api/get_urls/${_that.config.campaign.campaignId}`);
            getter.send();
        },
        displayLoad: function() {
            _that.debug.log('displayLoad');
            //  Tutaj wrzucamy wszystkie piksele wyświetleń display'a
            // _that.pixel('[url piksela]');
        },
        /** Tracks pixel when expand opens
        * @function SatakuTracking#displayClick
        * @returns {undefined}
        */
        displayClick: function() {
            if (that.wasDisplayClickPixelSent) {
                console.log('not first displayClick, not sending pixels')
                return;
            }
            that.wasDisplayClickPixelSent = true;

            _that.debug.log('displayClick');
            _that.pixel(that.action.openExpand);
            // Tutaj wrzucamy wszystkie piksele kliknięć w display
            // _that.pixel('[url piksela]');


            // Stałe piksele sataku
            if (_that.config.deviceType === DEVICE_TYPE_DESKTOP){
                _that.pixel('https://track.adform.net/Serving/TrackPoint/?pm=1681851&lid=53543605')
            } else if (_that.config.deviceType === DEVICE_TYPE_MOBILE){
                _that.pixel('https://track.adform.net/Serving/TrackPoint/?pm=1681851&lid=53545814')
            }
            if(_that.config.publisher.tracking.click) {
                _that.pixel(_that.config.publisher.tracking.click);
            }
            if(_that.config.publisher.trackingAll.click) {
                _that.pixel(_that.config.publisher.trackingAll.click);
            }
        },
        /** Tracks pixel when display's endboard loads
        * @function SatakuTracking#endboard
        * @returns {undefined}
        */
        endboard: function() {
            _that.debug.log('endboard');
            // _that.pixel('[url piksela]');
        },
        /** Tracks pixel when video gets muted
        * @function SatakuTracking#videoMute
        * @param {number} version Version of tracked video
        * @returns {undefined}
        */
        videoMute: function(version) {
            _that.debug.log('videoMute', version);
            // _that.pixel('[url piksela]');
        },
        /** Tracks pixel when video gets unmuted
        * @function SatakuTracking#videoUnmute
        * @param {number} version Version of tracked video
        * @returns {undefined}
        */
        videoUnmute: function(version) {
            _that.debug.log('videoUnmute', version);
            // _that.pixel('[url piksela]');
        },
        /** Tracks pixel of video quartile
        * @function SatakuTracking#videoQuartile
        * @param {number} version Version of tracked video
        * @param {number} index Index of tracked quartile
        * @returns {undefined}
        */
        videoQuartile: function(version, index) {
            _that.debug.log('quartile', version, index);
            if (window.savedOldLinks.MSSisActive && version <= 3){
                _that.pixel(`//video.sataku.com/tracking/video/2/${_that.config.campaign.insertionId}/${index+1}/${version}/[TIMESTAMP]`)
            } else{
                _that.pixel(that.action.video[version]['quartile' + index]);
            }
        },
        /** Tracks pixel when video starts for the first time
        * @function SatakuTracking#videoStart
        * @param {number} version Version of tracked video
        * @returns {undefined}
        */
        videoStart: function(version) {
            _that.debug.log('videoStart', version);
            if (window.savedOldLinks.MSSisActive && version <= 3){
                _that.pixel(`https://video.sataku.com/tracking/video/2/${_that.config.campaign.insertionId}/1/${version}/[TIMESTAMP]`)
            }
            else{
                _that.pixel(that.action.video[version].start);
            }
        },
        /** Tracks pixel when video ends
        * @function SatakuTracking#videoEnd
        * @param {number} version Version of tracked video
        * @returns {undefined}
        */
        videoEnd: function(version) {
            _that.debug.log('videoEnd', version);
            if (window.savedOldLinks.MSSisActive && version <= 3){
                _that.pixel(`https://video.sataku.com/tracking/video/2/${_that.config.campaign.insertionId}/5/${version}/[TIMESTAMP]`)
            }
            else{
                _that.pixel(that.action.video[version].end);
            }

        },
        /** Tracks pixel when Real View goes in view for the first time
        * @function SatakuTracking#rvFirstInView
        * @returns {undefined}
        */
        rvFirstInView: function() {
            _that.debug.log('rvFirstInView');
            // _that.pixel('[url piksela]');
        },
        /** Tracks dwell time pixel when triggered
        * @function SatakuTracking#dwellCount
        * @param {number} time Value of timestamp
        * @returns {undefined}
        */
        dwellCount: function(time) {
            _that.debug.log('dwellTime', time);
            _that.pixel(
                PIXEL_BASE_URL + "czas/dwell.php?" +
                "id_smart=" + _that.config.campaignId +
                "&user=" + _that.config.SAS.campaign.timestamp +
                "&czas=" + time + "&id_insercja=" + _that.config.insertionId
            );
        },
        /** Sets anchors href to values from Smart Ad Server
        * @function SatakuTracking#load
        * @returns {undefined}
        */
        load: function() {
            var fb = document.stkQuery('a[href="{social_facebook}"]', true);
            var tw = document.stkQuery('a[href="{social_twitter}"]', true);
            var gp = document.stkQuery('a[href="{social_googleplus}"]', true);
            var set = function(node, url) {
                node.stkAttr({
                    'href': url,
                    'target': '_blank'
                });
            };

            for(var n in that.redirect.lp) {
                var el = document.stkQuery('a[href="{redirect_' + n + '}"]', true);
                for(var i = 0; i < el.length; i++) {
                    set(el[i], that.redirect.lp[n]);
                }
            }
            fb.stkIterate(function(node) { set(node, that.redirect.social.facebook); });
            tw.stkIterate(function(node) { set(node, that.redirect.social.twitter); });
            gp.stkIterate(function(node) { set(node, that.redirect.social.google); });
        },
    };

    /**
    * @inner
    * @name _that
    * @type {object}
    * @memberof SatakuTracking
    * @property {object} config {@link Sataku.config} object
    * @property {string} baseUrl Pixels URL
    * @property {object} debug {@link SatakuLogger} instance
    * @property {function} getCreative Gets creative
    * @property {function} getOrCreateLink Gets redirect
    * @property {function} createSmartLink Creates Smart Ad Server link
    * @property {function} createSmartPixel Creates Smart Ad Server pixel
    * @property {function} createRedirectPixel Creates Smart Ad Server redirect pixel
    */
    var _that = {
        config: {},
        baseUrl: String('https://www3.smartadserver.com/'),
        debug: new SatakuLogger({
            log: {
                'quartile': ['{Tracking} Video %s quartile %s', SatakuLogger.prototype.stylesheet.tracking],
                'videoEnd': ['{Tracking} Video %s ended', SatakuLogger.prototype.stylesheet.tracking],
                'videoStart': ['{Tracking} Video %s first start', SatakuLogger.prototype.stylesheet.tracking],
                'videoMute': ['{Tracking} Video %s muted', SatakuLogger.prototype.stylesheet.tracking],
                'videoUnmute': ['{Tracking} Video %s unmuted', SatakuLogger.prototype.stylesheet.tracking],
                'VDSinit': ['{Tracking} Display VDS Init', SatakuLogger.prototype.stylesheet.tracking],
                'rvFirstInView': ['{Tracking} RV first in view', SatakuLogger.prototype.stylesheet.tracking],
                'endboard': ['{Tracking} Endboard', SatakuLogger.prototype.stylesheet.tracking],
                'displayLoad': ['{Tracking} Display Load', SatakuLogger.prototype.stylesheet.tracking],
                'displayClick': ['{Tracking} Display Click', SatakuLogger.prototype.stylesheet.tracking],
                'dwellTime': ['{Tracking} Dwell Time %s', SatakuLogger.prototype.stylesheet.tracking],
            },
        }),
        getCreative: function(number) {
            return typeof _that.config.SAS.creative[number] === 'undefined' ? null : _that.config.SAS.creative[number];
        },
        getOrCreateLink: function(input) {
            if (input == parseInt(input, 10)) { return _that.createSmartLink(input); }
            else { return input; }
        },
        pixel: function (url, log) {
            if (!url) {
                console.error('Empty URL. Tracking excluded.');
                return;
            }

            url = url.replace("[timestamp]", stkGetRandomInt());
            url = url.replace("[TIMESTAMP]", stkGetRandomInt());

            if (url.split(':')[0] != 'https') {
                if (DEBUG_MODE) {
                    console.warn('Https tracking warn!');
                }
            }

            if (SATAKU_MODE == MODE_DEVELOPER && !PIXELS_LOCAL_TESTING_MODE) {
                console.log('Tracking pixel excluded: ' + url);
                return;
            }

            var img = new Image();
            img.src = url;

            if (DEBUG_MODE) {
                console.log('Pixel: ', url, log);
            }
        },
        script: function (script) {
            script = script || function () {};
            if (script.constructor !== Function) {
                throw new Error('Tracking script is not a function.');
            }
            if (SATAKU_MODE == MODE_DEVELOPER && !PIXELS_LOCAL_TESTING_MODE) {
                console.log('Tracking script excluded.');
                return;
            }
            script();
        },
        iframe: function (url) {
            if (!url) {
                throw new Error('Empty URL. Tracking excluded.');
            }
            if (SATAKU_MODE == MODE_DEVELOPER && !PIXELS_LOCAL_TESTING_MODE) {
                console.log('Tracking iframe excluded.');
                return;
            }
            var frame = document.createElement('iframe');
            url = url.replace("[timestamp]", stkGetRandomInt());
            url = url.replace("[TIMESTAMP]", stkGetRandomInt());
            frame.stkAttr({
                'frameborder': '0',
                'width': '0',
                'src': url,
                'height': '1',
            });
            frame.style.display = 'none';
            frame.appendTo('body');
        },
        createSmartLink: function (id) {
            if (_that.config.SAS.programmatic === undefined) { _that.config.SAS.programmatic = {}; }
            return (decodeURIComponent(_that.config.SAS.programmatic.clickTracking || '')) + this.baseUrl + 'call/cliccommand/' + id + '/' + stkGetRandomInt();
        },
        createSmartPixel: function (id) {
            return this.baseUrl + 'imp?imgid=' + id + '&tmstp=' + stkGetRandomInt() + '&tgt=[targeting]';
        },
        createRedirectPixel: function (id) {
            return this.baseUrl + 'call/clicpixel/' + id + '/' + stkGetRandomInt() + '?';
        },
    };

    return function(config) {
        SatakuTracking = null;
        _that.config = config;
        that.redirect = {
            lp: {},
            social: {
                facebook: _that.getOrCreateLink(_that.getCreative(1)),
                twitter: _that.getOrCreateLink(_that.getCreative(2)),
                google: _that.getOrCreateLink(_that.getCreative(3)),
                pinterest: _that.getOrCreateLink(_that.getCreative(4))
            }
        };
        that.action = {
            openExpand: _that.createSmartPixel(_that.getCreative(1)),
            video: {},
            custom: {},
            displayLoad: null,
            displayClick: null,
            displayVSDstart: Function,
        };

        for (var i = 1; i <= 16; i++) {
            that.redirect.lp[i] = _that.getOrCreateLink(_that.getCreative(i + 5));
        }
        for (var k = 1; k <= 5; k++) {
            that.action.custom[k] = _that.createSmartPixel(_that.getCreative(k + 16));
        }
        for (var j = 0; j < 3; j++) {
            that.action.video[j + 1] = {
                start: _that.createSmartPixel(_that.getCreative(j * 5 + 2)),
                quartile1: _that.createSmartPixel(_that.getCreative(j * 5 + 3)),
                quartile2: _that.createSmartPixel(_that.getCreative(j * 5 + 4)),
                quartile3: _that.createSmartPixel(_that.getCreative(j * 5 + 5)),
                end: _that.createSmartPixel(_that.getCreative(j * 5 + 6)),
                videoTime: 0,
                currentQuartile: 0,
                firstPlay: true,
                player: null
            };
        }

        return that.stkExt({
            /** Tracks the target pixel
            * @function SatakuTracking#pixel
            * @param {string} url URL of pixel
            * @param {string} log Message to log
            * @returns {undefined}
            */
            pixel: _that.pixel,
            /** Tracks the target pixel script
            * @function SatakuTracking#script
            * @param {function} script Function to invoke
            * @returns {undefined}
            */
            script: _that.script,
            /** Tracks the target pixel iframe
            * @function SatakuTracking#iframe
            * @param {string} url URL of target iframe
            * @returns {undefined}
            */
            iframe: _that.iframe,
        });
    };
})();

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

/** Stores SatakuSupervisor class
* @file
* @name supervisor.js
* @copyright (c) 2017, Sarigato Sp z o. o. All rights reserved.
* @version 2.0.0
*/

/**
* @class SatakuSupervisor
* @param {object} config {@link Sataku.config} object
* @description Sets vars that describes creation config
* @version 1.0.0
*/
var SatakuSupervisor = (function() {
    /**
    * @inner
    * @name _that
    * @type {object}
    * @memberof SatakuSupervisor
    * @property {object} debug {@link SatakuLogger} instance
    */
    var _that = {
        debug: new SatakuLogger({
            error: {
                'prodDevRel': ['{Supervisor} Product/Device relation illegal %s/%s', SatakuLogger.prototype.stylesheet.error],
            },
            log: {
                'friendlyFrame': ['{Supervisor} Friendly frame mode: %s', SatakuLogger.prototype.stylesheet.global],
                'expandable': ['{Supervisor} Product is expandable: %s', SatakuLogger.prototype.stylesheet.global],
                'prodDevRel': ['{Supervisor} Product/device relation valid: %s', SatakuLogger.prototype.stylesheet.global],
            }
        }),
    };

    var that = {
        /** Flag that stores information if creation is expandable
        * @type {boolean}
        * @name SatakuSupervisor#isExpandable
        */
        isExpandable: false,
        /** Flag that stores information if creation is runned in friendly frame mode
        * @type {boolean}
        * @name SatakuSupervisor#isFriendlyFrameMode
        */
        isFriendlyFrameMode: null,
        /** Flag that stores information if creation/device relation is valid
        * @type {boolean}
        * @name SatakuSupervisor#isProductRelationValid
        */
        isProductRelationValid: false,
    };

    return function(config) {
        SatakuSupervisor = null;
        that.stkExt({
            isFriendlyFrameMode: config.isFriendlyFrameMode,
            isProductRelationValid: PRODUCT_TYPES_BY_DEVICE[config.deviceAlias].indexOf(config.creationType) !== -1,
            isExpandable: EXPANDABLE_CREATION_TYPES.indexOf(config.creationType) !== -1
        });
        if (!that.isProductRelationValid) {
            _that.debug.error('prodDevRel', config.deviceAlias, config.runModeAlias);
        }
        _that.debug.log('expandable', that.isExpandable);
        _that.debug.log('prodDevRel', that.isProductRelationValid);
        _that.debug.log('friendlyFrame', that.isFriendlyFrameMode);
        return that;
    };
})();

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

var SatakuPixelHelper = (function() {
  return function(pixelData, tracking, params) {
    var _that = {
      data: {
        firstInteraction: null,
        custom: [],
        smart: [],
        trackly: []
      },
      tracking: tracking,
      maxNumberOfCustoms: 5, // number supported by back-end
      defaults: {
        description: '',
        once: false
      },
      debug: (function() {
        const whiteOnBlack = 'background-color: #000000; color: #dfdfdf;';
        const error = 'color: #750202; background-color: #999; font-weight: bold; font-family: verdana, helvetica, arial, sans-serif; font-size: 14px;';
        const stylesheets = {
          leftPadding: `${whiteOnBlack} padding: 3px 0px 3px 8px;`,
          rightPadding: `${whiteOnBlack} padding: 3px 8px 3px 0px;`,
          noPadding: `${whiteOnBlack} padding: 3px 0px 3px 0px;`,
          standout: `background-color: #000000; color: yellow; padding: 3px 0px 3px 0px; font-weight: bold;`,
          errorLeftPadding: `${error} padding: 3px 0px 3px 8px`,
          errorRightPadding: `${error} padding: 3px 8px 3px 0px`,
          errorNoPadding: `${error} padding: 3px 0px 3px 0px`
        };
        const satakuLogger = new SatakuLogger({
          log: {
            'config': [`{Pixel Helper} Final pixel data: %c%d%c customs, %c%d%c smart, %c%d%c trackly pixels:%c\n%o`, stylesheets.leftPadding],
            'pixelNotFoundLabel': [`{Pixel Helper} Pixel with label %c%s not found`, stylesheets.errorLeftPadding],
            'pixelNotFound': [`{Pixel Helper} Pixel %c%s not found`, stylesheets.errorLeftPadding],
            'noUrl': [`{Pixel Helper} Initialization: %c%s config at index %c%d has no URL, config omitted`, stylesheets.errorLeftPadding],
            'tooManyCustoms': [`{Pixel Helper} Initialization: Too many custom pixels given. Only first %c%d are taken into account, other %c%d are ignored`, stylesheets.errorLeftPadding],
            'mustBeArray': [`{Pixel Helper} Initialization: %c%s config property must be an array`, stylesheets.errorLeftPadding],
          },
        });
        const loggerWrapper = {
          config: function(data) {
            const {custom, smart, trackly} = data;
            satakuLogger.log('config', stylesheets.standout, custom.length, stylesheets.noPadding, stylesheets.standout, smart.length, stylesheets.noPadding, stylesheets.standout, trackly.length, stylesheets.rightPadding, '', data);
          },
          pixelNotFound: function(data, isLabel) {
            satakuLogger.log(`pixelNotFound${isLabel ? 'Label': ''}`, stylesheets.errorRightPadding, data);
          },
          noUrl: function(type, index) {
            satakuLogger.log('noUrl', stylesheets.errorNoPadding, type, stylesheets.errorRightPadding, index);
          },
          tooManyCustoms: function(max, ignored) {
            satakuLogger.log('tooManyCustoms', stylesheets.errorNoPadding, max, stylesheets.errorRightPadding, ignored);
          },
          mustBeArray: function(data) {
            satakuLogger.log('mustBeArray', stylesheets.errorRightPadding, data);
          },
        };
        return loggerWrapper;
      }()),
      findConfigWithLabel: function(label) {
        let found = false;
        let config = null;
        for (const pixelType in _that.data) {
          if (!found && _that.data.hasOwnProperty(pixelType)) {
            const pixelConfigs = _that.data[pixelType];
            if (pixelConfigs && pixelConfigs.length > 0) {
              for (let i = 0; i < pixelConfigs.length; i++) {
                if (pixelConfigs[i].label === label) {
                  config = pixelConfigs[i];
                  found = true;
                  break;
                }
              }
            }
          }
          if (found) break;
        }
        return config;
      },
      sendFirstInteraction: () => {
        if (_that.data.firstInteraction && _that.data.firstInteraction.config) {
          const config = _that.data.firstInteraction.config;
          if (!config) {
            _that.debug.pixelNotFound(`firstInteraction, type: ${config.type}, id:  ${config.id}`);
            return;
          }
          _that.send(config);
        }
      },
      send: (pixelConfig) => {
        if (pixelConfig.once && pixelConfig.sent) return;
        const {type, url, pixelId, description} = pixelConfig;
        const isLoggingEnabled = [window.MODE_DEVELOPER, window.MODE_PREVIEW].indexOf(window.SATAKU_MODE) !== -1;

        if (!DEBUG_MODE) {
          if (type === 'custom' && pixelId >= 1 && pixelId <= _that.maxNumberOfCustoms) {
            _that.tracking.pixel(_that.tracking.action.custom[pixelId]);
          } else if (type !== 'custom') {
            _that.tracking.pixel(url);
          }
        }

        pixelConfig.sent = true;

        let msg = `${type} ${pixelId}`;
        msg = (description && description !== '') ? msg + ': ' + description : msg;
        msg = url ? msg + ', url: ' + url : msg;
        if (isLoggingEnabled) console.log(msg);
      },
      setPixelConfigs: function() {
        let customId = 1;
        if (pixelData && typeof pixelData.custom !== 'undefined') {
          if (Array.isArray(pixelData.custom)) {
            if (pixelData.custom.length > _that.maxNumberOfCustoms) {
              if (!that.silent) _that.debug.tooManyCustoms( _that.maxNumberOfCustoms, pixelData.custom.length - _that.maxNumberOfCustoms);
            }
            if (pixelData.custom.length > 0) {
              for (let i = 0; i < pixelData.custom.length && i < _that.maxNumberOfCustoms; i++) {
                _that.data.custom.push({
                  type: 'custom', pixelId: customId, description: typeof pixelData.custom[i].description !== 'undefined' ? String(pixelData.custom[i].description) : _that.defaults.description, once: typeof pixelData.custom[i].once === 'boolean' ? pixelData.custom[i].once : _that.defaults.once, label: String(pixelData.custom[i].label), sent: false
                });
                customId++;
              }
            }
          } else {
            if (!that.silent) _that.debug.mustBeArray('custom');
          }
        }
        for (let j = _that.data.custom.length; j < _that.maxNumberOfCustoms; j++) {
          _that.data.custom.push({
            type: 'custom', pixelId: customId, description: _that.defaults.description, once: _that.defaults.once, sent: false
          });
          customId++;
        }
        ['smart', 'trackly'].forEach(pixelType => {
          let pixelId = 1;
          if (pixelData && typeof pixelData[pixelType] !== 'undefined') {
            if (Array.isArray(pixelData[pixelType])) {
              pixelData[pixelType].forEach((config, index) => {
                if (!config || (config && !config.url)) {
                  if (!that.silent) _that.debug.noUrl(pixelType, index);
                  return;
                }
                if (config) {
                  _that.data[pixelType].push({
                    type: pixelType, pixelId: pixelId, url: String(config.url), description: typeof config.description !== 'undefined' ? String(config.description) : _that.defaults.description, once: typeof config.once === 'boolean' ? config.once : _that.defaults.once, label: String(config.label), sent: false
                  });
                }
                pixelId++;
              });
            } else {
              if (!that.silent) _that.debug.mustBeArray(pixelType);
            }
          }
        });
        if (pixelData && typeof pixelData.firstInteraction !== 'undefined' && typeof pixelData.firstInteraction.type !== 'undefined' && ['custom', 'trackly', 'smart'].indexOf(pixelData.firstInteraction.type) !== -1 && typeof pixelData.firstInteraction.id !== 'undefined' && pixelData.firstInteraction.id >= 1) {
          let config;
          if (pixelData.firstInteraction.type === 'custom') {
            config = _that.data.custom[pixelData.firstInteraction.id - 1];
          } else if (pixelData.firstInteraction.type === 'smart') {
            config = _that.data.smart[pixelData.firstInteraction.id - 1];
          } else if (pixelData.firstInteraction.type === 'trackly') {
            config = _that.data.trackly[pixelData.firstInteraction.id - 1];
          }
          _that.data.firstInteraction = {
            type: pixelData.firstInteraction.type,
            id: pixelData.firstInteraction.id,
            config: config,
          };
        }
        if (!that.silent) _that.debug.config(_that.data);
      },
      init: function() {
        _that.setPixelConfigs();
      }
    };
    var that = {
      silent: false, // suppress most console logs
      getPixelData: function() {
        return _that.data;
      },
      custom: function(customId) {
        const config = _that.data.custom[customId - 1];
        if (!config) {
          _that.debug.pixelNotFound(`custom ${customId}`);
          return;
        }
        _that.sendFirstInteraction();
        _that.send(config);
      },
      smart: function(smartId) {
        const config = _that.data.smart[smartId - 1];
        if (!config) {
          _that.debug.pixelNotFound(`smart ${smartId}`);
          return;
        }
        _that.sendFirstInteraction();
        _that.send(config);
      },
      trackly: function(tracklyId) {
        const config = _that.data.trackly[tracklyId - 1];
        if (!config) {
          _that.debug.pixelNotFound(`trackly ${tracklyId}`);
          return;
        }
        _that.send(config);
      },
      label: function(label) {
        const config = _that.findConfigWithLabel(label);
        if (!config) {
          _that.debug.pixelNotFound(label, true);
          return;
        }
        _that.sendFirstInteraction();
        _that.send(config);
      }
    }.stkExt(params);
    _that.init();
    return that;
  };
}());

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

/**
* @file Stores SatakuPlayer class
* @name player.js
* @copyright (c) 2017, Sarigato Sp z o. o. All rights reserved.
* @version 2.0.0
*/

/**
* @class SatakuPlayer
* @description Video player desktop/mobile
* @param {object} config {@link Sataku.config} object
* @param {object} param Every property passed to this object will be assigned to the prototype
* @param {object} tracking {@link SatakuTracking} instance
* @version 1.0.0
*/
var SatakuPlayer = function(config, param, tracking) {
    var that = this;
    var isMobileDevice = config.deviceType === DEVICE_TYPE_MOBILE;
    that.stkExt({
        tracking: tracking,
        deviceAlias: config.deviceAlias,
        isMobileDevice: isMobileDevice,
        captureMode: stkBrowserSupportsPassiveEvents ? { passive: true } : false,
        clickEvent: isMobileDevice ? 'touchend' : 'click',
        guiAction: isMobileDevice ? 'playPause' : 'redirect', // possible options: 'playPause', 'toggleSound', 'redirect', 'none'
        hasControls: !isMobileDevice,
        areSocialsActive: ARE_SOCIALS_ACTIVE,
        guiAlwaysVisible: isMobileDevice
    }).stkExt(param)
    .stkExt({
        debug: new SatakuLogger({
            log: {
                'init': [`{Player ${that.version}} Init`, SatakuLogger.prototype.stylesheet.global],
                'promiseResolve': [`{Player ${that.version}} Promise resolved - video started`, SatakuLogger.prototype.stylesheet.global],
                'promiseUndefined': [`{Player ${that.version}} Browser doesn\'t support Promises`, SatakuLogger.prototype.stylesheet.global],
                'videoPaused': [`{Player ${that.version}} Video paused`, SatakuLogger.prototype.stylesheet.global],
            },
            error: {
                'promiseCatch': [`{Player ${that.version}} Error caught by play promise: %o`, SatakuLogger.prototype.stylesheet.error],
            },
        }),
        view: {
            video: 'video',
            gui: that.hasControls ? {
                anchor: that.guiAction === 'redirect' ? 'a' : null,
                'volume-icon': {
                    'sound-on': 'svg',
                    'sound-off': 'svg'
                },
                controls: {
                    ['controls-overlay']: 'div',
                    ['seekbar-area']: {
                        seekbar: { progressbar: 'div' },
                    },
                    ['controls-bottom']: {
                        resume: {
                            play: 'svg',
                            pause: 'svg'
                        },
                        volume: {
                            'sound-on': 'svg',
                            'sound-off': 'svg'
                        },
                        timebar: 'div',
                    }
                },
                socials: that.areSocialsActive ? {
                    facebook: 'svg',
                    twitter: 'svg',
                    googleplus: 'svg',
                } : null
            } : {
                anchor: that.guiAction === 'redirect' ? 'a' : null,
                resume: 'svg',
                seekbar: { progressbar: 'div' },
                'volume-icon': {
                    'sound-on': 'svg',
                    'sound-off': 'svg'
                },
            },
            endboard: {
                overlay: 'div',
                anchor : !that.hasReplay ? 'a' : null,
                replay: that.hasReplay ? {
                    ['replay-content']: {
                        replay: 'svg',
                        text: 'div',
                    }
                } : null,
                socials: that.hasControls && that.areSocialsActive ? {
                    facebook: 'svg',
                    twitter: 'svg',
                    googleplus: 'svg',
                    share: !isMobileDevice ? 'div' : null,
                } : null
            }
        }
    });
    return that;
};

SatakuPlayer.prototype = {
    /** Defines svg path data
    * @type {object}
    */
    svgData: {
        facebook: 'M 17.880558,15.098708 C 17.880558,15.832976 17.880558,16.567244 17.880558,17.301512 17.342602,17.301512 16.804645,17.301512 16.266689,17.301512 16.266689,18.199468 16.266689,19.097425 16.266689,19.995381 16.804645,19.995381 17.342602,19.995381 17.880558,19.995381 17.880558,22.663587 17.880558,25.331794 17.880558,28 18.985636,28 20.090714,28 21.195792,28 21.195792,25.331794 21.195792,22.663587 21.195792,19.995381 21.937349,19.995381 22.678906,19.995381 '+
        '23.420463,19.995381 23.558381,19.098583 23.66336,18.196509 23.729812,17.291562 22.889316,17.291562 22.048819,17.291562 21.208323,17.291562 21.21884,16.642429 21.187083,15.990102 21.224552,15.343006 21.373268,14.849251 21.910063,14.765867 22.350798,14.804258 22.811636,14.804258 23.272473,14.804258 23.733311,14.804258 23.733311,13.869505 23.733311,12.934753 23.733311,12 22.664257,12.018578 21.59144,11.955833 20.525525,12.04699 19.427947,12.143992 18.343043,12.843514 '+ '18.038079,13.941391 17.919241,14.314623 17.874572,14.708027 17.880558,15.098708 Z',
        twitter: 'M 10.627759,26.558045 C 14.627797,26.506221 15.923603,24.432741 15.923603,24.432741 15.923603,24.432741 13.205997,24.328213 12.509179,22.063549 12.509179,22.063549 13.867976,22.098401 13.937658,21.784819 13.937658,21.784819 11.359425,21.15768 11.011008,17.917462 11.63815,18.335555 12.544014,18.16134 12.544014,18.16134 12.544014,18.16134 9.7218892,15.44374 11.568463,13.004868 11.568463,13.004868 14.495116,17.220633 19.756113,17.220633 '+
        '19.338023,10.113062 25.992658,11.82027 26.515276,13.388117 L 28.954151,12.551934 27.560511,14.433349 29.372241,14.293998 27.490827,16.105731 C 28.675427,22.655848 20.801339,31.505472 10.627759,26.558045 Z',
        googleplus: 'M 20.251953 11.998047 C 19.419234 11.996305 18.586057 11.998207 17.753906 12.021484 C 16.099203 12.096703 14.344647 12.909623 13.646484 14.490234 C 12.952837 15.875196 13.375643 17.710391 14.652344 18.605469 C 15.455522 19.201996 16.501669 19.350466 17.474609 19.222656 C 17.065402 19.935486 17.299761 20.825211 17.839844 21.398438 C 17.443354 21.602811 16.376106 21.521679 15.75 21.730469 C 14.330457 22.011578 12.785212 22.808925 12.361328 24.298828 '+
        'C 11.976081 25.489047 12.683749 26.777396 13.755859 27.326172 C 15.280879 28.135584 17.119843 28.135507 18.771484 27.769531 C 20.361546 27.404773 21.949673 26.273257 22.257812 24.583984 C 22.480237 23.507584 22.035886 22.379372 21.208984 21.673828 C 20.663777 21.109854 19.962667 20.724835 19.427734 20.154297 C 18.904888 19.462166 19.583741 18.692337 20.158203 18.308594 C 21.008378 17.672657 21.643604 16.683032 21.59375 15.589844 C 21.627595 14.45841 20.984009 13.418494 20.101562 '+ '12.753906 C 20.545509 12.740854 21.003729 12.780811 21.439453 12.736328 C 21.876212 12.491013 22.313252 12.245323 22.75 12 C 21.917451 12.005647 21.084672 11.999789 20.251953 11.998047 z M 17.019531 12.689453 C 17.150274 12.683828 17.282166 12.693493 17.414062 12.71875 C 18.636565 12.965367 19.282842 14.209569 19.576172 15.314453 C 19.791912 16.224119 19.92282 17.349963 19.21875 18.087891 C 18.46691 18.845439 17.125244 18.875941 16.378906 18.091797 '+
        'C 15.44923 17.143521 15.06606 15.727068 15.199219 14.425781 C 15.26682 13.487454 16.104335 12.728831 17.019531 12.689453 z M 24.25 16.787109 L 24.25 18.796875 L 22.25 18.796875 L 22.25 20.267578 L 24.25 20.267578 L 24.25 22.277344 L 25.720703 22.277344 L 25.720703 20.267578 L 27.738281 20.267578 L 27.738281 18.796875 L 25.720703 18.796875 L 25.720703 16.787109 L 24.25 16.787109 z M 18.492188 22.066406 C 19.092227 22.329289 19.610797 22.827625 20.123047 23.25 '+
        'C 20.578523 23.659405 20.923436 24.218152 20.900391 24.849609 C 20.94755 25.965818 19.959423 26.827438 18.921875 27.001953 C 17.557892 27.257539 15.999547 27.122953 14.890625 26.216797 C 13.869886 25.421725 13.839201 23.676217 14.916016 22.917969 C 15.93475 22.168415 17.268234 22.058352 18.492188 22.066406 Z',
        play: 'M6,4.5L6 19.5 19 12 6 4.5Z',
        pause: 'M13,5h5V19H13ZM6,5h5V19H6Z',
        'sound-on': 'M4,16H7.51L13,20V4L7.51,8H4Zm13.47,2.21-1.29-1.33a6,6,0,0,0,0-9.86L17.47,5.7a7.82,7.82,0,0,1,0,12.51ZM17.05,12a4.26,4.26,0,0,0-2.12-3.71L13.57,9.6a2.5,2.5,0,0,1,0,4.7l1.36,1.36A4.25,4.25,0,0,0,17.05,12Z',
        'sound-off': 'M17.47,5.7,16.18,7A6,6,0,0,1,18.76,12a5.9,5.9,0,0,1-2,4.42L15.6,15.18a4.31,4.31,0,0,0-.67-6.94L13.57,9.6a2.49,2.49,0,0,1,.71,4.29L13,12.57,13,4,8.12,7.7,4.61,4.18,3.32,5.47,19,21.11l1.29-1.29-2.12-2.13A7.9,7.9,0,0,0,20.6,12,7.81,7.81,0,0,0,17.47,5.7ZM4,16H7.51L13,20V17L4,8Z',
        'sound-on-icon': 'M26.5,50A23.49,23.49,0,1,0,9.88,43.12,23.45,23.45,0,0,0,26.5,50Zm7.74-15.26L32.49,33a8.12,8.12,0,0,0,0-13.34l1.75-1.79a10.58,10.58,0,0,1,0,16.92Zm-6.47-1.62,0-17.76-7.42,6.2-4.19-.1,0,0H14.5v10h6l7.25,5.94Zm5.9-6.84a5.73,5.73,0,0,0-2.88-5L29,23.1a3.39,3.39,0,0,1,0,6.36l1.83,1.83a5.73,5.73,0,0,0,2.88-5Zm11.57,19A26.51,26.51,0,1,1,53,26.5,26.45,26.45,0,0,1,45.24,45.24Z',
        'sound-off-icon': 'M26.5,50A23.49,23.49,0,1,0,9.88,43.12,23.45,23.45,0,0,0,26.5,50Zm7.74-32.18-1.76,1.8A8.17,8.17,0,0,1,36,26.35a8,8,0,0,1-2.68,6l-1.62-1.63a5.87,5.87,0,0,0-.93-9.45l-1.84,1.85a3.38,3.38,0,0,1,2.24,3.21A3.33,3.33,0,0,1,29.88,29l-2.15-2.16V15.36l-6.24,5.19L16.7,15.76l-1.76,1.75L36.26,38.83,38,37.07l-2.9-2.9a10.7,10.7,0,0,0-.88-16.35ZM14.5,31.4h6l7.25,5.94V33.12L16.08,21.43H14.5ZM45.24,45.24A26.51,26.51,0,1,1,53,26.5,26.45,26.45,0,0,1,45.24,45.24Z',
        replay: 'M26.5,50A23.49,23.49,0,1,0,9.88,43.12,23.45,23.45,0,0,0,26.5,50ZM22,19H18V34h4V26.5l6-3.75L34,19V34l-6-3.75L22,26.5ZM45.24,45.24A26.51,26.51,0,1,1,53,26.5,26.45,26.45,0,0,1,45.24,45.24Z',
        resumePlay: 'M42.8,37.5 v 25 L 64.6,50Z',
        autoplayTestSource: 'data:video/mp4;base64,AAAAIGZ0eXBtcDQyAAAAAG1wNDJtcDQxaXNvbWF2YzEAAATKbW9vdgAAAGxtdmhkAAAAANLEP5XSxD+VAAB1MAAAdU4AAQAAAQAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAABA'+
            'AAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAACFpb2RzAAAAABCAgIAQAE////9//w6AgIAEAAAAAQAABDV0cmFrAAAAXHRraGQAAAAH0sQ/ldLEP5UAAAABAAAAAAAAdU4AAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAABAAAAAAoAAAAFoAAAAAAAkZWR0cwAAABxlbHN0AAAAAAAAAAEAAHVOAAAH0gABAAAAAAOtbWRpYQAAACBtZGhkAAAAANLEP5XSxD+VAAB1MAAAdU5V'+
            'xAAAAAAANmhkbHIAAAAAAAAAAHZpZGUAAAAAAAAAAAAAAABMLVNNQVNIIFZpZGVvIEhhbmRsZXIAAAADT21pbmYAAAAUdm1oZAAAAAEAAAAAAAAAAAAAACRkaW5mAAAAHGRyZWYAAAAAAAAAAQAAAAx1cmwgAAAAAQAAAw9zdGJsAAAAwXN0c2QAAAAAAAAAAQAAALFhdmMxAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAoABaABIAAAASAAAAAAAAAABCkFWQyBDb2RpbmcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP//AAAAOGF2Y0MBZAAf/+EAHGdkAB+s2UCgL/lwFqCgoKgAAB9IAAdTAHjBjLABAAVo6+yyLP34+AAAAAATY29scm5jbHgABQAFAAUAAAAAEHBhc3AAAAABAAAAAQAAABhzdHRzAAAAAAAAAAEAAAAeAAAD6QAAAQBjdHRz'+
            'AAAAAAAAAB4AAAABAAAH0gAAAAEAABONAAAAAQAAB9IAAAABAAAAAAAAAAEAAAPpAAAAAQAAE40AAAABAAAH0gAAAAEAAAAAAAAAAQAAA+kAAAABAAATjQAAAAEAAAfSAAAAAQAAAAAAAAABAAAD6QAAAAEAABONAAAAAQAAB9IAAAABAAAAAAAAAAEAAAPpAAAAAQAAE40AAAABAAAH0gAAAAEAAAAAAAAAAQAAA+kAAAABAAATjQAAAAEAAAfSAAAAAQAAAAAAAAABAAAD6QAAAAEAABONAAAAAQAAB9IAAAABAAAAAAAAAAEAAAPpAAAAAQAAB9IAAAAUc3RzcwAAAAAAAAABAAAAAQAAACpzZHRwAAAAAKaWlpqalpaampaWmpqWlpqalpaampaWmpqWlpqalgAAABxzdHNjAAAAAAAAAAEAAAABAAAAHgAAAAEAAACMc3RzegAAAAAAAAAAAAAAHg'+
            'AAA5YAAAAVAAAAEwAAABMAAAATAAAAGwAAABUAAAATAAAAEwAAABsAAAAVAAAAEwAAABMAAAAbAAAAFQAAABMAAAATAAAAGwAAABUAAAATAAAAEwAAABsAAAAVAAAAEwAAABMAAAAbAAAAFQAAABMAAAATAAAAGwAAABRzdGNvAAAAAAAAAAEAAAT6AAAAGHNncGQBAAAAcm9sbAAAAAIAAAAAAAAAHHNiZ3AAAAAAcm9sbAAAAAEAAAAeAAAAAAAAAAhmcmVlAAAGC21kYXQAAAMfBgX///8b3EXpvebZSLeWLNgg2SPu73gyNjQgLSBjb3JlIDE0OCByMTEgNzU5OTIxMCAtIEguMjY0L01QRUctNCBBVkMgY29kZWMgLSBDb3B5bGVmdCAyMDAzLTIwMTUgLSBodHRwOi8vd3d3LnZpZGVvbGFuLm9yZy94MjY0Lmh0bWwgLSBvcHRpb25zOiBjYWJh'+
            'Yz0xIHJlZj0zIGRlYmxvY2s9MTowOjAgYW5hbHlzZT0weDM6MHgxMTMgbWU9aGV4IHN1Ym1lPTcgcHN5PTEgcHN5X3JkPTEuMDA6MC4wMCBtaXhlZF9yZWY9MSBtZV9yYW5nZT0xNiBjaHJvbWFfbWU9MSB0cmVsbGlzPTEgOHg4ZGN0PTEgY3FtPTAgZGVhZHpvbmU9MjEsMTEgZmFzdF9wc2tpcD0xIGNocm9tYV9xcF9vZmZzZXQ9LTIgdGhyZWFkcz0xMSBsb29rYWhlYWRfdGhyZWFkcz0xIHNsaWNlZF90aHJlYWRzPTAgbnI9MCBkZWNpbWF0ZT0xIGludGVybGFjZWQ9MCBibHVyYXlfY29tcGF0PTAgc3RpdGNoYWJsZT0xIGNvbnN0cmFpbmVkX2ludHJhPTAgYmZyYW1lcz0zIGJfcHlyYW1pZD0yIGJfYWRhcHQ9MSBiX2JpYXM9MCBkaX'+
            'JlY3Q9MSB3ZWlnaHRiPTEgb3Blbl9nb3A9MCB3ZWlnaHRwPTIga2V5aW50PWluZmluaXRlIGtleWludF9taW49Mjkgc2NlbmVjdXQ9NDAgaW50cmFfcmVmcmVzaD0wIHJjX2xvb2thaGVhZD00MCByYz0ycGFzcyBtYnRyZWU9MSBiaXRyYXRlPTExMiByYXRldG9sPTEuMCBxY29tcD0wLjYwIHFwbWluPTUgcXBtYXg9NjkgcXBzdGVwPTQgY3BseGJsdXI9MjAuMCBxYmx1cj0wLjUgdmJ2X21heHJhdGU9ODI1IHZidl9idWZzaXplPTkwMCBuYWxfaHJkPW5vbmUgZmlsbGVyPTAgaXBfcmF0aW89MS40MCBhcT0xOjEuMDAAgAAAAG9liIQAFf/+963fgU3DKzVrulc4tMurlDQ9UfaUpni2SAAAAwAAAwAAD/DNvp9RFdeXpgAAAwB+ABHAWYLWH'+
            'UFwGoHeKCOoUwgBAAADAAADAAADAAADAAAHgvugkks0lyOD2SZ76WaUEkznLgAAFFEAAAARQZokbEFf/rUqgAAAAwAAHVAAAAAPQZ5CeIK/AAADAAADAA6ZAAAADwGeYXRBXwAAAwAAAwAOmAAAAA8BnmNqQV8AAAMAAAMADpkAAAAXQZpoSahBaJlMCCv//rUqgAAAAwAAHVEAAAARQZ6GRREsFf8AAAMAAAMADpkAAAAPAZ6ldEFfAAADAAADAA6ZAAAADwGep2pBXwAAAwAAAwAOmAAAABdBmqxJqEFsmUwIK//+tSqAAAADAAAdUAAAABFBnspFFSwV/wAAAwAAAwAOmQAAAA8Bnul0QV8AAAMAAAMADpgAAAAPAZ7rakFfAAADAAADAA6YAAAAF0Ga8EmoQWyZTAgr//61KoAAAAMAAB1RAAAAEUGfDkUVLBX/AAADAAADAA6ZAAAADwGfLXRBXwAA'+
            'AwAAAwAOmQAAAA8Bny9qQV8AAAMAAAMADpgAAAAXQZs0SahBbJlMCCv//rUqgAAAAwAAHVAAAAARQZ9SRRUsFf8AAAMAAAMADpkAAAAPAZ9xdEFfAAADAAADAA6YAAAADwGfc2pBXwAAAwAAAwAOmAAAABdBm3hJqEFsmUwIK//+tSqAAAADAAAdUQAAABFBn5ZFFSwV/wAAAwAAAwAOmAAAAA8Bn7V0QV8AAAMAAAMADpkAAAAPAZ+3akFfAAADAAADAA6ZAAAAF0GbvEmoQWyZTAgr//61KoAAAAMAAB1QAAAAEUGf2kUVLBX/AAADAAADAA6ZAAAADwGf+XRBXwAAAwAAAwAOmAAAAA8Bn/tqQV8AAAMAAAMADpkAAAAXQZv9SahBbJlMCCv//rUqgAAAAwAAHVE='
    },
    /** Defines if socials are active
    * @type {boolean}
    */
    areSocialsActive: false,
    /** Defines if socials are on the right side
    * @type {boolean}
    */
    areSocialsOnTheRightSide: false,
    /** Player video version
    * @type {number}
    */
    version: 1,
    /** {@link SatakuTracking} instance
    * @type {object}
    */
    tracking: null,
    /** Defines listeners capture mode
    * @type {object}
    */
    captureMode: null,
    /** Contains flags that stores information if some of players actions should be blocked when swipe occurs
    * @type {object}
    */
    swipeBlockFlags: {
        gui: null,
        endboard: null,
        seekbar: null
    },
    /** Player video poster URL
    * @type {string}
    */
    posterURL: null,
    /** Player video source URL
    * @type {string}
    */
    sourceURL: null,
    /** Player video endboard URL
    * @type {string}
    */
    endboardURL: null,
    /** Player video anchor URL
    * @type {string}
    */
    anchorURL: '{redirect_1}',
    /** Parent node of a player
    * @type {node}
    */
    wrapper: null,
    /** Name of runned device
    * @type {string}
    */
    deviceAlias: null,
    /** Flag that stores information about used device
    * @type {boolean}
    */
    isMobileDevice: null,
    /** Id of SatakuTicker task used in player
    * @type {string}
    */
    tickerReference: null,
    /** Flag that stores information should video autoplay
    * @type {boolean}
    */
    shouldAutoplay: true,
    /** Flag that stores information if browser supports autoplay
    * @type {boolean}
    */
    isAutoplaySupported: null,
    /** Flag that stores information about player play/pause request status
    * @type {boolean}
    */
    playRequestStateActive: false,
    /** Id of a current video quartile
    * @type {number}
    */
    currentQuartile: 0,
    /** Flag that stores information if video was played for first time
    * @type {boolean}
    */
    firstPlay: false,
    /** Flag that stores information if tracking should be enabled (disable if really necessary)
     * @type {boolean}
     */
    isTrackingEnabled: true,
    /** Flag that stores information if desktop-style controls should be shown
     * @type {boolean}
     */
    hasControls: true,
    /** Flag that stores information if endboard has replay functionality
     * @type {boolean}
     */
    hasReplay: true,
    /** Flag that stores information if player is running in display format, if true, unblocks gui action
     * @type {boolean}
     */
    isRunModeDisplay: false,
    /** Flag that stores information if video is looped
     * @type {boolean}
     */
    looped: false,
    /** Flag that stores information what click event type is used
     * @type {string('click'|'touchend')}
     */
    clickEvent: 'click',
    /** Flag that stores information what action should be bound to GUI
     * @type {string('playPause'|'toggleSound'|'redirect'|'none')}
     */
    guiAction: 'playPause',
    /** {@link SatakuLogger} instance
    * @type {object}
    */
    debug: null,
    /** Object containing the structure of a player
    * @type {object}
    */
    view: null,
    /** Volume change handler callback
    * @function SatakuPlayer#onVolumeChange
    * @param {boolean} isSoundOn True if sound becomes active, else false
    * @returns {undefined}
    */
    onVolumeChange: null,
    /** Builds player HTML structure
    * @function SatakuPlayer#buildView
    * @param {object} struct Structure to build
    * @param {node} wrapper Parent node to append to the structure
    * @returns {undefined}
    */
    buildView: function() {
        var that = this;
        var element = null;
        var override = {};
        (function() {
          return function builder(struct, wrapper, override) {
            for(var i in struct) {
              if (i === 'wrapper') { continue; }
              if (struct[i] === null) { continue; }
              var type = struct[i] !== null && struct[i].constructor === String ? struct[i] : 'div';
              if (type === 'svg') {
                var width = 40, height = 40;
                if (wrapper.className === 'player-gui-wrapper') {
                  width = height = 100;
                } else if (['player-replay-content-wrapper', 'player-volume-icon-wrapper'].indexOf(wrapper.className) !== -1) {
                  width = height = 53;
                } else if (['player-volume-wrapper', 'player-resume-wrapper'].indexOf(wrapper.className) !== -1) {
                  width = height = 24;
                }
                element = getNSElement.svg({ width: width, height: height });
              } else {
                element = document.createElement(type);
              }
              if (struct[i] !== null && struct[i].constructor === Object) {
                element.setAttribute('class', 'player-'+i+'-wrapper')
                wrapper.appendChild(element);
                override[i] = { wrapper: element };
                builder(struct[i], element, override[i]);
              } else {
                element.setAttribute('class', 'player-'+i);
                wrapper.appendChild(element);
                override[i] = element;
              }
            }
          };
        })()(that.view, that.wrapper, override);
        that.view = override;
        override = null;
    },
    /** Set defaults to player HTML structure
    * @function SatakuPlayer#setView
    * @returns {undefined}
    */
    setView: function() {
        var that = this;

        if (that.isMobileDevice) {
            that.wrapper.classList.add('mobile');
        }

        if (that.guiAlwaysVisible) {
            that.wrapper.classList.add('gui-visible');
        }

        if (!that.hasControls) {
            that.wrapper.classList.add('cursor-pointer');
        }

        // volume-icon
        if (that.hasControls) {
            that.view.gui['volume-icon'].wrapper.classList.add('disabled');
            that.view.gui['volume-icon'].wrapper.classList.add('hidden');
        }
        ['sound-on', 'sound-off'].forEach(entry => {
            var element = that.view.gui['volume-icon'][entry];
            var bg = getNSElement.newElement('circle', { cx: 26.5, cy: 26.5, r: 23.53 });
            bg.stkAddClass('player-volume-icon-bg');
            element.appendChild(bg);
            var icon = getNSElement.newElement('path', { d: that.svgData[`${entry}-icon`] });
            element.appendChild(icon);
        });

        // volume
        if (that.hasControls) {
            ['sound-on', 'sound-off'].forEach(entry => {
                var element = that.view.gui.controls['controls-bottom'].volume[entry];
                var icon = getNSElement.newElement('path', { d: that.svgData[entry] });
                element.appendChild(icon);
            });
        }

        // replay
        if (that.hasReplay) {
            var element = that.view.endboard.replay['replay-content'].replay;
            var icon = getNSElement.newElement('path', { d: that.svgData.replay });
            element.appendChild(icon);
            that.view.endboard.replay['replay-content'].text.innerHTML = 'odtwórz ponownie';
        } else {
            if (that.view.endboard.anchor) that.view.endboard.anchor.stkAttr({ target: '_blank', href: that.anchorURL});
        }

        // resume
        if (!that.hasControls) {
            var element = that.view.gui.resume;
            var circle = getNSElement.newElement('circle', { cx: 50, cy: 50, r: 48 });
            circle.stkAddClass('player-resume-circle');
            element.appendChild(circle);
            var icon = getNSElement.newElement('path', { d: that.svgData.resumePlay });
            element.appendChild(icon);
        } else {
            ['play', 'pause'].forEach(entry => {
                var element = that.view.gui.controls['controls-bottom'].resume[entry];
                var icon = getNSElement.newElement('path', { d: that.svgData[entry] });
                element.appendChild(icon);
            });
        }

        if (that.hasControls) {
            if (that.view.gui.anchor) that.view.gui.anchor.stkAttr({ href: that.anchorURL, target: '_blank' });
            that.view.gui.controls['controls-bottom'].timebar.innerHTML = '00:00 / 00:00';

            // socials
            if (that.areSocialsActive) {
                if (that.areSocialsOnTheRightSide) that.view.gui.socials.wrapper.classList.add('right-side');
                ['facebook', 'twitter', 'googleplus'].forEach(entry => {
                    [that.view.gui.socials[entry], that.view.endboard.socials[entry]].forEach(element => {
                        var anchor = document.createElement('a');
                        anchor.stkAttr({ target: '_blank', href: '{social_'+entry+'}' });
                        element.parentNode.appendChild(anchor);
                        if (that.areSocialsOnTheRightSide && element !== that.view.endboard.socials[entry]) {
                            element.appendChild(getNSElement.newElement('circle', { cx: 120, cy: 20, r: 19 }));
                            element.appendChild(getNSElement.newElement('path', { d: that.svgData[entry], transform: 'translate(100, 0)' }));
                        } else {
                            element.appendChild(getNSElement.newElement('circle', { cx: 20, cy: 20, r: 19 }));
                            element.appendChild(getNSElement.newElement('path', { d: that.svgData[entry] }));
                        }
                        element.stkAddClass('social-anchor');
                        anchor.appendChild(element);
                    });
                    [that.view.gui.socials[entry]].forEach(element => {
                        var textNode = getNSElement.newElement('text', { x: that.areSocialsOnTheRightSide ? 20 : 60, y: 23 });
                        textNode.textContent = 'udostępnij';
                        getNSElement.setViewbox(element, 140, 40);
                        var groupElement = getNSElement.newElement('g', {});
                        var rect = getNSElement.newElement('rect', { width: 140, height: 40, rx: 20, ry: 20, x: 0, y: 0 });
                        groupElement.appendChild(rect);
                        groupElement.appendChild(textNode);
                        element.insertBefore(
                            groupElement,
                            element.firstChild
                        );
                    });
                });

                if (!that.isMobileDevice) {
                    that.view.endboard.socials.share.innerHTML = 'udostępnij znajomym';
                    that.view.endboard.socials.wrapper.appendChild(that.view.endboard.socials.share);
                }
            }
        }
    },
    /** Set value of currentQuartile and tracks that quartile
    * @function SatakuPlayer#setQuartile
    * @param {number} index Index of quartile to set
    * @returns {undefined}
    */
    setQuartile: function(index) {
        var that = this;
        that.currentQuartile = index;
        if (that.isTrackingEnabled) that.tracking.videoQuartile(that.version, that.currentQuartile);
    },
    /** Sets essential listeners for video and GUI
    * @function SatakuPlayer#setListeners
    * @returns {undefined}
    */
    setListeners: function() {
        var that = this;

        that.view.video.stkListen('playing', function(event) {
            that.view.gui['volume-icon'].wrapper.classList[!that.isMuted() ? 'add' : 'remove']('sound-on');
            if (that.hasControls) {
                that.view.gui.controls['controls-bottom'].volume.wrapper.classList[!that.isMuted() ? 'add' : 'remove']('sound-on');
                that.view.gui.controls['controls-bottom'].resume.wrapper.stkAddClass('active');
            } else {
                that.view.gui.resume.stkAddClass('active');
            }
            SatakuTicker.kill(that.tickerReference);
            that.tickerReference = SatakuTicker.push(function() { that.updateVideoProgress(); });
            if (that.hasReplay) {
                if (that.view.endboard.wrapper.className.indexOf('active') !== -1) {
                    that.view.endboard.wrapper.stkRemoveClass('active');
                }
            }
            that.playRequestStateActive = false;
            if(!that.firstPlay) {
                if (that.isTrackingEnabled) that.tracking.videoStart(that.version);
                that.firstPlay = true;
            }
        }, false);

        that.view.video.stkListen('pause', function(event) {
            if (!that.looped) {
                if (!that.hasControls) {
                    that.view.gui.resume.stkRemoveClass('active');
                } else {
                    that.view.gui.controls['controls-bottom'].resume.wrapper.stkRemoveClass('active');
                }
            }
            try {
                SatakuTicker.kill(that.tickerReference);
            } catch(e) {}
            that.playRequestStateActive = false;
        }, false);

        that.view.video.stkListen('volumechange', function(event) {
            that.view.gui['volume-icon'].wrapper.classList[!that.isMuted() ? 'add' : 'remove']('sound-on');
            if (that.hasControls) {
              that.view.gui.controls['controls-bottom'].volume.wrapper.classList[!that.isMuted() ? 'add' : 'remove']('sound-on');
            }
        }, false);

        that.view.video.stkListen('ended', function(event) {
            if (that.looped) {
                that.start();
            } else {
                that.view.endboard.wrapper.stkAddClass('active');
            }
            that.playRequestStateActive = false;
            that.currentQuartile = 0;
            that.firstPlay = false;
            if (that.isTrackingEnabled) that.tracking.videoEnd(that.version);
        }, false);

        that.view.video.stkListen('timeupdate', function(event) {
            var percent = (this.currentTime/this.duration)*100;
            if (percent >= 25 && that.currentQuartile < 1) {
                that.setQuartile(1);
            }
            if (percent >= 50 && that.currentQuartile < 2) {
                that.setQuartile(2);
            }
            if (percent >= 75 && that.currentQuartile < 3) {
                that.setQuartile(3);
            }
        }, false);

        that.view.gui['volume-icon'].wrapper.stkListen(that.clickEvent, function(event) {
            event.stopPropagation();
            that.isMuted() ? that.unmute() : that.mute();
        }, that.captureMode);

        if (that.isMobileDevice) {
            that.view.gui.wrapper.stkListen('touchstart', function(event) { that.swipeBlockFlags.gui = (event.touches || event.targetTouches).length > 1 ? true : false; }, that.captureMode);
            that.view.gui.wrapper.stkListen('touchmove', function(event) { that.swipeBlockFlags.gui = true; }, that.captureMode);

            if (that.hasReplay) {
                that.view.endboard.replay.wrapper.stkListen('touchstart', function(event) { that.swipeBlockFlags.endboard = (event.touches || event.targetTouches).length > 1 ? true : false; }, that.captureMode);
                that.view.endboard.replay.wrapper.stkListen('touchmove', function(event) { that.swipeBlockFlags.endboard = true; }, that.captureMode);
            }

            if (that.hasControls) {
                that.view.gui.controls['seekbar-area'].wrapper.stkListen('touchstart', function(event) { that.swipeBlockFlags.seekbar = (event.touches || event.targetTouches).length > 1 ? true : false; }, that.captureMode);
                that.view.gui.controls['seekbar-area'].wrapper.stkListen('touchmove', function(event) { that.swipeBlockFlags.seekbar = true; }, that.captureMode);
            }
        }

        if (that.hasControls) {
            that.view.gui.controls.wrapper.stkListen(that.clickEvent, function(event) { event.stopPropagation(); }, that.captureMode);
            that.view.gui.controls['controls-bottom'].resume.wrapper.stkListen(that.clickEvent, function(event) {
                event.stopPropagation();
                that[(that.view.video.paused ? 'start' : 'stop')](); }, that.clickEvent);
            that.view.gui.controls['controls-bottom'].volume.wrapper.stkListen(that.clickEvent, function(event) {
                that.isMuted() ? that.unmute() : that.mute(); }, that.clickEvent);
            that.view.gui.controls['seekbar-area'].wrapper.stkListen(that.clickEvent, function(event) {
                if (that.swipeBlockFlags.seekbar) {
                    that.swipeBlockFlags.seekbar = false;
                    return;
                }
                var offsetX, playerLeftPosition;
                if (event.offsetX) {
                    offsetX = event.offsetX;
                } else if (event.target.offsetLeft) {
                    playerLeftPosition = that.wrapper.getBoundingClientRect().left;
                    if (event.pageX) {
                        offsetX = event.pageX - playerLeftPosition - event.target.offsetLeft;
                    } else if (event.changedTouches && event.changedTouches[0] && event.changedTouches[0].pageX) {
                        offsetX = event.changedTouches[0].pageX - playerLeftPosition - event.target.offsetLeft;
                    } else {
                        return;
                    }
                } else {
                    return;
                }
                if (offsetX < 0) offsetX = 0;
                that.view.video.currentTime = (offsetX / this.clientWidth) * that.view.video.duration;
                if (that.view.video.paused) { that.updateVideoProgress(); }
            }, that.clickEvent);
        } else {
            that.view.gui.resume.stkListen(that.clickEvent, function(event) {
                event.stopPropagation();
                that[(that.view.video.paused ? 'start' : 'stop')]();
            }, that.captureMode);
        }
        if (!(that.guiAction === 'none' && that.guiAction === 'redirect')) {
            that.view.gui.wrapper.stkListen(that.clickEvent, function(event) {
                if (that.swipeBlockFlags.gui) {
                    that.swipeBlockFlags.gui = false;
                    return;
                }
                if (that.guiAction === 'playPause') {
                    that[(that.view.video.paused ? 'start' : 'stop')]();
                } else if (that.guiAction === 'toggleSound') {
                    that.isMuted() ? that.unmute() : that.mute();
                }
            }, that.captureMode);
        }
        if (that.hasReplay) {
            that.view.endboard.replay.wrapper.stkListen(that.clickEvent, function(event) {
                if (that.swipeBlockFlags.endboard) {
                    that.swipeBlockFlags.endboard = false;
                    return;
                }
                that.start();
            }, that.captureMode);
        }

        if (!window.stkIsIphone() && screenfull.isEnabled && typeof screenfull.onchange == 'function') {
            screenfull.onchange(function(event) {
                var method = screenfull.isFullscreen ? 'add' : 'remove';
                that.wrapper.classList[method]('fullscreen');
            });
        }
    },
    /** Updates value of video progress bar and time info
    * @function SatakuPlayer#updateVideoProgress
    * @returns {undefined}
    */
    updateVideoProgress: function() {
        var that = this;
        var element = that.hasControls ? that.view.gui.controls['seekbar-area'].seekbar.progressbar : that.view.gui.seekbar.progressbar;
        element.stkTransform('translateX('+ (-100 * (1 - that.view.video.currentTime/that.view.video.duration)) +'%)');
        if(that.hasControls) { that.view.gui.controls['controls-bottom'].timebar.innerHTML = that.convertTime(that.view.video.currentTime) + ' / ' + that.convertTime(that.view.video.duration); }
    },
    /** Converts video.currentTime to mm:ss time format
    * @function SatakuPlayer#convertTime
    * @returns {string} Converted time value
    */
    convertTime: function(time) {
        time = Math.round(time);
        var minute = Math.floor(time/60);
        var second = time%60;
        return '' + ((minute < 10) ? ('0' + minute) : minute) + ':' + ((second < 10) ? ('0' + second) : second);
    },
    /** Sets video.currentTime to given progress = [0, 1]
    * @function SatakuPlayer#setVideoProgress
    * @returns {undefined}
    */
    setVideoProgress: function(progress) {
        var that = this;
        that.view.video.currentTime = progress * that.view.video.duration;
    },
    /**
    * @function SatakuPlayer#checkAutoplaySupport
    * @param {function} callback Function to invoke after task completed
    * @returns {undefined}
    */
    checkAutoplaySupport: function(callback) {
        var that = this;

        try { // browser's policy does not accept sessionStorage.getItem in private mode
            if (sessionStorage.getItem('autoplaySupported')) {
                that.isAutoplaySupported = Boolean(sessionStorage.getItem('autoplaySupported'));
                if (callback) { callback(); }
                return;
            }
        } catch(err) { console.log(err); }

        var video = document.stkCreate('video', { style: 'display: none;' });

        var attr = document.createAttribute('playsinline');
        var webkitAttr = document.createAttribute('webkit-playsinline');
        video.setAttributeNode(attr);
        video.setAttributeNode(webkitAttr);
        video.stkAttr({
            muted: true,
            autoplay: true,
            src: that.svgData.autoplayTestSource
        }).stkExt({
            muted: true,
            autoplay: true,
            'webkit-playsinline': 'true',
            'playsinline': 'true'
        });
        enableInlineVideo(video);

        video.load();
        video.playing = false;
        video.play();

        video.stkListen('play', function() { this.playing = true; });
        video.stkListen('canplay', function() {
            that.isAutoplaySupported = video.playing ? true : false;

            try { // browser's policy does not accept sessionStorage.setItem in private mode
                sessionStorage.setItem('autoplaySupported', true);
            } catch(err) { console.log(err); }

            video.remove();
            if(callback) { callback(); }
        });
    },
    /** Plays the video with wrapper for mobile devices
    * @function SatakuPlayer#start
    * @returns {undefined}
    */
   start: function() {
    var that = this;
    if (!(that.view.video.paused || that.view.video.ended) || (!that.isRunModeDisplay && that.swipeBlockFlags.gui) || that.playRequestStateActive) { return; }
    if (that.isMobileDevice && that.shouldAutoplay) {
        that.playRequestStateActive = true;

        that.checkAutoplaySupport(function() {
            that.playRequestStateActive = false;

            if(that.isAutoplaySupported) {
                that.view.video.stkAttr({ autoplay: true }).stkExt({ autoplay: true });
                that.play();
            }
        });
    } else {
        that.play();
    }
},
    /** Plays the video
    * @function SatakuPlayer#play
    * @returns {undefined}
    */
    play: function() {
        var that = this;
        if (!(that.view.video.paused || that.view.video.ended) || (!that.isRunModeDisplay && that.swipeBlockFlags.gui) || that.playRequestStateActive) { return; }
        that.playRequestStateActive = true;

        if(window.stkIsSafari()) {
            that.view.video.stkAttr({ muted: false, autoplay: true }).stkExt({ muted: false, autoplay: true, volume: 0 });
        }

        var promise = that.view.video.play();
        var playerMutedPromise;

        if (promise !== undefined && promise instanceof Promise) {
            promise.catch(function(error) {
                // AUTOPLAY VIDEO POLICY FIX
                that.mute();
                if (that.hasControls) {
                  that.view.gui['volume-icon'].wrapper.classList.remove('disabled');
                  setTimeout(() => {
                    that.view.gui['volume-icon'].wrapper.classList.remove('hidden');
                  }, 100);
                }

                playerMutedPromise = that.view.video.play();
                if (playerMutedPromise !== undefined && playerMutedPromise instanceof Promise) {
                    playerMutedPromise.catch(function (playerMutedPromiseError) {
                        that.debug.error('promiseCatch', playerMutedPromiseError);
                        that.playRequestStateActive = false;
                    }).then(function () {
                        that.debug.log('promiseResolve');
                        that.playRequestStateActive = false;
                    });
                    return;
                } else {
                    that.debug.log('promiseUndefined');
                }

                that.debug.error('promiseCatch', error);
                that.playRequestStateActive = false;
            }).then(function(event) {
                that.debug.log('promiseResolve');
                that.playRequestStateActive = false;
            });
        } else {
            that.debug.log('promiseUndefined');
            if (that.hasControls) {
              that.view.gui['volume-icon'].wrapper.classList.remove('disabled');
              setTimeout(() => {
                that.view.gui['volume-icon'].wrapper.classList.remove('hidden');
              }, 100);
            }
        }
    },
    /** Stop/pause the video
    * @function SatakuPlayer#stop
    * @returns {undefined}
    */
    stop: function() {
        var that = this;
        if(that.view.video.paused || that.view.video.ended) { return; }
        if((!that.isRunModeDisplay && that.swipeBlockFlags.gui) || that.playRequestStateActive) { return; }
        that.view.video.pause();
        that.debug.log('videoPaused');
    },
    isMuted: function() {
        var that = this;
        return (!window.stkIsIphone() && that.view.video.volume === 0) || that.view.video.muted;
    },
    /** Mute the video
    * @function SatakuPlayer#mute
    * @returns {undefined}
    */
    mute: function() {
        var that = this;
        if (that.view.video.volume === 0 || (!that.isRunModeDisplay && that.swipeBlockFlags.gui)) { return; }
        that.view.video.volume = 0;
        that.view.video.muted = true;
        that.view.video.stkAttr({ muted: 'true' });
        if (that.onVolumeChange && typeof that.onVolumeChange === "function" && that.firstPlay) {
            that.onVolumeChange(false);
        }
    },
    /** Unmute the video
    * @function SatakuPlayer#unmute
    * @returns {undefined}
    */
    unmute: function() {
        var that = this;
        if (!that.isMuted() || (!that.isRunModeDisplay && that.swipeBlockFlags.gui)) { return; }
        that.view.video.volume = 1;
        that.view.video.muted = false;
        that.view.video.removeAttribute('muted');

        if (that.hasControls) {
            if (!that.view.gui['volume-icon'].wrapper.classList.contains('disabled')) {
                that.view.gui['volume-icon'].wrapper.classList.add('hidden');
                setTimeout(() => {
                    that.view.gui['volume-icon'].wrapper.classList.add('disabled');
                }, 350);
            }
        }
        if (that.onVolumeChange && typeof that.onVolumeChange === "function" && that.firstPlay) {
            that.onVolumeChange(true);
        }
    },
    /** Sets new source of the video
    * @function SatakuPlayer#changeVideo
    * @returns {undefined}
    */
    changeVideo: function(sourceURL, posterURL, endboardURL, version) {
        var that = this;
        if(!that.view.video.paused && !that.view.video.ended) { that.stop(); }

        SatakuTicker.push(function() {
            that.stkExt({
                version: version,
                firstPlay: false,
                currentQuartile: 0,
                sourceURL: sourceURL || that.sourceURL,
                posterURL: posterURL || that.posterURL,
                endboardURL: endboardURL || that.endboardURL,
            });
            that.setVideo();
            that.start();
        }, true);
    },
    /** Toggles fullscreen mode
    * @function SatakuPlayer#toggleFullscreen
    * @returns {undefined}
    */
    toggleFullscreen() {
        var that = this;
        if (!window.stkIsIphone() && screenfull.isEnabled && typeof screenfull.toggle == 'function') {
            screenfull.toggle(that.wrapper);
        }
    },
    /** Elevates controls if they are outside of visible window area
    * @function SatakuPlayer#reactToVerticalOverflow
    * @param {object} expandWorkspace #expand-workspace DOM element
    * @param {number} overflowVal expandWorkspace.clientHeight - window.innerHeight
    * @param {boolean} isFixed is player containing element positioned fixed
    * @returns {undefined}
    */
    reactToVerticalOverflow(expandWorkspace, overflowVal, isFixed) {
        var that = this, pxValue;

        if (that.hasControls) {
            SatakuTicker.push(function() {
                var wrapperBottom = that.wrapper.getBoundingClientRect().bottom;
                var workspaceBottom = expandWorkspace.getBoundingClientRect().bottom;
                if (wrapperBottom - workspaceBottom > 0 || wrapperBottom > window.innerHeight) {
                    pxValue = overflowVal / 2 - (workspaceBottom - wrapperBottom);
                } else {
                    pxValue = 0;
                }
                that.view.gui.controls.wrapper.style.transform = `translate3d(-50%, -${pxValue}px, 0)`;
                that.view.gui['volume-icon'].wrapper.style.transform = `translate3d(0, ${isFixed ? 0 : pxValue}px, 0)`;
            }, true);
        }
    },
    /** Sets endboard/video/poster attributes
    * @function SatakuPlayer#setVideo
    * @returns {undefined}
    */
    setVideo: function() {
        var that = this;
        if (that.isMobileDevice) {
            var attr = document.createAttribute('playsinline');
            var webkitAttr = document.createAttribute('webkit-playsinline');
            that.view.video.setAttributeNode(attr);
            that.view.video.setAttributeNode(webkitAttr);
            that.view.video.stkExt({
                'webkit-playsinline': 'true',
                'playsinline': 'true'
            });
            enableInlineVideo(that.view.video);
        }
        that.view.endboard.wrapper.stkStyleElement({ background: '#000 url('+that.endboardURL+') no-repeat center center' });
        that.view.video.stkAttr({ src: that.sourceURL, poster: that.posterURL });
    },
    /** Initialize the player
    * @function SatakuPlayer#initialize
    * @returns {object} Returns this
    */
    initialize: function() {
        var that = this;
        that.buildView();
        that.setView();
        that.setListeners();
        return that;
    }
};

var SatakuIframeBuilder = function(satakuConfig, doc, params) {
  var that = this;
  that.stkExt({satakuConfig, doc}).stkExt(params);
  return that;
};

SatakuIframeBuilder.prototype = {
  attributes: {
    allowtransparency: "true", marginheight: "0px", marginwidth: "0px", frameborder: "0", scrolling: "no"
  },
  height: null,
  id: 'display-content-iframe',
  iframe: null,
  removeVideoWrapper: true,
  showCreateJSControls: true,
  src: 'media/display/index.html?version=0.0',
  width: null,
  init: function() {
    var that = this;

    var format = that.satakuConfig.format;
    var width = format.slice(0, format.indexOf('x'));
    var height = format.slice(format.indexOf('x') + 1, format.length);

    that.iframe = document.createElement('iframe');
    Object.keys(that.attributes).forEach(attribute => {
      that.iframe.setAttribute(attribute, that.attributes[attribute]);
    });
    that.iframe.id = that.id;
    that.iframe.stkStyleElement({
      position: 'absolute',
      width: that.width || `${width}px`,
      height: that.height || `${height}px`,
    });
    that.iframe.src = that.src;
    that.wrapper.appendChild(that.iframe);

    if (that.removeVideoWrapper && that.doc.videoWrapper) {
      that.doc.videoWrapper.remove();
    }

    if (DEBUG_MODE && that.showCreateJSControls) {
      const buttonWrapper = document.createElement('div');
      const toggleButton = document.createElement('a');
      const snapButton = document.createElement('a');
      const textNode = document.createTextNode('STOP');

      const buttonStyles = {background: '#E24244', color: '#fff', pointerEvents: 'auto', fontFamily: 'sans-serif', fontSize: '15px', textAlign: 'center', textDecoration: 'none', verticalAlign: 'middle', lineHeight: '40px', boxSizing: 'border-box', border: '1px solid #000'};
      buttonWrapper.stkStyleElement({
        position: 'absolute', width: '120px', height: '40px', top: 'auto', bottom: '0', left: '50%', transform: 'translateX(-50%)', pointerEvents: 'auto'
      });
      toggleButton.stkStyleElement({ position: 'absolute', width: '60px', height: '40px' }.stkExt(buttonStyles));
      snapButton.stkStyleElement({ position: 'absolute', width: '61px', height: '40px', left: '59px', }.stkExt(buttonStyles));

      const snapImage = () => {
        let iframeWindow, stage;
        iframeWindow = that.iframe.contentWindow;

        if (iframeWindow && !stage) {
          stage = iframeWindow.stage;
        }
        if (stage) {
          const dataURL = stage.canvas.toDataURL('image/jpeg', 0.7);
          snapButton.setAttribute('download', `${format}.jpg`);
          snapButton.setAttribute('href', dataURL);
        }
      };

      let isPlaying = true;
      const togglePlayState = () => {
        let iframeWindow, stage;
        iframeWindow = that.iframe.contentWindow;
        if (iframeWindow && !stage) {
          stage = iframeWindow.stage;
        }
        if (stage) {
          if (isPlaying) {
            iframeWindow.stage.tickEnabled = false;
            textNode.textContent = 'PLAY';
          } else {
            iframeWindow.stage.tickEnabled = true;
            textNode.textContent = 'STOP';
          }
        }
        isPlaying = !isPlaying;
      };

      buttonWrapper.addEventListener('click', (e) => {
        e.stopPropagation();
        e.target == toggleButton && togglePlayState();
        e.target == snapButton && snapImage();
      });


      snapButton.appendChild(document.createTextNode('SNAP'));
      buttonWrapper.appendChild(snapButton);

      toggleButton.appendChild(textNode);
      buttonWrapper.appendChild(toggleButton);

      that.wrapper.appendChild(buttonWrapper);
    }
  }

};
/**
* @file Manages the configuration settings for campaign
* @name config.js
* @copyright (c) 2017, Sarigato Sp z o. o. All rights reserved.
* @version 2.0.0
*/

/* -------------------------------------------------------------------------- */

/** @constant {boolean} window.ARE_SOCIALS_ACTIVE Determines if social links are shown, enables social links in desktop player and mobile expand */
// legacy
var ARE_SOCIALS_ACTIVE = false;

/**
* @namespace Sataku
* @description Sataku main object
* @version 1.0.0
*/
var notStatic = window.satakuBrowserDetect();
var Sataku = (function () {
    /**
    * @type {object}
    * @inner
    * @memberof Sataku
    * @name _that
    * @property {object} player SatakuPlayer instance
    * @property {object} players Array of SatakuPlayer instances
    * @property {object} counter SatakuCounter instance
    * @property {object} manager SatakuManager instance
    * @property {object} tracking SatakuTracking instance
    * @property {object} messenger SatakuMessenger instance
    * @property {object} supervisor SatakuSupervisor instance
    * @property {object} doc DOM nodes
    * @property {object} debug SatakuLogger instance
    * @property {function} setDependencies Creates needed instances and sets some data
    * @property {function} setDisplayVersion Sets random display version based on window.STK_DISPLAY_VERSION_CONFIG config
    * @property {function} setupAndRun Sets neccessary data and invokes Sataku.display/Sataku.expand function
    * @property {function} sendInfoToLoader If running on display send info to loader
    * @property {function} clickAction Function that invokes when interacting with display
    * @property {function} rvInit Function that initializes Real View display
    * @property {function} motionInit Function that initializes Motion display and controls sequence animation based on window.STK_MOTION_SEQUENCE_CONFIG config
    */
    var _that = {
        player: null,
        players: [],
        counter: null,
        manager: null,
        tracking: null,
        messenger: null,
        supervisor: null,
        doc: {
            teaser: ['#teaser', false],
            expand: ['#expand', false],
            display: ['#display', false],
            closeExpand: ['#close-expand', false],
            teaserCover: ['#teaser-cover', false],
            videoWrapper: ['#video-wrapper', false],
            rvEndboard: ['#rv-endboard', false],
            rvReplay: ['#rv-replay', false],
            playerWrapper: ['.player-wrapper', false],
            playerWrappers: ['.player-wrapper', true],
            teaserWrapper: ['#teaser-wrapper', false],
            counterWrapper: ['#counter-wrapper', false],
            displayContent: ['#display-content', false],
            expandWorkspace: ['#expand-workspace', false],
        },
        debug: new SatakuLogger({
            log: {
                'frameReady': ['Welcome in %s %s @product:%s', SatakuLogger.prototype.stylesheet.global],
            },
            logPreview: {
                'displayVersion': ['[Display version] id: %s redirect: %s name: %s', SatakuLogger.prototype.stylesheet.global],
                'trackingConfig': ['Pixel data: %O', SatakuLogger.prototype.stylesheet.global],
            },
            error: {
                'scrollNoConfig': ['[Scroll] No config given for display version id: %s', SatakuLogger.prototype.stylesheet.error],
                'motionNoConfig': ['[Motion] No config given for display version id: %s', SatakuLogger.prototype.stylesheet.error],
            }
        }),
        setDependencies: function() {
            Sataku.invoke = null;
            that.invoke = null;
            var redirectId = 1;

            /** @constant {number} window.SATAKU_MODE */
            /** @constant {number} window.DEBUG_MODE */

            window.SATAKU_MODE = satakuParams["mode"] || MODE_PRODUCTION;
            window.DEBUG_MODE = SATAKU_MODE == MODE_DEVELOPER;

            that.config.stkExt(satakuParams).stkExt({
                creationType: CREATION_TYPE,
                isIphone: that.config.deviceType === DEVICE_TYPE_DESKTOP ? false : stkIsIphone(),
            });

            window.satakuParams = null;

            for(var i in _that.doc) { _that.doc[i] = document.stkQuery(_that.doc[i][0], _that.doc[i][1]); }

            _that.setDisplayVersion();
            _that.debug.logPreview('displayVersion', that.config.displayVersion.id, that.config.displayVersion.redirect, that.config.displayVersion.name);

            if (that.config.displayVersion && that.config.displayVersion.redirect) {
                redirectId = that.config.displayVersion.redirect;
            }

            if (PRODUCT_TYPES_BY_DEVICE.mobile.indexOf(that.config.creationType) !== -1) {
                if (that.config.place === RUN_MODE_DISPLAY) {
                    _that.doc.display.classList.add('mobile-creation');
                } else if (that.config.place === RUN_MODE_EXPAND) {
                    _that.doc.expand.classList.add('mobile-creation');
                }
            } else if (PRODUCT_TYPES_BY_DEVICE.desktop.indexOf(that.config.creationType) !== -1) {
                if (that.config.place === RUN_MODE_DISPLAY) {
                    _that.doc.display.classList.add('desktop-creation');
                } else if (that.config.place === RUN_MODE_EXPAND) {
                    _that.doc.expand.classList.add('desktop-creation');
                }
            }

            _that.tracking = SatakuTracking(that.config);

            _that.pixelHelper = SatakuPixelHelper({
                firstInteraction: window.STK_PIXEL_HELPER_CONFIG.firstInteraction,
                custom: window.STK_PIXEL_HELPER_CONFIG.custom,
                trackly: window.STK_PIXEL_HELPER_CONFIG.trackly,
                smart: window.STK_PIXEL_HELPER_CONFIG.smart,
            }, _that.tracking);

            _that.dwell = SatakuDwell(that.config, _that.tracking);
            _that.messenger = SatakuMessenger(that.config);
            _that.supervisor = SatakuSupervisor(that.config);
            _that.manager = SatakuManager(that.config, _that.doc, _that.clickAction);

            // create counter only if:
            // 1. creation type is not included in STK_CREATION_TYPES_WITHOUT_COUNTER array and
            // 2. creation is of mobile type and is displayed on mobile view
            if (window.STK_CREATION_TYPES_WITHOUT_COUNTER.indexOf(that.config.creationType) === -1 && !(PRODUCT_TYPES_BY_DEVICE.mobile.indexOf(that.config.creationType) !== -1 && that.config.deviceType === DEVICE_TYPE_DESKTOP)) {
                _that.counter = SatakuCounter(that.config, {
                    id: 1,
                    wrapper: _that.doc.counterWrapper,
                    onActionHandler: _that.clickAction,
                    area: that.config.creationType === CREATION_TYPE_VIDEO_DISPLAY_STANDARD_REDIRECT ? _that.doc.videoWrapper : document.body,
                    static: PRODUCT_TYPES_BY_DEVICE.mobile.indexOf(that.config.creationType) !== -1
                }.stkExt(window.STK_COUNTER_STYLE_CONFIG));
            }

            var playerExt = {};
            if ([CREATION_TYPE_REAL_VIEW, CREATION_TYPE_MOBILE_REAL_VIEW, CREATION_TYPE_FULL_REAL_VIEW, CREATION_TYPE_MOBILE_FULL_REAL_VIEW].indexOf(that.config.creationType) !== -1) {
                if(that.config.place === RUN_MODE_DISPLAY) {
                    playerExt = {
                        shouldAutoplay: false,
                        hasControls: false,
                        hasReplay: false,
                        guiAction: 'toggleSound',
                        guiAlwaysVisible: true
                    };
                }
            }
            if ([CREATION_TYPE_VIDEO_LOOP, CREATION_TYPE_MOBILE_VIDEO_LOOP].indexOf(that.config.creationType) !== -1) {
                playerExt = {
                    shouldAutoplay: true,
                    hasControls: false,
                    hasReplay: false,
                    guiAction: 'none',
                    guiAlwaysVisible: true,
                    isTrackingEnabled: false,
                    looped: true,
                };
            }

            _that.player = new SatakuPlayer(that.config, {
                anchorURL: '{redirect_' + redirectId + '}',
                wrapper: _that.doc.playerWrapper,
                sourceURL: 'media/video/expand/spot.mp4?version=0.0',
                posterURL: 'media/video/expand/poster.jpg?version=0.0',
                endboardURL: 'media/video/expand/endboard.jpg?version=0.0',
                isRunModeDisplay: that.config.place === RUN_MODE_DISPLAY,
                version: 1
            }.stkExt(playerExt), _that.tracking);
            _that.players.push(_that.player);

            if ([CREATION_TYPE_SARIGATO_IFRAME, CREATION_TYPE_MOBILE_SARIGATO_IFRAME].indexOf(CREATION_TYPE) > -1) {
                _that.iframeBuilder = new SatakuIframeBuilder(that.config, _that.doc, {
                    wrapper: _that.doc.displayContent,
                    src: `media/display/${that.config.format}/index.html?version=0.0`,
                });
            }
        },
        setDisplayVersion: function() {
            if(that.config.place === RUN_MODE_DISPLAY) {
                that.config.displayVersion = window.stkDrawDisplayVersion(that.config.format, STK_DISPLAY_VERSION_CONFIG);
            } else if(that.config.place === RUN_MODE_EXPAND) {
                if (that.config.SAS && that.config.SAS.requestData && that.config.SAS.requestData.dataFromDisplay && that.config.SAS.requestData.dataFromDisplay.displayVersion) {
                    that.config.displayVersion = that.config.SAS.requestData.dataFromDisplay.displayVersion;
                }
            }
            if(that.config.place === RUN_MODE_DISPLAY) {
                _that.doc.display.classList.add(`display-${that.config.displayVersion.name}`);
            } else if(that.config.place === RUN_MODE_EXPAND) {
                _that.doc.expand.classList.add(`display-${that.config.displayVersion.name}`);
            }
        },
        setupAndRun: function() {
            if(
                (that.config.place === RUN_MODE_DISPLAY && [CREATION_TYPE_VIDEO_DISPLAY_STANDARD, CREATION_TYPE_VIDEO_DISPLAY_STANDARD_REDIRECT, CREATION_TYPE_REAL_VIEW, CREATION_TYPE_MOBILE_REAL_VIEW, CREATION_TYPE_FULL_REAL_VIEW, CREATION_TYPE_MOBILE_FULL_REAL_VIEW, CREATION_TYPE_MOBILE_VIDEO_INTERACTIVE, CREATION_TYPE_MOBILE_VIDEO, CREATION_TYPE_VIDEO_LOOP, CREATION_TYPE_MOBILE_VIDEO_LOOP].indexOf(that.config.creationType) !== -1) ||
                (that.config.place === RUN_MODE_EXPAND && [CREATION_TYPE_EXPAND_VIDEO, CREATION_TYPE_EXPAND_PREMIUM ,CREATION_TYPE_MOBILE_EXPAND_VIDEO, CREATION_TYPE_MOBILE_EXPAND_PREMIUM].indexOf(that.config.creationType) !== -1)
            )  {
                _that.players.forEach((player, index) => {
                    player.initialize();
                })
                if(that.config.place === RUN_MODE_DISPLAY) {
                    if ([CREATION_TYPE_VIDEO_LOOP, CREATION_TYPE_MOBILE_VIDEO_LOOP].indexOf(that.config.creationType) !== -1) {
                        _that.doc.playerWrapper.stkAddClass('no-progressbar');
                        _that.player.setVideo();
                        _that.player.mute();
                        _that.player.start();
                    } else {
                        _that.doc.playerWrapper.stkAddClass('disabled');
                    }
                    if([CREATION_TYPE_VIDEO_DISPLAY_STANDARD, CREATION_TYPE_VIDEO_DISPLAY_STANDARD_REDIRECT].indexOf(that.config.creationType) !== -1) {
                        _that.doc.display.stkAddClass('video-display-standard');
                    }
                    if ([CREATION_TYPE_REAL_VIEW, CREATION_TYPE_FULL_REAL_VIEW, CREATION_TYPE_MOBILE_REAL_VIEW, CREATION_TYPE_MOBILE_FULL_REAL_VIEW].indexOf(CREATION_TYPE) > -1) {
                        if ([CREATION_TYPE_FULL_REAL_VIEW, CREATION_TYPE_MOBILE_FULL_REAL_VIEW].indexOf(CREATION_TYPE) > -1) {
                            that.config.rvDoNotPauseVideoOnViewOut = true;
                        }
                        if (window.STK_REAL_VIEW_WITH_REPLAY) {
                            _that.doc.display.classList.add('endboard-with-replay');
                        }
                        if (notStatic) {
                            window.enableLoaderFeature('rv');
                            _that.player.mute();
                            _that.player.view.gui.resume.style.display = 'none';
                            _that.rvInit(that, _that);
                        }
                    }
                }
            } else {
                for (let i = 0; i < _that.doc.playerWrappers.length; i++) {
                    _that.doc.playerWrappers[i].remove();
                }
            }

            if ([CREATION_TYPE_SCROLL, CREATION_TYPE_MOBILE_SCROLL].indexOf(CREATION_TYPE) > -1) {
                (function() {
                    if (notStatic) {
                        var displayVersion = 1;
                        if (that.config.displayVersion) {
                            displayVersion = that.config.displayVersion.id;
                        }

                        var data = STK_SCROLL_CAMPAIGN_DATA['format_' + that.config.format]['displayVersion_' + displayVersion];
                        if (typeof data == 'undefined') {
                            _that.debug.error('scrollNoConfig', displayVersion);
                            return;
                        }

                        _that.messenger.sendMsg('setBannerFixedBackground', data);
                    }
                })();
            }

            if ([CREATION_TYPE_MOTION, CREATION_TYPE_MOBILE_MOTION].indexOf(that.config.creationType) !== -1) {
                if (notStatic) {
                    _that.motionInit();
                }
            }

            if ([CREATION_TYPE_SARIGATO_IFRAME, CREATION_TYPE_MOBILE_SARIGATO_IFRAME].indexOf(CREATION_TYPE) > -1) {
                if (_that.iframeBuilder) {
                    _that.iframeBuilder.init();
                }
            }

            window.satakuAntiBot();
            if (window.stkShouldStartTeaserManually) {
                window.stkStartTeaserManually();
            }
            Sataku[that.config.runModeAlias](that, _that, notStatic);
        },
        sendInfoToLoader: function() {
            if(that.config.runMode == RUN_MODE_DISPLAY) {
                _that.messenger.sendMsg('campaignData', {
                    creation: {
                        creationType: that.config.creationType,
                        expanded: _that.supervisor.isExpandable
                    }
                });
            }
        },
        clickAction: function(event, isCountEndAction, counterId) {
            var redirectId = 1;
            if (that.config.displayVersion && that.config.displayVersion.redirect) {
                redirectId = that.config.displayVersion.redirect;
            }
            if (!notStatic) {
                stkOpenWindow(_that.tracking.redirect.lp[redirectId], '_blank', function() {
                    _that.tracking.displayClick();
                });
            } else {
                if(that.config.runMode === RUN_MODE_DISPLAY && _that.counter) { _that.counter.reset(); }

                if(_that.supervisor.isExpandable) {
                    if(that.config.place === RUN_MODE_DISPLAY) {
                        const dataForExpand = {};
                        if (that.config.displayVersion) dataForExpand.displayVersion = that.config.displayVersion;

                        _that.messenger.sendMsg('openExpand', {dataFromDisplay: dataForExpand});
                        _that.tracking.displayClick();

                        // TEMPORARY FIX TO CHROME V62 MOUSE EVENTS BEHAVIOR
                        _that.doc.display.style.pointerEvents = 'none'
                        setTimeout(function() {
                            _that.doc.display.style.pointerEvents = 'all'
                        }, 1000)
                    } else if(that.config.place === RUN_MODE_EXPAND) {
                        Sataku.expandOutro(function() {
                            _that.messenger.sendMsg('closeExpand');
                        });
                    }
                }

                if([CREATION_TYPE_REAL_VIEW, CREATION_TYPE_MOBILE_REAL_VIEW, CREATION_TYPE_FULL_REAL_VIEW, CREATION_TYPE_MOBILE_FULL_REAL_VIEW].indexOf(CREATION_TYPE) > -1 && event) {
                    if (event.target === _that.doc.displayContent) {
                        if (that.config.rvVideoEnded) {
                            stkOpenWindow(_that.tracking.redirect.lp[redirectId], '_blank', function() {
                                _that.tracking.displayClick();
                            });
                        } else {
                            _that.player.isMuted() ? _that.player.unmute() : _that.player.mute();
                        }
                    } else if (event.target === _that.doc.rvEndboard) {
                        stkOpenWindow(_that.tracking.redirect.lp[redirectId], '_blank', function() {
                            _that.tracking.displayClick();
                        });
                    } else if (event.target === _that.doc.rvReplay) {
                        _that.player.setVideo();
                        _that.player.start();
                        _that.player.view.endboard.wrapper.stkRemoveClass('active');
                        _that.doc.display.classList.remove('endboard-active');
                    }
                }

                if([CREATION_TYPE_VIDEO_DISPLAY_STANDARD, CREATION_TYPE_VIDEO_DISPLAY_STANDARD_REDIRECT, CREATION_TYPE_MOBILE_VIDEO, CREATION_TYPE_MOBILE_VIDEO_INTERACTIVE].indexOf(that.config.creationType) !== -1) {
                    if(that.config.creationType === CREATION_TYPE_VIDEO_DISPLAY_STANDARD_REDIRECT && event && event.target === _that.doc.displayContent) {
                        stkOpenWindow(_that.tracking.redirect.lp[redirectId], '_blank', function() {
                            _that.tracking.displayClick();
                        });
                    } else {
                        _that.tracking.displayClick();
                        // _that.tracking.displayVDSinit();
                        if (_that.counter) {
                            _that.counter.kill();
                        }

                        _that.manager.newAction(function(event, isCountEndAction) {
                            if([CREATION_TYPE_VIDEO_DISPLAY_STANDARD, CREATION_TYPE_VIDEO_DISPLAY_STANDARD_REDIRECT].indexOf(that.config.creationType) !== -1 && event && event.target === _that.doc.displayContent) {
                                stkOpenWindow(_that.tracking.redirect.lp[redirectId], '_blank', function() {
                                    _that.tracking.displayClick();
                                });
                            } else if([CREATION_TYPE_MOBILE_VIDEO, CREATION_TYPE_MOBILE_VIDEO_INTERACTIVE].indexOf(that.config.creationType) !== -1) {
                                if(event && event.target === _that.doc.displayContent) {

                                } else if(event && event.target === _that.player.view.gui.wrapper) {
                                    if(_that.player.view.video.paused) {
                                        stkOpenWindow(_that.tracking.redirect.lp[redirectId], function() {
                                            // console.log('Window opened.');
                                        });
                                    }
                                }
                            }
                        });

                        Sataku.vdsDisplayOpen(that, _that);
                    }
                }

                if ([CREATION_TYPE_RICH_DISPLAY, CREATION_TYPE_VIDEO_DISPLAY_LANDING_PAGE, CREATION_TYPE_MOBILE_ONEPAGE_PORTRAIT, CREATION_TYPE_MOBILE_ONEPAGE_LANDSCAPE, CREATION_TYPE_MOBILE_DISPLAY_COUNTER, CREATION_TYPE_MOBILE_MULTI_RECTANGLE, CREATION_TYPE_SARIGATO_IFRAME, CREATION_TYPE_MOBILE_SARIGATO_IFRAME, CREATION_TYPE_SCROLL, CREATION_TYPE_MOBILE_SCROLL, CREATION_TYPE_MOTION, CREATION_TYPE_MOBILE_MOTION, CREATION_TYPE_MOBILE_RICH_DISPLAY, CREATION_TYPE_VIDEO_LOOP, CREATION_TYPE_MOBILE_VIDEO_LOOP].indexOf(that.config.creationType) !== -1) {
                    if (isCountEndAction) {
                        _that.messenger.sendMsg('openPage', _that.tracking.redirect.lp[redirectId]);
                        _that.tracking.displayClick();
                    } else {
                        stkOpenWindow(_that.tracking.redirect.lp[redirectId], '_blank', function() {
                            _that.tracking.displayClick();
                        });
                    }
                }
            }
        },
        rvInit: function() {
            var displaySeen = false, inView = false;
            that.config.rvVideoEnded = false;
            _that.player.setVideo();
            _that.doc.teaserWrapper.remove();
            _that.doc.playerWrapper.stkRemoveClass('disabled');

            window.addEventListener('message', function(e) {
                if (e.data == 'inView' && !displaySeen && !inView){
                    // Pierwszy play
                    displaySeen = true;
                    inView = true;
                    _that.tracking.rvFirstInView();
                    Sataku.rvViewIn(that, _that, true);
                } else if (e.data == 'outsideView' && displaySeen && inView && !that.config.rvVideoEnded){
                    inView = false;
                    Sataku.rvViewOut(that, _that);
                } else if (e.data == 'inView' && displaySeen && !inView && !that.config.rvVideoEnded){
                    // Ponowny play
                    inView = true;
                    Sataku.rvViewIn(that, _that, false);
                }
            });

            _that.player.onVolumeChange = function(isSoundOn) {
                isSoundOn ? _that.tracking.videoUnmute(_that.player.version) : _that.tracking.videoMute(_that.player.version);
            };

            _that.player.view.video.addEventListener('ended', function() {
                that.config.rvVideoEnded = true;
                _that.tracking.endboard();
                Sataku.rvEndboard(that, _that);
            });
        },
        motionInit: function() {
            var displayVersion = 1;
            if (that.config.displayVersion) {
                displayVersion = that.config.displayVersion.id;
            }
            window.enableLoaderFeature('scroll');

            var sequenceConfigArray = STK_MOTION_SEQUENCE_CONFIG['format_' + that.config.format]['displayVersion_' + displayVersion];
            if (typeof sequenceConfigArray == 'undefined') {
                _that.debug.error('motionNoConfig', displayVersion);
                return;
            }
            sequenceConfigArray.forEach(sequenceConfig => {
                sequenceConfig._block = false; // used to call Sataku.onMotionAnimate once for e.data.values.outer === 0% and once for e.data.values.outer === 100%
                sequenceConfig.elements = [].slice.call(document.querySelectorAll(sequenceConfig.selector));
                sequenceConfig.lastIndex = 0;
                sequenceConfig.elements.slice(1).forEach(el => {
                    el.style.opacity = 0;
                })
            })

            window.addEventListener('message', (e) => {
                if (e.data.name == 'flowPercent') {
                    /*
                        e.data.values.outer - 0%: display completely hidden below the screen, 100%: display completely hidden above the screen
                        e.data.values.inner - 0%: display's bottom touches screen's bottom, 100%: display's top touches screen's top
                        e.data.screenHeight - self explanatory
                    */
                    var percentValues = e.data.values;
                    var screenH = e.data.screenHeight;
                    sequenceConfigArray.forEach(sequenceConfig => {
                        var nextIndex = 0;
                        var startingPercent = sequenceConfig.startAt / (screenH + window.innerHeight) * 100;
                        var endingPercent = sequenceConfig.endAt / (screenH + window.innerHeight) * 100;
                        var data = e.data;
                        data.startPercent = startingPercent;
                        data.endPercent = 100 - endingPercent;

                        if (sequenceConfig.elements.length > 0) {
                            if (percentValues.outer <= startingPercent) {
                                nextIndex = 0;
                            } else if (percentValues.outer >= 100 - endingPercent) {
                                nextIndex = sequenceConfig.elements.length - 1;
                            }
                            if (percentValues.outer > startingPercent && percentValues.outer < 100 - endingPercent) {
                                nextIndex = Math.floor((percentValues.outer - startingPercent) / ((100 - startingPercent - endingPercent) / sequenceConfig.elements.length));
                                sequenceConfig._block = false;
                            }
                            if (typeof percentValues.outer != 'undefined' && !sequenceConfig._block) {
                                Sataku.onMotionAnimate(that, _that, nextIndex, sequenceConfig, data);
                                sequenceConfig.elements[sequenceConfig.lastIndex].style.opacity = 0;
                                sequenceConfig.elements[nextIndex].style.opacity = 1;
                                sequenceConfig.lastIndex = nextIndex;
                            }
                            if (percentValues.outer <= 0 || percentValues.outer >= 100 ) {
                                sequenceConfig._block = true;
                            }
                        }
                    });
                }
            });
        }
    };

    // -------------------------------------------------------------------------

    var that = {
        /** Config object with data received from Smart Ad Server
        * @type {object}
        * @name Sataku.config
        * @property {string} host Name of the host
        * @property {number} place Defines if running display or expand
        * @property {number} runMode Defines if running display or expand
        * @property {object} SAS Smart Ad Server received data
        * @property {boolean} display Flag that defines if running on display
        * @property {boolean} expand Flag that defines if running on expand
        * @property {number} mode Overwritten from SATAKU_MODE
        * @property {boolean} debugging Flag that defines if running in debug mode
        * @property {number} deviceType Id of runned device
        * @property {number} formatId Identifier of display format
        * @property {object} publisher Object with publisher data
        * @property {number} satakuId Identifier
        * @property {number} campaignId Identifier of target campaign
        * @property {boolean} isFriendlyFrameMode Flag that defines if running in friendly frame mode
        * @property {number} insertionId Identifier of insertion
        * @property {string} runModeAlias String name of runMode value
        * @property {string} deviceOrientation String with device current orientation
        * @property {string} deviceAlias String name of runned device
        * @property {string} frameId Identifier of target iFrame
        * @property {string} baseUrl URL for tracking purposes
        * @property {string} format Name of the target display format
        * @property {number} creationType Type of creation
        * @property {boolean} isIphone Defines if running on iPhone
        * @property {boolean} rvDoNotPauseVideoOnViewOut Defines should pause video on moving out of the screen
        */
        config: {},
        /** Function initializes creation
        * @function Sataku.invoke
        * @returns {undefined}
        */
        invoke: function() {
            _that.setDependencies();
            _that.setupAndRun();
            _that.sendInfoToLoader();
            _that.tracking.getNewLinks();

            if(that.config.place === RUN_MODE_DISPLAY) {
                _that.tracking.displayLoad();
            } else if(that.config.place === RUN_MODE_EXPAND) {
                if (that.config.deviceType === DEVICE_TYPE_MOBILE && ARE_SOCIALS_ACTIVE) document.stkQuery('#socials-wrapper', false).style.display = 'block';
                _that.dwell.initialize();
            }
            _that.debug.log('frameReady', that.config.deviceAlias, RUN_MODE_ALIASES[that.config.runMode], CREATION_TYPE_ALIASES[that.config.creationType]);
        }
    };

    return that;
})();

/**
* @file Stores functions invoked when display ready
* @name display.js
* @copyright (c) 2017, Sarigato Sp z o. o. All rights reserved.
* @version 2.0.0
*/

/** Function invoked when display configuration is ready
* @function Sataku.display
* @param {object} that {@link Sataku} object
* @param {object} _that {@link Sataku~_that} object
* @param {boolean} notStatic if true display is run on supported browser
* @returns {undefined}
*/
Sataku.display = (function() {
    return function(that, _that, notStatic) {
        if([CREATION_TYPE_MOBILE_ONEPAGE_PORTRAIT, CREATION_TYPE_MOBILE_ONEPAGE_LANDSCAPE, CREATION_TYPE_MOBILE_MULTI_RECTANGLE, CREATION_TYPE_MOBILE_VIDEO_INTERACTIVE].indexOf(that.config.creationType) !== -1) {
            // Gyroscope.runDefaultGyroscopeSetup(that.config.creationType);
        }
        if (notStatic) {
            Sataku.displayCampaign(that, _that);
        } else {
            Sataku.displayCampaignStatic(that, _that);
        }
    };
})();

/** Function invokes when display is ready (supported browsers)
* @function Sataku.displayCampaign
* @returns {undefined}
*/
Sataku.displayCampaign = function(that, _that) {
    // {READ}
    // każda kampania (oprócz CREATION_TYPE_RICH_DISPLAY) używa tej metody na wspieranych przeglądarkach do displaya przed odczekaniem 3 sekund
    // lub przed kliknięciem
    // Enable loader gyro function:
    // window.enableLoaderFeature('gyro');

    // example: pixelHelper.custom(1); or pixelHelper.label('label');
    // var pixelHelper = _that.pixelHelper;

    const animation = () => {
        let id = id => document.getElementById(id);
        let bg2 = id("bg2");
        let bg3 = id("bg3");
        setTimeout(() => {
            bg2.classList.add("anim");
            bg3.classList.add("anim");
            console.log("START")
            setInterval(() => {
                // bg3.classList.toggle("hide");
                bg2.classList.toggle("hide");
                console.log("INTERVAL2")
            },10000);
        }, 500);
    }
    animation();

};

/** Function invokes when display is ready (unsupported browsers)
* @function Sataku.displayCampaignStatic
* @returns {undefined}
*/
Sataku.displayCampaignStatic = function(that, _that) {
    // {READ}
    // każda kampania (oprócz CREATION_TYPE_RICH_DISPLAY) używa tej metody na nie wspieranych przeglądarkach do displaya przed odczekaniem 3 sekund
    // lub przed kliknięciem
};


/** Function invoked when Real View display comes into view
* @function Sataku.rvViewIn
* @returns {undefined}
*/
Sataku.rvViewIn = function(that, _that, first) {
    if (!that.config.rvDoNotPauseVideoOnViewOut) _that.player.start();
    if (first) { // only the first
        // console.log('RV rvViewIn first');
        if (that.config.rvDoNotPauseVideoOnViewOut) _that.player.start();
        if (DEBUG_MODE) {
            // for testing endboard
            // _that.player.setVideoProgress(0.95);
        }
    } else {
        // console.log('RV rvViewIn next');
    }
}

/** Function invoked when Real View display comes out of view
* @function Sataku.rvViewOut
* @returns {undefined}
*/
Sataku.rvViewOut = function(that, _that) {
    // console.log('RV rvViewOut');
    if (!that.config.rvDoNotPauseVideoOnViewOut) _that.player.stop();
}

/** Function invoked when Real View display video ends
* @function Sataku.rvEndboard
* @returns {undefined}
*/
Sataku.rvEndboard = function(that, _that) {
    // console.log('RV Endboard');
    _that.doc.display.classList.add('endboard-active');
}

/** Function invoked when Motion display runs sequence animation
* @function Sataku.onMotionAnimate
* @returns {undefined}
*/
Sataku.onMotionAnimate = function(that, _that, index, sequenceConfig, data) {
    // console.log('Motion animate, sel: ' + sequenceConfig.selector + ', index: ' + index + ' of ' + (sequenceConfig.elements.length - 1));
    // console.log('Motion animate, reported: ' + data.values.outer + '%, start at: ' + data.startPercent + '%, end at: ' + data.endPercent + '%');
}

/** Function invoked on CREATION_TYPE_VIDEO_DISPLAY_STANDARD initialization
* @function Sataku.vdsDisplayOpen
* @returns {undefined}
*/
Sataku.vdsDisplayOpen = function(that, _that) {
    // console.log('VDS Display Initialization');
    _that.player.setVideo();
    _that.player.start();
    _that.doc.teaserWrapper.remove();
    _that.doc.playerWrapper.stkRemoveClass('disabled');
};
