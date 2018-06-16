"use strict";


let snakeGameInstance = function(p) { // p could be any variable name

  let numSegments = 60; //Change this to make the snake longer 10 was the default
  let direction = 'right';

  let xStart = 0; //starting x coordinate for snake
  let yStart = 250; //starting y coordinate for snake
  let diff = 3;

  let xCor = [];
  let yCor = [];

  let scoreElem;

  let isOverUpArrow, isOverDownArrow, isOverRightArrow, isOverLeftArrow = false;

  p.canvas;
  p.context;

  p.debug = false; // enable debug to see collider outlines

  p.animationFrame;
  p.lastAnimationFrame;

  p.level = 0; // level is different levels of game
  p.stage = 'waiting';
  p.score = 0;

  // // variable for player
  // p.player;
  //
  // // arrays to store other sprites
  // p.pointSprites = [];
  // p.killSprites = [];
  // p.breakoutSprites = [];
  // p.collisionSprites = [];
  // p.colSprIndex;
  // p.displayCollision = false;


  p.restartBool = false;

  p.setup = function() {
    p.canvas = p.createCanvas(600, 450);
    p.canvas.parent("canvasDiv");
    p.canvas.class("gameCanvas");
    p.canvas.id("snakeGameCanvas");
    p.canvas.style("z-index: 5;");

    p.frameRate(30);
    p.background(0);
    p.imageMode(CENTER);

    let c = document.querySelector("#snakeGameCanvas");
    p.context = c.getContext("2d");

    p.stroke(255);
    p.strokeWeight(10);

    p.fruit = new p5Sprite(sprite32, 220, 120, 1);
    p.fruit.addCollider(32, 32);
    p.fruit.addAnimation("still", 0, 0);


    p.up = new p5Sprite(arrowUp, 500, 375, 1);
    p.up.addCollider(32, 32);
    p.up.addAnimation("still", 0, 0);

    p.right = new p5Sprite(arrowRight, 550, 400, 1);
    p.right.addCollider(32, 32);
    p.right.addAnimation("still", 0, 0);

    p.down = new p5Sprite(arrowDown, 500, 425, 1);
    p.down.addCollider(32, 32);
    p.down.addAnimation("still", 0, 0);

    p.left = new p5Sprite(arrowLeft, 450, 400, 1);
    p.left.addCollider(32, 32);
    p.left.addAnimation("still", 0, 0);

    updateFruitCoordinates();

    for (let i =0; i < numSegments; i++) {
      xCor.push(xStart + (i * diff));
      yCor.push(yStart);
    }

    p.canvas.mousePressed(localMousePressed);
    // p.canvas.localMouseOver(localMouseOver);
    p.canvas.mouseClicked(localMouseClicked);

    p.lastAnimationFrame = p.animationFrame;


    // // REFERENCE: parameters for sprite: new p5Sprite(imgArray, _x, _y, _scaleFactor = 1, _velocityX = 0, _velocityY = 0)
    // p.player = new p5Sprite(playerImgs, p.width / 2, p.height / 2, 1);

    // Angelabelle: for breakout, initialize sprite at bottom
    // p.player = new p5Sprite(sprite32x100_purple, p.width / 2, p.height - 50, 1);
    // console.log(p.player.imgArray[0].width) // SOOOO weird this is not registering actual width sooner...

    // // add collider if you want it to be different than the default image size
    // // good to make it a little smaller so people enjoy game play more ;-=)
    // // enable debug variable to see collider outline
    // p.player.addCollider(30, 20);
    // p.player.addAnimation("still", 0, 0);
    // p.player.addAnimation("animated", 0, 5);
    // // console.log(p.player);
    // // console.log(p.player)

    // p.collisionSprites = new p5Sprite(collisionAnimation_128, 100, 100);
    // p.collisionSprites.addAnimation("explode", 0, 10);

    // // these are from breakout game but might make them clouds or something for this game
    // for (let i = 0; i < 5; i++) {
    //   // initialize 5 sprites for top of breakout board. Their x positions acount for space inbetween (100 empty pixels / 6) and width of each of them. Their x y positions are centered bc image mode is center
    //   p.breakoutSprites.push(new p5Sprite(sprite32x100_purple, (i + 1) * 100 / 6 + (i * 100) + 50, 20, 1));
    //   p.breakoutSprites[i].addAnimation("still", 0, 0);
    //
    // }
    //
    // // initialize point sprites them with random x position and y position incrementing by 100px and velocityY set to 5 (so they fall)
    // for (let i = 0; i < 16; i++) {
    //   // These positions are re-initialized when restart() is called game ends. So any changes here have to be applied to restart function as well....
    //   p.pointSprites.push(new p5Sprite(spritePurple, random(p.width), -i * 100, 0.3, 0, 5));
    //   // p.pointSprites.push(new p5Sprite(sprite32, random(p.width), -random(800), 1, 0, 5));
    //   p.pointSprites[i].addAnimation("still", 0, 0);
    //   p.pointSprites[i].addAnimation("breathe", 0, 20);
    //   p.pointSprites[i].addCollider(20, 20); // little smaller than 32x32
    // }
    //
    // // initialize kill sprites them with random x position and y position incrementing by 300px and velocityY set to 5 (so they fall)
    // for (let i = 0; i < 5; i++) {
    //   // These positions are re-initialized when restart() is called game ends. So any changes here have to be applied to restart function as well....
    //   p.killSprites.push(new p5Sprite(sprite64, random(p.width), -i * 300, 3 / 4, 0, 5));
    //   // p.killSprites.push(new p5Sprite(sprite32, random(p.width), -random(800), 1, 0, 5));
    //   p.killSprites[i].addAnimation("still", 0, 0);
    //   p.killSprites[i].addAnimation("explode", 0, 0);
    //   p.killSprites[i].addCollider(20, 20); // little smaller than 32x32
    // }


  };

  p.draw = function() {


    // for debugging
    // mouseEvents();

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
  };


  // code for mousePressed on THIS canvas
  function localMousePressed() {


    return false;
  }

  // code for mouseClicked on THIS canvas
  // this fires only once after the mouse is pressed - not really seeing it behave differently rn tho....
  function localMouseClicked() {
    // if statements to check what qua¬drant it is pressed in

    // if (pressed up){
    //   direction =
    // }
    // switch (keyCode) {
    //     case 74:
    //       if (direction != 'right') {
    //         direction = 'left';
    //       }
    //       break;
    //     case 76:
    //       if (direction != 'left') {
    //         direction = 'right';
    //       }
    //       break;
    //     case 73:
    //       if (direction != 'down') {
    //         direction = 'up';
    //       }
    //       break;
    //     case 75:
    //       if (direction != 'up') {
    //         direction = 'down';
    //       }
    //       break;
    //   }
    //
    // return false;
    if (isOverUpArrow) {
      if (direction != 'down') {
        direction = 'up';
      }
    }
    if (isOverDownArrow) {
      if (direction != 'up') {
        direction = 'down';
      }
    }
    if (isOverLeftArrow) {
      if (direction != 'right') {
        direction = 'left';
      }
    }
    if (isOverRightArrow) {
      if (direction != 'left') {
        direction = 'right';
      }
    }
    return false;
  }

  function localMouseOver()
  {
    if (isOverUpArrow) {
      if (direction != 'down') {
        direction = 'up';
      }
    }
    if (isOverDownArrow) {
      if (direction != 'up') {
        direction = 'down';
      }
    }
    if (isOverLeftArrow) {
      if (direction != 'right') {
        direction = 'left';
      }
    }
    if (isOverRightArrow) {
      if (direction != 'left') {
        direction = 'right';
      }
    }
  }

  function intro() {
    // clear to have a clear background, if background is drawn on another canvas layer
    p.clear();
    // p.background(0);

  }

  // everything from draw() loop in example
  function play() {
    // clear to have a clear background, if background is drawn on another canvas layer
    p.clear();
    // p.background(0);
    p.stroke(0,255,0);


    //*
    // create animation frame counter approx 8fps (if browser is running at 30fps)
    p.animationFrame = Math.floor(frameCount / 3);


    for (let i =0; i < numSegments - 1; i++) {
      p.line(xCor[i], yCor[i], xCor[i + 1], yCor[i + 1]);
    }

    // checkIfOverUpArrow();
    // checkIfOverDownArrow();
    // checkIfOverLeftArrow();
    // checkIfOverRightArrow();
    clearPriorArrows();
    checkArrows();
    updateSnakeCoordinates();
    checkGameStatus();
    checkForFruit();

    if (isOverUpArrow) {
      if (direction != 'down') {
        direction = 'up';
      }
    }
    if (isOverDownArrow) {
      if (direction != 'up') {
        direction = 'down';
      }
    }
    if (isOverLeftArrow) {
      if (direction != 'right') {
        direction = 'left';
      }
    }
    if (isOverRightArrow) {
      if (direction != 'left') {
        direction = 'right';
      }
    }

    // // angelabelle: for breakout initialization
    // for (let i = 0; i < p.breakoutSprites.length; i++) {
    //   p.breakoutSprites[i].displayAnim("still");
    // }
    //
    // // nove and display point and kill sprites
    // for (let i = 0; i < p.pointSprites.length; i++) {
    //   p.pointSprites[i].moveSprite();
    //   p.pointSprites[i].displayAnim("breathe");
    //   // p.pointSprites[i].displayAnim("still");
    // }
    //
    // for (let i = 0; i < p.killSprites.length; i++) {
    //   p.killSprites[i].moveSprite();
    //   p.killSprites[i].displayAnim("still");
    // }
    //


    // p.player.drawConnectiveTissue(5);
    // // p.player.displayAnim("animated", true);
    //
    //
    // // check collision for pointSprites
    // // iterate through them backwards in case you want to splice them from array, that way it won't skip one in loop.
    // for (let i = p.pointSprites.length - 1; i >= 0; i--) {
    //   // seems redundant to check for visibility when the collidesWith function also checks for it, but for some reason there is a delay in setting the visibility to false in collision function, dunno! this fixes it so it only fires once instead of 5-15 times
    //   if (p.player.collidesWith(p.pointSprites[i]) && p.pointSprites[i].visible) {
    //     console.log(`points!`);
    //
    //
    //     // set flag to display collision (below) & create new collision sprite to display
    //
    //     p.collisionSprites.push(new p5Sprite(collisionAnimation_128, 100, 100));
    //     p.colSprIndex = p.collisionSprites.length - 1;
    //     p.collisionSprites[p.colSprIndex].x = p.pointSprites[i].x;
    //     p.collisionSprites[p.colSprIndex].y = p.pointSprites[i].y;
    //     p.collisionSprites[p.colSprIndex].addAnimation("explode", 0, 10);
    //     p.collisionSprites[p.colSprIndex].isPlaying = true;
    //     p.displayCollision = true;
    //
    //     p.pointSprites[i].hide();
    //     // p.pointSprites.splice(i, 1); // if splice from array will need to repopulate it in the restart function
    //     p.score += 10;
    //   }
    // }
    //
    //
    // if (p.displayCollision) {
    //   // if (p.displayCollision && p.collisionSprites[p.colSprIndex]) {
    //   for (let i = p.collisionSprites.length - 1; i >= 0; i--) {
    //     if (p.collisionSprites[i].isPlaying) {
    //       // create a new collision sprite and push it to the array
    //       p.collisionSprites[i].displayAnim("explode", false);
    //       console.log(`collision index ${i} is playing`)
    //     } else {
    //       p.collisionSprites.splice(i, 1)
    //     }
    //   }
    // }
    // // check collision for kill sprites
    // // iterate through them backwards in case want to splice them from array, that way it won't skip one in loop
    // for (let i = p.killSprites.length - 1; i >= 0; i--) {
    //
    //   if (p.player.collidesWith(p.killSprites[i]) == true) {
    //     console.log(`collision!`)
    //     p.killSprites[i].hide();
    //     p.stage = 'gameOver';
    //   }
    // }

    p.fruit.moveSprite();
    p.fruit.displayAnim("still");

    p.up.moveSprite();
    p.up.displayAnim("still");

    p.right.moveSprite();
    p.right.displayAnim("still");

    p.down.moveSprite();
    p.down.displayAnim("still");

    p.left.moveSprite();
    p.left.displayAnim("still");

    pointsRunningTotal.innerHTML = `${p.score}`;

    //*
    p.lastAnimationFrame = p.animationFrame;
  }

  function updateSnakeCoordinates() {

    for (let i =0; i < numSegments - 1; i++) {
      xCor[i] = xCor[i + 1];
      yCor[i] = yCor[i + 1];
    }
    switch (direction) {
      case 'right':
        xCor[numSegments - 1] = xCor[numSegments - 2] + diff;
        yCor[numSegments - 1] = yCor[numSegments - 2];
        break;
      case 'up':
        xCor[numSegments - 1] = xCor[numSegments - 2];
        yCor[numSegments - 1] = yCor[numSegments - 2] - diff;
        break;
      case 'left':
        xCor[numSegments - 1] = xCor[numSegments - 2] - diff;
        yCor[numSegments - 1] = yCor[numSegments - 2];
        break;
      case 'down':
        xCor[numSegments - 1] = xCor[numSegments - 2];
        yCor[numSegments - 1] = yCor[numSegments - 2] + diff;
        break;
    }
  }

  /*
   I always check the snake's head position xCor[xCor.length - 1] and
   yCor[yCor.length - 1] to see if it touches the game's boundaries
   or if the snake hits itself.
  */
  function checkGameStatus() {
    if (xCor[xCor.length - 1] > width ||
      xCor[xCor.length - 1] < 0 ||
      yCor[yCor.length - 1] > height ||
      yCor[yCor.length - 1] < 0 ||
      checkSnakeCollision()) {
      //noLoop();
      //var scoreVal = parseInt(scoreElem.html().substring(8));
      //scoreElem.html('Game ended! Your score was : ' + scoreVal);
      p.stage = 'gameOver';
    }
  }

  /*
   If the snake hits itself, that means the snake head's (x,y) coordinate
   has to be the same as one of its own segment's (x,y) coordinate.
  */
  function checkSnakeCollision() {
    var snakeHeadX = xCor[xCor.length - 1];
    var snakeHeadY = yCor[yCor.length - 1];
    for (let i =0; i < xCor.length - 1; i++) {
      if (xCor[i] === snakeHeadX && yCor[i] === snakeHeadY) {
        return true;
      }
    }
  }

  /*
   Whenever the snake consumes a fruit, I increment the number of segments,
   and just insert the tail segment again at the start of the array (basically
   I add the last segment again at the tail, thereby extending the tail)
  */
  function checkForFruit() {

    //this draws the fruit
    p.stroke(0,255,0);
    // p.rect(p.fruit.x, p.fruit.y, 20, 20);
    //console.log("" + xFruit + " " + yFruit);
    //if (dist(mouseX, mouseY, xUp, yUp) <= 20){
    //if (xCor[xCor.length - 1] === xFruit && yCor[yCor.length - 1] === yFruit) {
    if (dist(xCor[xCor.length - 1], yCor[yCor.length - 1], p.fruit.x, p.fruit.y) <= 20 ) {
      //var prevScore = parseInt(scoreElem.html().substring(8));
      // scoreElem.html('Score = ' + (prevScore + 1));
      p.score += 30;

      //increase the snake's length by 20 points
      for(let i = 0; i < 20; i++)
      {
        xCor.unshift(xCor[0]);
        yCor.unshift(yCor[0]);
      //numSegments++;
        numSegments = numSegments + 1;
      }
      //numSegments += 10;
      updateFruitCoordinates();
    }
  }

  function updateFruitCoordinates() {
    /*
      The complex math logic is because I wanted the point to lie
      in between 100 and width-100, and be rounded off to the nearest
      number divisible by 10, since I move the snake in multiples of 10.
    */

    p.fruit.x = floor(random(10, (p.width - 100) / 10)) * 10;
    p.fruit.y = floor(random(10, (p.height - 100) / 10)) * 10;
    //xFruit = floor(random(25, 625));
    //yFruit = floor(random(25, 425));
  }

  function gameOver() {
    // clear to have a clear background, if background is drawn on another canvas layer
    p.clear();
    // p.background(0);
    drawGameOverBGBool = true;

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

    if (p.restartBool == false) {
      // increment levels here
      // could increment gravity/velocity here to make game harder over multiple plays ;-)

      // increment level (6 levels)
      if (p.level <= 5) {
        p.level += 1;
      } else {
        p.level = 0;
      }
      diff = 1;
      diff *= p.level + 1;
      // reset variables
      // p.player.x = p.width / 2;
      // p.player.y = p.height / 2;
      // p.player.velocityX = 0;
      // p.player.velocityY = 0;

      //reset variables
      numSegments = 60; //Change this to make the snake longer 10 was the default
      direction = 'right';

      xStart = 0; //starting x coordinate for snake
      yStart = 250; //starting y coordinate for snake

      xCor = [];
      yCor = [];

      p.fruit.x = 0;
      p.fruit.y = 0;
      scoreElem = 0;

      p.stroke(255);
      p.strokeWeight(10);

      updateFruitCoordinates();

      for (let i =0; i < numSegments; i++) {
        xCor.push(xStart + (i * diff));
        yCor.push(yStart);
      }

      // reset point sprites
      // for (let i = 0; i < p.pointSprites.length; i++) {
      //   p.pointSprites[i].x = random(p.width);
      //   p.pointSprites[i].y = -i * 100;
      //   // sprites get faster with each play turn, up to 10
      //   if (p.pointSprites[i].velocityY <= 10) {
      //     p.pointSprites[i].velocityY += 1;
      //   } else {
      //     p.pointSprites.velocityY = 5;
      //   }
      //   p.pointSprites[i].show();
      // }

      // reset kill sprites
      //   for (let i = 0; i < p.killSprites.length; i++) {
      //     p.killSprites[i].x = random(p.width);
      //     p.killSprites[i].y = -i * 300;
      //     // sprites get faster with each play turn, up to 10
      //     if (p.killSprites[i].velocityY <= 10) {
      //       p.killSprites[i].velocityY += 1;
      //     } else {
      //       p.killSprites.velocityY = 5;
      //     }
      //     p.killSprites[i].show();
      //   }
    }
    p.restartBool = true;
  }

  function clearPriorArrows()
  {
    isOverUpArrow = false;
    isOverRightArrow = false;
    isOverDownArrow = false;
    isOverLeftArrow = false;
  }

  function checkArrows() {
    p.right.x = 550;
    p.right.y = 400;
    p.left.x = 450;
    p.left.y = 400;
    p.down.x = 500;
    p.down.y = 425;
    p.up.x = 500;
    p.up.y = 375;

    // if the distance is less than the circle's radius
    if (dist(mouseX, mouseY, p.up.x, p.up.y) <= 20){
      isOverUpArrow = true;
    } else if (dist(mouseX, mouseY, p.down.x, p.down.y) <= 20){
      isOverDownArrow = true;
    } else if(dist(mouseX, mouseY, p.left.x, p.left.y) <= 20){
      isOverLeftArrow = true;
    } else if(dist(mouseX, mouseY, p.right.x, p.right.y) <= 20){
      isOverRightArrow = true;
    }

    // p.ellipseMode(CENTER);
    // p.stroke(0);
    // p.strokeWeight(5);
    //
    // p.ellipse(p.right.x, p.right.y, 40, 40);
    // p.ellipse(p.left.x, p.left.y, 40, 40);
    // p.ellipse(p.up.x, p.up.y, 40, 40);
    // p.ellipse(p.down.x, p.down.y, 40, 40);
  }

  function checkIfOverUpArrow() {

    // get distance between mouse and circle
    var distance = dist(mouseX, mouseY, 500, 400);

    // if the distance is less than the circle's radius
    if (distance < 20) {
      isOverUpArrow = true;
    } else {
      isOverUpArrow = false;
    }

    // draw a circle
    p.ellipseMode(CENTER);
    p.stroke(0);
    p.strokeWeight(5);
    if (isOverUpArrow == true) {
      p.fill(100);
      p.cursor(HAND);
    } else {
      p.fill(200);
      p.cursor(ARROW);
    }
    p.ellipse(500, 375, 40, 40);
  }



  function checkIfOverDownArrow() {

    // get distance between mouse and circle
    var distance = dist(mouseX, mouseY, 500, 425);

    // if the distance is less than the circle's radius
    if (distance < 20) {
      isOverDownArrow = true;
    } else {
      isOverDownArrow = false;
    }

    // draw a circle
    p.ellipseMode(CENTER);
    p.stroke(0);
    p.strokeWeight(5);
    if (isOverDownArrow == true) {
      p.fill(100);
      p.cursor(HAND);
    } else {
      p.fill(200);
      p.cursor(ARROW);
    }
    p.ellipse(500, 425, 40, 40);
  }



  function checkIfOverLeftArrow() {

    // get distance between mouse and circle
    var distance = dist(mouseX, mouseY, 450, 400);

    // if the distance is less than the circle's radius
    if (distance < 20) {
      isOverLeftArrow = true;
    } else {
      isOverLeftArrow = false;
    }

    // draw a circle
    p.ellipseMode(CENTER);
    p.stroke(0);
    p.strokeWeight(5);
    if (isOverLeftArrow == true) {
      p.fill(100);
      p.cursor(HAND);
    } else {
      p.fill(200);
      p.cursor(ARROW);
    }
    p.ellipse(450, 400, 40, 40);
  }



  function checkIfOverRightArrow() {

    // get distance between mouse and circle
    var distance = dist(mouseX, mouseY, 550, 400);

    // if the distance is less than the circle's radius
    if (distance < 20) {
      isOverRightArrow = true;
    } else {
      isOverRightArrow = false;
    }

    // draw a circle
    p.ellipseMode(CENTER);
    p.stroke(0);
    p.strokeWeight(5);
    if (isOverRightArrow == true) {
      p.fill(100);
      p.cursor(HAND);
    } else {
      p.fill(200);
      p.cursor(ARROW);
    }
    p.ellipse(550, 400, 40, 40);
  }



  //create sprite class
  //create sprite class
  class p5Sprite {
    constructor(_imgArray, _x, _y, _scaleFactor = 1, _velocityX = 0, _velocityY = 0) {
      this.imgArray = _imgArray;
      this.x = _x;
      this.y = _y;
      this.scaleFactor = _scaleFactor;
      this.velocityX = _velocityX;
      this.velocityY = _velocityY;

      this.animations = [];
      this.rotation = 0;
      this.visible = true;
      this.isPlaying = true;
      // width and height not loading properly bc for some reason img not fully loaded (even tho it is visible in array :?)
      this.width = this.imgArray[0].width * this.scaleFactor;
      this.height = this.imgArray[0].height * this.scaleFactor;
    }

    addCollider(_colliderWidth, _colliderHeight) {
      this.colliderWidth = _colliderWidth;
      this.colliderHeight = _colliderHeight
    }

    // if no frame start and frame sound added, default is to display a still of first frame
    addAnimation(_animation, _frameStart = 0, _frameEnd = 0, _sound, _animWidth, _animHeight, _frameCount = 0) {
      this.animations.push({
        name: _animation,
        frameStart: _frameStart,
        frameEnd: _frameEnd,
        sound: _sound,
        animWidth: _animWidth,
        animHeight: _animHeight,
        frameCount: _frameCount
      })
    }


    displayAnim(_animation, _looping = true, _delay = 1) {

      // bug (could be better if only declared once in setup but imgArray[0].width doesn't load until frame 5)
      // declaring this here bc so weird the image width won't load in setup, delays a few frames
      this.width = this.imgArray[0].width * this.scaleFactor;
      this.height = this.imgArray[0].height * this.scaleFactor;

      let animation;
      let animationIndex;
      let spriteFrame;
      let frameIndex;


      // find the animation in animation array
      for (let i = 0; i < this.animations.length; i++) {
        if (_animation == this.animations[i].name) {
          animation = this.animations[i];
        }
      }


      // bug doesn't start from first frame, trying to use timerStart...
      if (animation && this.visible && this.isPlaying) {
        // // try step thru frame index with animation frame....

        // if (!frameIndex) {
        //   frameIndex = 0;
        // }

        // if (p.animationFrame != p.lastAnimationFrame) {
        //   // console.log('animation frame change')
        //   // step the frame index here ( would have to account for delay)
        //   if (this.isPlaying && frameIndex <= animation.frameEnd) {
        //     frameIndex++
        //   } else {
        //     frameIndex = animation.frameStart;
        //     this.isPlaying = true;
        //   }
        // }

        // console.log(animation.frameCount)

        if (p.animationFrame != p.lastAnimationFrame) {

          animation.frameCount = (animation.frameCount + 1) % (animation.frameEnd - animation.frameStart + 1);

        }
        if (!_looping && animation.frameCount == animation.frameEnd) {
          // destroy -- remove sprite from array
          this.isPlaying = false;

        } else {

          // animation.frameCount = Math.floor(p.animationFrame / _delay) % (animation.frameEnd - animation.frameStart + 1) + animation.frameStart;

          spriteFrame = this.imgArray[animation.frameCount];

          // // no rotation
          p.image(spriteFrame, this.x, this.y, this.imgArray[0].width * this.scaleFactor, this.imgArray[0].height * this.scaleFactor);

          if (p.debug && this.colliderWidth) {
            p.rectMode(CENTER);
            p.noFill();
            p.stroke(255);
            p.strokeWeight(3);
            p.rect(this.x, this.y, this.colliderWidth / this.scaleFactor, this.colliderHeight / this.scaleFactor);

            // to rotate (buggy)
            // p.push();
            //
            // p.translate(this.x, this.y);
            //
            // p.rotate(this.rotation);
            //
            // p.image(spriteFrame, 0, 0, this.imgArray[0].width * this.scaleFactor, this.imgArray[0].height * this.scaleFactor);
            //
            // p.pop();
          }
        }
      }
    }

    hide() {
      this.visible = false;
    }

    show() {
      this.visible = true;
    }

    // smaller the ease the slower it follows you, default .1
    followMouse(_ease = .1) {
      this.x += (mouseX - this.x) * _ease;
      this.y += (mouseY - this.y) * _ease;
    }

    followMouseX(_ease = .1) {
      this.x += (mouseX - this.x) * _ease;
    }

    followMouseY(_ease = .1) {
      this.y += (mouseY - this.y) * _ease;
    }

    attractionPoint(_pointX, _pointY, _magnitude = 8) {
      let angle = Math.atan2(_pointY - this.y, _pointX - this.x);
      this.velocityX += cos(angle) * _magnitude;
      this.velocityY += sin(angle) * _magnitude;

      // Rotate us to face the player
      this.rotation = angle;

      // // Calculate direction towards player
      //   let toPointX = _pointX - this.x;
      //   let toPointY = _pointY - this.y;
      //
      //   // Normalize
      //   let toPointLength = Math.sqrt(toPointX * toPointX + toPointY * toPointY);
      //   toPointX = toPointX / toPointLength;
      //   toPointY = toPointY / toPointLength;
      //
      //   // // Move towards the player
      //   // this.x += toPointX * this.speed * 8;
      //   // this.y += toPointY * this.speed * 8;
      //   this.velocityX *= toPointX * 8;
      //   this.velocityY *= toPointY * 8;
      //
      //   // Rotate us to face the player
      //   this.rotation = Math.atan2(toPointY, toPointX);


      // attractionPoint(_otherSprite) {
      //   if (_otherSprite) {
      //
      //   } else {
      //     // Calculate direction towards player
      //     let toMouseX = mouseX - this.x;
      //     let toMouseY = mouseY - this.y;
      //
      //     // Normalize
      //     let toMouseLength = Math.sqrt(toMouseX * toMouseX + toMouseY * toMouseY);
      //     toMouseX = toMouseX / toMouseLength;
      //     toMouseY = toMouseY / toMouseLength;
      //
      //     // Move towards the player
      //     this.x += toMouseX * this.speed * 8;
      //     this.y += toMouseY * this.speed * 8;
      //
      //     // Rotate us to face the player
      //     this.rotation = Math.atan2(toMouseY, toMouseX);
      //   }
    };

    moveSprite() {
      this.x += this.velocityX;
      this.y += this.velocityY;
    }

    // this for bouncing
    keepInFrameBouncing() {
      if (this.x <= 0 + this.width / 2 || this.x >= p.width - this.width / 2) {
        this.velocityX *= -1;
      }
      if (this.y <= 0 + this.height / 2 || this.y >= p.height - this.height / 2) {
        this.velocityY *= -1;
      }
    }

    keepInFrame() {
      if (this.x < 0 + this.width / 2) {
        this.x = 0 + this.width / 2;
      } else if (this.x > p.width - this.width / 2) {
        this.x = p.width - this.width / 2;
      }
      if (this.y < 0 + this.height / 2) {
        this.y = 0 + this.height / 2;
      } else if (this.y >= p.height - this.height / 2) {
        this.y = p.height - this.height / 2;
      }
    }

    keepInFrameExceptBottom() {
      if (this.x <= 0 + this.width / 2 || this.x >= p.width - this.width / 2) {
        this.velocityX *= -1;
      }
      if (this.y <= 0 + this.height / 2) {
        this.velocityY *= -1;
      }
    }

    collidesWith(_otherSprite) {
      if (this.visible && _otherSprite.visible) {
        if (this.colliderWidth && _otherSprite.colliderWidth && Math.abs(this.x - _otherSprite.x) < (this.colliderWidth + _otherSprite.colliderWidth) / 2 && Math.abs(this.y - _otherSprite.y) < (this.colliderHeight + _otherSprite.colliderHeight) / 2) {

          return true;

        } else if (this.colliderWidth && Math.abs(this.x - _otherSprite.x) < (this.colliderWidth + _otherSprite.width) / 2 && Math.abs(this.y - _otherSprite.y) < (this.colliderHeight + _otherSprite.height) / 2) {

          return true;

        } else if (_otherSprite.colliderWidth && Math.abs(this.x - _otherSprite.x) < (this.width + _otherSprite.colliderWidth) / 2 && Math.abs(this.y - _otherSprite.y) < (this.height + _otherSprite.colliderHeight) / 2) {

          return true;

        } else if (Math.abs(this.x - _otherSprite.x) < (this.width + _otherSprite.width) / 2 && Math.abs(this.y - _otherSprite.y) < (this.height + _otherSprite.height) / 2) {
          return true;

        } else {

          return false;
        }
      } else {

        return false;
      }

    }

    // if no parameter given, default number of lines is 3, default color is bright green
    drawConnectiveTissue(_number = 5, _color = 'rgb(0,255,0)') {

      p.stroke(_color);
      p.strokeWeight(2);
      p.line(mouseX, mouseY, p.player.x, p.player.y);
      // console.log(p.player.width);
      for (let i = 3; i < _number; i++) {
        p.line(mouseX, mouseY, p.player.x + p.player.width / i, p.player.y + p.player.height / i);
        p.line(mouseX, mouseY, p.player.x - p.player.width / i, p.player.y - p.player.height / i);
        // p.line(mouseX, mouseY, p.player.x + 10 * i, p.player.y + 10 * i);
        // p.line(mouseX, mouseY, p.player.x - 10 * i, p.player.y - 10 * i);
      }
      p.strokeWeight(0);
    }
  }
};
