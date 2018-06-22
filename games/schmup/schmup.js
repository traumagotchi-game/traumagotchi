'use strict'

let schmupGameInstance = function(p) {
  p.canvas;
  p.context;
  p.player;


  let canvasWidth = 600;
  let canvasHeight = 450;


  p.collisionSprites = [];
  p.colSprIndex;
  p.displayCollision = false;

  p.bullets = [];

  //enemies
  let enemies = [];

  p.setup = function() {
    p.canvas = p.createCanvas(canvasWidth, canvasHeight);
    p.canvas.parent("canvasDiv");
    p.canvas.class("gameCanvas");
    p.canvas.id("schmupGameCanvas");
    p.canvas.style("z-index: 6;");
    p.canvas.mousePressed(localMousePressed);
    p.frameRate(30);
    p.rectMode(CENTER);
    p.imageMode(CENTER);
    let c = document.querySelector("#schmupGameCanvas");
    p.context = c.getContext("2d");
    p.lastAnimationFrame = p.animationFrame;
    p.restartBool = false;
    p.score = 0;
    p.spawnRate = 0.02;
    p.level = 0
    p.player = new p5Sprite(schmupper, 225, 400, 1);
    p.player.addCollider(32, 32);
    p.player.addAnimation("still", 0, 0);
    p.player.addAnimation("shoot", 0, 1);

    // p.player.displayAnim("still");


  }

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

  }

  function localMousePressed() {
    p.bullets.push(Bullet({}));
    console.log("PEW!");
    return false;
    p.bullets = p.bullets.filter(function(bullet) {
      return bullet.active;
    });
  }

  function Bullet(I) {
    I.x = p.player.x
    I.y = p.player.y
    I.yvelocity = 6;
    I.width = 5;
    I.height = 5;
    I.inBounds = function() {
      return I.y >= 0 && I.y <= canvasHeight - I.height;
    }
    I.draw = function() {
      p.strokeWeight(6);
      p.stroke(250, 58, 249)
      // p.fill()
      p.rect(I.x, I.y, I.width, I.height);
    }

    I.update = function() {
      I.active = I.active && I.inBounds();
      I.y -= I.yvelocity;
    }
    return I;
  }

  function Enemy(I) {

    I.active = true;
    I.width = 30;
    I.height = 30;
    I.yvelocity = 2;
    I.y = -20;
    I.x = Math.random() * (canvasWidth - I.width);

    if (I.y >= canvasHeight) {
      p.stage = 'gameOver';
    } else {

      I.inBounds = function() {
        return I.y >= -20 && I.y < canvasHeight - I.height;
      }

      I.draw = function() {

        p.strokeWeight(8);
        p.stroke(250, 120, 35); // bright blue
        p.fill(39, 93, 235) // orange

        p.rect(I.x, I.y, I.width, I.height);
      };
      I.update = function() {
        I.active = I.active && I.inBounds();
        I.y += I.yvelocity;
      }
    }
    return I;
  }

  function out(enemy) {
    return enemy.y == canvasHeight - enemy.height;
  }


  function collision(bullet, enemy) {
    return bullet.x + bullet.width >= enemy.x && bullet.x <= enemy.x + enemy.width &&
      bullet.y + bullet.height >= enemy.y && bullet.y <= enemy.y + enemy.height;
  }


  function intro() {
    // clear to have a clear background, if background is drawn on another canvas layer
    p.clear();
    // p.background(0);

  }

  function play() {
    // p.background(45);
    p.clear();
    p.player.moveSprite();
    p.player.keepInFrame();
    p.animationFrame = Math.floor(frameCount / 3.75);

    // bullets = bullets.filter(function(bullet){
    // 	return bullet.active;
    // });
    p.bullets.forEach(function(bullet) {
      bullet.update();
      bullet.draw();
    });

    p.player.drawConnectiveTissue(5);


    p.player.followMouseX(0.05);
    if (mouseIsPressed) {
      // p.player.followMouse(0.1);
      p.player.displayAnim("shoot");
    } else {
      p.player.displayAnim("still");
    }

    //draws the enemies
    if (Math.random() < p.spawnRate) {
      enemies.push(Enemy({}));
    };

    enemies = enemies.filter(function(enemy) {
      return enemy.active;
    });

    enemies.forEach(function(enemy) {
      enemy.update();
      enemy.draw();
    });

    //collisions

    p.bullets.forEach(function(bullet) {
      enemies.forEach(function(enemy) {
        if (collision(bullet, enemy)) {

          p.collisionSprites.push(new p5Sprite(confettiPop_pink_128, 100, 100));
          p.colSprIndex = p.collisionSprites.length - 1;
          p.collisionSprites[p.colSprIndex].x = enemy.x;
          p.collisionSprites[p.colSprIndex].y = enemy.y;
          p.collisionSprites[p.colSprIndex].addAnimation("explode", 0, 7);
          p.collisionSprites[p.colSprIndex].isPlaying = true;
          p.displayCollision = true;


          bullet.active = false;
          enemy.active = false;
          p.score += 10;


        }
      });
    });

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

    //
    // if (enemies.y >= canvasHeight) {
    //   p.stage = 'gameOver';
    // };

    enemies.forEach(function(enemy) {
      if (collision(enemy, p.player)) {
        p.stage = 'gameOver';
      }
    })

    enemies.forEach(function(enemy) {
      if (out(enemy)) {
        p.stage = 'gameOver';
      }
    });

    pointsRunningTotal.innerHTML = `${p.score}`;
    //*
    p.lastAnimationFrame = p.animationFrame;


  }

  function gameOver() {
    drawGameOverBGBool = true;
    // clear to have a clear background, if background is drawn on another canvas layer
    p.clear();
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

    // look at breakout game restart()
    if (p.restartBool == false) {
      enemies = [];
      if (p.level <= 5) {
        p.level += 1;
        // test incrementation number
        p.spawnRate += 0.02;
      } else {
        p.level = 0;
        p.spawnRate = 0.02;
      }
      p.player.x = 225;
      p.player.y = 400;
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
