'use strict';

let canvas;
let canvasDiv;

let state = 'login';

let diameter = 100; // probably should get rid of this if it is constant

let database;
let keys;
let tgotchiData;
let userData;
let userName;
let currentLoginTime;
let lastLoginTime;
let firstLoginTime;


// DOM

let loginMenu;
let inputName;
let inputPassword;
let loginButton;
let loginStatus;
let pointStats;

// games
let gameMenu;
let gameIntroOverlay;
let pointsOverlay;
let gameEndOverlay;
let timer;
let gameTitle;
let playButton;
let playInstructions;
let pointsRunningTotal;
let finalScore;
let collapseGameCanvas;
let collapseGame;
let platformDropGameCanvas;
let platformDropGame;
let breakoutGameCanvas;
let breakoutGame;
let wackymoleGameCanvas;
let wackymoleGame;
let pluckGame;
let pluckGameCanvas;
let schmupGame;
let schmupGameCanvas;
let snakeGame;
let snakeGameCanvas;
let gameBackgroundCanvas;
let gameBackground;
let p5templateGameCanvas;
let p5templateGame;

let games = ['collapse', 'schmup', 'pluck', 'snake', 'wackymole', 'breakout'];
// let games = ['collapse', 'platformDrop', 'schmup', 'pluck', 'snake', 'wackymole', 'breakout'];

let game1;
let game2;
let game3;

let gameCounter = 1;

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
let loginLandingPage = false;
let writeToConsoleBool = true;
let printOnceBool = true;
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
let coneEnabled = false;
let sphereEnabled = false;
let torusEnabled = false;
let ringEnabled = false;

let processorData;

let charmData;
let charmArray = [];
let charmID;
let charmMove;

let actionX = 200;
let actionY = 0;
let actionZ = 200;
let actionAngle = 0;
let actionAnimating = false;
let swipeLeftComplete = false;

let cameraX = 0;
let cameraY = 0;
let cameraZ = 0;
// rgb values for camera lights
let cameraColor1 = [200, 200, 112]; // top left
let cameraColor2 = [66, 125, 255]; // bottom right
let cameraColorAmbient = [71, 71, 71];


// sprites
let playerImgs = [];
let fruit = [];

let collisionAnimation_128 = [];
let confettiPop_pink_128 = [];
let confettiPop_green_128 = [];

let sprite32 = [];
let sprite64 = [];
let sprite128 = [];
let arrowUp = [];
let arrowDown = [];
let arrowRight = [];
let arrowLeft = [];
let sprite32x100_purple = [];
let sprite32x100_yellow = [];

let clouds = [];
let ball = [];
let slimePlatform = [];
let schmupper = [];
let schmupThings = [];
let plucker = [];
let charms = [];

// backgrounds
let gameBG_0;
let gameBG_1;
let gameBG_2;
let gameBG_3;
let gameBG_4;
let gameBG_texture;
let gameBG_textureSm;

// action images
let actionsHourlySinceLast = '';
let actionsFiveMinutesSinceLast = '';
let actionsHourlyList = '';
let actionsFiveMinutesList = '';
let actionFunction;
let lastActionName;
let lastActionPastTense;
let lastActionInput;
let executeAction = 'landingPage';
let fourTwentyImgs = [];
let fourTwentyImgsIndex = 0;
let abstractImgs = [];
let abstractImgsIndex = 0;
let altarImgs = [];
let altarImgsIndex = 0;
let briskImgs = [];
let briskImgsIndex = 0;
let catwalkImgs = [];
let catwalkImgsIndex = 0;
let chortleImgs = [];
let chortleImgsIndex = 0;
let complicatedImgs = [];
let complicatedImgsIndex = 0;
let disassociateImgs = [];
let disassociateImgsIndex = 0;
let dreamImgs = [];
let dreamImgsIndex = 0;
let farmersMarketImgs = [];
let farmersMarketImgsIndex = 0;
let newLookImgs = [];
let newLookImgsIndex = 0;
let haventLaughedImgs = [];
let haventLaughedImgsIndex = 0;
let hotDogImgs = [];
let hotDogImgsIndex = 0;
let hotTubImgs = [];
let hotTubImgsIndex = 0;
let laughterTearsImgs = [];
let laughterTearsImgsIndex = 0;
let mantraImgs = [];
let mantraImgsIndex = 0;
let moisturizerImgs = [];
let moisturizerImgsIndex = 0;
let oceanImgs = [];
let oceanImgsIndex = 0;
let puppersImgs = [];
let puppersImgsIndex = 0;
let screamImgs = [];
let screamImgsIndex = 0;
let seaOtterSaladImgs = [];
let seaOtterSaladImgsIndex = 0;
let selfHarmImgs = [];
let selfHarmImgsIndex = 0;
let sewerImgs = [];
let sewerImgsIndex = 0;
let singleHugeTearImgs = [];
let singleHugeTearImgsIndex = 0;
let sleepImgs = [];
let sleepImgsIndex = 0;
let slimeImgs = [];
let slimeImgsIndex = 0;
let strangeThingImgs = [];
let strangeThingImgsIndex = 0;
let tearsLikeNailsImgs = [];
let tearsLikeNailsImgsIndex = 0;

let song;

function preload() {

  // L O A D A U D I O
  // song = loadSound('assets/audio/music/EagleInk_aja_loop.mp3');



  // L O A D S P R I T E S
  // have to manually set numberFrames
  for (let i = 0; i <= 13; i++) {
    playerImgs[i] = loadImage(`assets/sprites/slimerDrip/slimerDrip_${i}.png`);
  }

  for (let i = 0; i <= 3; i++) {
    fruit[i] = loadImage(`assets/sprites/fruit/fruit_${i}.png`);
  }

  for (let i = 0; i <= 7; i++) {
    clouds[i] = loadImage(`assets/sprites/clouds/cloud_${i}.png`);
  }

  for (let i = 0; i <= 1; i++) {
    schmupper[i] = loadImage(`assets/sprites/schmupper/schmupper_${i}.png`);
  }

  for (let i = 0; i <= 2; i++) {
    schmupThings[i] = loadImage(`assets/sprites/schmupThings/schmupThing_${i}.png`);
  }

  for (let i = 0; i <= 1; i++) {
    plucker[i] = loadImage(`assets/sprites/plucker/plucker_${i}.png`);
  }

  for (let i = 0; i <= 0; i++) {
    charms[i] = loadImage(`assets/charms/charm_fourLeafClover.png`);
  }

  for (let i = 0; i <= 5; i++) {
    ball[i] = loadImage(`assets/sprites/ball/ball_${i}.png`);
  }

// hm
  for (let i = 0; i <= 8; i++) {
    slimePlatform[i] = loadImage(`assets/sprites/slimePlatform/slimePlatform_${i}.png`);
  }

  for (let i = 0; i <= 10; i++) {
    collisionAnimation_128[i] = loadImage(`assets/sprites/collisionAnimation_128/collisionAnimation_128_${i}.png`);
  }

  for (let i = 0; i <= 7; i++) {
    confettiPop_pink_128[i] = loadImage(`assets/sprites/confettiPop_pink_128/confettiPop_pink_${i}.png`);
  }
  for (let i = 0; i <= 6; i++) {
    confettiPop_green_128[i] = loadImage(`assets/sprites/confettiPop_green_128/confettiPop_green_${i}.png`);
  }

  sprite32[0] = loadImage(`assets/sprites/placeholders/32x32_0.png`)
  sprite64[0] = loadImage(`assets/sprites/placeholders/64x64_0.png`)
  sprite128[0] = loadImage(`assets/sprites/placeholders/128x128_0.png`)
  sprite32x100_purple[0] = loadImage(`assets/sprites/placeholders/32x100_purple_0.png`)
  sprite32x100_yellow[0] = loadImage(`assets/sprites/placeholders/32x100_yellow_0.png`)

  arrowUp[0] = loadImage(`assets/sprites/placeholders/arrowUp.png`)
  arrowDown[0] = loadImage(`assets/sprites/placeholders/arrowDown.png`)
  arrowRight[0] = loadImage(`assets/sprites/placeholders/arrowRight.png`)
  arrowLeft[0] = loadImage(`assets/sprites/placeholders/arrowLeft.png`)

  // L O A D B G

  gameBG_0 = loadImage(`assets/backgrounds/gameBG_0.png`)
  gameBG_1 = loadImage(`assets/backgrounds/gameBG_1.png`)
  gameBG_2 = loadImage(`assets/backgrounds/gameBG_2.png`)
  gameBG_3 = loadImage(`assets/backgrounds/gameBG_3.png`)
  gameBG_4 = loadImage(`assets/backgrounds/gameBG_4.png`)
  gameBG_texture = loadImage(`assets/backgrounds/gameBG_texture.png`)
  gameBG_textureSm = loadImage(`assets/backgrounds/gameBG_textureSm.png`)

  // L O A D A C T I O N I M A G E S
  for (let i = 0; i <= 4; i++) {
    altarImgs[i] = loadImage(`assets/actions/altar_${i}.jpg`);
  }
  for (let i = 0; i <= 3; i++) {
    fourTwentyImgs[i] = loadImage(`assets/actions/420_${i}.jpg`);
  }

  for (let i = 0; i <= 2; i++) {
    abstractImgs[i] = loadImage(`assets/actions/abstract_${i}.jpg`);
  }

  for (let i = 0; i <= 3; i++) {
    briskImgs[i] = loadImage(`assets/actions/brisk_crying_then_lunch_${i}.jpg`);
  }

  for (let i = 0; i <= 2; i++) {
    catwalkImgs[i] = loadImage(`assets/actions/catwalk_${i}.jpg`);
  }

  for (let i = 0; i <= 2; i++) {
    chortleImgs[i] = loadImage(`assets/actions/chortle_${i}.jpg`);
  }

  for (let i = 0; i <= 1; i++) {
    complicatedImgs[i] = loadImage(`assets/actions/complicated_${i}.jpg`);
  }

  for (let i = 0; i <= 4; i++) {
    disassociateImgs[i] = loadImage(`assets/actions/disassociate_${i}.jpg`);
  }

  for (let i = 0; i <= 5; i++) {
    dreamImgs[i] = loadImage(`assets/actions/dream_${i}.jpg`);
  }

  for (let i = 0; i <= 3; i++) {
    farmersMarketImgs[i] = loadImage(`assets/actions/farmersMarket_${i}.jpg`);
  }

  for (let i = 0; i <= 2; i++) {
    newLookImgs[i] = loadImage(`assets/actions/newLook_${i}.jpg`);
  }

  for (let i = 0; i <= 4; i++) {
    haventLaughedImgs[i] = loadImage(`assets/actions/havent_Laughed_inYears_${i}.jpg`);
  }

  for (let i = 0; i <= 3; i++) {
    hotDogImgs[i] = loadImage(`assets/actions/hotDog_${i}.jpg`);
  }

  for (let i = 0; i <= 3; i++) {
    hotTubImgs[i] = loadImage(`assets/actions/hotTub_${i}.jpg`);
  }

  for (let i = 0; i <= 1; i++) {
    laughterTearsImgs[i] = loadImage(`assets/actions/laughterTurnsToTears_${i}.jpg`);
  }

  for (let i = 0; i <= 0; i++) {
    mantraImgs[i] = loadImage(`assets/actions/mantra_${i}.jpg`);
  }

  for (let i = 0; i <= 3; i++) {
    moisturizerImgs[i] = loadImage(`assets/actions/moisturizer_${i}.jpg`);
  }

  for (let i = 0; i <= 3; i++) {
    oceanImgs[i] = loadImage(`assets/actions/ocean_${i}.jpg`);
  }

  for (let i = 0; i <= 5; i++) {
    puppersImgs[i] = loadImage(`assets/actions/puppers_${i}.jpg`);
  }

  for (let i = 0; i <= 0; i++) {
    screamImgs[i] = loadImage(`assets/actions/scream_${i}.jpg`);
  }

  for (let i = 0; i <= 1; i++) {
    seaOtterSaladImgs[i] = loadImage(`assets/actions/seaOtterSalad_${i}.jpg`);
  }

  for (let i = 0; i <= 3; i++) {
    selfHarmImgs[i] = loadImage(`assets/actions/selfHarm_${i}.jpg`);
  }

  for (let i = 0; i <= 1; i++) {
    sewerImgs[i] = loadImage(`assets/actions/sewer_${i}.jpg`);
  }

  for (let i = 0; i <= 3; i++) {
    singleHugeTearImgs[i] = loadImage(`assets/actions/single_huge_tear_${i}.jpg`);
  }

  for (let i = 0; i <= 3; i++) {
    sleepImgs[i] = loadImage(`assets/actions/sleep_${i}.jpg`);
  }


  for (let i = 0; i <= 2; i++) {
    catwalkImgs[i] = loadImage(`assets/actions/catwalk_${i}.jpg`);
  }

  for (let i = 0; i <= 4; i++) {
    disassociateImgs[i] = loadImage(`assets/actions/disassociate_${i}.jpg`);
  }

  for (let i = 0; i <= 5; i++) {
    dreamImgs[i] = loadImage(`assets/actions/dream_${i}.jpg`);
  }

  for (let i = 0; i <= 3; i++) {
    farmersMarketImgs[i] = loadImage(`assets/actions/farmersMarket_${i}.jpg`);
  }

  for (let i = 0; i <= 0; i++) {
    newLookImgs[i] = loadImage(`assets/actions/newLook_${i}.jpg`);
  }

  for (let i = 0; i <= 4; i++) {
    haventLaughedImgs[i] = loadImage(`assets/actions/havent_Laughed_inYears_${i}.jpg`);
  }

  for (let i = 0; i <= 3; i++) {
    hotDogImgs[i] = loadImage(`assets/actions/hotDog_${i}.jpg`);
  }

  for (let i = 0; i <= 3; i++) {
    hotTubImgs[i] = loadImage(`assets/actions/hotTub_${i}.jpg`);
  }

  for (let i = 0; i <= 1; i++) {
    laughterTearsImgs[i] = loadImage(`assets/actions/laughterTurnsToTears_${i}.jpg`);
  }

  for (let i = 0; i <= 0; i++) {
    mantraImgs[i] = loadImage(`assets/actions/mantra_${i}.jpg`);
  }

  for (let i = 0; i <= 3; i++) {
    moisturizerImgs[i] = loadImage(`assets/actions/moisturizer_${i}.jpg`);
  }

  for (let i = 0; i <= 3; i++) {
    oceanImgs[i] = loadImage(`assets/actions/ocean_${i}.jpg`);
  }

  for (let i = 0; i <= 5; i++) {
    puppersImgs[i] = loadImage(`assets/actions/puppers_${i}.jpg`);
  }

  for (let i = 0; i <= 0; i++) {
    screamImgs[i] = loadImage(`assets/actions/scream_${i}.jpg`);
  }

  for (let i = 0; i <= 1; i++) {
    seaOtterSaladImgs[i] = loadImage(`assets/actions/seaOtterSalad_${i}.jpg`);
  }

  for (let i = 0; i <= 3; i++) {
    selfHarmImgs[i] = loadImage(`assets/actions/selfHarm_${i}.jpg`);
  }

  for (let i = 0; i <= 1; i++) {
    sewerImgs[i] = loadImage(`assets/actions/sewer_${i}.jpg`);
  }

  for (let i = 0; i <= 3; i++) {
    singleHugeTearImgs[i] = loadImage(`assets/actions/single_huge_tear_${i}.jpg`);
  }

  for (let i = 0; i <= 3; i++) {
    sleepImgs[i] = loadImage(`assets/actions/sleep_${i}.jpg`);
  }

  for (let i = 0; i <= 4; i++) {
    slimeImgs[i] = loadImage(`assets/actions/slime_${i}.jpg`);
  }

  for (let i = 0; i <= 5; i++) {
    strangeThingImgs[i] = loadImage(`assets/actions/strangeThing_${i}.jpg`);
  }

  for (let i = 0; i <= 3; i++) {
    tearsLikeNailsImgs[i] = loadImage(`assets/actions/tearsLikeNails_${i}.jpg`);
  }

};

function setup() {

  // if avoiding preload, load with callback. only thing is that it doesn't buffer well on slow connections, so throws everthing off.
  // song = loadSound('assets/audio/music/EagleInk_aja_loop.mp3', playBGmusic);

  // song.loop();
  // playBGmusic();

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
  writeConsoleText(`Care for your Traumagotchi and it will care for you! Play games to earn points. With points you can schedule repetitive actions, add charms, and more... ミ☆`);

  // game menu
  gameMenu = document.querySelector("#gameMenu");
  timer = document.querySelector("#timer");

  // game canvas overlay
  gameIntroOverlay = document.querySelector("#gameIntroOverlay");
  gameTitle = document.querySelector("#gameTitle");
  playButton = document.querySelector("#playButton");
  playInstructions = document.querySelector("#playInstructions");
  pointsOverlay = document.querySelector("#pointsOverlay");
  pointsRunningTotal = document.querySelector("#pointsRunningTotal");
  gameEndOverlay = document.querySelector("#gameEndOverlay");
  finalScore = document.querySelector("#finalScore");

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

  snakeGame = new p5(snakeGameInstance, 'canvasDiv');
  snakeGameCanvas = document.querySelector("#snakeGameCanvas");
  snakeGameCanvas.style.visibility = "hidden";

  pluckGame = new p5(pluckGameInstance, 'canvasDiv');
  pluckGameCanvas = document.querySelector("#pluckGameCanvas");
  pluckGameCanvas.style.visibility = "hidden";

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
    alertMenu.style.display = "none";
    currentKey = tree[currentIndex].choices[0].nextKey;
    tree[currentIndex].choices[0].action();
    nextMenu();
  })
  choice1.addEventListener("click", () => {
    alertMenu.style.display = "none";
    currentKey = tree[currentIndex].choices[1].nextKey;
    tree[currentIndex].choices[1].action();
    nextMenu();
  })
  choice2.addEventListener("click", () => {
    alertMenu.style.display = "none";
    currentKey = tree[currentIndex].choices[2].nextKey;
    tree[currentIndex].choices[2].action();
    nextMenu();
  })
  choice3.addEventListener("click", () => {
    alertMenu.style.display = "none";
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
  // let ref = database.ref('/');
  // originally
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
      pointsOverlay.style.display = "none";
      gameEndOverlay.style.display = "none";

      // console.log(executeAction);
      switch (executeAction) {
        case 'landingPage':
          break;
        case 'initialLoginCareMenu':
          printRecentActivity();
          break;
        case 'careMenu':
          printActiveActions();
          break;
        case 'chortle':
          displayAction(chortleImgs, chortleImgsIndex);
          break;
        case 'laughterTears':
          displayAction(haventLaughedImgs, haventLaughedImgsIndex);
          break;
        case 'haventLaughed':
          displayAction(haventLaughedImgs, haventLaughedImgsIndex);
          break;
        case 'seaOtterSalad':
          displayAction(seaOtterSaladImgs, seaOtterSaladImgsIndex);
          break;
        case 'strangeThing':
          displayAction(strangeThingImgs, strangeThingImgsIndex);
          break;
        case 'puppers':
          displayAction(puppersImgs, puppersImgsIndex);
          break;
        case 'farmersMarket':
          displayAction(farmersMarketImgs, farmersMarketImgsIndex);
          break;
        case 'hotDog':
          displayAction(hotDogImgs, hotDogImgsIndex);
          break;
          break;
        case 'complicated':
          displayAction(complicatedImgs, complicatedImgsIndex);
          break;
        case 'altar':
          displayAction(altarImgs, altarImgsIndex);
          break;
        case 'singleHugeTear':
          displayAction(singleHugeTearImgs, singleHugeTearImgsIndex);
          break;
        case 'brisk':
          displayAction(briskImgs, briskImgsIndex);
          break;
        case 'tearsLikeNails':
          displayAction(tearsLikeNailsImgs, tearsLikeNailsImgsIndex);
          break;
        case 'slime':
          displayAction(slimeImgs, slimeImgsIndex);
          break;
        case 'fourTwenty':
          displayAction(fourTwentyImgs, fourTwentyImgsIndex);
          break;
        case 'selfHarm':
          displayAction(selfHarmImgs, selfHarmImgsIndex);
          break;
        case 'disassociate':
          displayAction(disassociateImgs, disassociateImgsIndex);
          break;
        case 'sleep':
          displayAction(sleepImgs, sleepImgsIndex);
          break;
        case 'dream':
          displayAction(dreamImgs, dreamImgsIndex);
          break;
        case 'newCharm':
          //NOT DONE YET LARK!
          // placeholder is abstract
          break;
        case 'abstract':
          displayAction(abstractImgs, abstractImgsIndex);
          break;
        case 'moisturizer':
          displayAction(moisturizerImgs, moisturizerImgsIndex);
          break;
        case 'changeColor':
          //NOT DONE YET LARK!
          // placeholder is newLook
          break;
        case 'newLook':
          displayAction(newLookImgs, newLookImgsIndex);
          break;
        case 'hotTub':
          displayAction(hotTubImgs, hotTubImgsIndex);
          break;
        case 'hotDog':
          displayAction(hotDogImgs, hotDogImgsIndex);
          break;
        case 'ocean':
          displayAction(oceanImgs, oceanImgsIndex);
          break;
        case 'sewer':
          displayAction(sewerImgs, sewerImgsIndex);
          break;
        case 'mantra':
          displayAction(mantraImgs, mantraImgsIndex);
          break;
        case 'scream':
          displayAction(screamImgs, screamImgsIndex);
          break;
        case 'catwalk':
          displayAction(catwalkImgs, catwalkImgsIndex);
          break;
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
      pointsOverlay.style.display = "block";
      gameEndOverlay.style.display = "block";
      gameBackgroundCanvas.style.visibility = "visible";

      break;
    default:
      break;
  }



}

// function playBGmusic() {
//   if (!song.isPlaying()) {
//     song.play();
//   }
// }

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
  if (keys) {
    keys.forEach(function(key) {
      // console.log(`key is ${key}, input name is ${inputName.value()}, password is ${tgotchiData[key].password}, and password input is ${inputPassword.value()}`)
      if (key.toUpperCase() === inputName.value().toUpperCase() && tgotchiData[key].password.toUpperCase() === inputPassword.value().toUpperCase()) {
        userName = key;
        userData = tgotchiData[key];
      }
    });

    if (userName) {


      // save userData as JSON
      // let json = JSON.stringify(userData);
      // saveJSON(json, 'slimer.json');

      // load JSON as userData
      // loadJSON(`JSON/${fileName}.json`, callback);
      // userData = JSON.parse(jsonFile);


      loginStatus.innerHTML = `logged in as ${userName}`;
      pointStats.innerHTML = `${userData.points} points`;
      pointStats.style.display = 'block';

      loginLandingPage = true;
      state = 'care';


      lastLoginTime = userData.timeStamp[userData.timeStamp.length - 1];
      currentLoginTime = Date.now();
      userData.timeStamp.push(currentLoginTime);
      firstLoginTime = userData.timeStamp[0];

      executeAction = 'initialLoginCareMenu';
      // this rewrites ALL the data
      pushMoreData(userData);
      //not sure how to rewrite...
      // rewriteData(userData);

      loginMenu.remove();
    } else {
      // bug: createPOnce is for drawing DOM elements in draw loop: need to set flag so this doesn't appear over and over, or create DOM element that toggles off/on
      createPOnce(`login error.`, "loginMenu")
    }
  } else {
    // Lark: make login error here
    createPOnce(`slow connection... </br> wait a sec </br> or try reloading`, "loginMenu")
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

  if (writeToConsoleBool === true) {

    consoleText.innerHTML = text;
    writeToConsoleBool = false;
  }
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

function printRecentActivity() {

  if (printOnceBool === true) {
    let minutesElapsed = Math.floor((currentLoginTime - lastLoginTime) / 60000);

    if (userData.actionsHourly.length === 1 && userData.actionsFiveMinutes.length === 1) {
      writeToConsoleBool = true;
      writeConsoleText(`since you saw them last ${minutesElapsed} minutes ago, ${userName} has been waiting for you to task it with things to do...`)
    } else {
      // hourly list of actions
      if (userData.actionsHourly.length > 1) {
        // actionsHourlySinceLast = 'hourly: </br>'
        for (let i = 1; i < userData.actionsHourly.length; i++) {
          // this fires every minute for testing
          // let numberTimes = Math.floor((currentLoginTime - userData.actionsHourly[i].initialTimestamp) / 60000);
          let numberTimes = Math.floor((currentLoginTime - userData.actionsHourly[i].initialTimestamp) / 3600000);
          if (numberTimes === 1 && i < userData.actionsHourly.length - 1) {
            actionsHourlySinceLast += `> ${userData.actionsHourly[i].actionPastTense} ${numberTimes} time </br>`;
          } else if (numberTimes >= 2 && i < userData.actionsHourly.length - 1) {
            actionsHourlySinceLast += `> ${userData.actionsHourly[i].actionPastTense} ${numberTimes} times </br>`;
          } else if (numberTimes === 1 && userData.actionsHourly.length != 2) {
            actionsHourlySinceLast += `> ${userData.actionsHourly[i].actionPastTense} ${numberTimes} time </br>`;
          } else if (numberTimes >= 2 && userData.actionsHourly.length != 2) {
            actionsHourlySinceLast += `> ${userData.actionsHourly[i].actionPastTense} ${numberTimes} times </br>`;
          } else if (numberTimes === 1) {
            actionsHourlySinceLast += `> ${userData.actionsHourly[i].actionPastTense} ${numberTimes} time </br>`;
          } else if (numberTimes >= 2) {
            actionsHourlySinceLast += `> ${userData.actionsHourly[i].actionPastTense} ${numberTimes} times </br>`;
            // } else if (numberTimes === 0 && i === userData.actionsHourly.length - 1) {
            //   actionsHourlySinceLast += `and that's all.`;
          }
        }
      }
      if (userData.actionsFiveMinutes.length > 1) {
        //five minutely list of actions
        // actionsFiveMinutesSinceLast = 'every five minutes: </br>'
        for (let i = 1; i < userData.actionsFiveMinutes.length; i++) {
          let numberTimes = Math.floor((currentLoginTime - userData.actionsFiveMinutes[i].initialTimestamp) / 300000);
          if (numberTimes === 1 && i < userData.actionsFiveMinutes.length - 1) {
            actionsFiveMinutesSinceLast += `> ${userData.actionsFiveMinutes[i].actionPastTense} ${numberTimes} time </br>`;
          } else if (numberTimes >= 2 && i < userData.actionsFiveMinutes.length - 1) {
            actionsFiveMinutesSinceLast += `> ${userData.actionsFiveMinutes[i].actionPastTense} ${numberTimes} times </br>`;
          } else if (numberTimes === 1 && userData.actionsFiveMinutes.length != 2) {
            actionsFiveMinutesSinceLast += `> ${userData.actionsFiveMinutes[i].actionPastTense} ${numberTimes} time </br>`;
          } else if (numberTimes >= 2 && userData.actionsFiveMinutes.length != 2) {
            actionsFiveMinutesSinceLast += `> ${userData.actionsFiveMinutes[i].actionPastTense} ${numberTimes} times </br>`;
          } else if (numberTimes === 1) {
            actionsFiveMinutesSinceLast += `> ${userData.actionsFiveMinutes[i].actionPastTense} ${numberTimes} time </br>`;
          } else if (numberTimes >= 2) {
            actionsFiveMinutesSinceLast += `> ${userData.actionsFiveMinutes[i].actionPastTense} ${numberTimes} times </br>`;
            // } else if (numberTimes === 0 && i === userData.actionsFiveMinutes.length - 1) {
            //   actionsFiveMinutesSinceLast += `...and that's all.`;
          }
        }
      }

      writeToConsoleBool = true;
      writeConsoleText(`since you saw them last ${minutesElapsed} minutes ago, ${userName} has... </br> </br> ${actionsHourlySinceLast} ${actionsFiveMinutesSinceLast}`);


    }
    printOnceBool = false;
  }
}

function printActiveActions() {
  if (printOnceBool === true) {
    if (userData.actionsHourly.length === 1 && userData.actionsFiveMinutes.length === 1) {
      writeToConsoleBool = true;
      writeConsoleText(`${userName} doesn't have any regular care actions yet! play games to get points and schedule repeating actions...`)
    } else {
      // hourly list of actions
      if (userData.actionsHourly.length > 1) {
        actionsHourlyList = '∘◦ hourly ◦∘</br>'
        for (let i = 1; i < userData.actionsHourly.length; i++) {

          if (i < userData.actionsHourly.length - 1) {
            actionsHourlyList += `> ${userData.actionsHourly[i].action}  </br>`;
          } else {
            actionsHourlyList += `> ${userData.actionsHourly[i].action}`;
          }

        }
      }
      if (userData.actionsFiveMinutes.length > 1) {
        actionsFiveMinutesList = '</br> ∘◦ every five minutes ◦∘ </br>'
        //five minutely list of actions
        for (let i = 1; i < userData.actionsFiveMinutes.length; i++) {
          if (i < userData.actionsFiveMinutes.length - 1) {
            actionsFiveMinutesList += `> ${userData.actionsFiveMinutes[i].action} </br>`;
          } else {
            actionsFiveMinutesList += `> ${userData.actionsFiveMinutes[i].action} </br>`;
          }

        }
      }
      writeToConsoleBool = true;
      writeConsoleText(`${userName}'s current actions are... </br> ${actionsFiveMinutesList} </br> ${actionsHourlyList}`)
    }
    printOnceBool = false;
  }
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
