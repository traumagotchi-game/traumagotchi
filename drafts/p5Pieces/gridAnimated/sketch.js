// http://purin.co/Experiments-with-P5-js
let moveDist = 0;
var prevSize;

function setup() {
  createCanvas(800, 600);
  frameRate(12);
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

  let easing = .24;
  let size = width;

  // for (let i = 0; i <= 20; i++) {
  //   size += (200 - size) * easing;
  //   rect(width / 2, height / 2, size + moveDist, (size + moveDist) * 3 / 4);
  // }

  if (moveDist < 30) {
    for (let i = 0; i <= 20; i++) {
      prevSize = size;
      size += (200 - size) * easing;
      rect(width / 2, height / 2, size + (moveDist), (size + moveDist) * 3 / 4);
    }
    moveDist++;
  } else {
    moveDist = 0;
  }

  // rect(0,moveDist, 50, 50);
  // console.log(moveDist);
  // if (moveDist == 24) {
  //
  // }

  // draw center rectangle
  fill(0);
  noStroke();
  rect(width / 2, height / 2, 200, 150);
}
