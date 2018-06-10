let canvas;
let title;
let titleRewound = false;
let size;
let rectWidth = 800;
let easing;
let menu;


function preload() {
  title = loadAnimation("assets/sprites/traumagotchiTitle/traumagotchiTitle_0.png", "assets/sprites/traumagotchiTitle/traumagotchiTitle_8.png");
  title.looping = false;
}

function setup() {
  colorMode(HSB, 360); // Use HSB with scale of 0-255
  // colorMode(RGB, 255); // Use HSB with scale of 0-255

  // looks like framerate problem is in canvs size!
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.id("canvasFullScreen");
  // canvas.parent("canvasDiv");

  menu = select("#homePageMenu");
  menu.position(0, height/2 + 50);

  //bug !
  frameRate(30);

  setInterval(animateTitleTimer, 6000);

  // // media query event handler
  // if (matchMedia) {
  //   const mq = window.matchMedia("(min-width: 500px) and (min-height: 500px)");
  //   mq.addListener(WidthChange);
  //   WidthChange(mq);
  // }



}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function WidthChange(mq) {
  let notice = createP("Sorry mobile phones not supported ;( You need to be on a browser to play this game.")
  notice.style("margin: 100px 10px auto 10px");
  notice.id("notice");
  notice.hide();

  if (mq.matches) {
    // window width is at least 500px
    document.querySelector(".main-content").style.display = 'block';
    document.querySelector("#notice").style.display = 'none';
  } else {
    document.querySelector(".main-content").style.display = 'none';
    document.querySelector("#notice").style.display = 'block';
  }
}


function draw() {
  // background(0);
  clear();
  if (title.getFrame() == 1){
    titleRewound = true;
  }

  if (titleRewound) {
    title.goToFrame(title.getLastFrame());
  } else {
    title.goToFrame(1);
  }

  drawGrid();
  animation(title, width / 2, height / 2 - 100);

}


function animateTitleTimer() {
  titleRewound = false;
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
