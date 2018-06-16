'use strict'

let schmupGameInstance = function(p) {
  p.canvas;
  p.context;
  p.player;


  let canvasWidth = 600;
  let canvasHeight = 450;


  //player
  // p.player = {
  //   x: 285,
  //   y: 420,
  //   width: 30,
  //   height: 30,
  //   draw: function() {
  //   new p5Sprite(sprite32x100_yellow, p.width / 2, p.height - 50, 1);
  //   },
  //   followMouse: function(_ease = .1) {
  //     this.x += (mouseX - this.x) * _ease;
  //     this.y += (mouseY - this.y) * _ease;
  //   },
  //   followMouseX: function(_ease = .1) {
  //     this.x += (mouseX - this.x) * _ease;
  //   },
  //   followMouseY: function(_ease = .1) {
  //     this.y += (mouseY - this.y) * _ease;
  //   }
  // }

  //bullets
  p.bullets = [];

  function Bullet(I) {
    I.x = p.player.x + p.player.width / 2;
    I.y = p.player.y + p.player.height / 2;
    I.yvelocity = 6;
    I.width = 3;
    I.height = 3;
    I.inBounds = function() {
      return I.y >= 0 && I.y <= canvasHeight - I.height;
    }
    I.draw = function() {
      p.rect(I.x, I.y, I.width, I.height);
    }

    I.update = function() {
      I.active = I.active && I.inBounds();
      I.y -= I.yvelocity;
    }
    return I;
  }

  //enemies
  let enemies = [];

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

        p.enemies.displayAnim("still");
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

  p.setup = function() {
    p.canvas = p.createCanvas(canvasWidth, canvasHeight);
    p.canvas.parent("canvasDiv");
    p.canvas.class("gameCanvas");
    p.canvas.id("schmupGameCanvas");
    p.canvas.style("z-index: 6;");
    p.canvas.mousePressed(localMousePressed);
    p.frameRate(30);
    let c = document.querySelector("#schmupGameCanvas");
    p.context = c.getContext("2d");
    p.lastAnimationFrame = p.animationFrame;
    p.restartBool = false;
    p.score = 0;
    p.spawnRate = 0.02;
    p.level = 0
  // p.player = new p5Sprite(playerImgs, p.width / 2, p.height / 2, .5);
    p.player = new p5Sprite(sprite32, 285, 420, 1);
    p.player.addCollider(32, 32);
    p.player.addAnimation("still", 0, 0);
    p.player.drawConnectiveTissue(5);
    // p.player.displayAnim("still");

    p.enemies = new p5Sprite(sprite32, 285, 420, 1);
    p.enemies.addCollider(32, 32);
    p.enemies.addAnimation("still", 0, 0);


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
    p.enemies.moveSprite();
    p.enemies.keepInFrame();
    // console.log(p.player)
    p.animationFrame = Math.floor(frameCount / 3.75);

    // bullets = bullets.filter(function(bullet){
    // 	return bullet.active;
    // });
    p.bullets.forEach(function(bullet) {
      bullet.update();
      bullet.draw();
    });

    p.player.followMouseX(0.05);
    p.player.displayAnim("still");

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
          bullet.active = false;
          enemy.active = false;
          p.score += 10;
        }
      });
    });

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
    moveSprite() {
      this.x += this.velocityX;
      this.y += this.velocityY;
    }
    attractionPoint(_pointX, _pointY, _magnitude = 8) {
      let angle = Math.atan2(_pointY - this.y, _pointX - this.x);
      this.velocityX += cos(angle) * _magnitude;
      this.velocityY += sin(angle) * _magnitude;

      // Rotate us to face the player
      this.rotation = angle;
    };

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
