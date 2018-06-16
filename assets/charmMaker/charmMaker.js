

let cols = 16;
let rows = 16;
let cellWidth = 20;
let cellHeight = 20;
let pixelArray = [];
let bgColorHex = '#120F00'
let bgColor;
let pixelColorHex = '#00ff00';
let pixelColor;


function setup() {

  console.log(`p to print array and s to save it`)

  createCanvas(cellWidth * cols, cellHeight * rows);

  pixelColor = color(pixelColorHex);
  bgColor = color(bgColorHex);
  background(bgColor);

  pixelArray = make2DArray(cols, rows, cellWidth, cellHeight);
  // console.log(pixelArray);
}

function draw() {

  draw2DArray(pixelArray, cellWidth, cellHeight);
}

function make2DArray(_cols, _rows) {
  let arr = [];
  for (let i = 0; i < _cols; i++) {
    arr[i] = [];
    for (let j = 0; j < _rows; j++) {
      // set initial color value to background;
      arr[i][j] = 0;
    }
  }
  return arr;
}

function draw2DArray(_array, _cellWidth, _cellHeight) {
  for (let i = 0; i < _array.length; i++) {
    for (let j = 0; j < _array[i].length; j++) {
      let x = i * _cellWidth;
      let y = j * _cellHeight;
      // stroke(50);
      noStroke;
      if (_array[i][j] == 1){
        fill(pixelColor);
      } else {
        fill(bgColor);
      }

      rect(x, y, _cellWidth, _cellHeight);
    }
  }
}

function mousePressed() {
  let c = floor(mouseX / cellWidth);
  let r = floor(mouseY / cellHeight);

  if (c >= 0 && c < cols && r >= 0 && r < rows) {
    if (keyIsPressed == true && keyCode == SHIFT) {
      pixelArray[c][r] = 0;
    } else {
      pixelArray[c][r] = 1;
    }
  }
}

function mouseDragged() {
  let c = floor(mouseX / cellWidth);
  let r = floor(mouseY / cellHeight);

  if (c >= 0 && c < cols && r >= 0 && r < rows) {
    if (keyIsPressed == true && keyCode == SHIFT) {
      pixelArray[c][r] = 0;
    } else {
      pixelArray[c][r] = 1;
    }
  }
}

function keyReleased() {

  if (key == 'p' || key == 'P') {
    console.log("printing array");
    createSpan("[")
    for (let i = 0; i < pixelArray.length; i++) {
      if (i < pixelArray.length - 1) {
        createSpan(`[${pixelArray[i]}],`);
      } else {
        createSpan(`[${pixelArray[i]}]`);
      }
    }
    createSpan("]")
  }
  if (key == 's' || key == 'S') {
    console.log("saving array");
    save('save.png');
  }
}
