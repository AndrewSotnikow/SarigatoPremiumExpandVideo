"use strict";function Gestures(e){var t=this;e||t.debug.error("container"),t.stkExt({container:e,captureMode:!!stkBrowserSupportsPassiveEvents&&{passive:!0}}).initialize()}Gestures.prototype={handlers:{},container:null,captureMode:null,trackSwipeHandler:null,trackSpreadHandler:null,catchSwipeHandler:null,catchSpreadHandler:null,touches:[],swipe:[null,null],spread:{sx:null,sy:null,cx:null,cy:null},debug:new SatakuLogger({error:{container:["{Gestures} Check your container",SatakuLogger.prototype.stylesheet.error]}}),buildHandlers:function(){var e=this;e.handlers=function(){var t={touches:null,maxTouches:2,touchIndex:null,isMultitouch:null,preventTouch:!1,handlers:{touchstart:function(c){t.touches=c.touches||c.targetTouches,t.touchIndex=t.touches.length-1,0===t.touchIndex&&(t.preventTouch=!1),t.preventTouch||(t.touchIndex>0&&(t.isMultitouch=!0),t.touchIndex>t.maxTouches-1||(e.touches[t.touchIndex]={sx:t.touches[t.touchIndex].clientX,sy:t.touches[t.touchIndex].clientY},t.touchIndex===t.maxTouches-1&&e.spread.stkExt({sx:Math.abs((e.touches[t.touchIndex-1].cx||e.touches[t.touchIndex-1].sx)-e.touches[t.touchIndex].sx),sy:Math.abs((e.touches[t.touchIndex-1].cy||e.touches[t.touchIndex-1].sy)-e.touches[t.touchIndex].sy)})))},touchmove:function(c){if(!(t.preventTouch||(t.touches=c.touches||c.targetTouches,t.touchIndex=t.touches.length-1,t.touchIndex>t.maxTouches-1))){for(var u=0;u<=t.touchIndex;u++)e.touches[u]&&e.touches[u].stkExt({cx:t.touches[u].clientX,cy:t.touches[u].clientY});0===t.touchIndex&&e.trackSwipeHandler&&!t.isMultitouch&&e.touches[t.touchIndex]&&(e.swipe=[e.touches[t.touchIndex].cx-e.touches[t.touchIndex].sx,e.touches[t.touchIndex].cy-e.touches[t.touchIndex].sy],e.trackSwipeHandler(e.swipe)),1===t.touchIndex&&e.trackSpreadHandler&&(e.spread.stkExt({cx:Math.abs(e.touches[t.touchIndex-1].cx-e.touches[t.touchIndex].cx)-e.spread.sx,cy:Math.abs(e.touches[t.touchIndex-1].cy-e.touches[t.touchIndex].cy)-e.spread.sy}),e.trackSpreadHandler([e.spread.cx,e.spread.cy]))}},touchend:function(c){if(!(t.preventTouch||(t.touches=c.touches||c.targetTouches,t.touchIndex=t.touches.length-1,t.touchIndex>t.maxTouches-1)))if(-1===t.touchIndex){if(t.isMultitouch)return void(t.isMultitouch=!1);e.catchSwipeHandler&&e.catchSwipeHandler(e.swipe)}else 0===t.touchIndex&&(t.isMultitouch=!0,e.catchSpreadHandler&&e.catchSpreadHandler([e.spread.cx,e.spread.cy]))},touchcancel:function(e){t.preventTouch=!0}}};return t.handlers}()},setListeners:function(){var e=this;for(var t in e.handlers)e.container.stkListen(t,e.handlers[t],e.captureMode)},kill:function(){var e=this;for(var t in e.handlers)e.container.stkStopListening(t,e.handlers[t],e.captureMode)},initialize:function(){var e=this;e.buildHandlers(),e.setListeners()}};