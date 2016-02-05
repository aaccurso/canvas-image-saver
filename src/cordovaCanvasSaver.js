function CordovaCanvasSaver () {
  if (!window.canvas2ImagePlugin) {
    throw('You are using cordova. This library requires canvas2ImagePlugin.');
  }
}

CordovaCanvasSaver.prototype.save = function(canvas, successCallback, errorCallback, filename, directory) {
  window.canvas2ImagePlugin.saveImageDataToLibrary(
    function(pathToFile) {
     successCallback(canvas, pathToFile);
    },
    function(error) {
      console.error(error);
      errorCallback(error);
    },
    canvas,
    filename,
    directory
  );
};
