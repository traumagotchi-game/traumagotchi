// http://purin.co/Experiments-with-P5-js

function setup() {
  createCanvas(800, 600);

}

function draw() {
  background(0);
  strokeWeight(2);
  stroke(0, 255, 0);

  // draw lines from middle
  // draw lines to top
  for (let i = 0; i < width; i += 50) {
    line(mouseX, mouseY, i, 0);
  }
  // to right
  for (let i = 0; i < height; i += 50) {
    line(mouseX, mouseY, width, i);
  }
  // to bottom
  for (let i = 0; i <= width; i += 50) {
    line(mouseX, mouseY, i, height);
  }
  // to left
  for (let i = 0; i < height; i += 50) {
    line(mouseX, mouseY, 0, i);
  }

  // draw concentric rectangles
  rectMode(CENTER);
  noFill();

  let easing = .1;
  let size = width;

  for (let i = 0; i <= width; i += 10) {
    size += (200 - size) * easing;
    rect(mouseX, mouseY, size, size * 3 / 4);
  }

  // draw center rectangle
  fill(0);
  noStroke();
  rect(mouseX, mouseY, 200, 150);
}
