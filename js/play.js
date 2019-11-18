/* Code by Lark Alder aka Lark VCR aka Virtually Conflicted Reality
Assistance: Angelabelle Abarientos
DeepMachineIncantation Text: Porpentine Charity Heartscape
Special thanks to Dan Schiffman's Coding Train & Processing Foundation


The intention for this site is for all the function and variable names will be replaced with words of DeepMachineIncantation. While the website is active, the code executes these incantations and casts virtual spells for healing trauma.

This is still a work in progress...



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

If you want to convert your code into magic... check out this Babel script...

https://astexplorer.net/#/gist/8a09031fedac68d04d73c5fc20b038c7/9144b99ff37bbbacb21ada59ae445d53a241c4f9

Github gist w/ code
https://gist.github.com/8a09031fedac68d04d73c5fc20b038c7/9144b99ff37bbbacb21ada59ae445d53a241c4f9

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

let state = 'login';

let diameter = 100;
let charmDistance;
let initialFrameCount;
let initialDiameter;

let database;
let keys;
let tgotchiData;
let tgotchiDataArray;
let numberTgotchi;
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

// code back
let codeSpan;
let codeDiv;
let codeArrayIndex = 0;
let codeSparkle;
let codeSparkleDiv;
let sparkleOffset = 0;
let sparkleOn;



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

// menu for shrine & animation variables
let releaseWordsMenu;
let releaseWordsButton;
let releaseWords;
let releasingWords = false;
let setIntentionMenu;
let setIntentionButton;
let intentionWords;
let settingIntention = false;
let releasePositionZ = 33;
let releaseRotationX = 0;
let releasePositionVel = 0;
let releasePositionAcc = 0.1;
let releaseScale = 1;
let releaseTextSize = 16;
let offeringReleasePositionVel = 0;
let offeringReleasePositionAcc = 0.1;
let offeringReleasePositionZ = 287;
let offeringReleasePositionX = -33;
let offeringReleaseRotationX = 0;
let offeringReleaseScale = 1;


let currentKey = 'initial';
let currentIndex = 0;

let graphics;
let graphicsShrineTgotchi;
let graphicsGrid;
let graphicsBG;
let graphicsBGArray = [];
let graphicsCharm;
let graphicsShrineText;
let graphicsShrineTextLarge;
let graphicsShrineRelease;

let moveGrid = false;

let gridOffset = 0;
let angleTgotchi = 0;
let rotateVelocity = .005;
let angleBreathe = 0;

let cubeEnabled = false;
let coneEnabled = false;
let sphereEnabled = false;
let torusEnabled = false;
let ringEnabled = false;

let mindwipeEnabled;
let emdrEnabled;
let psoasEnabled;
let asmrEnabled;
let reliquificationEnabled;
let treEnabled;
let longfinEelsEnabled;
let cbtEnabled;
let yogaEnabled;
let deprivationEnabled;
let dramaEnabled;
let sexEnabled;
let meditationEnabled;

let processorData;

let charmData;
let charmArray = [];
let charmID;
let charmMove;

let collisionActive = false;
let actionX = 200;
let actionY = 0;
let actionZ = 200;
let actionCubeDiameter = 66;
let actionAngle = 0;
let actionAnimating = false;
let swipeLeftComplete = false;

// SHRINE load models and vars
let machineWorldFeelingsCompostShrineCenter;
let machineWorldText = 'seed';
let lastTextAnimationFrame;
let shrineTgotchiCounter = 33;
let shrineTgotchiX = -200;
let tgotchiEntryComplete = false;

let cameraX = 0;
let cameraY = 0;
let cameraZ = 0;
// rgb values for camera lights
let cameraColor1 = [200, 200, 112]; // top left
let cameraColor2 = [66, 125, 255]; // bottom right
let cameraColorAmbient = [71, 71, 71];


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
let shrineImgs = [];
let shrineImgsIndex = 0;
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

let song_B2;
let song_universalBass;
let readyToPlay = false;

let sound_click;
let sound_thud1;
let sound_thud2;
let sound_beep1;
let sound_collide_heavy;
let sound_collide_light;
let sound_fizzDown_computery;
let sound_fizzDown_loPitch;
let sound_fizzDown_hiPitch;
let sound_fizzDown_sad;
// let sound_metallic_0;
let sound_metallic_1;
let sound_powerup_0;
let sound_powerup_1;
let sound_skitter;
let sound_snake_0;
let sound_snake_1;
let sound_wack;




function preload() {

  // // L O A D A U D I O
  // song_B2 = loadSound('assets/audio/music/B2_Aja_loop.mp3');
  song_universalBass = loadSound('assets/audio/music/UniversalBass_Aja_loop_fadeIn.mp3');
  sound_click = loadSound('assets/audio/sfx/click.mp3');
  sound_thud1 = loadSound('assets/audio/sfx/thud1.mp3');
  sound_thud2 = loadSound('assets/audio/sfx/thud2.mp3');
  sound_beep1 = loadSound('assets/audio/sfx/beep1.mp3');
  sound_fizzDown_computery = loadSound('assets/audio/sfx/fizzDown_computery.mp3');
  sound_fizzDown_loPitch = loadSound('assets/audio/sfx/fizzDown_loPitch.mp3');
  sound_fizzDown_hiPitch = loadSound('assets/audio/sfx/fizzDown_hiPitch.mp3');
  sound_fizzDown_sad = loadSound('assets/audio/sfx/fizzDown_sad.mp3');
  // sound_metallic_0 = loadSound('assets/audio/sfx/metallic_0.mp3');
  sound_metallic_1 = loadSound('assets/audio/sfx/metallic_1.mp3');
  sound_collide_light = loadSound('assets/audio/sfx/collide_light.mp3');
  sound_collide_heavy = loadSound('assets/audio/sfx/collide_heavy.mp3');
  sound_powerup_0 = loadSound('assets/audio/sfx/powerup_0.mp3');
  sound_powerup_1 = loadSound('assets/audio/sfx/powerup_1.mp3');
  sound_wack = loadSound('assets/audio/sfx/wack.mp3');


  // L O A D A C T I O N I M A G E S
  for (let i = 0; i <= 4; i++) {
    shrineImgs[i] = loadImage(`assets/actions/shrine_${i}.jpg`);
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

  const testWEBGLCanvas = document.querySelector("#testWEBGLCanvas");
  // Initialize the GL context
  const gl = testWEBGLCanvas.getContext("webgl") || testWEBGLCanvas.getContext("experimental-webgl");

  // Only continue if WebGL is available and working
  if (gl === null) {
    alert(`Uh oh! You might need to check "Use hardware acceleration when available" in your browser settings.

    Chrome and Firefox work best.`);
    return;
  }

  // if avoiding preload, load with callback. only thing is that it doesn't buffer well on slow connections, so throws everthing off.
  // song = loadSound('assets/audio/music/EagleInk_aja_loop.mp3', playBGmusic);

  // not buffering in time
  // song_B2.setVolume(0.00);
  // song_universalBass.setVolume(0.2);
  // sound_click.setVolume(0.1);

  // use canvasDiv size to set size of p5 canvas
  canvasDiv = document.querySelector("#canvasDiv");
  // set height of canvasDiv (else defaults to 0 bc canvas layers are set to position:absolute so they can stack)
  // this is for responsive layout: height adjusts
  // canvasDiv.style.height = `${canvasDiv.offsetWidth * 3 / 4}px`;
  canvasDiv.style.height = `450px`;

  // canvas = createCanvas(windowWidth / 2, windowWidth * 3 / 8, WEBGL);
  // canvas = createCanvas(canvasDiv.offsetWidth, canvasDiv.offsetWidth * 3 / 4, WEBGL);
  canvas = createCanvas(600, 450, WEBGL);

  // canvas = createCanvas(800, 600, WEBGL);
  canvas.parent("canvasDiv");
  canvas.class("gameCanvas");
  canvas.id("p5Canvas");

  frameRate(30);

  // default cameraZ
  cameraZ = (height / 2) / tan(PI / 6);

  charmDistance = diameter;

  // media query event handler
  if (matchMedia) {
    const mq = window.matchMedia("(min-width: 500px) and (min-height: 500px)");
    mq.addListener(WidthChange);
    WidthChange(mq);
  }

  graphics = createGraphics(diameter + 20, diameter + 20);

  graphicsShrineTgotchi = createGraphics(diameter + 20, diameter + 20);

  graphicsBG = createGraphics(diameter + 20, diameter + 20);

  graphicsGrid = createGraphics(width, width);

  graphicsCharm = createGraphics(diameter / 2, diameter / 2);

  graphicsShrineText = createGraphics(diameter * 4, diameter * 4.5);

  graphicsShrineTextLarge = createGraphics(diameter, diameter);

  graphicsShrineRelease = createGraphics(diameter * 3, diameter);

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
  inputPassword = select("#passwordInput");
  loginButton = select("#login");

  loginButton.mouseClicked(login);

  //console
  consoleText = document.querySelector("#consoleText")
  writeConsoleText(`Hold on...   </br> </br> ............ it takes a second to tap in ミ☆`);

  // game menu
  gameMenu = document.querySelector("#gameMenu");
  timer = document.querySelector("#timer");

  // code elements
  codeSpan = document.querySelector("#codeSpan");
  codeSparkle = document.querySelector("#codeSparkle");
  codeDiv = document.querySelector("#codeDiv");
  codeSparkleDiv = document.querySelector("#codeSparkleDiv");

  // game canvas overlay
  gameIntroOverlay = document.querySelector("#gameIntroOverlay");
  gameTitle = document.querySelector("#gameTitle");
  playButton = document.querySelector("#playButton");
  playInstructions = document.querySelector("#playInstructions");
  pointsOverlay = document.querySelector("#pointsOverlay");
  pointsRunningTotal = document.querySelector("#pointsRunningTotal");
  gameEndOverlay = document.querySelector("#gameEndOverlay");
  finalScore = document.querySelector("#finalScore");

  // menus
  alertMenu = document.querySelector("#alertMenu");
  careMenu = document.querySelector("#careMenu");
  releaseWordsMenu = document.querySelector("#releaseWordsMenu");
  setIntentionMenu = document.querySelector("#setIntentionMenu");

  // care menu decision tree
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

  // user input menu
  releaseWordsButton = document.querySelector("#releaseWordsButton");

  releaseWordsButton.addEventListener("click", () => {
    releaseWords = document.querySelector("#releaseWordsInput").value;
    releasingWords = true;
    if (!sound_fizzDown_computery.isPlaying()) {
      sound_fizzDown_computery.play();
    }
    setTimeout(function() {
      careMenu.style.display = "block";
      releaseWordsMenu.style.display = "none";
    }, 2000);
  })

  setIntentionButton = document.querySelector("#setIntentionButton");

  setIntentionButton.addEventListener("click", () => {
    intentionWords = document.querySelector("#setIntentionInput").value;
    settingIntention = true;
    if (!sound_fizzDown_hiPitch.isPlaying()) {
      sound_fizzDown_hiPitch.play();
    }
    setTimeout(function() {
      careMenu.style.display = "block";
      setIntentionMenu.style.display = "none";
    }, 2000);
  })

  // add sound to buttons
  let buttons = document.querySelectorAll("button, [type='checkbox'], [type='radio'], select, [href]");

  for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", function() {
      sound_click.play();
    });
  }


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

  angleTgotchi += rotateVelocity;

  if (song_universalBass.buffer) {
    playBGmusic();
  }

  if (!keys) {

    background(0);
    cameraControl();
    drawLoadingScreenGrid();

  } else {

    switch (state) {
      case 'login':
        displayLoginScreen();
        writeToConsoleBool = true;
        writeConsoleText(`ok ready to login`);
        // displayShrine(); // comment out
        break;
      case 'mainMenu':
        displayMainCanvas();
        careMenu.style.display = "block";
        releaseWordsMenu.style.display = "none";
        setIntentionMenu.style.display = "none";
        gameMenu.style.display = "none";
        gameIntroOverlay.style.display = "none";
        pointsOverlay.style.display = "none";
        gameEndOverlay.style.display = "none";
        break;
      case 'shrine':
        displayShrine();
        break;
      case 'care':
        displayMainCanvas();
        printOnceBool = true;
        printActiveActions();

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
          case 'complicated':
            displayAction(complicatedImgs, complicatedImgsIndex);
            break;
          case 'shrine':
            displayAction(shrineImgs, shrineImgsIndex);
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
      case 'viewCode':
        writeToConsoleBool = true;
        writeConsoleText(``);
        displayMainCanvas();
        // not sure a function needs to be called in draw loop.....
        break;
        // case 'game':
        //
        //   careMenu.style.display = "none";
        //   gameMenu.style.display = "block";
        //   gameIntroOverlay.style.display = "block";
        //   pointsOverlay.style.display = "block";
        //   gameEndOverlay.style.display = "block";
        //   gameBackgroundCanvas.style.visibility = "visible";
        //
        //   break;
      default:
        break;
    }
  }
}

function stateChange(_state) {
  state = _state;
  let y = document.getElementById("fakeBackground");

  switch (_state) {

    case 'mainMenu':

      if (y.style.animation == "fadein 1s") {
        y.style.animation = "fadeout 1s";
      }
      setTimeout(function() {
        y.style.background = "url(../assets/backgrounds/bg_staticGrid_0.png)";
        // y.style.background = "#ffffff";
        y.style.animation = "fadein 1s";
      }, 100);
      break;

    case 'shrine':
      if (y.style.animation == "fadein 1s") {
        y.style.animation = "fadeout 1s";
      }
      setTimeout(function() {
        // y.style.background = "#000000";
        y.style.background = "url(../assets/backgrounds/bg_staticGrid_0.png)";
        y.style.animation = "fadein 1s";
      }, 100);
      break;

    case 'care':
      if (y.style.animation == "fadein 1s") {
        y.style.animation = "fadeout 1s";
      }
      setTimeout(function() {
        y.style.background = "url(../assets/backgrounds/bg_staticGrid_0.png)";
        // y.style.background = "#ff0000";
        y.style.animation = "fadein 1s";
      }, 100);
      break;

    case 'viewCode':
      if (y.style.animation == "fadein 1s") {
        y.style.animation = "fadeout 1s";
      }
      setTimeout(function() {
        y.style.background = "url(../assets/backgrounds/bg_staticGrid_0.png)";
        // y.style.background = "#ff0000";
        y.style.animation = "fadein 1s";
      }, 100);
      break;

  }
}

function playBGmusic() {

  if (state == 'login' || state == 'mainMenu' || state == 'care' || state == 'shrine' || state == 'community') {

    if (!song_universalBass.isPlaying()) {
      // set volumes here, since it is after buffering and only triggers every-so-often
      song_universalBass.setVolume(0.3);
      sound_click.setVolume(0.4);
      sound_beep1.setVolume(0.4);
      sound_thud1.setVolume(0.4);
      sound_thud2.setVolume(0.4);
      sound_collide_heavy.setVolume(0.3);
      sound_collide_light.setVolume(0.4);
      sound_fizzDown_computery.setVolume(0.2);
      sound_fizzDown_loPitch.setVolume(0.2);
      sound_fizzDown_hiPitch.setVolume(0.2);
      sound_fizzDown_sad.setVolume(0.2);
      // sound_metallic_0.setVolume(0.4);
      sound_metallic_1.setVolume(0.4);
      sound_powerup_0.setVolume(0.2);
      sound_powerup_1.setVolume(0.2);
      sound_wack.setVolume(0.2);

      song_universalBass.loop();
    }
  }

}

function displayLoginScreen() {
  background(0);

  // bug: not sure why drawGrid() doesn't work before login
  drawGrid();

  cameraControl();
}

function displayMainCanvas() {
  background(0);

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

function displayShrine() {
  background(0);
  cameraControl();

  cameraZ = (height / 2) / tan(PI / 6);

  if (releasingWords) {
    releaseWordsAnimation();
  }

  if (settingIntention) {
    setIntentionAnimation();
  }

  displayShrineCenter();

  if (tgotchiDataArray) {

    drawShrineTgotchiGraphics(tgotchiDataArray[shrineTgotchiCounter]);
    displayShrineTgotchi(tgotchiDataArray[shrineTgotchiCounter]);

  }
}

function login() {
  if (keys && sound_click.buffer) {
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

      // disable display points
      // pointStats.innerHTML = `${userData.points} points`;
      // pointStats.style.display = 'block';

      loginLandingPage = true;

      stateChange('mainMenu');

      lastLoginTime = userData.timeStamp[userData.timeStamp.length - 1];
      currentLoginTime = Date.now();
      userData.timeStamp.push(currentLoginTime);
      firstLoginTime = userData.timeStamp[0];

      printRecentActivity();
      // executeAction = 'initialLoginCareMenu';


      loginMenu.remove();
    } else {
      // bug: createPOnce is for drawing DOM elements in draw loop: need to set flag so this doesn't appear over and over, or create DOM element that toggles off/on
      createPOnce(`hm spelling error?`, "loginMenu")
    }
  } else {
    createPOnce(`slow connection... </br> take a deep breathe and try again`, "loginMenu")
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

    if (userData.actionsHourly && userData.actionsHourly.length === 1 && userData.actionsFiveMinutes.length === 1) {
      writeToConsoleBool = true;
      writeConsoleText(`since you saw them last ${minutesElapsed} minutes ago, ${userName} has been waiting for you to task it with things to do...`)
    } else {
      // hourly list of actions
      if (userData.actionsHourly && userData.actionsHourly.length > 1) {
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
      if (userData.actionsFiveMinutes && userData.actionsFiveMinutes.length > 1) {
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
      writeConsoleText(`${userName} doesn't have any regular care actions yet! schedule virtualSelfCare so it can keep busy when you log off...`)
    } else {
      // hourly list of actions
      if (userData.actionsHourly.length > 1) {
        actionsHourlyList = '∘◦ every five minutes ◦∘</br>'
        for (let i = 1; i < userData.actionsHourly.length; i++) {

          if (i < userData.actionsHourly.length - 1) {
            actionsHourlyList += `> ${userData.actionsHourly[i].action}  </br>`;
          } else {
            actionsHourlyList += `> ${userData.actionsHourly[i].action}`;
          }

        }
      }
      if (userData.actionsFiveMinutes.length > 1) {
        actionsFiveMinutesList = '</br> ∘◦ every sixty seconds ◦∘ </br>'
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
      writeConsoleText(`${userName}'s current virtualSelfCare actions are: </br> ${actionsFiveMinutesList} </br> ${actionsHourlyList}`)
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
