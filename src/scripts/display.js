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
