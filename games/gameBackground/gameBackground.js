"use strict";

let drawP5templateBackgroundBool = false;
let drawCollapseBackgroundBool = false;
let drawPlatformBackgroundBool = false;
let drawBreakoutBackgroundBool = false;
let drawWackymoleBackgroundBool = false;
let drawSchmupBackgroundBool = false;


let gameBackgroundInstance = function(p) {

console.log ("Game background");

p.setup = function (){

  p.canvas = p.createCanvas(600, 450);
  p.canvas.parent("canvasDiv");
  p.canvas.class("gameCanvas");
  p.canvas.id("gameBackgroundCanvas");
  p.canvas.style("z-index: 4;");

  p.frameRate(30);
  // p.background(0);

  // context is for HTML5 Canvas
  let c = document.querySelector("#gameBackgroundCanvas");
  p.context = c.getContext("2d");


}

p.draw = function () {

if(drawP5templateBackgroundBool){
drawP5Background();
  drawP5templateBackgroundBool = false;
}
else if (drawCollapseBackgroundBool){
  drawCollapseBackground();
  drawCollapseBackgroundBool = false;
}
else if (drawPlatformBackgroundBool){
  drawPlatformBackground();
  drawPlatformBackgroundBool = false;
}
else if (drawBreakoutBackgroundBool){
  drawBreakoutBackground();
  drawBreakoutBackgroundBool = false;
}
else if (drawWackymoleBackgroundBool){
  drawWackymoleBackground();
  drawWackymoleBackgroundBool = false;
}
else if (drawSchmupBackgroundBool){
  drawSchmupBackground();
  drawSchmupBackgroundBool = false;
}
else {
  //do nothing
}

}

function drawCollapseBackground() {
  if (collapseGame == true) {

    collapseGame = false;
  }
}

function drawPlatformBackground() {
  if (platformDropGame == true) {

    platformDropGame = false;

  }
}

function drawBreakoutBackground() {
  if (breakoutGame == true) {

    breakoutGame = false;

  }
}

function drawWackymoleBackground() {
  if (wackymoleGame == true) {

    wackymoleGame = false;

  }
}

function drawSchmupBackground() {
  if (schmupGame == true) {
      p.canvas(600,450);
      console.log("Schmup background");
      p.textSize (16);
      p.fill (0, 255, 0);
      p.text(`FINAL SCORE: ${schmupGame.score}`, canvasWidth/2, canvasHeight/2);
      schmupGame = false;
  }
}

}
