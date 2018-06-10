let canvas;
let capture;
let state = 'menu0'

let diameter = 100;
// // for 2d grid
// let size;
// let easing;
// let fillColor;
// let strokeColor;
let pixelArray = [];
let graphics;
let graphicsBG;
let gridOffset = 0;
let angleTgotchi = 0;
let angleCamera = 0;
let database;

// dom
let consoleText;
let step;
let stepTextArray = [{
  text: "You wake up feeling like shit. This is normal, but this time the shit is coming out. Like really coming out, and it’s bringing everything with it.",
  end: false
}, {
  text: "It starts in your nasal cavity, and ends on your floor. Most people have a floor, no matter how desperate their circumstances are. The earth is just designed that way, at least until the landlords turn us into hovering braincubes who need to pay $90 just to faceplant.",
  end: false
}, {
  text: "But like all terrible things, global warming and so on, you were born into the ones that already happened so you’re used to them, and the rest is just a little beyond your own mortality. So you get out of bed and inspect the mess.",
  end: true
}, {
  text: "",
  end: true
}];


let divMenu0;
let divMenu1;
let sliderBackgroundHue;
let sliderBackgroundSat;
let sliderPixelHue;
let sliderPixelSat;
let sliderSize;
let inputName;
let inputPassword;
let saveButton;

// store name as firebase key
let tgotchiName;

function setup() {
  colorMode(HSB, 360); // Use HSB with scale of 0-360
  // colorMode(RGB, 255); // Use HSB with scale of 0-360

  // bug! canvas size affects frameRate!
  // canvas = createCanvas(1000, 800);
  // canvas = createCanvas(1200 / 2, 1200 * 3 / 8);
  // canvas = createCanvas(windowWidth / 2, windowWidth * 3 / 8);
  canvas = createCanvas(windowWidth / 2, windowWidth * 3 / 8);
  canvas.parent("canvasDiv");
  canvas.style("border: 5px solid #00ff00;")


  frameRate(30);

  
}


function windowResized() {
  resizeCanvas(windowWidth / 2, windowWidth * 3 / 8);
}

function draw() {
  background(0, 0, 0);

  drawGrid();

  // drawTgotchiGraphics();

}

function gotData(data) {
  // don't need to retrieve anything here
}

function errData(err) {
  console.log("error!");
  console.log(err);
}

function saveFile() {

  // access tgotchi node, tis was for push not set code below
  // let ref = database.ref('tgotchi');

  // // create json for data
  let data = {
    // name: inputName.value(),
    // password: inputPassword.value(),
    timeStamp: [Date.now()],
    tgotchiImage: {
      pixelArray: pixelArray,
      pixelSize: sliderSize.value(),
      backgroundHue: sliderBackgroundHue.value(),
      backgroundSat: sliderBackgroundSat.value(),
      pixelHue: sliderPixelHue.value(),
      pixelSat: sliderPixelSat.value()
    }
    // sessionStorage.setItem("tgotchiData", "data");
  }


  // pushing creates new entry with random key
  // if you save the result (return from pushing data) in a variable, you can
  // access the key it was saved with, or any other values
  // let result = ref.push(data);

  // using set will let you create node with given name, not random key
  let result = firebase.database().ref('tgotchi/' + inputName.value()).set(data);

  // save name in global variable to access firebase
  tgotchiName = inputName.value();

  // console.log(result);
  // console.log(result.key);
  // you could create welcome name here!
  setTimeout(function() {
    state = 'menu1';
    menu1();
  }, 750);
  // setTimeout(menu1, 500);
}

function writeConsoleText(state) {
  switch (state) {
    case 'menu0':
      step = 0;
      break;
    case 'menu1':
      step = 3;
      break;
    default:
      // make default a blank step
      step = 3;
  }

  consoleText.html(stepTextArray[step].text);
  consoleNext.html(">"),
    consoleNext.mouseClicked(function() {
      step++
      consoleText.html(stepTextArray[step].text);
      if (stepTextArray[step].end) {
        consoleNext.html("");
      }
    });

}

function drawGrid() {

  // 2d grid
  strokeWeight(1.5);
  stroke(120, 360, 360);

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
  // moved this assingment to global scope
  // diameter = 200;

  // let easing = .15;
  // let size = width;
  // let diameter = 200;

  for (let i = 0; i <= 20; i++) {
    size += (diameter - size) * easing;
    stroke(120, 360, 360 - i * 15);
    rect(width / 2, height / 2, size, size * 3 / 4);
  }
}

function drawTgotchiGraphics() {
  // create black to white slider for background color
  let backgroundSat;
  let backgroundBal;

  // this math controls both saturation and balance with one slider
  if (sliderBackgroundSat.value() <= 360) {
    backgroundSat = 360
    backgroundBal = sliderBackgroundSat.value();
  } else {
    backgroundSat = 360 - sliderBackgroundSat.value() % 361;
    backgroundBal = 360;
  }
  // draw center rectangle
  graphics.fill(sliderBackgroundHue.value(), backgroundSat, backgroundBal);
  // graphics.background(sliderBackgroundHue.value(), backgroundSat, backgroundBal);

  graphics.noStroke();
  graphics.rectMode(CORNER);
  graphics.rect(0, 0, (diameter + 20), (diameter + 20) * 3 / 4);

  // load pixels from capture
  capture.loadPixels();

  // create black to white slider for pixel color
  let pixelSat;
  let pixelBal;

  // this math controls both saturation and balance with one slider
  if (sliderPixelSat.value() <= 360) {
    pixelSat = 360
    pixelBal = sliderPixelSat.value();
  } else {
    pixelSat = 360 - sliderPixelSat.value() % 361;
    pixelBal = 360;
  }

  //debugging
  // if (mouseIsPressed) {
  //   // console.log(pixelArray);
  //   // console.log("pixel hue is " + sliderPixelHue.value() + " " + sliderPixelSat.value())
  //   // console.log("background hue is " + sliderBackgroundHue.value() + " " + sliderBackgroundSat.value())
  // }

  graphics.fill(sliderPixelHue.value(), pixelSat, pixelBal);
  // test image capture
  // image(capture, width / 2 - diameter/2 - 10, height / 2 - (diameter * 3 / 8) - 10, diameter + 20, (diameter + 20) * 3 / 4);

  let stepSize = sliderSize.value();
  // save data snapshot in pixel array
  pixelArray = [];

  for (let y = 0; y < diameter * 3 / 4 + 3 * stepSize; y += stepSize) {
    for (let x = 0; x < diameter + 3 * stepSize; x += stepSize) {
      let i = y * capture.width + x;
      let darkness = (255 - capture.pixels[i * 4]) / 255;
      let radius = stepSize * darkness;
      graphics.rectMode(CENTER);
      graphics.rect(x, y, radius, radius);
      pixelArray.push([x, y, radius]);
    }
  }
  // colorMode(RGB);
  directionalLight(200, 0, 360, 0, 10, -100)
  ambientLight(0, 0, 100)
  directionalLight(120, 0, 360, -200, 200, -100)


  // noStroke()
  rotateX(angleTgotchi);
  rotateZ(angleTgotchi * 1.2);
  specularMaterial(255);
  // box(80);
  texture(graphics);

  if (state == 'menu0'){
    plane()
  }
  // box(diameter);
  // plane()
  // sphere()
  // cylinder()
  // cone()
  // ellipsoid()

  // torus([radius],[tubeRadius],[detailX],[detailY])
  //
  torus(diameter / 2, diameter / 2, 3, 3)
  angleTgotchi += .01;

  // // original 2d code
  // imageMode(CENTER);
  // // image(graphics, 0, 0);
  // push();
  // translate(width / 2, height / 2);
  // // rotate(angle);
  // // tint(0, 255, 0); not sure why tint not working
  // image(graphics, 0, 0);
  // pop();

  // angleTgotchi += .05;
}

function menu1() {
  console.log("menu1");
  writeConsoleText(state);
  // remove original menu

  divMenu0.remove();

  divMenu1.show();
  // add new menu items
  // let newText = createP("You probably get asked this all the time, but what shape is your trauma?");
  // let next = createSlider(0, 100, 50);
  // newText.parent("#rightColumn");
  // next.parent("#rightColumn");

  let moreData = {
    shape: 'sphere',
  }

  firebase.database().ref('tgotchi/' + inputName.value()).update({
    test: 'worked'
  });

  // once it is saved, open new page4
  // if (result) {
  //   window.location.href = 'intro/genesis.html';
  // }
}
