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
  colorMode(HSB, 360); // Use HSB with scale of 0-255
  // colorMode(RGB, 255); // Use HSB with scale of 0-255

  // use canvasDiv size to set size of p5 canvas
  canvasDiv = document.querySelector("#canvasDiv");
  // set height of canvasDiv (else defaults to 0 bc canvas layers are set to position:absolute so they can stack)
  // canvasDiv.style.height = `${canvasDiv.offsetWidth * 3 / 4}px`;

  // canvas = createCanvas(windowWidth / 2, windowWidth * 3 / 8, WEBGL);
  canvas = createCanvas(canvasDiv.offsetWidth, 100);
  canvas.parent("canvasDiv");


  // song = loadSound('assets/audio/music/rooksFeather_traces.mp3', playBGmusic);
  // song.loop();

  // canvas = createCanvas(windowWidth, windowHeight);
  // // canvas.id("canvasFullScreen");
  // canvas.parent("canvasDivResponsive");
  // // canvas.id("canvasDivResponsive");


  menu = select("#homePageMenu");
  // menu.position(0, height / 2 + 50);

  //bug !
  frameRate(30);

  setInterval(animateTitleTimer, 5000);

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

// function updateLoop() {
//   // this is the new (frameDependant) draw loop
//   // this does the same thing as sleep function, without putting everything else in the game to sleep
//   if (frameCount % 30 == 0) {
//     runSketch();
//   }
// }

// function playBGmusic() {
//     song.play();
// }

function windowResized() {

  resizeCanvas(canvasDiv.offsetWidth, canvasDiv.offsetHeight);

}

function WidthChange(mq) {
  let notice = createP("Sorry mobile phones not supported ;( You need to be on a browser to play this game.")
  notice.style("margin: 100px 10px auto 10px");
  notice.id("notice");
  notice.hide();

  if (mq.matches) {
    // window width is at least 500px
    document.querySelector("#newTgotchi").style.visibility = 'visible';
    document.querySelector("#loadTgotchi").style.visibility = 'visible';
    document.querySelector("#alertText").innerHTML = `best experienced on full-screen in chrome </br> =)`;
    // document.querySelector("#newTgotchi").style.display = 'block';
    // document.querySelector("#loadTgotchi").style.display = 'block';
    browser = true;
    // console.log(browser);

  } else {
    document.querySelector("#newTgotchi").style.visibility = 'hidden';
    document.querySelector("#loadTgotchi").style.visibility = 'hidden';
    document.querySelector("#alertText").innerHTML = `Sorry not phone-playable yet. Come back when you are on a computer.`;

    // document.querySelector("#newTgotchi").style.display = 'none';
    // document.querySelector("#loadTgotchi").style.display = 'none';
    browser = false;
    // console.log(browser);
  }
}


function draw() {}

function updateLoop() {
  // background(0);
  clear();

  checkFrameStates();

  // console.log(`width: ${width}
  //    height: ${height}`)
  // console.log(`divWidth: ${canvasDiv.offsetWidth}
  //    divHeight: ${canvasDiv.offsetHeight}`)
  // console.log(`windowWidth: ${windowWidth}
  //    windowHeight: ${windowHeight}`)


  fill(22, 22, 22);
  rectMode(CENTER);

  // drawGrid();

  if (browser) {
    rect(width / 2, height / 2, 1000, 100)

    animation(title, canvasDiv.offsetWidth / 2, canvasDiv.offsetHeight / 2);
  } else {
    rect(width / 2, height * .8, 1000, 50)
    animation(title_mobile, canvasDiv.offsetWidth / 2, canvasDiv.offsetHeight * .8);

  }

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
  title_mobileRewound = false;
  title_mediumRewound = false;
}

function drawGrid() {
  strokeWeight(1.5);
  stroke(0);
  // stroke(120, 360, 360);

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
  fill(0, 0, 0)
  rect(width / 2, height / 2, rectWidth + 40, rectWidth * 3 / 4 + 40);

  noFill();

  easing = windowWidth * .00009
  // easing = .15;
  size = width;
  // moved this assingment to global scope
  // rectWidth = 200;

  // let easing = .15;
  // let size = width;
  // let rectWidth = 200;

  for (let i = 0; i <= 20; i++) {
    size += (rectWidth - size) * easing;
    // stroke(120, 0 + i * 5, 0 + i * 5);
    // stroke(120, 360, 360 - i * 15);
    rect(width / 2, height / 2, size, size * 3 / 4);
  }
}
