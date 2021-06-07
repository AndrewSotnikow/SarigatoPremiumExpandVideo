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
