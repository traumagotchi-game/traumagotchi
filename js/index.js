/* Code by Lark Alder aka Lark VCR aka Virtually Conflicted Reality
Assistance: Angelabelle Abarientos
DeepMachineIncantation Text: Porpentine Charity Heartscape
Special thanks to Dan Schiffman's Coding Train & Processing Foundation


This is the development version, actual site transforms all the function and variable names with words of DeepMachineIncantation. While the website is active, the code executes these incantations and casts virtual spells for healing trauma.

This — like the process of healing — is ALWAYS a work-in-progress



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



*/
"use strict";

let canvas;
let title;
let titleRewound = false;
let title_medium;
let title_mediumRewound = false;
let title_mobile;
let title_mobileRewound = false;

let browser = true;
let size;
let rectWidth = 800;
let easing;
let menu;
let canvasDiv;
let lastTime;
let song;
let alertIndex = 0;
let alertArray = [`Make a Traumagotchi </br> !! </br> !!`, `Machine healing on the Interwebs </br> *♡+`, `Deep Machine Trauma Compost Shrine </br> <3`, `All sorts of nice things for it to do </br> ..｡*ﾟ+`];



function preload() {
  title = loadAnimation("assets/sprites/traumagotchiTitle/traumagotchiTitle_0.png", "assets/sprites/traumagotchiTitle/traumagotchiTitle_8.png");
  // bug not loading animation
  title_mobile = loadAnimation("assets/sprites/traumagotchiTitle/traumagotchiTitle_small_0.png", "assets/sprites/traumagotchiTitle/traumagotchiTitle_small_8.png");
  title_medium = loadAnimation("assets/sprites/traumagotchiTitle/traumagotchiTitle_medium_0.png", "assets/sprites/traumagotchiTitle/traumagotchiTitle_medium_8.png");

  title.looping = false;
  title_mobile.looping = false;
  title_medium.looping = false;

  // song = loadSound('assets/audio/music/rooksFeather_traces.mp3');
}

function setup() {

  // use canvasDiv size to set size of p5 canvas
  canvasDiv = document.querySelector("#canvasDiv");
  // set height of canvasDiv (else defaults to 0 bc canvas layers are set to position:absolute so they can stack)
  // canvasDiv.style.height = `${canvasDiv.offsetWidth * 3 / 4}px`;

  // canvas = createCanvas(windowWidth / 2, windowWidth * 3 / 8, WEBGL);
  canvas = createCanvas(canvasDiv.offsetWidth, 100);
  canvas.parent("canvasDiv");


  // canvas = createCanvas(windowWidth, windowHeight);
  // // canvas.id("canvasFullScreen");
  // canvas.parent("canvasDivResponsive");
  // // canvas.id("canvasDivResponsive");


  menu = select("#homePageMenu");

  //bug ! created draw loop using window requestAnimationFrame in refresh()
  frameRate(30);

  setInterval(animateTitleTimer, 5000);
  setInterval(changeAlert, 4000);

  // media query event handler
  if (matchMedia) {
    const mq = window.matchMedia("(min-width: 500px) and (min-height: 500px)");
    mq.addListener(WidthChange);
    WidthChange(mq);
  }

  refresh();
}

function refresh() {
  // const game = p;
  window.requestAnimationFrame(function() {
    refresh()
  });

  const now = Date.now();
  if (lastTime == null) lastTime = now;
  const dt = (now - lastTime) / 1000.0
  updateLoop();
  // update(dt)
  // render()
  lastTime = now;
}


function windowResized() {

  resizeCanvas(canvasDiv.offsetWidth, canvasDiv.offsetHeight);

}

function WidthChange(mq) {

  if (mq.matches) {
    // window width is at least 500px
    document.querySelector("#newTgotchi").style.visibility = 'visible';
    document.querySelector("#loadTgotchi").style.visibility = 'visible';
    // document.querySelector("#homepageSplashyText").innerHTML = `best experienced on full-screen in chrome </br> =)`;
    // song.setVolume(0.3);
    // song.loop();
    browser = true;

  } else {
    document.querySelector("#newTgotchi").style.visibility = 'hidden';
    document.querySelector("#loadTgotchi").style.visibility = 'hidden';
    document.querySelector("#homepageSplashyText").innerHTML = `Sorry phone, to make a Traumagotchi you have to be on a computer.`;
    browser = false;

  }
}


function draw() {}

function updateLoop() {

  clear();

  checkFrameStates();

  fill(22, 22, 22);
  rectMode(CENTER);

  if (browser) {
    rect(width / 2, height / 2, 1000, 100)

    animation(title, canvasDiv.offsetWidth / 2, canvasDiv.offsetHeight / 2);

  } else {
    rect(width / 2, height * .8, 1000, 50)
    animation(title_mobile, canvasDiv.offsetWidth / 2, canvasDiv.offsetHeight * .8);

  }

}

function changeAlert(){
    document.querySelector("#homepageSplashyText").innerHTML = alertArray[alertIndex % alertArray.length];
    alertIndex++;
}

function checkFrameStates() {
  if (title.getFrame() == 1) {
    titleRewound = true;
  }

  if (titleRewound) {
    title.goToFrame(title.getLastFrame());
  } else {
    title.goToFrame(1);
  }

  //title 330
  if (title_mobile.getFrame() == 1) {
    title_mobileRewound = true;

  }

  if (title_mobileRewound) {
    title_mobile.goToFrame(title_mobile.getLastFrame());
  } else {
    title_mobile.goToFrame(1);
  }

  // title_medium
  if (title_medium.getFrame() == 1) {
    title_mediumRewound = true;
  }

  if (title_mediumRewound) {
    title_medium.goToFrame(title_medium.getLastFrame());
  } else {
    title_medium.goToFrame(1);
  }
}

function animateTitleTimer() {
  titleRewound = false;
  changeAlert = true;
  title_mobileRewound = false;
  title_mediumRewound = false;
}
