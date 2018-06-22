let wackymoleGameInstance = function(p) {

  p.canvas;
  p.context;
  p.level = 0; // level is different levels of game
  p.stage = 'waiting';
  p.score = 0;
  p.framerate = 1.5;

  let moleX = this.x;
  let moleY = this.y;

  let possibleX = [210, 310, 410];
  let possibleY = [120, 220, 320];


  p.setup = function() {
    p.canvas = p.createCanvas(600, 450);
    p.canvas.parent("canvasDiv");
    p.canvas.class("gameCanvas");
    p.canvas.id("wackymoleGameCanvas");
    p.canvas.style("z-index: 5;");
    p.canvas.mouseClicked(localMouseClicked);
    p.background(0);
    let c = document.querySelector("#wackymoleGameCanvas");
    p.context = c.getContext("2d");
    p.lastAnimationFrame = p.animationFrame;
    p.mole = new p5Sprite(sprite32, 220, 120, 1);
    p.mole.addCollider(32, 32);
    p.mole.addAnimation("still", 0, 0);
    p.debug = false;

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

    let distance = int(dist(mouseX, mouseY, p.mole.x, p.mole.y));

    if (distance <= 32) {
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

    p.frameRate(p.framerate);
    // console.log(possibleX);
    //  console.log(possibleY);
    // console.log("-------")


    p.clear();
    // p.context.font = "30px Gamegirl";
    // p.context.fillStyle = "#00ff00";
    // p.context.fillText("Whack - a - mole!", 30, 50);

    // Return Home Button


    // Create the "holes"


    p.animationFrame = Math.floor(frameCount / 3.75);
    p.fill(0, 255, 0); // Sets color of "holes"

    /* Holes */
    p.rect(290, 100, 39, 39);
    p.rect(190, 100, 39, 39);
    p.rect(390, 100, 39, 39);

    p.rect(290, 200, 39, 39);
    p.rect(190, 200, 39, 39); // Second 3
    p.rect(390, 200, 39, 39);

    p.rect(290, 300, 39, 39);
    p.rect(190, 300, 39, 39); // Third 3
    p.rect(390, 300, 39, 39);

    // Creates the Mole
    // p.fill(203, 203, 65);
    // p.ellipse(moleX, moleY, 30, 30);
    p.mole.moveSprite();
    p.mole.displayAnim("still");
    pointsRunningTotal.innerHTML = `${p.score}`;
    p.lastAnimationFrame = p.animationFrame;
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
    if (p.restartBool == false) {

      if (p.level <= 4) {
        p.level += 1;
        p.framerate += .2;
      } else {
        p.level = 0;
        p.framerate = 1.5;
      }

    }
    p.restartBool = true;
  }

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
      // width and height not loading properly bc for some reason img not fully loaded (even tho it is visible in array :?)
      this.width = this.imgArray[0].width * this.scaleFactor;
      this.height = this.imgArray[0].height * this.scaleFactor;
    }

    addCollider(_colliderWidth, _colliderHeight) {
      this.colliderWidth = _colliderWidth;
      this.colliderHeight = _colliderHeight
    }

    addAnimation(_animation, _frameStart = 0, _frameEnd = 0, _sound, _animWidth, _animHeight, playing = false) {
      this.animations.push({
        name: _animation,
        frameStart: _frameStart,
        frameEnd: _frameEnd,
        sound: _sound,
        animWidth: _animWidth,
        animHeight: _animWidth
      })
    }

    displayAnim(_animation, _looping = true, _delay = 1, _timerStart = 0) {

      // bug (could be better if only declared once in setup but imgArray[0].width doesn't load until frame 5)
      // declaring this here bc so weird the image width won't load in setup, delays a few frames
      this.width = this.imgArray[0].width * this.scaleFactor;
      this.height = this.imgArray[0].height * this.scaleFactor;


      p.imageMode(CENTER);

      let animation;
      let spriteFrame;
      let frameIndex;



      // console.log(`${p.animationFrame} animation frame`)
      // console.log(`${p.lastAnimationFrame} last animation frame`)
      if (p.animationFrame != p.lastAnimationFrame) {
        // console.log('animation frame change')
        // step the frame index here ( would have to account for delay)
      }

      // find the animation in animation array
      for (let i = 0; i < this.animations.length; i++) {
        if (_animation == this.animations[i].name) {
          animation = this.animations[i];
        }
      }

      // bug doesn't start from first frame, trying to use timerStart...
      if (animation && this.visible) {

        // try stepping the frame index in the animation fame != last above.... use a bool flag to set start to 0 ?
        frameIndex = Math.floor((p.animationFrame - _timerStart) / _delay) % (animation.frameEnd - animation.frameStart + 1) + animation.frameStart;

        spriteFrame = this.imgArray[frameIndex];

        // // no rotation
        // if (_animation != 'still') {
        //   // console.log(frameIndex)
        // }
        p.image(spriteFrame, this.x, this.y, this.imgArray[0].width * this.scaleFactor, this.imgArray[0].height * this.scaleFactor);
        if (p.debug && this.colliderWidth) {
          p.rectMode(CENTER);
          p.noFill();
          p.stroke(255);
          p.strokeWeight(3);
          p.rect(this.x, this.y, this.colliderWidth / this.scaleFactor, this.colliderHeight / this.scaleFactor);

          // to rotate (buggy)
          // p.push();
          // p.imageMode(CENTER);
          //
          // p.translate(this.x, this.y);
          //
          // p.rotate(this.rotation);
          //
          // p.image(spriteFrame, 0, 0, this.imgArray[0].width * this.scaleFactor, this.imgArray[0].height * this.scaleFactor);
          //
          // p.pop();
        }

        // bug this isn't working
        // if (spriteFrame && _looping) {
        //   p.image(spriteFrame, this.x, this.y);
        // } else if (spriteFrame && !_looping) {
        //   if (frameIndex >= animation.frameEnd) {
        //
        //   }
        // }
      }
    }

    moveSprite() {

      this.x = random(possibleX);
      this.y = random(possibleY);

    }

    attractionPoint(_pointX, _pointY, _magnitude = 8) {
      let angle = Math.atan2(_pointY - this.y, _pointX - this.x);
      this.velocityX += cos(angle) * _magnitude;
      this.velocityY += sin(angle) * _magnitude;

      // Rotate us to face the player
      this.rotation = angle;
    };


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
  }




};
