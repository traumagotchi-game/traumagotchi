// http://purin.co/Experiments-with-P5-js

function setup() {
  createCanvas(800, 600);
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

  let easing = .15;
  let size = width;
  let rectWidth = 150;
  // let easing = .15;
  // let size = width;
  // let rectWidth = 200;

  for (let i = 0; i <= 20; i++) {
    size += (rectWidth - size) * easing;
    rect(width / 2 , height / 2, size, size * 3 / 4);
  }

  // draw center rectangle
  fill(0);
  // fill(200, 10, 125);
  noStroke();
  rect(width / 2, height / 2, (rectWidth + 20), (rectWidth + 20) * 3 / 4);
}

function draw() {

}
