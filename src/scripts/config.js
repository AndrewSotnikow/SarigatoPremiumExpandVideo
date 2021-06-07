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
