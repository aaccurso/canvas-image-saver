saveAvatarPicture: function() {
  var avatar = document.createElement('canvas'),
      anchor;

  avatar.width = 470;
  avatar.height = this.game.height;
  avatar.getContext('2d').drawImage(this.game.canvas,
    180, 0,
    avatar.width, avatar.height,
    0, 0,
    avatar.width, avatar.height
  );
  if (window.canvas2ImagePlugin) {
    window.canvas2ImagePlugin.saveImageDataToLibrary(
      function(msg) {
        console.log(msg);
        Dialog.alert('Guardar avatar', 'Se ha guardado tu avatar correctamente.');
      },
      function(err) {
        console.error(err);
        Dialog.alert('Guardar avatar', 'No se pudo guardar tu avatar.');
      },
      avatar
    );
  } else {
    anchor = document.createElement('a');
    anchor.download = 'avatar.png';
    anchor.href = avatar.toDataURL('image/png');
    anchor.click();
  }
}

function() {
  var anchor;

  if (window.canvas2ImagePlugin) {
    window.canvas2ImagePlugin.saveImageDataToLibrary(
      function(msg) {
        alert(msg);
      },
      function(err) {
        alert(err);
      },
      freeCanvas.canvas
    );
  } else {
    anchor = document.createElement('a');
    anchor.download = 'freeCanvas.png';
    anchor.href = freeCanvas.canvas.toDataURL('image/png');
    anchor.click();
  }
}
