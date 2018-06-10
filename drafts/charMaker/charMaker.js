// change pixel color in array to be pixelColorHex

let json = {};
let spriteData = {};
let spriteIndex = 0;
let newSpriteFrame = true;
let pixelArray = [];


let cols = 20;
let rows = 20;
let cellWidth = 50;
let cellHeight = 10;


// // Actual fullScreenSize
// let fullScreenCanvasWidth = 600
// let colsFullScreen = 45;
// let rowsFullScreen = 150;
// let cellWidthFullScreen = 20;
// let cellHeightFullScreen = 4;

// smaller to fit laptop
let fullScreenCanvasWidth = 300
let colsFullScreen = 45/2;
let rowsFullScreen = 150/2;
let cellWidthFullScreen = 20;
let cellHeightFullScreen = 4;

// let cellWidthFullScreen = 15;
// let cellHeightFullScreen = 3;
// let cellWidthFullScreen = 10;
// let cellHeightFullScreen = 2;
// let cellWidthFullScreen = 6.65;
// let cellHeightFullScreen = 1.5;
// let cellWidthFullScreen = 13.3;
// let cellHeightFullScreen = 3;
// let bgColorHex = '#121212'
let bgColorHex = '#000'
let bgColor;
let pixelColorHex = '#00ff00';


let scaleFactor;

let keyCodePressed;

let saveFrameButton;
let copyLastFrameButton;
let newSpriteFrameButton;
let previousFrameButton;
let nextFrameButton;
let playAnimationButton;
let playAnimationSwitch = false;
let timer = 0;
let savePNGbutton;
let saveJSONbutton;
let loadJSONnameInput;
let loadJSONbutton;

let pixelColorRadio;
let pixelColor;
let colsInput;
let rowsInput;
let cellWidthInput;
let cellHeightInput;
let toggleStrokeButton;
let strokeWeightSlider;
let toggleStrokeSwitch = true;
let strokeWeightValue = .2;
let toggleBandsSwitchButton;
let toggleBandsSwitch = false;
let toggleOnionSkinSwitch = false;
let toggleOnionSkinButton;
let toggleFirstFrameOnion = false;
let toggleFirstFrameOnionButton;
let onionAlpha = 30;
let onionAlphaSlider;

let color1Hex = '#ffff00';
let color2Hex = '#00ff00';
let color3Hex = '#56bc2f';
let color4Hex = '#0080ff';
let color5Hex = '#fc7800';
let color6Hex = '#9400D3';
let color7Hex = '#8b002f';
let color8Hex = '#9f734a';
let color9Hex = '#153a07';
let color0Hex = '#40374c';

let frameCountP;


function setup() {
  frameRate(8);
  // game controller
  window.addEventListener('keydown', function(e) {
    // console.log(`keycode is: ${e.keyCode}`)
    keyCodePressed = e.keyCode;

    switch (keyCodePressed) {
      case 80:
        saveJSONfile();
        // printData();
        break;
      case 83:
        console.log("saving image");
        save('sprite.png');
        break;
      case 49:
        pixelColorHex = color1Hex;
        break;
      case 50:
        pixelColorHex = color2Hex;
        break;
      case 51:
        pixelColorHex = color3Hex;
        break;
      case 52:
        pixelColorHex = color4Hex;
        break;
      case 53:
        pixelColorHex = color5Hex;
        break;
      case 54:
        pixelColorHex = color6Hex;
        break;
      case 55:
        pixelColorHex = color7Hex;
        break;
      case 56:
        pixelColorHex = color8Hex;
        break;
      case 57:
        pixelColorHex = color9Hex;
        break;
      case 48:
        pixelColorHex = color0Hex;
        break;
      case 70:
        saveSprite();
        break;
      case 68:
        previousFrame();
        break;
      case 71:
        nextFrame();
        break;
      default:
        break;
    }
  })

  window.addEventListener('keyup', function(e) {
    keyCodePressed = false;
  })

  reset();

  console.log(`key:
    p to print array
    s to save image
    f to save frame
    d for previous frame
    g for next frame`)

  let colorSwitch = createSpan(`Toggle color with #:`)
  colorSwitch.parent("colorChoices");
  colorSwitch.style(`background-color: gray`);
  let color1p = createSpan(`ONE`);
  color1p.parent("colorChoices");
  color1p.style(`background-color: ${color1Hex}`);
  let color2p = createSpan(`TWO`);
  color2p.parent("colorChoices");
  color2p.style(`background-color: ${color2Hex}`);
  let color3p = createSpan(`THREE`);
  color3p.parent("colorChoices");
  color3p.style(`background-color: ${color3Hex}`);
  let color4p = createSpan(`FOUR`);
  color4p.parent("colorChoices");
  color4p.style(`background-color: ${color4Hex}`);
  let color5p = createSpan(`FIVE`);
  color5p.parent("colorChoices");
  color5p.style(`background-color: ${color5Hex}`);
  let color6p = createSpan(`SIX`);
  color6p.parent("colorChoices");
  color6p.style(`background-color: ${color6Hex}`);
  let color7p = createSpan(`SEVEN`);
  color7p.parent("colorChoices");
  color7p.style(`background-color: ${color7Hex}`);
  let color8p = createSpan(`EIGHT`);
  color8p.parent("colorChoices");
  color8p.style(`background-color: ${color8Hex}`);
  let color9p = createSpan(`NINE`);
  color9p.parent("colorChoices");
  color9p.style(`background-color: ${color9Hex}`);
  let color0p = createSpan(`ZERO`);
  color0p.parent("colorChoices");
  color0p.style(`background-color: ${color0Hex}`);

  frameCountP = createP(`frame: ${spriteIndex}`);
  frameCountP.parent("rightColumn");



  // // to change cell size
  // let cellSizeMenu = createP("set cell size");
  // cellSizeMenu.parent("rightColumn");
  // cellWidthInput = createInput("50")
  // cellWidthInput.parent("rightColumn");
  // cellHeightInput = createInput("10")
  // cellHeightInput.parent("rightColumn");
  // let cellSizeButton = createButton("set grid size");
  // cellSizeButton.parent("rightColumn");
  // cellSizeButton.mousePressed(setCellSize);

  let gridSizeMenu = createSpan("choose grid size: col + rows");
  gridSizeMenu.parent("rightColumn");
  colsInput = createInput("20")
  colsInput.parent("rightColumn");
  rowsInput = createInput("20")
  rowsInput.parent("rightColumn");
  let gridSizeButton = createButton("set grid size");
  gridSizeButton.parent("rightColumn");
  gridSizeButton.mousePressed(setGridSize);

  let toggleStrokeMenu = createSpan("Stroke options");
  toggleStrokeMenu.parent("rightColumn");
  toggleStrokeMenu.style("margin: 20px 0 0 0; display: block;")
  strokeWeightSlider = createSlider(0, 5, .2, .1);
  strokeWeightSlider.parent("rightColumn");
  toggleStrokeButton = createButton("on/off");
  toggleStrokeButton.parent("rightColumn");
  toggleStrokeButton.mousePressed(toggleStroke);

  saveFrameButton = createButton("save sprite frame");
  saveFrameButton.parent("rightColumn");
  saveFrameButton.style("margin: 20px 0 20px 0; display: block;")
  saveFrameButton.mousePressed(saveSprite);

  copyLastFrameButton = createButton("load/copy last frame");
  copyLastFrameButton.parent("rightColumn");
  copyLastFrameButton.style("margin: 20px 0 20px 0; display: block;")
  copyLastFrameButton.mousePressed(copyLastFrame);

  previousFrameButton = createButton("< previous frame *");
  previousFrameButton.parent("rightColumn");
  // previousFrameButton.style("margin-top: 60px; display: block;")
  previousFrameButton.mousePressed(previousFrame);

  nextFrameButton = createButton("> next frame *");
  nextFrameButton.parent("rightColumn");
  // nextFrameButton.style("margin-top: 60px; display: block;")
  nextFrameButton.mousePressed(nextFrame);


  playAnimationbutton = createButton("playAnimation");
  playAnimationbutton.parent("rightColumn");
  playAnimationbutton.style("margin-top: 20px; display: block;")
  playAnimationbutton.mousePressed(function() {
    playAnimationSwitch = !playAnimationSwitch
  });

  toggleOnionSkinButton = createButton("toggle onion skin");
  toggleOnionSkinButton.parent("rightColumn");
  toggleOnionSkinButton.mousePressed(function() {
    toggleOnionSkinSwitch = !toggleOnionSkinSwitch;
  });

  onionAlphaSlider = createSlider(0, 255, 30);
  onionAlphaSlider.parent("rightColumn");

  toggleFirstFrameOnionButton = createButton("toggle onion first frame");
  toggleFirstFrameOnionButton.parent("rightColumn");
  toggleFirstFrameOnionButton.mousePressed(function() {
    toggleFirstFrameOnion = !toggleFirstFrameOnion;
    console.log(toggleFirstFrameOnion);
  });

  savePNGbutton = createButton("save PNG");
  savePNGbutton.parent("rightColumn");
  savePNGbutton.style("margin-top: 20px; display: block;")
  savePNGbutton.mousePressed(savePNG);

  spriteData.sprites = [];
  saveJSONbutton = createButton("save JSON");
  saveJSONbutton.parent("rightColumn");
  saveJSONbutton.style("display: block; margin-bottom: 20px;")
  saveJSONbutton.mousePressed(saveJSONfile);

  loadJSONnameInput = createInput("paste file Name here");
  loadJSONnameInput.parent('rightColumn');
  loadJSONbutton = createButton("load JSON");
  loadJSONbutton.parent('rightColumn');
  loadJSONbutton.mousePressed(function() {
    let fileName = loadJSONnameInput.value();
    loadJSON(`JSON/${fileName}.json`, loadSpriteData);
  });
}

function reset() {
  let canvas = createCanvas(cellWidth * cols, cellHeight * rows);
  canvas.parent("canvasDivDraw");


  background(0);

  scaleFactor = cellWidthFullScreen / cellWidth;
  // console.log(scaleFactor);

  pixelColor = color(pixelColorHex);
  bgColor = color(bgColorHex);
  background(bgColor);

  pixelArray = make2DArray(cols, rows, cellWidth, cellHeight);
  // console.log(pixelArray);
}

function draw() {

  pixelColor = color(pixelColorHex);

  setStrokeWeight();

  if (playAnimationSwitch) {
    playAnimation();
  } else {
    draw2DArray(pixelArray, cellWidth, cellHeight);
  }

  if (toggleOnionSkinSwitch && spriteIndex > 0) {
    draw2DArrayOnionSkin(spriteData.sprites[spriteIndex - 1].array, cellWidth, cellHeight)
  }
  mouseOverHighlight(pixelArray, cellWidth, cellHeight);
  // drawCRTlines(pixelArray, cellWidth, cellHeight);
}

function loadSpriteData(jsonFile) {
  spriteData = JSON.parse(jsonFile);
  cols = spriteData.cols;
  rows = spriteData.rows;
  reset();
  // strokeWeightSlider.value() = spriteData.stroke;
}

function printData() {
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

function saveSprite() {
  // hm. could just rewrite the sprite array using its index. not sure object assign is needed
  // need to check if it is an existing frame the  overwrite using Object.assign (from firebase pushMoreData):
  // this works to add new key:value pairs and also to reassign values with same key name
  // spriteData.sprites[index] = Object.assign(spriteData.sprites[index], data);
  console.log(`frame saved`)
  frameCountP.html(`frame: ${spriteIndex}`);
  let sprite = {};
  sprite.array = pixelArray;
  sprite.stroke = strokeWeightValue;
  // console.log(`single sprite object is:`);
  // console.log(sprite);

  if (newSpriteFrame == true) {
    // if (!spriteIndex) {
    spriteData.sprites.push(sprite);
    newSpriteFrame = false;
    console.log(`new spriteFrame == true`)
  // } else if (newSpriteFrame == false && (spriteData.sprites.length - 1) == spriteIndex){
  //   // do nothing
  //   console.log(`new sprite frame is true AND sprite index is last (option 2)`)
  } else if (newSpriteFrame == false) {
    // } else if (spriteIndex)
    console.log(`new sprite frame is false`)
    spriteData.sprites[spriteIndex] = sprite;
  }
  // console.log(`sprite index is ${spriteIndex} and spriteData.sprites.length is ${spriteData.sprites.length}`)
}

function previousFrame() {
  // saveSprite();
  newSpriteFrame = false;
  toggleOnionSkinSwitch = false;
  if (spriteIndex > 0) {
    spriteIndex--;
    // step thru spriteData array
    frameCountP.html(`frame: ${spriteIndex}`);
  } else {
    frameCountP.html(`frame: ${spriteIndex} First frame`);
    console.log(`THIS IS THE FIRST FRAME`);
  }
  pixelArray = spriteData.sprites[spriteIndex].array;
  // console.log(`sprite index is ${spriteIndex} and spriteData.sprites.length is ${spriteData.sprites.length}`)
}

function nextFrame() {
  // saveSprite();
  if (spriteIndex < spriteData.sprites.length - 1) {
    spriteIndex++;
    pixelArray = spriteData.sprites[spriteIndex].array;
    frameCountP.html(`frame: ${spriteIndex}`);
  } else if (spriteIndex == spriteData.sprites.length - 1) {
    pixelArray = make2DArray(cols, rows, cellWidth, cellHeight);

    spriteIndex++;
    // pixelArray = Array.from(spriteData.sprites[spriteIndex - 1].array);
    newSpriteFrame = true;
    toggleOnionSkinSwitch = true;
    frameCountP.html(`frame: ${spriteIndex}*`);
    console.log('NEW FRAME');

  } else if (spriteIndex >= spriteData.sprites.length) {
    frameCountP.html(`frame: ${spriteIndex} (Last Frame)`);
    // spriteIndex = spriteData.sprites.length - 1;
    console.log('THIS IS THE LAST FRAME')
  }

  // console.log(`sprite index is ${spriteIndex} and spriteData.sprites.length is ${spriteData.sprites.length}`)
}


function copyLastFrame() {
  console.log('copyFrame')
  // saveSprite();
  // pixelArray = [];

  pixelArray = null;
  // pixelArray = Array.from(spriteData.sprites[spriteIndex - 1].array);

  pixelArray = JSON.parse(JSON.stringify(spriteData.sprites[spriteIndex - 1].array));

  // pixelArray = spriteData.sprites[spriteIndex - 1].array.slice();

}

function playAnimation() {

  // let delay = 1000 / 12;
  //
  // let timerTimeout = setTimeout(function request() {
  //   clearTimeout(timerTimeout);
  //   if (timer < spriteData.sprites.length) {
  //     draw2DArray(spriteData.sprites[timer].array, cellWidth, cellHeight);
  //     console.log(timer);
  //     timer++;
  //     timerTimeout = setTimeout(request, delay)
  //   } else {
  //     timer = 0;
  //
  //     // draw2DArray(spriteData.sprites[counter].array, cellWidth, cellHeight);
  //     timerTimeout = setTimeout(request, 1000);
  //   }
  //
  // }, delay);

  if (timer < spriteData.sprites.length) {
    draw2DArray(spriteData.sprites[timer].array, cellWidth, cellHeight);
  } else if (timer >= spriteData.sprites.length) {
    timer = 0;
    draw2DArray(spriteData.sprites[timer].array, cellWidth, cellHeight);
  }
  timer++;
  // console.log(timer);
}

function saveJSONfile() {
  // spriteData.sprites[0].array = pixelArray;
  // spriteData.sprites[0].stroke = strokeWeightValue;
  console.log("saving JSON");
  spriteData.cols = cols;
  spriteData.rows = rows;
  json = JSON.stringify(spriteData);
  saveJSON(json, 'sprite.json');
}

function savePNG() {
  // console.log("saving image");
  save(`sprite_${spriteIndex}.png`);
  console.log(`saved frame ${spriteIndex}`)
}

function setStrokeWeight() {
  strokeWeightValue = strokeWeightSlider.value();


  if (toggleStrokeSwitch == true) {
    // console.log("true")
    strokeWeight(strokeWeightValue);
    // fullScreenCanvas.strokeWeight(strokeWeightValue)
  } else if (toggleStrokeSwitch == false) {
    // console.log("false")
    // noStroke();
    strokeWeight(0);
    // fullScreenCanvas.strokeWeight(0)
  }
}

function setGridSize() {
  cols = colsInput.value();
  rows = rowsInput.value();
  pixelArray = [];
  reset();
}

function setCellSize() {
  cellWidth = cellWidthInput.value();
  cellHeight = cellHeightInput.value();
  pixelArray = [];
  reset();
}

function make2DArray(_cols, _rows) {
  let arr = [];
  for (let i = 0; i < _cols; i++) {
    arr[i] = [];
    for (let j = 0; j < _rows; j++) {
      // set initial color value to background;
      arr[i][j] = {
        on: false
      };
    }
  }
  return arr;
}

function toggleStroke() {
  toggleStrokeSwitch = !toggleStrokeSwitch;
  // console.log(toggleStrokeSwitch);
}

function draw2DArray(_array, _cellWidth, _cellHeight) {
  for (let i = 0; i < _array.length; i++) {
    for (let j = 0; j < _array[i].length; j++) {
      let x = i * _cellWidth;
      let y = j * _cellHeight;




      if (_array[i][j].on == true) {
        fill(_array[i][j].color);
      } else if (_array[i][j].on == false) {
        fill(bgColor);
      }

      // rect(x, y, _cellWidth, _cellHeight, 5, 5, 5, 5);
      rect(x, y, _cellWidth, _cellHeight);
    }
  }
}

function draw2DArrayOnionSkin(_array, _cellWidth, _cellHeight) {
  onionAlpha = onionAlphaSlider.value();
  let onionArray;
  if (toggleFirstFrameOnion == true) {
    onionArray = spriteData.sprites[0].array;
  } else if (toggleFirstFrameOnion == false) {
    onionArray = _array
  }

  for (let i = 0; i < onionArray.length; i++) {
    for (let j = 0; j < onionArray[i].length; j++) {
      let x = i * _cellWidth;
      let y = j * _cellHeight;


      if (onionArray[i][j].on == true) {
        let c = color(onionArray[i][j].color);
        c.setAlpha(onionAlpha);
        // console.log(c);
        fill(c);
        // fill(255, 255, 255, 10);
      } else if (onionArray[i][j].on == false) {
        fill(0, 0, 0, 0);
      }

      // rect(x, y, _cellWidth, _cellHeight, 5, 5, 5, 5);
      rect(x, y, _cellWidth, _cellHeight);

    }
  }
}

function drawCRTlines(_array, _cellWidth, _cellHeight) {
  for (let i = 0; i < _array.length; i++) {
    for (let j = 0; j < _array[i].length; j++) {

      let y = j * _cellHeight;
      strokeWeight(.2);
      stroke(255, 0, 100, 30);
      line(0, y, width, y);
      stroke(0, 200, 200, 30);
      line(0, y - .5, width, y - .5);
      stroke(bgColor);
      setStrokeWeight();
    }
  }
}

function mousePressed() {
  let c = floor(mouseX / cellWidth);
  let r = floor(mouseY / cellHeight);

  if (c >= 0 && c < cols && r >= 0 && r < rows && mouseY > 0 && mouseY < height && mouseX > 0 && mouseX < width) {
    if (keyCodePressed == 16) {
      pixelArray[c][r].on = false;
    } else {
      pixelArray[c][r].on = true;
      pixelArray[c][r].color = pixelColorHex;
    }
  }
}

function mouseDragged() {
  let c = floor(mouseX / cellWidth);
  let r = floor(mouseY / cellHeight);

  if (c >= 0 && c < cols && r >= 0 && r < rows && mouseY > 0 && mouseY < height && mouseX > 0 && mouseX < width) {
    if (keyCodePressed == 16) {
      pixelArray[c][r].on = false;

    } else {
      pixelArray[c][r].on = true;
      pixelArray[c][r].color = pixelColorHex;
    }
  }
}

function mouseOverHighlight(_array, _cellWidth, _cellHeight) {
  let c = floor(mouseX / _cellWidth);
  let r = floor(mouseY / _cellHeight);

  for (let i = 0; i < _array.length; i++) {
    for (let j = 0; j < _array[i].length; j++) {
      let x = i * _cellWidth;
      let y = j * _cellHeight;

      if (mouseX > x && mouseX <= x + _cellWidth && mouseY > y && mouseY <= y + _cellHeight) {
        fill(155, 155, 155, 100);
      } else {
        fill(255, 255, 255, 0);
      }

      rect(x, y, _cellWidth, _cellHeight);
      // rect(x, y, _cellWidth, _cellHeight, 5, 5, 5, 5);
    }
  }
}


// create full size p5 canvas
let s = function(p) { // p could be any variable name


  p.canvas;

  p.setup = function() {
    p.canvas = p.createCanvas(fullScreenCanvasWidth, fullScreenCanvasWidth * 3 / 4);
    p.canvas.parent("canvasDivFull");

    p.frameRate(30);

  };

  p.draw = function() {
    p.background(0);



    if (toggleStrokeSwitch == true) {

      p.strokeWeight(strokeWeightValue * scaleFactor);
    } else if (toggleStrokeSwitch == false) {
      // console.log("false")
      // noStroke();
      p.strokeWeight(0);
    }

    if (playAnimationSwitch) {
      playFullScreenAnimation();
    } else {
      drawFullScreen2DArray(pixelArray, cellWidthFullScreen, cellHeightFullScreen);
    }

    if (toggleBandsSwitch == true) {
      drawBands(pixelArray, cellWidthFullScreen, cellHeightFullScreen);
    }
  };

  function drawFullScreen2DArray(_array, _cellWidth, _cellHeight) {
    for (let i = 0; i < _array.length; i++) {
      for (let j = 0; j < _array[i].length; j++) {
        let x = i * _cellWidth + _cellWidth * 2;
        let y = j * _cellHeight + _cellHeight * 10;


        // if (_array[i][j].on == true){
        //
        //   p.fill(_array[i][j].color);
        //   p.rect(x, y, _cellWidth, _cellHeight, 5, 5, 5, 5);
        //
        //   // pink outline
        //   p.noFill();
        //   p.stroke(255, 0, 100, 50);
        //   strokeWeight(strokeWeightValue +.5);
        //   // strokeWeight(1);
        //   p.rect(x + .3, y + .3, _cellWidth, _cellHeight, 5, 5, 5, 5);
        //
        //   // pink outline
        //   p.noFill();
        //   p.stroke(0, 200, 200, 50);
        //   strokeWeight(strokeWeightValue +.5);
        //   // strokeWeight(1);
        //   p.rect(x - .3, y - .3, _cellWidth, _cellHeight, 5, 5, 5, 5);
        //
        //   // reset stroke to default
        //   p.stroke(bgColor);
        //   setStrokeWeight();
        // } else {
        //   p.fill(bgColor);
        //   p.rect(x + .1, y + .1, _cellWidth, _cellHeight, 5, 5, 5, 5);
        // }

        if (_array[i][j].on == true) {
          p.fill(_array[i][j].color);
        } else {
          p.fill(bgColor);
        }

        p.rect(x, y, _cellWidth, _cellHeight);
      }
    }
  }

  function playFullScreenAnimation() {

    if (timer < spriteData.sprites.length) {
      drawFullScreen2DArray(spriteData.sprites[timer].array, cellWidthFullScreen, cellHeightFullScreen);
    } else if (timer >= spriteData.sprites.length) {
      // timer = 0;
      drawFullScreen2DArray(spriteData.sprites[0].array, cellWidthFullScreen, cellHeightFullScreen);
    }
    // timer++;
    // console.log(timer);
    // drawFullScreen2DArray(spriteData.sprites[timer].array, cellWidthFullScreen, cellHeightFullScreen);
  }

  function drawBands(_array, _cellWidth, _cellHeight) {
    // fullScreen
    for (let i = 0; i < (450 / _cellHeight); i++) {
      let y = i * _cellHeight;
      p.strokeWeight(.1);
      p.stroke(255, 0, 100, 30);
      p.line(0, y, width, y);
      p.stroke(0, 200, 200, 30);
      p.line(0, y - .5, width, y - .5);
      p.stroke(bgColor);
      setStrokeWeight();
    }


    // just for image size
    for (let i = 0; i < _array.length; i++) {
      for (let j = 0; j < 450 / _cellHeight; j++) {

        let y = j * _cellHeight;
        p.strokeWeight(.1);
        p.stroke(255, 0, 100, 30);
        p.line(0, y, width, y);
        p.stroke(0, 200, 200, 30);
        p.line(0, y - .5, width, y - .5);
        p.stroke(bgColor);
        setStrokeWeight();
      }
    }
  }
};

let fullScreenCanvas = new p5(s, 'canvasDiv');
