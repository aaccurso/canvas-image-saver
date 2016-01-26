function BrowserCanvasSaver (fileName) {
  this.anchor = document.createElement('a');
  this.fileName = fileName || 'canvas.png';
}

BrowserCanvasSaver.prototype.save = function(canvas, successCallback, errorCallback) {
  this.anchor.download = this.fileName;
  this.anchor.href = canvas.toDataURL('image/png');
  this.anchor.click();
  successCallback(canvas, fileName);
};
