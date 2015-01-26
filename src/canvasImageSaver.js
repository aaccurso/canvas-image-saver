'use strict';

var CanvasImageSaver = function (canvas, cropOptions) {
  this.canvas = canvas;
  this.cropOptions = cropOptions;
  if (window.cordova) {
    if (window.canvas2ImagePlugin) {
      // this.saverImplementator = new CordovaCanvas();
    } else {
      throw('You are using cordova. This library requires canvas2ImagePlugin.');
    }
  } else {
    // this.saverImplementator = new BrowserCanvas();
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
  // return this.saverImplementator.save(canvas);
};
