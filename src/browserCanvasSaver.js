function BrowserCanvasSaver () {
  this.anchor = document.createElement('a');
}

BrowserCanvasSaver.prototype.save = function(canvas, successCallback, errorCallback, directory, filename) {
  this.anchor.download = filename || 'canvas.png';
  this.anchor.href = canvas.toDataURL('image/png');
  this.anchor.click();
  successCallback(canvas, filename);
};
