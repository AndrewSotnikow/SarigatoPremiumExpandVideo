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
