# CanvasImageSaver

Cool library that let's you save your canvas as a png image on desktop and mobile. It also provides cropping options.
For mobile compatibility you need (Cordova)[http://cordova.apache.org/] and (Canvas2ImagePlugin)[https://github.com/devgeeks/Canvas2ImagePlugin] as dependencies.

## Installation
`bower install canvas-image-saver --save`

## Parameters
* `canvas`: The canvas HTML5 element you want to save as image.
* `cropOptions`: _Optional._
* `successCallback`: _Optional._
* `errorCallback` _Optional._
* `callbackContext` _Optional._

### Crop Options
* `xCropOffset`: _Optional._ The x coordinate where to start clipping.
* `yCropOffset`: _Optional._ The y coordinate where to start clipping.
* `width`: _Optional._ The width of the clipped image.
* `height`: _Optional._ The height of the clipped image.

## Usage (Phaser example)
```js
var canvasImageSaver = new CanvasImageSaver(this.game.canvas, {
    xCropOffset: 180,
    yCropOffset: 0,
    width: 470,
    height: this.game.height
  }, function (canvas) {
    // Success callback
  }, function () {
    // Error callback
  }, this);

canvasImageSaver.save();
```

> TODO:
> Refactor using Q promises
