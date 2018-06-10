let wackymoleGameInstance = function(p) {

  p.canvas;
  p.context;

  let wins = 0;
  let moleX;
  let moleY;

  p.setup = function() {

    p.canvas = p.createCanvas(600, 450);
    p.canvas.parent("canvasDiv");
    p.canvas.class("gameCanvas");
    p.canvas.id("wackymoleGameCanvas");
    p.canvas.style("z-index: 5;");
    p.canvas.mouseClicked(localMouseClicked);
    p.frameRate(30);
    p.background(0);
    let c = document.querySelector("#wackymoleGameCanvas");
    p.context = c.getContext("2d");
    p.lastAnimationFrame = p.animationFrame;

    // refresh();
  };

  // Sleep Function
  //  change this to use animation frame not getTime()

  // function sleep(milliseconds) {
  //   let start = new Date().getTime();
  //   for (let i = 0; i < 170; i++) {
  //     if ((new Date().getTime() - start) > milliseconds) {
  //       break;
  //     }
  //   }
  // };

  p.draw = function() {
      if (frameCount % 30 == 0) {
        runSketch();
      }
      // if (Date.now() % 1003 >= 1000) {
      //   runSketch();
      // }

  };

  function runSketch() {
    /*
        FIRST ROW
        1 = (115,115)
        2 = (215,115)
        3 = (315,115)

        SECOND ROW
        4 = (115, 215)
        5 = (215,215)
        6 = (315,215)
        THIRD ROW
        7 = (115, 315)
        8 = (215,315)
        9 = (315,315)
    */




    let possibleX = [115, 215, 315];
    let possibleY = [115, 215, 315];

    moleX = random(possibleX);
    moleY = random(possibleY);
    // console.log(possibleX);
    //  console.log(possibleY);
    // console.log("-------")


    p.background(255);
    // p.context.font = "30px Gamegirl";
    // p.context.fillStyle = "#00ff00";
    // p.context.fillText("Whack - a - mole!", 30, 50);

    // Return Home Button


    // Create the "holes"

    p.fill(0, 0, 0); // Sets color of "holes"

    /* Holes */
    p.rect(200, 100, 29, 29);
    p.rect(100, 100, 29, 29);
    p.rect(300, 100, 29, 29);

    p.rect(200, 200, 29, 29);
    p.rect(100, 200, 29, 29); // Second 3
    p.rect(300, 200, 29, 29);

    p.rect(200, 300, 29, 29);
    p.rect(100, 300, 29, 29); // Third 3
    p.rect(300, 300, 29, 29);

    // textSize(20);
    // text("Wins:", 100,400)
    // text(wins, 150,400);

    p.context.font = "30px Gamegirl";
    p.context.fillStyle = "#00ff00";
    p.context.fillText("Wins:" + wins, 30, 50);

    // Creates the Mole
    p.fill(203, 203, 65);
    p.ellipse(moleX, moleY, 20, 20);
  }

  // function refresh() {
  //   // const game = p;
  //   window.requestAnimationFrame(function() {
  //     refresh()
  //   });
  //
  //   const now = Date.now();
  //   if (p.lastTime == null) p.lastTime = now;
  //   const dt = (now - p.lastTime) / 1000.0
  //   updateLoop();
  //   // update(dt)
  //   // render()
  //   p.lastTime = now;
  // }
  //
  // function updateLoop() {
  //   // this is the new (frameDependant) draw loop
  //   // this does the same thing as sleep function, without putting everything else in the game to sleep
  //   if (frameCount % 30 == 0) {
  //     runSketch();
  //   }
  // }

  // function runSketch() {
  //   /*
  //       FIRST ROW
  //       1 = (115,115)
  //       2 = (215,115)
  //       3 = (315,115)
  //
  //       SECOND ROW
  //       4 = (115, 215)
  //       5 = (215,215)
  //       6 = (315,215)
  //       THIRD ROW
  //       7 = (115, 315)
  //       8 = (215,315)
  //       9 = (315,315)
  //   */
  //
  //
  //
  //
  //   let possibleX = [115, 215, 315];
  //   let possibleY = [115, 215, 315];
  //
  //   moleX = random(possibleX);
  //   moleY = random(possibleY);
  //   // console.log(possibleX);
  //   //  console.log(possibleY);
  //   // console.log("-------")
  //
  //
  //   p.background(255);
  //   // p.context.font = "30px Gamegirl";
  //   // p.context.fillStyle = "#00ff00";
  //   // p.context.fillText("Whack - a - mole!", 30, 50);
  //
  //   // Return Home Button
  //
  //
  //   // Create the "holes"
  //
  //   p.fill(0, 0, 0); // Sets color of "holes"
  //
  //   /* Holes */
  //   p.rect(200, 100, 29, 29);
  //   p.rect(100, 100, 29, 29);
  //   p.rect(300, 100, 29, 29);
  //
  //   p.rect(200, 200, 29, 29);
  //   p.rect(100, 200, 29, 29); // Second 3
  //   p.rect(300, 200, 29, 29);
  //
  //   p.rect(200, 300, 29, 29);
  //   p.rect(100, 300, 29, 29); // Third 3
  //   p.rect(300, 300, 29, 29);
  //
  //   // textSize(20);
  //   // text("Wins:", 100,400)
  //   // text(wins, 150,400);
  //
  //   p.context.font = "30px Gamegirl";
  //   p.context.fillStyle = "#00ff00";
  //   p.context.fillText("Wins:" + wins, 30, 50);
  //
  //   // Creates the Mole
  //   p.fill(203, 203, 65);
  //   p.ellipse(moleX, moleY, 20, 20);
  // }

  function localMouseClicked() {

    let distance = int(dist(mouseX, mouseY, moleX, moleY));

    if (distance <= 50) {
      console.log("mole clicked")
      wins = wins + 1;
      console.log(wins)

    }
    return false;
  }

}
