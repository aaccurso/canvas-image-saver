(function(window){
'use strict';

var CanvasImageSaver = function (canvas, cropOptions) {
  this.canvas = canvas;
  this.cropOptions = cropOptions;
  if (window.cordova) {
    if (window.canvas2ImagePlugin) {
      // TODO: extract to a CordovaCanvasSaver object
      this.saverImplementator = {
        save: function (canvas) {
          // TODO: return promise
          window.canvas2ImagePlugin.saveImageDataToLibrary(
            function(msg) {
              console.log(msg);
            },
            function(err) {
              console.error(err);
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
        anchor.download = 'avatar.png';
        anchor.href = avatar.toDataURL('image/png');
        anchor.click();
        // TODO: return promise
      }
    };
  }
};

CanvasImageSaver.prototype = Object.create(Object.prototype);
CanvasImageSaver.prototype.constructor = CanvasImageSaver;
CanvasImageSaver.prototype.configure = function (canvas, cropOptions) {
  this.canvas = canvas;
  this.cropOptions = cropOptions;
  return this;
};

CanvasImageSaver.prototype.save = function () {
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
};

window.CanvasImageSaver = CanvasImageSaver;

})(window);