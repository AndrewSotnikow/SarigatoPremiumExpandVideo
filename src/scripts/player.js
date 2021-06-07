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
