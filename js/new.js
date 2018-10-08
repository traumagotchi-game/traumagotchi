/* Code by Lark Alder aka Lark VCR aka Virtually Conflicted Reality
Assistance: Angelabelle Abarientos
DeepMachineIncantation Text: Porpentine Charity Heartscape

Special thanks to Dan Schiffman's Coding Train for teaching me everything I
needed to know to build this.

When it is completed in October 2018, all the function and variable names will be replaced with words of DeepMachineIncantation. While the website is active, the code executes these incantations and casts virtual spells for healing trauma.

_ .-') _     ('-.     ('-.     _ (`-.
( (  OO) )  _(  OO)  _(  OO)   ( (OO  )
\     .'_ (,------.(,------. _.`     \
,`'--..._) |  .---' |  .---'(__...--''
|  |  \  ' |  |     |  |     |  /  | |
|  |   ' |(|  '--. (|  '--.  |  |_.' |
|  |   / : |  .--'  |  .--'  |  .___.'
|  '--'  / |  `---. |  `---. |  |
`-------'  `------' `------' `--'

__   __ _______ _______ __   __ ___ __    _ _______
|  |_|  |   _   |       |  | |  |   |  |  | |       |
|       |  |_|  |       |  |_|  |   |   |_| |    ___|
|       |       |       |       |   |       |   |___
|       |       |      _|       |   |  _    |    ___|
| ||_|| |   _   |     |_|   _   |   | | |   |   |___
|_|   |_|__| |__|_______|__| |__|___|_|  |__|_______|

,---.    ,---.   ____      .-_'''-.  .-./`)     _______
|    \  /    | .'  __ `.  '_( )_   \ \ .-.')   /   __  \
|  ,  \/  ,  |/   '  \  \|(_ o _)|  '/ `-' \  | ,_/  \__)
|  |\_   /|  ||___|  /  |. (_,_)/___| `-'`"`,-./  )
|  _( )_/ |  |   _.-`   ||  |  .-----..---. \  '_ '`)
| (_ o _) |  |.'   _    |'  \  '-   .'|   |  > (_)  )  __
|  (_,_)  |  ||  _( )_  | \  `-'`   | |   | (  .  .-'_/  )
|  |      |  |\ (_ o _) /  \        / |   |  `-'`-'     /
'--'      '--' '.(_,_).'    `'-...-'  '---'    `._____.'

MIT License

Copyright (c) 2018 Lark Like Alder

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

'use strict';


let canvas;
let canvasDiv;
let capture;
let webcamUsable;
let displayRealLife = false;
let irlRl = false;
let displayCaptureZ = 475;
let gameIntroOverlay;

let state = 'menu0'

let diameter = 100;
let collisionActive = false;

let pixelArray = [];
let graphics;
let graphicsCapture;
let graphicsGrid;
let graphicsBG;
let graphicsBGArray = [];
let graphicsCharm;

let moveGrid = false;

let gridOffset = 0;
let angleTgotchi = 0;

let cameraX = 0;
let cameraY = 0;
let cameraZ = 0;
let camSceneCenterX = 0;
// rgb values for camera lights
let cameraColor1 = [200, 200, 112]; // top left
let cameraColor2 = [66, 125, 255]; // bottom right
let cameraColorAmbient = [71, 71, 71];
// variable for camera 360;
let cam360 = 0;

let database;
let keys;
let tgotchiData;
let tgotchiDataArray;
let numberTgotchi;
let frameCounter = 0;

// dom
let consoleText;
let consoleNext;
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
}, {
  text: "It’s still connected to you by a strand of hyper-mucus. Like watching bad parenting in fast forward, it soaks up your neuroses with a jiggly wiggle...",
  end: true
}];


let divMenu0;
let divMenu1;
let divMenu2;
let divMenu3;
let divMenu4;
let divMenu5;
let divMenu6;

// menu0
let pixelColor = [72, 0, 150];
let backgroundColor = [183, 255, 40];
let sliderSize;
let inputName;
let inputPassword;
let saveButton;
// menu1
let cubeEnabled = false;
let coneEnabled = false;
let sphereEnabled = false;
let torusEnabled = false;
let ringEnabled = false;
// menu2
let processorData;
// menu3
let charmData;
let charmID;
let charmMove;
let charmDistance;
// menu4
// let password
// menu5
let east = false;
let south = false;
let west = false;
let north = false;
let above = false;
let below = false;


// store name as firebase key
let userName;
let userData;

let song1;
let sound_click;
let sound_fizzDown_hiPitch;
let songs = [song1, sound_click, sound_fizzDown_hiPitch];
let totalSongs = 3;
let loading = true;
let counter = 0;

// let angle = 0;
let angleBreathe = 0;

// function soundLoaded(song) {
//   // L O A D A U D I O
//   song1 = song;
//   song1.loop();
//   song1.setVolume(0.3);
//   loading = false;
//   // sound_click = loadSound('assets/audio/sfx/click.mp3');
//   // sound_fizzDown_hiPitch = loadSound('assets/audio/sfx/fizzDown_hiPitch.mp3');
// }

function loadItem(index, filename) {
  loadSound(filename, soundLoaded);

  function soundLoaded(sound) {
    // console.log(index + ' ' + filename);
    songs[index] = sound;
    counter++;

    if (counter == 3) {
      songs[0].loop();
      loading = false;
    }
  }
}

function setup() {

  const testWEBGLCanvas = document.querySelector("#testWEBGLCanvas");
  // Initialize the GL context
  const gl = testWEBGLCanvas.getContext("webgl") || testWEBGLCanvas.getContext("experimental-webgl");

  // Only continue if WebGL is available and working
  if (gl === null) {
    alert(`Uh oh! You might need to check "Use hardware acceleration when available" in your browser settings.

    Chrome and Firefox work best.`);
    return;
  }

  // for loading animation
  loadItem(0, 'assets/audio/music/EagleInk_Aja_loop.mp3');
  loadItem(1, 'assets/audio/sfx/click.mp3');
  loadItem(2, 'assets/audio/sfx/fizzDown_hiPitch.mp3');

  // song1 = loadSound('assets/audio/music/EagleInk_Aja_loop.mp3', soundLoaded);
  // sound_click = loadSound('assets/audio/sfx/click.mp3', soundLoaded);

  // song1.loop();

  // sound_click.setVolume(0.4);
  // sound_fizzDown_hiPitch.setVolume(0.2);
  // playBGmusic();

  // click.playMode('restart');

  // load sound with call back not buffering well
  // song = loadSound('assets/audio/music/EagleInk_aja_loop.mp3', playBGmusic);


  // use canvasDiv size to set size of p5 canvas
  canvasDiv = document.querySelector("#canvasDiv");
  // set height of canvasDiv (else defaults to 0 bc canvas layers are set to position:absolute so they can stack)
  // this is for responsive layout: height adjusts
  // canvasDiv.style.height = `${canvasDiv.offsetWidth * 3 / 4}px`;
  canvasDiv.style.height = `450px`;

  // canvas = createCanvas(windowWidth / 2, windowWidth * 3 / 8, WEBGL);
  // canvas = createCanvas(canvasDiv.offsetWidth, canvasDiv.offsetWidth * 3 / 4, WEBGL);
  canvas = createCanvas(600, 450, WEBGL);
  canvas.parent("canvasDiv");
  canvas.class("gameCanvas");
  canvas.id("p5Canvas");


  // let canvasDivWidth = (canvasDiv.offsetWidth + parseFloat(canvasDiv.currentStyle.marginLeft) + parseFloat(canvasDiv.currentStyle.marginRight)) / 2 - 300;
  // console.log(canvasDiv.offsetWidth);
  // canvas.style(`left:${canvasDivWidth}px`);

  charmDistance = diameter;

  frameRate(30);

  // add sound to buttons
  let buttons = document.querySelectorAll("button, [type='checkbox'], [type='radio'], select, [href]");

  for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", function() {
      songs[1].play();
    });
  }

  // detect webcam and set webcamUsable bool
  {
    navigator.getUserMedia = (navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia ||
      navigator.msGetUserMedia);

    if (navigator.getUserMedia) {
      navigator.getUserMedia({
          // audio: true,
          video: true
        },
        function(stream) {
          // returns true if any tracks have active state of true
          var result = stream.getVideoTracks().some(function(track) {
            return track.enabled && track.readyState === 'live';
          });

          if (result) {
            // alert('Your webcam is on!');
            webcamUsable = true;
          } else {
            webcamUsable = false;
            // console.log('webcam off');
            // alert('webcam off');
          }
        },
        function(e) {
          webcamUsable = false;
          // console.log("webcam disabled");
          // alert("Error: " + e.name);
        });
    }

  }
  // colorMode(HSB, 360); // Use HSB with scale of 0-360
  // colorMode(RGB, 255);


  // media query event handler
  if (matchMedia) {
    const mq = window.matchMedia("(min-width: 500px) and (min-height: 500px)");
    mq.addListener(WidthChange);
    WidthChange(mq);
  }

  // initialize console text
  consoleText = select("#consoleText");
  consoleNext = select("#consoleNext");
  writeConsoleStory(state);

  capture = createCapture(VIDEO);
  capture.size(320, 240);
  capture.hide();


  graphics = createGraphics(diameter + 20, diameter + 20);

  graphicsCapture = createGraphics(diameter + 20, diameter + 20);

  graphicsBG = createGraphics(diameter + 20, diameter + 20);

  graphicsGrid = createGraphics(width, width);
  graphicsGrid.background(0);

  graphicsCharm = createGraphics(diameter / 2, diameter / 2);
  graphicsGrid.background(0);

  // initialize bg graphics array
  for (let i = 0; i < 32; i++) {
    graphicsBGArray[i] = [];
    for (let j = 0; j < 32; j++) {
      // set initial color value to background;
      graphicsBGArray[i][j] = 0;
    }
  }

  // these are menus for different customization states
  // might need to translate these to natice JS dom
  divMenu0 = select("#divMenu0");
  divMenu1 = select("#divMenu1");
  divMenu2 = select("#divMenu2");
  divMenu3 = select("#divMenu3");
  divMenu4 = select("#divMenu4");
  divMenu5 = select("#divMenu5");
  divMenu6 = select("#divMenu6");

  gameIntroOverlay = document.querySelector("#gameIntroOverlay");

  // menu0
  sliderSize = select("#sliderSize");

  inputName = select("#name");
  inputPassword = select("#passwordInput");
  saveButton = select("#saveTgotchi");

  saveButton.mouseClicked(saveTgotchiData);

  // Initialize Firebase
  let config = {
    apiKey: "AIzaSyDf1V8E4N8LGUYDX1QQ1tURMQXCCULuefQ",
    authDomain: "traumagotchi33.firebaseapp.com",
    databaseURL: "https://traumagotchi33.firebaseio.com",
    projectId: "traumagotchi33",
    storageBucket: "traumagotchi33.appspot.com",
    messagingSenderId: "121692513015"
  };

  firebase.initializeApp(config);
  database = firebase.database();

  // to retrieve data
  // note this is updated automatically as firebase pings the site whenever
  // database changes

  // let ref = database.ref('/');
  // original (tgotchi directory)
  let ref = database.ref('tgotchi');
  ref.on('value', gotData, errData);
}

// for now, hard-coding canvas size and not making it responsive
// function windowResized() {
//   canvasDiv = document.querySelector("#canvasDiv");
//   canvasDiv.style.height = `${canvasDiv.offsetWidth * 3 / 4}px`;
//
//   resizeCanvas(canvasDiv.offsetWidth, canvasDiv.offsetWidth * 3 / 4);
//   // resizeCanvas(windowWidth / 2, windowWidth * 3 / 8);
// }


function WidthChange(mq) {
  // let notice = createP("Sorry mobile phones not supported ;( You need to be on a browser to play this game.")
  // notice.style("margin: 100px 10px auto 10px");
  // notice.id("notice");
  // notice.hide();
  //
  // if (mq.matches) {
  //   // window width is at least 500px
  //   document.querySelector(".main-content").style.display = 'block';
  //   document.querySelector("#notice").style.display = 'none';
  // } else {
  //   document.querySelector(".main-content").style.display = 'none';
  //   document.querySelector("#notice").style.display = 'block';
  // }
}

function draw() {

  angleTgotchi += .01;

  if (loading || !keys) {
    background(0);
    cameraControl();
    drawLoadingScreenGrid();

  } else {

    background(0);

    cameraControl();

    drawGrid();

    // displayCapture();

    if (!userData) {

      if (webcamUsable === undefined) {
        // console.log('wait for webcam')
      } else if (webcamUsable === false) {
        // console.log('webcam access not allowed')
        createRandomGraphics();
      } else {
        // console.log('webcam access granted!')

        captureWebcamGraphics();

      }
    } else if (irlRl && webcamUsable) {

      // // strobe effect
      //   // displayRealLife = !displayRealLife;
      //     if (frameCount % 2 ==== 0) {
      //       displayRealLife = !displayRealLife;
      //     }
      //     if (displayRealLife) {
      //       displayCapture();
      //     }

      displayCapture();

      captureWebcamGraphics();

    } else {
      drawTgotchiGraphics(); // if menu0
    }
    buildTgotchi();
  }
}


function playBGmusic() {
  if (!song1.isPlaying()) {
    songs[0].play();
  }
}

function cameraControl() {


  camera(cameraX, cameraY, cameraZ, camSceneCenterX, 0, 0, 0, 1, 0);

  // pull rgb colors from cameraColor1 and cameraColor2 array
  // top left
  directionalLight(cameraColor1[0], cameraColor1[1], cameraColor1[2], width / 2, width / 2, -100)
  // bottom right
  directionalLight(cameraColor2[0], cameraColor2[1], cameraColor2[2], -width / 4, -width / 4, -70)
  // ambient to lift all levels
  ambientLight(cameraColorAmbient[0], cameraColorAmbient[1], cameraColorAmbient[2]);

  specularMaterial(255);

  // // camera reference

  // orbitControl();

  // camera(-height/6, height/10, (height/2) / tan(PI/6), 0, 0, 0, 0, 1, 0);

  // // to rotate camera
  // camera(cameraX, cameraX / 2, (height / 2) / tan(PI / 6), 0, 0, 0, 0, 1, 0);
  // cameraX++;

  // // to rotate camera
  // if (cameraX <= 60) {
  //   // with ease: added 0.1 to target value so that it wil exit condition
  //   cameraX += (60.1 - cameraX) * .1;
  // }

  // // to rotate on loop
  // cameraX = sin(frameCounter * 0.01) * 50;
  // frameCounter++;
  //


  // default cameraZ position is 390 for comp height 450, so width * .65
  // bigger the cameraZ the more zoomed out


  switch (state) {
    case 'menu0':
      defaultCamera();
      break;
    case 'menu1':
      moveCamera(width / 10, width / 15, cameraZ);
      break;
    case 'menu2':
      moveGrid = true;
      // zoom in & place at bottom right
      moveCamera(width / 5, width / 5, width / 4);
      break;
    case 'menu3':
      moveGrid = false;
      moveCamera(-width / 7, -width / 10, width / 3, .05);
      break;
    case 'menu4':
      // defaultCamera();
      moveCamera(0, 0, (height / 2) / tan(PI / 6), .04);
      break;
    case 'menu5':
      // if (east) {
      //   if (cameraZ >= width / 3) {
      //     cameraZ += ((width / 3 - .1) - cameraZ) * .02;
      //   }
      //   // place at bottom right
      //   if (cameraX >= -width / 4) {
      //     cameraX += ((-width / 4 - .1) - cameraX) * .1;
      //   }
      //   // if (cameraY <= width / 5) {
      //   //   cameraY += ((width / 5 + .1) - cameraY) * .1;
      //   // }
      // }
      break;
    case 'menu6':
      moveGrid = true;
      moveCamera(0, width / 9, (height / 2) / tan(PI / 6) - 133, .04);
      break;
    case '360':
      cameraZ = 0;
      if (cam360 <= 360) {
        cameraX += cam360;
        cam360++;
      }
      break;
    default:
      break;
  }


}

function writeConsoleStory(state) {
  // // could make this cleaner by storing steps as object keys rather than array indexes
  // switch (state) {
  //   case 'menu0':
  //     step = 0;
  //     break;
  //   case 'menu1':
  //     step = 3;
  //     break;
  //   case 'menu2':
  //     step = 4;
  //     break;
  //   case 'menu3':
  //     step = 3;
  //     break;
  //   default:
  //     // make default a blank step
  //     step = 3;
  // }
  //
  // consoleText.html(stepTextArray[step].text);
  // if (stepTextArray[step].end) {
  //   consoleNext.html("");
  // } else {
  //   consoleNext.html(">");
  // }
  //
  // consoleNext.mouseClicked(function() {
  //   step++
  //   consoleText.html(stepTextArray[step].text);
  //   if (stepTextArray[step].end) {
  //     consoleNext.html("");
  //   }
  // });

}

function setPixelColor(jscolor) {

  pixelColor[0] = jscolor.rgb[0];
  pixelColor[1] = jscolor.rgb[1];
  pixelColor[2] = jscolor.rgb[2];
}

function setBackgroundColor(jscolor) {

  backgroundColor[0] = jscolor.rgb[0];
  backgroundColor[1] = jscolor.rgb[1];
  backgroundColor[2] = jscolor.rgb[2];

}

function captureWebcamGraphics() {

  // load pixels from capture
  capture.loadPixels();

  // set background color
  graphics.background(backgroundColor[0], backgroundColor[1], backgroundColor[2]);


  graphics.fill(pixelColor[0], pixelColor[1], pixelColor[2]);
  graphics.noStroke();
  // graphics.stroke(pixelColor[0], pixelColor[1], pixelColor[2]); // if you want to make variation on color outline...

  let stepSize = sliderSize.value();

  // save data snapshot in pixel array
  pixelArray = [];

  for (let y = 0; y < diameter + 5.85 * stepSize; y += stepSize) {
    for (let x = 0; x < diameter + 5.85 * stepSize; x += stepSize) {
      let i = y * capture.width + x;
      if (capture.pixels[i * 8]) {
        let darkness = (255 - capture.pixels[i * 8]) / 255;
        let radius = stepSize * darkness;
        graphics.rectMode(CENTER);
        graphics.rect(x, y, radius, radius);
        pixelArray.push([x, y, radius]);
      }
    }
  }
}

function createRandomGraphics() {
  // set background color
  graphics.background(backgroundColor[0], backgroundColor[1], backgroundColor[2]);


  graphics.fill(pixelColor[0], pixelColor[1], pixelColor[2]);
  graphics.noStroke();
  // graphics.stroke(pixelColor[0], pixelColor[1], pixelColor[2]); // if you want to make variation on color outline...

  let stepSize = sliderSize.value();
  // save data snapshot in pixel array
  pixelArray = [];

  for (let y = 0; y < diameter + 5.85 * stepSize; y += stepSize) {
    for (let x = 0; x < diameter + 5.85 * stepSize; x += stepSize) {
      let i = y * capture.width + x;
      let darkness = random(1.5);
      let radius = stepSize * darkness;
      graphics.rectMode(CENTER);
      graphics.rect(x, y, radius, radius);
      pixelArray.push([x, y, radius]);
    }
  }
}

function buildTgotchi() {


  // this light is duplicated in displayTgotchi(), whatevs!
  // directionalLight(60, 200, 360, -width / 4, -width / 4, -70)
  // ambientLight(0, 0, 100)
  // directionalLight(120, 200, 360, width / 2, width / 2, -100)

  // specularMaterial(255);
  texture(graphics);


  if (state === 'menu0') {

    drawFlatGotchi();

  } else if (state === 'menu1') {

    customizeShape();

  } else if (state === 'menu2') {

    displayTgotchi();
    // displayProcessor();

  } else if (state === 'menu3') {

    displayTgotchi();

  } else if (state === 'menu4') {

    displayTgotchi();

  } else if (state === 'menu5') {

    displayTgotchi();
  } else if (state === 'menu6') {

    displayTgotchi();
    // castCircle();
  }
}

function customizeShape() {
  if (!cubeEnabled && !sphereEnabled && !torusEnabled && !ringEnabled && !coneEnabled) {
    drawFlatGotchi();
  }

  push();
  translate(0, 0, 0);
  rotateX(angleTgotchi);
  rotateZ(angleTgotchi * 1.2);

  if (cubeEnabled) {
    box(diameter);
  }
  if (coneEnabled) {
    ellipsoid(diameter * .9, diameter * .2, diameter * .9);
    // cone(diameter, Math.floor(diameter * .62));
  }
  if (sphereEnabled) {
    sphere(diameter * .62);
  }
  if (torusEnabled) {
    torus(diameter / 2, diameter / 2, 3, 3);
  }
  pop();

  let rotateRing = sin((frameCount * .01) * 2) * .3;

  if (ringEnabled) {
    push();
    rotateX(PI / 2);
    // rotateY(rotateRing);
    rotateY(angleTgotchi * -.3);
    rotateZ(angleTgotchi * 1.1);
    torus(diameter * 1.2, diameter * 0.05, 24, 10);
    pop();
  }


}

function displayProcessor() {

}

function castCircle() {

}

function menu1() {
  writeConsoleStory(state);

  divMenu0.remove();

  divMenu1.show();

  // menu1
  let cubeCheckbox = select("#cubeCheckbox");
  let coneCheckbox = select("#coneCheckbox");
  let sphereCheckbox = select("#sphereCheckbox");
  let torusCheckbox = select("#torusCheckbox");
  let ringCheckbox = select("#ringCheckbox");
  let saveTgotchiShape = select("#saveTgotchiShape");

  cubeCheckbox.changed(function() {
    cubeEnabled = !cubeEnabled;
  });
  coneCheckbox.changed(function() {
    coneEnabled = !coneEnabled;
  });
  sphereCheckbox.changed(function() {
    sphereEnabled = !sphereEnabled;
  });
  torusCheckbox.changed(function() {
    torusEnabled = !torusEnabled;
  });
  ringCheckbox.changed(function() {
    ringEnabled = !ringEnabled;
  });

  saveTgotchiShape.mouseClicked(function() {

    // let shapeData = {
    //   shape: {
    //     cube: cubeEnabled,
    //     sphere: sphereEnabled,
    //     torus: torusEnabled,
    //     ring: ringEnabled
    //   },
    // }
    //
    // pushMoreData(shapeData);

    if (!cubeEnabled && !coneEnabled && !sphereEnabled && !torusEnabled && !ringEnabled) {
      alert("Please select one or more shapes");
    } else {

      userData.shape = {
        cube: cubeEnabled,
        cone: coneEnabled,
        sphere: sphereEnabled,
        torus: torusEnabled,
        ring: ringEnabled
      };

      setTimeout(function() {
        state = 'menu2';
        menu2();
      }, 750);
    }
  })

}

function menu2() {
  writeConsoleStory(state);
  // remove original menu

  divMenu1.remove();

  divMenu2.show();



  let saveProcessor = select("#saveProcessor");
  // processorRadio = select("#processorRadio");
  // let processorRadio = createRadio();
  // processorRadio.option('X300: Extra core for normalizing memory');
  // processorRadio.option('S13: Gapped logic for tapping astral data');
  // processorRadio.option('D33P: Strong across the board');
  // processorRadio.parent("#processorRadio")
  // processorRadio.style('width', '60px');


  saveProcessor.mouseClicked(function() {

    // if using p5 DOM
    // let processorData = {
    //   processor: processorRadio.value(),
    // }

    if (!document.querySelector('input[name="processor"]:checked')) {
      alert("Choose the best hardware for processing your trauma. We all have trauma to be processed.");
    } else {

      userData.processor = document.querySelector('input[name="processor"]:checked').value;

      setTimeout(function() {
        state = 'menu3';
        menu3();
      }, 750);
    }
  })
}

function menu3() {
  writeConsoleStory(state);
  // remove original menu

  divMenu2.remove();

  divMenu3.show();

  let saveCharm = select("#saveCharm");


  saveCharm.mouseClicked(function() {

    // let charmData = {
    //   charm: document.querySelector('input[name="charm"]:checked').value,
    // }
    //
    // pushMoreData(charmData);
    if (!document.querySelector('input[name="charm"]:checked')) {
      alert("Don't you want to select a charm?")
    } else {
      userData.charm = document.querySelector('input[name="charm"]:checked').value;


      setTimeout(function() {
        state = 'menu4';
        menu4();
      }, 750);
    }
  })
}

function menu4() {
  writeConsoleStory(state);
  // remove original menu

  divMenu3.remove();

  divMenu4.show();

  let savePassword = select("#savePassword");
  let passwordInput = select("#passwordInput");


  savePassword.mouseClicked(function() {


    // let passwordData = {
    //   password: passwordInput.value(),
    //   email: emailInput.value()
    // }
    //
    // pushMoreData(passwordData);

    // if (!passwordInput.value()) {


    if (!passwordInput.value()) {
      alert("You will need to soothe your Traumagotchi before it will let you play with it.")
    } else if (!/^\S+$/.test(passwordInput.value())) {
      alert("Best to make this one word with no spaces")
    } else {
      // add to userData object
      userData.password = passwordInput.value();

      setTimeout(function() {
        state = 'menu5';
        menu5();
      }, 750);
    }
  })
}

function menu5() {
  writeConsoleStory(state);
  // remove original menu

  document.querySelector("#tgotchiComplete").innerHTML = `Your Traumagotchi, ${userName}, is soothed by ${userData.password}.`


  divMenu4.remove();

  divMenu5.show();

  // let emailInput = select("#emailInput");
  // userData.email = emailInput.value();





  let agreeButton = select("#agreeButton");


  agreeButton.mouseClicked(function() {
    setTimeout(function() {
      state = 'menu6';
      menu6();
    }, 750);
  })

  // or if we want to bypass cast circle:
  // let nowPlay = select("#nowPlay");
  // nowPlay.mouseClicked(function() {
  //   // // comment out to disable pushing to firebase
  //   createTgotchiNode();
  //   window.location.href = 'play.html';
  // })
}

function menu6() {
  writeConsoleStory(state);
  // remove original menu

  divMenu5.remove();

  divMenu6.show();




  userData.actionsHourly = [{
    action: 'none'
  }];
  userData.actionsFiveMinutes = [{
    action: 'none'
  }];
  // lark: add chatrooms here
  userData.chatrooms = [{
    emdr: 'false'
  }];

  let nowPlay = select("#nowPlay");
  nowPlay.mouseClicked(function() {
    // // comment out to disable pushing to firebase
    createTgotchiNode();
    window.location.href = 'play.html';
  })
}

// cast circle menu
// function menu6() {
//   writeConsoleStory(state);
//   // remove original menu
//
//   divMenu5.remove();
//
//   divMenu6.show();
//
//   let eastButton = select("#saveEast");
//   let southButton = select("#saveSouth");
//   let westButton = select("#saveWest");
//   let northButton = select("#saveNorth");
//   let belowButton = select("#saveBelow");
//   let aboveButton = select("#saveAbove");
//
//
//   //
//   // eastButton.mousePressed(function() {
//   //   east = true;
//   // });
//   // southButton.mousePressed(function() {
//   //   east = true;
//   // });
//   // westButton.mousePressed(function() {
//   //   east = true;
//   // });
//   // northButton.mousePressed(function() {
//   //   east = true;
//   // });
//   // belowButton.mousePressed(function() {
//   //   east = true;
//   // });
//   // aboveButton.mousePressed(function() {
//   //   east = true;
//   // });
//
//
//   userData.actionsHourly = [{
//     action: 'none'
//   }];
//   userData.actionsFiveMinutes = [{
//     action: 'none'
//   }];
//   // lark: add chatrooms here
//   userData.chatrooms = [{
//     emdr: 'false'
//   }];
//
//   let nowPlay = select("#nowPlay");
//   nowPlay.mouseClicked(function() {
//     // // comment out to disable pushing to firebase
//     createTgotchiNode();
//     window.location.href = 'play.html';
//   })
// }
