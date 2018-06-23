let wackymoleGameInstance = function(p) {

  p.canvas;
  p.context;
  p.level = 0; // level is different levels of game
  p.stage = 'waiting';
  p.score = 0;
  p.framerate = 1.5;

  p.difficulty = 25; // smaller this number is, harder to play

  let moleX = this.x;
  let moleY = this.y;

  let possibleX = [290, 190, 390];
  let possibleY = [100, 200, 300];
  // let possibleX = [210, 310, 410];
  // let possibleY = [120, 220, 320];

  p.collisionSprites = [];
  p.colSprIndex;
  p.displayCollision = false;

  p.setup = function() {
    p.canvas = p.createCanvas(600, 450);
    p.canvas.parent("canvasDiv");
    p.canvas.class("gameCanvas");
    p.canvas.id("wackymoleGameCanvas");
    p.canvas.style("z-index: 5;");
    p.canvas.mouseClicked(localMouseClicked);
    p.background(0);
    p.frameRate(30);
    p.rectMode(CENTER);
    p.imageMode(CENTER);

    let c = document.querySelector("#wackymoleGameCanvas");
    p.context = c.getContext("2d");

    p.moveFrame;
    p.lastMoveFrame;
    p.animationFrame;
    p.lastAnimationFrame;

    // p.mole = new p5Sprite(sprite32, 220, 120, 1);
    p.mole = new p5Sprite(ball, 220, 120, 1);
    p.mole.addCollider(32, 32);
    p.mole.addAnimation("askingForIt", 0, 5);
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
      sound_metallic_1.play();
      p.score += 10;

      p.collisionSprites.push(new p5Sprite(confettiPop_green_128, 100, 100));
      p.colSprIndex = p.collisionSprites.length - 1;
      p.collisionSprites[p.colSprIndex].x = p.mole.x;
      p.collisionSprites[p.colSprIndex].y = p.mole.y;
      p.collisionSprites[p.colSprIndex].addAnimation("explode", 0, 6);
      p.collisionSprites[p.colSprIndex].isPlaying = true;
      p.displayCollision = true;

    } else {
      if (!sound_wack.isPlaying()) {
        sound_wack.play();
      }
    }
    return false;
  }

  function intro() {
    // clear to have a clear background, if background is drawn on another canvas layer
    p.clear();
    // p.background(0);

  }



  function play() {

    // console.log(possibleX);
    //  console.log(possibleY);
    // console.log("-------")


    p.clear();
    // p.context.font = "30px Gamegirl";
    // p.context.fillStyle = "#00ff00";
    // p.context.fillText("Whack - a - mole!", 30, 50);

    // Return Home Button


    // Create the "holes"


    p.moveFrame = Math.floor(frameCount / p.difficulty);
    // 8fps
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

    p.mole.displayAnim("askingForIt");

    if (p.displayCollision) {
      // if (p.displayCollision && p.collisionSprites[p.colSprIndex]) {
      for (let i = p.collisionSprites.length - 1; i >= 0; i--) {
        if (p.collisionSprites[i].isPlaying) {
          // create a new collision sprite and push it to the array
          p.collisionSprites[i].displayAnim("explode", false);
        } else {
          p.collisionSprites.splice(i, 1)
        }
      }
    }

    if (p.moveFrame != p.lastMoveFrame) {
      p.mole.moveSprite();
    }


    // p.mole.displayAnim("still");
    pointsRunningTotal.innerHTML = `${p.score}`;
    p.lastAnimationFrame = p.animationFrame;
    p.lastMoveFrame = p.moveFrame;
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


  function restart() {
    // note: changes made here have to also match the initial positions when sprites are created in setup.
    // right now it does not increase in difficulty
    if (p.restartBool == false) {

      if (p.level <= 4) {
        p.level += 1;
        p.difficulty -= 1;
      } else {
        p.level = 0;
        p.difficulty = 25;
      }

    }
    p.restartBool = true;
  }




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


    // for mole game
    moveSprite() {

      this.x = random(possibleX);
      this.y = random(possibleY);

    }

    // normal
    // moveSprite() {
    //   this.x += this.velocityX;
    //   this.y += this.velocityY;
    // }

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
