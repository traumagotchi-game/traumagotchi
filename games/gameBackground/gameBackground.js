"use strict";

// angelabelle: I declared variables for the snake and pluck BG bools but didn't integrate into the rest of code
let drawP5templateBGBool = false;
let drawSnakeBGBool = false;
let drawPluckBGBool = false;
let drawCollapseBGBool = false;
let drawPlatformBGBool = false;
let drawBreakoutBGBool = false;
let drawWackymoleBGBool = false;
let drawSchmupBGBool = false;
let drawIntroBGBool = false;
let drawGameOverBGBool = false;

let gameBackgroundInstance = function(p) {

  p.setup = function() {

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

  p.draw = function() {


    if (drawP5templateBGBool) {
      // if (drawP5templateBGBool && schmupGame.stage == 'play') {
      drawP5templateBG();
      drawP5templateBGBool = false;
    } else if (drawSnakeBGBool) {
      drawSnakeBG();
      drawSnakeBGBool = false;
    } else if (drawPluckBGBool) {
      drawPluckBG();
      drawPluckBGBool = false;
    } else if (drawCollapseBGBool) {
      drawCollapseBG();
      drawCollapseBGBool = false;
    } else if (drawPlatformBGBool) {
      drawPlatformBG();
      drawPlatformBGBool = false;
    } else if (drawBreakoutBGBool) {
      drawBreakoutBG();
      drawBreakoutBGBool = false;
    } else if (drawWackymoleBGBool) {
      drawWackymoleBG();
      drawWackymoleBGBool = false;
    } else if (drawSchmupBGBool) {
      drawSchmupBG();
      drawSchmupBGBool = false;
    } else if (drawIntroBGBool) {
      // } else if (drawIntroBGBool && schmupGame.stage == 'intro') {
      drawIntroBG();
      drawIntroBGBool = false;
    } else if (drawGameOverBGBool) {
      // } else if (drawGameOverBGBool && schmupGame.stage == 'gameOver') {
      drawGameOverBG();
      drawGameOverBGBool = false;
    } else {
      //do nothing
    }

  }

  function drawP5templateBG() {
    p.background(0);
  }

  function drawSnakeBG() {
    // p.image(gameBG_4, 0, 0)

    p.background(0);
  }

  function drawPluckBG() {
    // p.image(gameBG_texture, 0, 0)

    // p.image(gameBG_1, 0, 0)
    p.background(0);
  }

  function drawCollapseBG() {
      // p.image(gameBG_4, 0, 0)
    p.background(0);
  }

  function drawPlatformBG() {
    p.background(0);
  }

  function drawBreakoutBG() {
      // p.image(gameBG_2, 0, 0)
    p.background(0);
  }

  function drawWackymoleBG() {
      // p.image(gameBG_1, 0, 0)
    p.background(0);
  }

  function drawIntroBG() {
      // p.image(gameBG_texture, 0, 0)
    p.background(0);
    // p.background(200);
  }

  function drawSchmupBG() {
      // p.image(gameBG_0, 0, 0)
    p.background(0);

  }

  function drawGameOverBG() {
    p.background(0);
    // p.background(255, 0, 0);

    // p.canvasWidth = 600;
    // p.canvasHeight = 450
    // // gameover state
    // p.textSize (40);
    // p.fill (0, 255, 0);
    // p.textFont ("Gamegirl");

    // if (gameCounter < 3) {
    //   timer.innerHTML = `ready for game ${gameCounter}?`
    // } else {
    //   timer.innerHTML = `end round`;
    // }

    if (p5templateGame.stage == 'gameOver') {
      displayGameOverText(p5p5templateGame);
      // p.text(`SCORE: ${p5templateGame.score}`, p.canvasWidth / 5, p.canvasHeight / 2);
    } else if (snakeGame.stage == 'gameOver') {
      displayGameOverText(snakeGame);
      // p.text(`SCORE: ${snakeGame.score}`, p.canvasWidth / 5, p.canvasHeight / 2)
    } else if (pluckGame.stage == 'gameOver') {
      displayGameOverText(pluckGame);
      // p.text(`SCORE: ${pluckGame.score}`, p.canvasWidth / 5, p.canvasHeight / 2)
    } else if (collapseGame.stage == 'gameOver') {
      displayGameOverText(collapseGame);
      // p.text(`SCORE: ${collapseGame.score}`, p.canvasWidth / 5, p.canvasHeight / 2)
    } else if (platformDropGame.stage == 'gameOver' || platformDropGame.stage == 'youWon') {
      displayGameOverText(platformDropGame);
      // p.text(`SCORE: ${platformDropGame.score}`, p.canvasWidth / 5, p.canvasHeight / 2)
    } else if (breakoutGame.stage == 'gameOver') {
      displayGameOverText(breakoutGame);
      // p.text(`SCORE: ${breakoutGame.score}`, p.canvasWidth / 5, p.canvasHeight / 2)
    } else if (wackymoleGame.stage == 'gameOver') {
      displayGameOverText(wackymoleGame);
      // p.text(`SCORE: ${wackymoleGame.score}`, p.canvasWidth / 5, p.canvasHeight / 2)
    } else if (schmupGame.stage == 'gameOver') {

      displayGameOverText(schmupGame);
      // p.text(`SCORE: ${schmupGame.score}`, p.canvasWidth / 5, p.canvasHeight / 2)

      // const FONT_NAME = 'Press Play 2P';
      // function renderText() {
      //     p.font = `48px "${FONT_NAME}"`;
      //     p.text(`SCORE: ${schmupGame.score}`, p.canvasWidth / 5, p.canvasHeight / 2);
      // }
      //
      // document.fonts.load('10pt "Press Play 2P"').then(renderText);


    }
  }
}
