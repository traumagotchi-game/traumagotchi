// http://purin.co/Experiments-with-P5-js
var capture;
let size;
let rectWidth;
let easing;

function setup() {
  createCanvas(800, 600);


  capture = createCapture(VIDEO);
  capture.size(320, 240);
  capture.hide();




}

function draw() {
  background(0);

  strokeWeight(1.5);
  stroke(0, 255, 0);

  // draw lines from middle
  // draw lines to top
  for (let i = 0; i < width; i += 50) {
    line(width / 2, height / 2, i, 0);
  }
  // to right
  for (let i = 0; i < height; i += 50) {
    line(width / 2, height / 2, width, i);
  }
  // to bottom
  for (let i = 0; i <= width; i += 50) {
    line(width / 2, height / 2, i, height);
  }
  // to left
  for (let i = 0; i < height; i += 50) {
    line(width / 2, height / 2, 0, i);
  }

  // draw concentric rectangles
  rectMode(CENTER);
  noFill();

  easing = .15;
  size = width;
  rectWidth = 200;

  // let easing = .15;
  // let size = width;
  // let rectWidth = 200;

  for (let i = 0; i <= 20; i++) {
    size += (rectWidth - size) * easing;
    rect(width / 2, height / 2, size, size * 3 / 4);
  }

  // draw center rectangle
  fill(0);
  // fill(200, 10, 125);
  noStroke();
  rect(width / 2, height / 2, (rectWidth + 20), (rectWidth + 20) * 3 / 4);

  capture.loadPixels();
  fill(255);
  // image(capture, width / 2 - rectWidth/2 - 10, height / 2 - (rectWidth * 3 / 8) - 10, rectWidth + 20, (rectWidth + 20) * 3 / 4);
  var stepSize = 10;
  // var stepSize = round(constrain(mouseX / 8, 6, 32));
  for (var y = 0; y < rectWidth*3/4; y += stepSize) {
    for (var x = 0; x < rectWidth; x += stepSize) {
      var i = y * capture.width + x;
      var darkness = (255 - capture.pixels[i * 4]) / 255;
      var radius = stepSize * darkness;
      rectMode(CENTER);
      rect(x + width / 2 - rectWidth/2 + 5, y + height / 2 - (rectWidth * 3 / 8) + 5, radius, radius);
    }
  }
  // for (var y = 0; y < (rectWidth + 20) * 3 / 4; y += stepSize) {
  //   for (var x = 0; x < rectWidth + 20; x += stepSize) {
  //     var i = y * width + x;
  //     var darkness = (255 - capture.pixels[i * 4]) / 255;
  //     var radius = stepSize * darkness;
  //     rectMode(CENTER);
  //     rect(x + width / 2 - rectWidth/2, y + height / 2 - (rectWidth * 3 / 8), radius, radius);
  //   }
  // }
}
