# CanvasImageSaver

Wrapper for Cordova canvas2image plugin.

## Parameters
* `canvas`
* `cropOptions`
* `successCallback`
* `errorCallback`
* `callbackContext`

### Crop Options
* `xCropOffset`: _Optional._ The x coordinate where to start clipping.
* `yCropOffset`: _Optional._ The y coordinate where to start clipping.
* `width`: _Optional._ The width of the clipped image.
* `height`: _Optional._ The height of the clipped image.

## Usage
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
