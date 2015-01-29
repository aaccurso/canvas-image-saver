(function(global){
'use strict';

if (typeof exports === 'object' && typeof module !== 'undefined') {
  module.exports = CanvasImageSaver;
} else {
  global.CanvasImageSaver = CanvasImageSaver;
}

function CanvasImageSaver (canvas, cropOptions, successCallback, errorCallback, callbackContext) {
  var _this = this,
      noop = function () {};
  this.canvas = canvas;
  this.cropOptions = cropOptions;
  this.successCallback = successCallback || noop;
  this.errorCallback = errorCallback || noop;
  this.callbackContext = callbackContext || this;

  if (window.cordova) {
    if (window.canvas2ImagePlugin) {
      // TODO: extract to a CordovaCanvasSaver object
      this.saverImplementator = {
        save: function (canvas) {
          window.canvas2ImagePlugin.saveImageDataToLibrary(
            function(msg) {
              console.log(msg);
              _this.successCallback.call(_this.callbackContext, canvas);
            },
            function(err) {
              console.error(err);
              _this.errorCallback.call(_this.callbackContext);
            },
            canvas
          );
        }
      };
    } else {
      throw('You are using cordova. This library requires canvas2ImagePlugin.');
    }
  } else {
    // TODO: extract to a BrowserCanvasSaver object
    this.saverImplementator = {
      save: function (canvas) {
        var anchor = document.createElement('a');
        // TODO: configure name
        anchor.download = 'canvas.png';
        anchor.href = canvas.toDataURL('image/png');
        anchor.click();
        _this.successCallback.call(_this.callbackContext, canvas);
      }
    };
  }
};

CanvasImageSaver.prototype = {
  constructor: CanvasImageSaver,
  save: function () {
    var canvas = this.canvas;

    if (this.cropOptions) {
      // Sets default crop options
      this.cropOptions.xCropOffset = this.cropOptions.xCropOffset || 0;
      this.cropOptions.yCropOffset = this.cropOptions.yCropOffset || 0;
      this.cropOptions.width = this.cropOptions.width || this.canvas.width - this.cropOptions.xCropOffset;
      this.cropOptions.height = this.cropOptions.height || this.canvas.height - this.cropOptions.yCropOffset;
      // Creates temporal canvas to draw cropped image
      canvas = document.createElement('canvas');
      canvas.width = this.cropOptions.width;
      canvas.height = this.cropOptions.height;
      canvas.getContext('2d').drawImage(this.canvas,
        this.cropOptions.xCropOffset, this.cropOptions.yCropOffset,
        canvas.width, canvas.height,
        0, 0,
        canvas.width, canvas.height
      );
    }

    return this.saverImplementator.save(canvas);
  }
};

})(this);