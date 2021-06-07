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