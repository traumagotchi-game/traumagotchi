'use strict';

let canvas;
let canvasDiv;

let state = 'login';
// let pointsLocal;

let diameter = 100; // probably should get rid of this if it is constant

let database;
let keys;
let tgotchiData;
let userData;
let userName;


// DOM

let loginMenu;
let inputName;
let inputPassword;
let loginButton;
let loginStatus;
let pointStats;

// game
let gameMenu;
let gameIntroOverlay;
let timer;
let gameTitle;
let playButton;
let playInstructions;
let collapseGameCanvas;
let collapseGame;
let platformDropGameCanvas;
let platformDropGame;
let breakoutGameCanvas;
let breakoutGame;
let wackymoleGameCanvas;
let wackymoleGame;
let schmupGameCanvas;
let schmupGame;
let gameBackgroundCanvas;
let gameBackground;
let p5templateGameCanvas;
let p5templateGame;

// controls
// let keyCodePressed;

// alert menu
// (this is for pop up that occupies same space as care and game menu. could name differently?)
let alertMenu;

// console text
let consoleText;
let step;
let stepTextArray = [{
  text: "",
  end: true
}];

// care menu

let careMenu;
let treeLength;

let choiceMenuTitle;
let choice0;
let choice1;
let choice2;
let choice3;

let currentKey = 'initial';
let currentIndex = 0;

let graphics;
let graphicsGrid;
let graphicsBG;
let graphicsBGArray = [];
let graphicsCharm;

let moveGrid = false;

let gridOffset = 0;
let angleTgotchi = 0;

let cubeEnabled = false;
let sphereEnabled = false;
let torusEnabled = false;
let ringEnabled = false;

let processorData;

let charmData;
let charmArray = [];
let charmID;
let charmMove;

let actionX = 0;
let actionY = 0;
let actionZ = 475;
let actionRotation = 0;

let cameraX = 0;
let cameraY = 0;
let cameraZ = 0;
// rgb values for camera lights
let cameraColor1 = [200, 200, 112]; // top left
let cameraColor2 = [66, 125, 255]; // bottom right
let cameraColorAmbient = [71, 71, 71];


// sprites
let playerImgs = [];
let spritePurple = [];
let sprite32 = [];
let sprite64 = [];
let sprite128 = [];
let sprite32x100_purple = [];
let sprite32x100_yellow = [];
let collisionAnimation_128 = [];

// action images
let altarImgs = [];
let altarImgsIndex = 0;

function preload() {

  // L O A D S P R I T E S
  // have to manually set numberFrames
  for (let i = 0; i <= 13; i++) {
    playerImgs[i] = loadImage(`assets/sprites/slimerDrip/slimerDrip_${i}.png`);
  }

  for (let i = 0; i <= 20; i++) {
    spritePurple[i] = loadImage(`assets/sprites/purple_breathe/purple_${i}.png`);
  }

  for (let i = 0; i <= 10; i++) {
    collisionAnimation_128[i] = loadImage(`assets/sprites/collisionAnimation_128/collisionAnimation_128_${i}.png`);
  }

  sprite32[0] = loadImage(`assets/sprites/placeholders/32x32_0.png`)
  sprite64[0] = loadImage(`assets/sprites/placeholders/64x64_0.png`)
  sprite128[0] = loadImage(`assets/sprites/placeholders/128x128_0.png`)
  sprite32x100_purple[0] = loadImage(`assets/sprites/placeholders/32x100_purple_0.png`)
  sprite32x100_yellow[0] = loadImage(`assets/sprites/placeholders/32x100_yellow_0.png`)

  // L O A D A C T I O N I M A G E S
  for (let i = 0; i <= 1; i++) {
    altarImgs[i] = loadImage(`assets/actions/altar_${i}.jpg`);

  }
};

function setup() {
  // colorMode(HSB, 360); // Use HSB with scale of 0-255
  // colorMode(RGB, 255);

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

  frameRate(30);

  // default cameraZ
  cameraZ = (height / 2) / tan(PI / 6);

  // media query event handler
  if (matchMedia) {
    const mq = window.matchMedia("(min-width: 500px) and (min-height: 500px)");
    mq.addListener(WidthChange);
    WidthChange(mq);
  }

  graphics = createGraphics(diameter + 20, diameter + 20);
  // graphics.colorMode(HSB, 360); // Use HSB with scale of 0-360

  graphicsBG = createGraphics(diameter + 20, diameter + 20);
  // graphicsBG.colorMode(HSB, 360); // Use HSB with scale of 0-360

  graphicsGrid = createGraphics(width, width);
  // graphicsGrid.colorMode(HSB, 360); // Use HSB with scale of 0-360
  graphicsGrid.background(180, 360, 25);

  graphicsCharm = createGraphics(diameter / 2, diameter / 2);
  // graphics.colorMode(HSB);
  graphicsGrid.background(0);

  // initialize bg graphics array
  for (let i = 0; i < 32; i++) {
    graphicsBGArray[i] = [];
    for (let j = 0; j < 32; j++) {
      // set initial color value to background;
      graphicsBGArray[i][j] = 0;
    }
  }

  // topMenu
  // loginStatus = select("#loginStatus");
  loginStatus = document.querySelector("#loginStatus");
  pointStats = document.querySelector("#pointStats");


  //login Menu
  loginMenu = select("#loginMenu");
  inputName = select("#name");
  inputPassword = select("#password");
  loginButton = select("#login");

  loginButton.mouseClicked(login);

  //console
  consoleText = document.querySelector("#consoleText")
  // writeConsoleText("test");

  // game menu
  gameMenu = document.querySelector("#gameMenu");
  timer = document.querySelector("#timer");

  // game canvas overlay
  gameIntroOverlay = document.querySelector("#gameIntroOverlay");
  gameTitle = document.querySelector("#gameTitle");
  playButton = document.querySelector("#playButton");
  playInstructions = document.querySelector("#playInstructions");

  // alert menu
  alertMenu = document.querySelector("#alertMenu");



  // game controller
  // window.addEventListener('keydown', function(e) {
  //   // console.log(e.keyCode)
  //   console.log(`key is ${e.key} and keycode is ${e.keyCode}`)
  //   keyCodePressed = e.keyCode;
  // })
  //
  // window.addEventListener('keyup', function(e) {
  //   keyCodePressed = false;
  //
  //   // console.log(`key up is ${e.key} and keycode is ${e.keyCode}`)
  //   console.log(`key is up and is keyCodePressed is ${keyCodePressed}`)
  // })





  // p5 games
  p5templateGame = new p5(p5TemplateInstance, 'canvasDiv');
  p5templateGameCanvas = document.querySelector("#p5templateGameCanvas");
  p5templateGameCanvas.style.visibility = "hidden";


  schmupGame = new p5(schmupGameInstance, 'canvasDiv');
  schmupGameCanvas = document.querySelector("#schmupGameCanvas");
  schmupGameCanvas.style.visibility = "hidden";

  wackymoleGame = new p5(wackymoleGameInstance, 'canvasDiv');
  wackymoleGameCanvas = document.querySelector("#wackymoleGameCanvas");
  wackymoleGameCanvas.style.visibility = "hidden";

  breakoutGame = new p5(breakoutGameInstance, 'canvasDiv');
  breakoutGameCanvas = document.querySelector("#breakoutGameCanvas");
  breakoutGameCanvas.style.visibility = "hidden";

  gameBackground = new p5(gameBackgroundInstance, 'canvasDiv');
  gameBackgroundCanvas = document.querySelector("#gameBackgroundCanvas");
  gameBackgroundCanvas.style.visibility = "hidden";



  // HTML5 games
  collapseGame = new CollapseGame();
  window.collapseGame = collapseGame;

  platformDropGame = new PlatformDropGame();
  window.platformDropGame = platformDropGame;

  collapseGameCanvas = document.querySelector("#collapseGameCanvas");
  collapseGameCanvas.style.visibility = "hidden";
  platformDropGameCanvas = document.querySelector("#platformDropGameCanvas");
  platformDropGameCanvas.style.visibility = "hidden";



  // care menu
  careMenu = document.querySelector("#careMenu");

  // care menu decision tree!
  // declare tree length as var
  treeLength = tree.length;

  choiceMenuTitle = document.querySelector("#menuTitle");
  choice0 = document.querySelector("#menuItem0");
  choice1 = document.querySelector("#menuItem1");
  choice2 = document.querySelector("#menuItem2");
  choice3 = document.querySelector("#menuItem3");

  choice0.addEventListener("click", () => {
    currentKey = tree[currentIndex].choices[0].nextKey;
    tree[currentIndex].choices[0].action();
    nextMenu();
  })
  choice1.addEventListener("click", () => {
    currentKey = tree[currentIndex].choices[1].nextKey;
    tree[currentIndex].choices[1].action();
    nextMenu();
  })
  choice2.addEventListener("click", () => {
    currentKey = tree[currentIndex].choices[2].nextKey;
    tree[currentIndex].choices[2].action();
    nextMenu();
  })
  choice3.addEventListener("click", () => {
    currentKey = tree[currentIndex].choices[3].nextKey;
    tree[currentIndex].choices[3].action();
    nextMenu();
  })

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
  let ref = database.ref('/');
  // originally
  // let ref = database.ref('tgotchi');
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


  // push();
  // normalMaterial();
  // translate(0, 0 , 0);
  // // texture(_actionGraphicArray[_actionGraphicIndex]);
  // // box(altarImgs[0].width * 5, altarImgs[0].height * 5);
  // box(100);
  // pop();

  // create animation frame counter approx 8fps (if browser is running at 30fps)
  // animationFrame = Math.floor(frameCount / 3.75);
  // ---> added this to p5 games so not running all the time =)




  switch (state) {
    case 'login':
      displayLoginScreen();
      break;
    case 'care':
      displayMainCanvas();
      careMenu.style.display = "block";
      gameMenu.style.display = "none";
      gameIntroOverlay.style.display = "none";
      switch (executeAction) {
        case 'titter':
          displayAction(altarImgs, altarImgsIndex);
        case 'none':
          break;
        default:
          break;
      }



      break;
    case 'game':

      careMenu.style.display = "none";
      gameMenu.style.display = "block";
      gameIntroOverlay.style.display = "block";
      gameBackgroundInstanceCanvas.style.visibility = "visible";


      break;
    default:
      break;
  }



}

function displayLoginScreen() {
  background(180, 360, 25);

  // bug: not sure why drawGrid() doesn't work before login
  drawGrid();

  cameraControl();
}

function displayMainCanvas() {
  // background(0, 0, 0);
  background(180, 360, 25);

  // bug: not sure why drawGrid() doesn't work before login
  drawGrid();

  cameraControl();

  // camera(cameraX, cameraY, cameraZ, 0, 0, 0, 0, 1, 0);
  cameraZ = (height / 2) / tan(PI / 6);
  // default
  // camera(cameraX, cameraX / 2, (height / 2) / tan(PI / 6), 0, 0, 0, 0, 1, 0);
  if (userName) {
    drawTgotchiGraphics();
    displayTgotchi();
    // displayProcessor();
  }

}

function login() {
  keys.forEach(function(key) {
    // console.log(`key is ${key}, input name is ${inputName.value()}, password is ${tgotchiData[key].password}, and password input is ${inputPassword.value()}`)
    if (key.toUpperCase() == inputName.value().toUpperCase() && tgotchiData[key].password.toUpperCase() == inputPassword.value().toUpperCase()) {
      userName = key;
      userData = tgotchiData[key];
    }
  });


  if (userName) {
    loginStatus.innerHTML = `logged in as ${userName}`;
    pointStats.innerHTML = `${userData.points} points`;
    pointStats.style.display = 'block';

    let lastLogin = userData.timeStamp[userData.timeStamp.length - 1];
    // let currentDate = Date.now();
    let minutesElapsed = Math.floor((Date.now() - lastLogin) / 60000);



    writeConsoleText(`since you saw them last ${minutesElapsed} minutes ago, ${userName} has: </br> sunk into slime 5 times (daily) </br> inject pupper into eyeball 120 times (hourly)`)

    state = "care";

    userData.timeStamp.push(Date.now());

    // this rewrites ALL the data
    pushMoreData(userData);
    //not sure how to rewrite...
    // rewriteData(userData);

    loginMenu.remove();
  } else {
    // bug: createPOnce is for drawing DOM elements in draw loop: need to set flag so this doesn't appear over and over, or create DOM element that toggles off/on
    createPOnce(`login error.`, "loginMenu")
  }
}

function cameraControl() {

  camera(cameraX, cameraY, cameraZ, 0, 0, 0, 0, 1, 0);

  // pull rgb colors from cameraColor1 and cameraColor2 array
  // top left
  directionalLight(cameraColor1[0], cameraColor1[1], cameraColor1[2], width / 2, width / 2, -100)
  // bottom right
  directionalLight(cameraColor2[0], cameraColor2[1], cameraColor2[2], -width / 4, -width / 4, -70)
  // ambient to lift all levels
  ambientLight(cameraColorAmbient[0], cameraColorAmbient[1], cameraColorAmbient[2]);

  specularMaterial(255);
}

function writeConsoleText(text) {

  // will add code so messages can stack?

  consoleText.innerHTML = text;

  // from step text in new.js
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

function createPOnce(text, parent, tag, bool = true) {
  // this is for creating DOM element in draw loop
  if (bool) {
    let p = createP(text);
    p.parent(parent)
    p.id(tag)
  }
  bool = false;
}
