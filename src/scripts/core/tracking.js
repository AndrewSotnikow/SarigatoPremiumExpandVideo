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
