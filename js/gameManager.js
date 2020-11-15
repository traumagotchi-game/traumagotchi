/* Code by Lark Alder aka Lark VCR aka Virtually Conflicted Reality
Assistance: Angelabelle Abarientos
DeepMachineIncantation Text: Porpentine Charity Heartscape
Special thanks to Dan Schiffman's Coding Train & Processing Foundation


This is the development version, actual site transforms all the function and variable names with words of DeepMachineIncantation. While the website is active, the code executes these incantations and casts virtual spells for healing trauma.

This — like the process of healing — is ALWAYS a work-in-progress



_ .-') _     ('-.     ('-.     _ (`-.
( (  OO) )  _(  OO)  _(  OO)   ( (OO  )
\     .'_ (,------.(,------. _.`     \
,`'--..._) |  .---' |  .---'(__...--''
|  |  \  ' |  |     |  |     |  /  | |
|  |   ' |(|  '--. (|  '--.  |  |_.' |
|  |   / : |  .--'  |  .--'  |  .___.'
|  '--'  / |  `---. |  `---. |  |
`-------'  `------' `------' `--'

__   __ _______ _______ __   __ ___ __    _ _______
|  |_|  |   _   |       |  | |  |   |  |  | |       |
|       |  |_|  |       |  |_|  |   |   |_| |    ___|
|       |       |       |       |   |       |   |___
|       |       |      _|       |   |  _    |    ___|
| ||_|| |   _   |     |_|   _   |   | | |   |   |___
|_|   |_|__| |__|_______|__| |__|___|_|  |__|_______|

,---.    ,---.   ____      .-_'''-.  .-./`)     _______
|    \  /    | .'  __ `.  '_( )_   \ \ .-.')   /   __  \
|  ,  \/  ,  |/   '  \  \|(_ o _)|  '/ `-' \  | ,_/  \__)
|  |\_   /|  ||___|  /  |. (_,_)/___| `-'`"`,-./  )
|  _( )_/ |  |   _.-`   ||  |  .-----..---. \  '_ '`)
| (_ o _) |  |.'   _    |'  \  '-   .'|   |  > (_)  )  __
|  (_,_)  |  ||  _( )_  | \  `-'`   | |   | (  .  .-'_/  )
|  |      |  |\ (_ o _) /  \        / |   |  `-'`-'     /
'--'      '--' '.(_,_).'    `'-...-'  '---'    `._____.'



*/


"use strict";

function selectGames() {
  // recursive calls to find random 3 in games array
  // FOR WORKING ON A SPECIFIC GAME, INITIALIZE IT HERE (COMMENT OUT RANDOM)

  // game1 = 'schmup';
  game1 = random(games);
  findGame2();

}

// initialize game back and start first game;
function initGameBank() {

  gameEndOverlay.style.visibility = "hidden";


  if (gameCounter === 1) {
    switch (game1) {
      case 'collapse':
        initCollapseGame();
        break;
      case 'platformDrop':
        initPlatformDropGame();
        break;
      case 'schmup':
        initSchmupGame();
        break;
      case 'pluck':
        initPluckGame();
        break;
      case 'snake':
        initSnakeGame();
        break;
      case 'wackymole':
        initWackymoleGame();
        break;
      case 'breakout':
        initBreakoutGame();
        break;
      default:
        break;
    }
  } else if (gameCounter === 2) {
    switch (game2) {
      case 'collapse':
        initCollapseGame();
        break;
      case 'platformDrop':
        initPlatformDropGame();
        break;
      case 'schmup':
        initSchmupGame();
        break;
      case 'pluck':
        initPluckGame();
        break;
      case 'snake':
        initSnakeGame();
        break;
      case 'wackymole':
        initWackymoleGame();
        break;
      case 'breakout':
        initBreakoutGame();
        break;
      default:
        break;
    }
  } else if (gameCounter === 3) {
    switch (game3) {
      case 'collapse':
        initCollapseGame();
        break;
      case 'platformDrop':
        initPlatformDropGame();
        break;
      case 'schmup':
        initSchmupGame();
        break;
      case 'pluck':
        initPluckGame();
        break;
      case 'snake':
        initSnakeGame();
        break;
      case 'wackymole':
        initWackymoleGame();
        break;
      case 'breakout':
        initBreakoutGame();
        break;
      default:
        break;
    }
  }

}



function findGame2() {
  let _game2 = random(games);
  if (_game2 != game1) {
    game2 = _game2;
    findGame3();
    return;
  } else {
    findGame2();
  }
}

function findGame3() {
  let _game3 = random(games);
  if (_game3 != game1 && _game3 != game2) {
    game3 = _game3
    return;
  } else {
    findGame3();
  }
}




function initP5templateGame() {

  p5templateGameCanvas.style.visibility = "visible";



  p5templateGame.stage = 'intro';
  // hide care menu with state change
  stateChange('game');

  drawIntroBGBool = true;

  displayGameTitle(`P5 TEMPLATE`, `Instructions: (this is Pluck but actually P5 Template =))`);

  playButton.addEventListener("click", startTimer);

  function startTimer() {
    playButton.removeEventListener("click", startTimer);
    p5templateGame.stage = 'play';
    drawP5templateBGBool = true;
    gameIntroOverlay.style.visibility = "hidden";
    pointsOverlay.style.visibility = "visible";
    timer.innerHTML = '10';
    timer.style.display = "block";

    let countdown = 10;
    let delay = 1000;
    let timerTimeout = setTimeout(function request() {
      clearTimeout(timerTimeout);
      if (countdown <= 0) {
        p5templateGame.stage = 'gameOver'
        timer.innerHTML = `end round ${gameCounter}`;
        // last parameters in setTimeout are parameters that pass into endGame(_game, _gameCanvas)
        setTimeout(endGame, 2500, p5templateGame, p5templateGameCanvas);
      } else if (p5templateGame.stage == 'gameOver' || p5templateGame.stage == 'youWon') {
        timer.innerHTML = `end round ${gameCounter}`;
        setTimeout(endGame, 2500, p5templateGame, p5templateGameCanvas);
      } else {
        countdown--;
        timer.innerHTML = `${countdown}`;
        timerTimeout = setTimeout(request, delay)
      }
    }, delay)

  }


}

function initPluckGame() {

  pluckGameCanvas.style.visibility = "visible";

  pluckGame.stage = 'intro';
  // hide care menu with state change
  stateChange('game');

  drawIntroBGBool = true;

  displayGameTitle(`PLUCK`, `Instructions: Grab blinky luck-things, avoid purple bad-things`);

  playButton.addEventListener("click", startTimer);

  function startTimer() {
    playButton.removeEventListener("click", startTimer);
    pluckGame.stage = 'play';
    drawPluckBGBool = true;
    gameIntroOverlay.style.visibility = "hidden";
    pointsOverlay.style.visibility = "visible";
    timer.innerHTML = '10';
    timer.style.display = "block";

    let countdown = 10;
    let delay = 1000;
    let timerTimeout = setTimeout(function request() {
      clearTimeout(timerTimeout);
      if (countdown <= 0) {
        pluckGame.stage = 'gameOver'
        timer.innerHTML = `end round ${gameCounter}`; // last parameters in setTimeout are parameters that pass into endGame(_game, _gameCanvas)

        setTimeout(endGame, 2500, pluckGame, pluckGameCanvas);
      } else if (pluckGame.stage == 'gameOver' || pluckGame.stage == 'youWon') {
        timer.innerHTML = `end round ${gameCounter}`;
        setTimeout(endGame, 2500, pluckGame, pluckGameCanvas);
      } else {
        countdown--;
        timer.innerHTML = `${countdown}`;
        timerTimeout = setTimeout(request, delay)
      }
    }, delay)

  }


}

function initSnakeGame() {
  // gave it countdown of 15 seconds

  snakeGameCanvas.style.visibility = "visible";

  snakeGame.stage = 'intro';
  // hide care menu with state change
  stateChange('game');

  drawIntroBGBool = true;

  displayGameTitle(`SNAKE`, `Instructions: Mouse-over arrows to move.`);

  playButton.addEventListener("click", startTimer);

  function startTimer() {
    playButton.removeEventListener("click", startTimer);
    snakeGame.stage = 'play';
    drawSnakeBGBool = true;
    gameIntroOverlay.style.visibility = "hidden";
    pointsOverlay.style.visibility = "visible";
    timer.innerHTML = '10';
    timer.style.display = "block";
    drawSnakeBGBool = true;

    let countdown = 10;
    let delay = 1000;
    let timerTimeout = setTimeout(function request() {
      clearTimeout(timerTimeout);
      if (countdown <= 0) {
        snakeGame.stage = 'gameOver'
        timer.innerHTML = `end round ${gameCounter}`; // last parameters in setTimeout are parameters that pass into endGame(_game, _gameCanvas)
        // sound_powerup_0.play();
        setTimeout(endGame, 2500, snakeGame, snakeGameCanvas);
      } else if (snakeGame.stage == 'gameOver' || snakeGame.stage == 'youWon') {
        timer.innerHTML = `end round ${gameCounter}`;
        setTimeout(endGame, 2500, snakeGame, snakeGameCanvas);
      } else {
        countdown--;
        timer.innerHTML = `${countdown}`;
        timerTimeout = setTimeout(request, delay)
      }
    }, delay)
  }
}

function initSchmupGame() {

  schmupGameCanvas.style.visibility = "visible";
  schmupGame.stage = 'intro';
  drawIntroBGBool = true;
  // hide care menu with state change
  stateChange('game');

  displayGameTitle(`SCHMUP`, `Instructions: Press mouse to launch pink-defense`);

  playButton.addEventListener("click", startTimer);

  function startTimer() {
    playButton.removeEventListener("click", startTimer);
    schmupGame.stage = 'play';
    gameIntroOverlay.style.visibility = "hidden";
    pointsOverlay.style.visibility = "visible";
    drawSchmupBGBool = true;


    timer.innerHTML = '10';
    timer.style.display = "block";

    let countdown = 10;
    let delay = 1000;
    let timerTimeout = setTimeout(function request() {
      clearTimeout(timerTimeout);
      if (countdown <= 0) {
        schmupGame.stage = 'gameOver';
        timer.innerHTML = `end round ${gameCounter}`; // last parameters in setTimeout are parameters that pass into endGame(_game, _gameCanvas)
        // sound_powerup_1.play();
        setTimeout(endGame, 2500, schmupGame, schmupGameCanvas);
      } else if (schmupGame.stage == 'gameOver' || schmupGame.stage == 'youWon') {
        timer.innerHTML = `end round ${gameCounter}`;
        setTimeout(endGame, 2500, schmupGame, schmupGameCanvas);
      } else {
        countdown--;
        timer.innerHTML = `${countdown}`;
        timerTimeout = setTimeout(request, delay)
      }
    }, delay)

  }


}

function initWackymoleGame() {

  wackymoleGameCanvas.style.visibility = "visible";

  wackymoleGame.stage = 'intro';
  // hide care menu with state change
  stateChange('game');
  drawIntroBGBool = true;
  displayGameTitle(`WACKYMOLE`, `Instructions: Click to wacky'em`);

  playButton.addEventListener("click", startTimer);

  function startTimer() {
    playButton.removeEventListener("click", startTimer);
    wackymoleGame.stage = 'play';
    gameIntroOverlay.style.visibility = "hidden";
    pointsOverlay.style.visibility = "visible";

    drawWackymoleBGBool = true;
    timer.innerHTML = '10';
    timer.style.display = "block";

    let countdown = 10;
    let delay = 1000;
    let timerTimeout = setTimeout(function request() {
      clearTimeout(timerTimeout);
      if (countdown <= 0) {
        wackymoleGame.stage = 'gameOver'
        timer.innerHTML = `end round ${gameCounter}`; // last parameters in setTimeout are parameters that pass into endGame(_game, _gameCanvas)
        setTimeout(endGame, 2500, wackymoleGame, wackymoleGameCanvas);
      } else if (wackymoleGame.stage == 'gameOver' || wackymoleGame.stage == 'youWon') {
        timer.innerHTML = `end round ${gameCounter}`;
        setTimeout(endGame, 2500, wackymoleGame, wackymoleGameCanvas);
      } else {
        countdown--;
        timer.innerHTML = `${countdown}`;
        timerTimeout = setTimeout(request, delay)
      }
    }, delay)
  }
}

function initBreakoutGame() {

  breakoutGameCanvas.style.visibility = "visible";

  breakoutGame.stage = 'intro';
  // hide care menu with state change
  stateChange('game');
  drawIntroBGBool = true;

  displayGameTitle(`BREAKOUT`, `Instructions: Classic.`);

  playButton.addEventListener("click", startTimer);

  function startTimer() {
    playButton.removeEventListener("click", startTimer);
    breakoutGame.stage = 'play';
    drawBreakoutBGBool = true;
    gameIntroOverlay.style.visibility = "hidden";
    pointsOverlay.style.visibility = "visible";

    timer.innerHTML = '10';
    timer.style.display = "block";

    let countdown = 10;
    let delay = 1000;
    let timerTimeout = setTimeout(function request() {
      clearTimeout(timerTimeout);
      if (countdown <= 0) {
        breakoutGame.stage = 'gameOver'
        timer.innerHTML = `end round ${gameCounter}`;
        // last parameters in setTimeout are parameters that pass into endGame(_game, _gameCanvas)
        setTimeout(endGame, 2500, breakoutGame, breakoutGameCanvas);
      } else if (breakoutGame.stage == 'gameOver' || breakoutGame.stage == 'youWon') {
        timer.innerHTML = `end round ${gameCounter}`;
        setTimeout(endGame, 2500, breakoutGame, breakoutGameCanvas);
      } else {
        countdown--;
        timer.innerHTML = `${countdown}`;
        timerTimeout = setTimeout(request, delay)
      }
    }, delay)
  }
}

function initCollapseGame() {

  collapseGameCanvas.style.visibility = "visible";

  // hide care menu with state change
  stateChange('game');

  collapseGame.stage = 'intro';
  drawIntroBGBool = true;

  displayGameTitle(`COLLAPSE`, `Instructions: Click to collapse three or more touching THINGS`);


  playButton.addEventListener("click", startTimer)

  function startTimer() {
    playButton.removeEventListener("click", startTimer);
    collapseGame.stage = 'play';
    gameIntroOverlay.style.visibility = "hidden";
    pointsOverlay.style.visibility = "visible";

    drawCollapseBGBool = true;
    timer.innerHTML = '10';
    timer.style.display = "block";

    let countdown = 10;
    let delay = 1000;
    let timerTimeout = setTimeout(function request() {
      clearTimeout(timerTimeout);
      if (countdown <= 0) {
        // pointsLocal += collapseGame.score;
        collapseGame.stage = 'gameOver'
        timer.innerHTML = `end round ${gameCounter}`;
        // last parameters in setTimeout are parameters that pass into endGame(_game, _gameCanvas)
        setTimeout(endGame, 2500, collapseGame, collapseGameCanvas);
      } else {
        countdown--;
        timer.innerHTML = `${countdown}`;
        timerTimeout = setTimeout(request, delay)
      }
    }, delay)
  }
}

function initPlatformDropGame() {

  platformDropGameCanvas.style.visibility = "visible";

  console.log(`platform drop level is ${platformDropGame.level}`);

  stateChange('game');
  platformDropGame.stage = 'intro';
  drawIntroBGBool = true;
  displayGameTitle(`PLATFORM DROP`, `Instructions: Click on PINK blocks to guide your Gotchi to the prize.`);




  playButton.addEventListener("click", startTimer);

  function startTimer() {
    playButton.removeEventListener("click", startTimer);
    platformDropGame.stage = 'play';
    gameIntroOverlay.style.visibility = "hidden";
    pointsOverlay.style.visibility = "visible";

    drawPlatformBGBool = true;
    timer.innerHTML = '10';

    let countdown = 10;
    let delay = 1000;
    let timerTimeout = setTimeout(function request() {
        clearTimeout(timerTimeout);
        if (countdown <= 0) {
          platformDropGame.level = (platformDropGame.level + 1) % 6;
          platformDropGame.stage == 'gameOver';
          timer.innerHTML = `end round ${gameCounter}`;
          setTimeout(endGame, 2500, platformDropGame, platformDropGameCanvas);
        } else if (platformDropGame.stage == 'gameOver' || platformDropGame.stage == 'youWon') {
          timer.innerHTML = `end round ${gameCounter}`;
          setTimeout(endGame, 2500, platformDropGame, platformDropGameCanvas);
        } else {
          countdown--;
          timer.innerHTML = `${countdown}`;
          timerTimeout = setTimeout(request, delay)
        }
      },
      delay)
  }


}

function endGame(_game, _gameCanvas) {
  // console.log(`score is ${_game.score}`)
  // pointsLocal += collapseGame.score;

  userData.points += _game.score;
  pushMoreData({
    points: userData.points
  });

  pointStats.innerHTML = `${userData.points} points`;

  _game.stage = 'waiting';
  _game.score = 0;

  if (gameCounter < 3) {
    gameCounter++;
    // timer.innerHTML = `ready for game ${gameCounter}?`;
    _gameCanvas.style.visibility = "hidden";
    initGameBank();
  } else {
    gameCounter = 1;
    // timer.innerHTML = `end round`;
    gameBackgroundCanvas.style.visibility = "hidden";
    // timer.innerHTML = ` `;
    timer.style.display = "none";

    // console.log(`${_game} stage is ${_game.stage}`)
    stateChange('mainMenu');
    _gameCanvas.style.visibility = "hidden";
  }
}


function displayGameTitle(_title, _instructions) {
  gameIntroOverlay.style.visibility = "visible";

  gameTitle.innerHTML = `${_title}`;

  playInstructions.innerHTML = `${_instructions}`;

  timer.style.display = "block";
  timer.innerHTML = "10 seconds";
}

function displayGameOverText(_game) {
  pointsOverlay.style.visibility = "hidden";
  gameEndOverlay.style.visibility = "visible";

  finalScore.innerHTML = `FINAL SCORE:</br>${_game.score}`;

}
