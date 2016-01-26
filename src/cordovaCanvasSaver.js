function CordovaCanvasSaver () {
  if (!window.canvas2ImagePlugin) {
    throw('You are using cordova. This library requires canvas2ImagePlugin.');
  }
}

CordovaCanvasSaver.prototype.save = function(canvas, successCallback, errorCallback) {
  window.canvas2ImagePlugin.saveImageDataToLibrary(
    function(fileName) {
     successCallback(canvas, fileName);
    },
    function(error) {
      console.error(error);
      errorCallback(error);
    },
    canvas
  );
};
