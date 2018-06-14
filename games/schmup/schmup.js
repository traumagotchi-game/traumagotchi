let schmupGameInstance = function(p) {
  console.log("hello");
  p.canvas;
  p.context;
  let canvasWidth = 600;
  let canvasHeight = 450;

  //player
	let player = {
		x: 285,
		y: 420,
		width: 30,
		height: 30,
		draw : function() {
			p.rect(this.x, this.y, this.width, this.height)
			},
			followMouse: function(_ease = .1) {
				this.x += (mouseX - this.x) * _ease;
				this.y += (mouseY - this.y) * _ease;
			},
			followMouseX: function (_ease = .1) {
				this.x += (mouseX - this.x) * _ease;
			},
			followMouseY: function(_ease = .1) {
				this.y += (mouseY - this.y) * _ease;
			}
		}

	//bullets
	let bullets = [];

	function Bullet(I) {
		I.x = player.x + player.width/2;
		I.y = player.y + player.height/2;
		I.yvelocity = 5;
		I.width = 3;
		I.height = 3;
		I.inBounds = function () {
			return I.y >= 0 && I.y <= canvasHeight - I.height;
		}
		I.draw = function () {
			p.rect(I.x, I.y, I.width, I.height);
			}

		I.update = function () {
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
		I.y = 0 ;
		I.x = Math.random() * (canvasWidth-I.width);
		I.inBounds = function (){
		return I.y >= 0 && I.y < canvasHeight - I.height;
		}

		I.draw = function () {
			p.rect(I.x, I.y, I.width, I.height);
		};
		I.update = function () {
		I.active = I.active && I.inBounds();
		I.y += I.yvelocity;
	 }
		return I;
	}

function collision (bullet, enemy) {
	return bullet.x + bullet.width >= enemy.x && bullet.x <= enemy.x + enemy.width &&
	bullet.y + bullet.height >= enemy.y && bullet.y <= enemy.y + enemy.height;
}

  p.setup = function() {
    p.canvas = p.createCanvas(canvasWidth, canvasHeight);
		p.canvas.parent("canvasDiv");
		p.canvas.class("gameCanvas");
		p.canvas.id("schmupGameCanvas");
		p.canvas.style("z-index: 5;");
		p.canvas.mousePressed(localMousePressed);
		p.frameRate(30);
		let c = document.querySelector("#schmupGameCanvas");
    p.context = c.getContext("2d");
		p.animationFrame;
	  p.lastAnimationFrame;
		p.restartBool = false;
		p.score = 0;

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
			bullets.push (Bullet({}));
			console.log ("PEW!");
			return false;
			bullets = bullets.filter(function(bullet){
				return bullet.active;
			});
	}


	function intro() {
    // clear to have a clear background, if background is drawn on another canvas layer
    // p.clear();
    p.background(0);

  }



  function play() {
		p.background(45);
		player.draw();
		p.animationFrame = Math.floor(frameCount / 3.75);
		player.followMouseX(0.05);
		// bullets = bullets.filter(function(bullet){
		// 	return bullet.active;
		// });
		bullets.forEach(function(bullet){
		bullet.update();
		bullet.draw();
		});

		//draws the enemies
		if(Math.random()< 0.02) {
			enemies.push(Enemy({}));
		};

		enemies = enemies.filter(function(enemy){
			return enemy.active;
		});

		enemies.forEach(function(enemy){
			enemy.update();
			enemy.draw();
		});

//collisions

bullets.forEach (function(bullet){
	enemies.forEach(function(enemy){
		if(collision (bullet, enemy)){
			bullet.active = false;
			enemy.active = false;
			p.score += 10;
		}
	});
});

enemies.forEach (function(enemy){
		if(collision (enemy, player)){
			p.stage = 'gameOver';
		}
});

displayScore();

//*
p.lastAnimationFrame = p.animationFrame;


}

	function gameOver() {
    // clear to have a clear background, if background is drawn on another canvas layer
    // p.clear();
    p.background(0);
    p.context.font = "60px Verdana";
    p.context.fillStyle = "#ACD02D";
    let str = "GAME OVER";
    let txt = p.context.measureText(str);
    let left = (p.canvas.width - txt.width) / 2;
    let top = p.canvas.height / 2;
    p.context.fillText("GAME OVER", left, top);

    restart();
  }

	function youWon() {
		p.context.font = "60px Verdana";
		p.context.fillStyle = "#ACD02D";
		let str = "YOU WON";
		let txt = p.context.measureText(str);
		let left = (p.canvas.width - txt.width) / 2;
		let top = p.canvas.height / 2;
		p.context.fillText("YOU WON", left, top);


		restart();
	}


  function restart() {


  if (p.restartBool == false) {

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
    p.context.fillStyle = "#00ff00";
    let str = "Score";
    let txt = p.context.measureText(str);
    let left = p.canvas.width - 10 - txt.width;
    p.context.fillText("Score", left, 30);

    p.context.font = "30px Gamegirl";
    p.context.fillStyle = "#00ff00";
    str = String(p.score);
    txt = p.context.measureText(str);
    left = p.canvas.width - 10 - txt.width;
    p.context.fillText(p.score, left, 65);
  }


};
