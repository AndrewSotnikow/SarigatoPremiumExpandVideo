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
