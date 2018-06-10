function setup() {
  createCanvas(320, 240);
  capture = createCapture(VIDEO);
  capture.size(320, 240);
  capture.hide();

  // capture.hide();
  fill(0);
}

function draw() {
  background(255);
  // image(capture, 0, 0, 320, 240);
  // filter('INVERT');
  capture.loadPixels();
  var stepSize = round(constrain(mouseX / 8, 6, 32));
  for (var y = 0; y < height; y += stepSize) {
    for (var x = 0; x < width; x += stepSize) {
      var i = y * width + x;
      var darkness = (255 - capture.pixels[i * 4]) / 255;
      var radius = stepSize * darkness;
      rectMode(CENTER);
      rect(x, y, radius, radius);
    }
  }
}
