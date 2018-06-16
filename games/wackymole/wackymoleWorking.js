let wackymoleGameInstance = function(p) {

  p.canvas;
  p.context;
  p.level = 0; // level is different levels of game
  p.stage = 'waiting';
  p.score = 0;
  p.framerate = 1;

  let moleX;
  let moleY;

  p.setup = function() {

    p.canvas = p.createCanvas(600, 450);
    p.canvas.parent("canvasDiv");
    p.canvas.class("gameCanvas");
    p.canvas.id("wackymoleGameCanvas");
    p.canvas.style("z-index: 5;");
    p.canvas.mouseClicked(localMouseClicked);
    p.frameRate(p.framerate);
    p.background(0);
    let c = document.querySelector("#wackymoleGameCanvas");
    p.context = c.getContext("2d");
    p.lastAnimationFrame = p.animationFrame;

    // refresh();
  };


  p.draw = function() {
        switch (p.stage) {
          case 'waiting':
            // do nothing
            break;
          case 'intro':
            intro();
            // restartBool flag makes it so it only restarts once, this initializes the boolean so it will restart again
            p.restartBool = false;
            break;
          case 'play':
            play();
            break;
          case 'gameOver':
            gameOver();
            break;
          case 'youWon':
            youWon();
            break;
          default:
            break;
        }

      // if (Date.now() % 1003 >= 1000) {
      //   runSketch();
      // }

  };


  function localMouseClicked() {

    let distance = int(dist(mouseX, mouseY, moleX, moleY));

    if (distance <= 65) {
      console.log("mole clicked")
      p.score += 10;

    }
    return false;
  }

  function intro() {
    // clear to have a clear background, if background is drawn on another canvas layer
    p.clear();
    // p.background(0);

  }



  function play() {

    let possibleX = [220, 320, 420];
    let possibleY = [120, 220, 320];

    moleX = random(possibleX);
    moleY = random(possibleY);
    // console.log(possibleX);
    //  console.log(possibleY);
    // console.log("-------")


    p.clear();
    // p.context.font = "30px Gamegirl";
    // p.context.fillStyle = "#00ff00";
    // p.context.fillText("Whack - a - mole!", 30, 50);

    // Return Home Button


    // Create the "holes"

    p.fill(0, 255, 0); // Sets color of "holes"

    /* Holes */
    p.rect(300, 100, 39, 39);
    p.rect(200, 100, 39, 39);
    p.rect(400, 100, 39, 39);

    p.rect(300, 200, 39, 39);
    p.rect(200, 200, 39, 39); // Second 3
    p.rect(400, 200, 39, 39);

    p.rect(300, 300, 39, 39);
    p.rect(200, 300, 39, 39); // Third 3
    p.rect(400, 300, 39, 39);

    // Creates the Mole
    p.fill(203, 203, 65);
    p.ellipse(moleX, moleY, 30, 30);

      displayScore();
  }



  function gameOver() {
    // clear to have a clear background, if background is drawn on another canvas layer
    p.clear();
    drawGameOverBGBool = true;
    // p.background(0);


    // p.context.font = "60px Verdana";
    // p.context.fillStyle = "#ACD02D";
    // let str = "GAME OVER";
    // let txt = p.context.measureText(str);
    // let left = (p.canvas.width - txt.width) / 2;
    // let top = p.canvas.height / 2;
    // p.context.fillText("GAME OVER", left, top);

    restart();
  }

  function youWon() {
    // p.context.font = "60px Verdana";
    // p.context.fillStyle = "#ACD02D";
    // let str = "YOU WON";
    // let txt = p.context.measureText(str);
    // let left = (p.canvas.width - txt.width) / 2;
    // let top = p.canvas.height / 2;
    // p.context.fillText("YOU WON", left, top);


    restart();
  }

  function restart() {
    // note: changes made here have to also match the initial positions when sprites are created in setup.
console.log("restart");
    if (p.restartBool == false) {
      console.log(p.framerate);
      // increment levels here
      // could increment gravity/velocity here to make game harder over multiple plays ;-)

      // *** set how many levels you want
      if (p.level <= 5) {
        p.level += 1;
        p.framerate += 20;
      } else {
        p.level = 0;
        p.framerate = 1;
      }

    }
    p.restartBool = true;
  }


  function displayScore() {
    // p.rectMode(CENTER);
    // p.fill(0);
    // p.stroke(0, 255, 0);
    // p.strokeWeight(2);
    // p.rect(p.width - 30, 30, 60, 60);
    // p.fill(0, 255, 0);
    // p.textFont()
    // p.textSize()
    //display score
    p.context.font = "16px Gamegirl";
    p.context.fillStyle = "#161616";
    let str = "Score";
    let txt = p.context.measureText(str);
    let left = p.canvas.width - 18 - txt.width;
    p.context.fillText("Score", left, 33);

    p.context.font = "30px Gamegirl";
    p.context.fillStyle = "#161616";
    str = String(p.score);
    txt = p.context.measureText(str);
    left = p.canvas.width - 18 - txt.width;
    p.context.fillText(p.score, left, 68);

    p.context.font = "16px Gamegirl";
    p.context.fillStyle = "#00ff00";
    str = "Score";
    txt = p.context.measureText(str);
    left = p.canvas.width - 15 - txt.width;
    p.context.fillText("Score", left, 30);

    p.context.font = "30px Gamegirl";
    p.context.fillStyle = "#00ff00";
    str = String(p.score);
    txt = p.context.measureText(str);
    left = p.canvas.width - 15 - txt.width;
    p.context.fillText(p.score, left, 65);
  }



}
