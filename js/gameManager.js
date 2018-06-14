function initSchmupGame() {
  drawSchmupBackgroundBool = true;
  schmupGameCanvas.style.visibility = "visible";
  schmupGame.stage = 'intro';
  // hide care menu with state change
  state = 'game';

  displayGameTitle(`SCHMUP`, `Instructions: Shoot'em up`);

  playButton.addEventListener("click", startTimer);

  function startTimer() {
    playButton.removeEventListener("click", startTimer);
    schmupGame.stage = 'play';
    gameIntroOverlay.style.visibility = "hidden";
    // drawbackgroundBool = true;


    timer.innerHTML = '10';
    timer.style.display = "block";

    let countdown = 10;
    let delay = 1000;
    let timerTimeout = setTimeout(function request() {
      clearTimeout(timerTimeout);
      if (countdown <= 0) {
        // uncomment when different levels created
        // schmupGame.level = (p5TemmplateGame.level + 1) % 5;
        schmupGame.stage = 'gameOver'
        timer.innerHTML = `FINAL SCORE: ${schmupGame.score}`;
        // last parameters in setTimeout are parameters that pass into endGame(_game, _gameCanvas)
        setTimeout(endGame, 2500, schmupGame, schmupGameCanvas);
      } else if (schmupGame.stage == 'gameOver' || schmupGame.stage == 'youWon') {
        // uncomment when different levels created
        // schmupGame.level = (p5TemmplateGame.level + 1) % 5;
        timer.innerHTML = `FINAL SCORE: ${schmupGame.score}`;
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
  drawWackymoleBackgroundBool = true;
  wackymoleGameCanvas.style.visibility = "visible";

  wackymoleGame.stage = 'intro';
  // hide care menu with state change
  state = 'game';

  displayGameTitle(`WACKYMOLE`, `Instructions: Whack`);

  playButton.addEventListener("click", startTimer);

  function startTimer() {
    playButton.removeEventListener("click", startTimer);
    wackymoleGame.stage = 'play';
    gameIntroOverlay.style.visibility = "hidden";


    timer.innerHTML = '10';
    timer.style.display = "block";

    let countdown = 10;
    let delay = 1000;
    let timerTimeout = setTimeout(function request() {
      clearTimeout(timerTimeout);
      if (countdown <= 0) {
        // uncomment when different levels created
        // wackymoleGame.level = (p5TemmplateGame.level + 1) % 5;
        wackymoleGame.stage = 'gameOver'
        timer.innerHTML = `FINAL SCORE: ${wackymoleGame.score}`;
        // last parameters in setTimeout are parameters that pass into endGame(_game, _gameCanvas)
        setTimeout(endGame, 2500, wackymoleGame, wackymoleGameCanvas);
      } else if (wackymoleGame.stage == 'gameOver' || wackymoleGame.stage == 'youWon') {
        // uncomment when different levels created
        // wackymoleGame.level = (p5TemmplateGame.level + 1) % 5;
        timer.innerHTML = `FINAL SCORE: ${wackymoleGame.score}`;
        setTimeout(endGame, 2500, wackymoleGame, wackymoleGameCanvas);
      } else {
        countdown--;
        timer.innerHTML = `${countdown}`;
        timerTimeout = setTimeout(request, delay)
      }
    }, delay)

  }


}

function initP5templateGame() {

  drawP5templateBackgroundBool = true;

  p5templateGameCanvas.style.visibility = "visible";

  p5templateGame.stage = 'intro';
  // hide care menu with state change
  state = 'game';

  displayGameTitle(`PLUCK`, `Instructions: Grab red luck-things, avoid purple bad-things`);

  playButton.addEventListener("click", startTimer);

  function startTimer() {
    playButton.removeEventListener("click", startTimer);
    p5templateGame.stage = 'play';
    gameIntroOverlay.style.visibility = "hidden";


    timer.innerHTML = '10';
    timer.style.display = "block";

    let countdown = 10;
    let delay = 1000;
    let timerTimeout = setTimeout(function request() {
      clearTimeout(timerTimeout);
      if (countdown <= 0) {
        // uncomment when different levels created
        // p5templateGame.level = (p5TemmplateGame.level + 1) % 5;
        p5templateGame.stage = 'gameOver'
        timer.innerHTML = `FINAL SCORE: ${p5templateGame.score}`;
        // last parameters in setTimeout are parameters that pass into endGame(_game, _gameCanvas)
        setTimeout(endGame, 2500, p5templateGame, p5templateGameCanvas);
      } else if (p5templateGame.stage == 'gameOver' || p5templateGame.stage == 'youWon') {
        // uncomment when different levels created
        // p5templateGame.level = (p5TemmplateGame.level + 1) % 5;
        timer.innerHTML = `FINAL SCORE: ${p5templateGame.score}`;
        setTimeout(endGame, 2500, p5templateGame, p5templateGameCanvas);
      } else {
        countdown--;
        timer.innerHTML = `${countdown}`;
        timerTimeout = setTimeout(request, delay)
      }
    }, delay)

  }


}

function initBreakoutGame() {
  drawBreakoutBackgroundBool = true;
  breakoutGameCanvas.style.visibility = "visible";

  breakoutGame.stage = 'intro';
  // hide care menu with state change
  state = 'game';

  displayGameTitle(`BREAKOUT`, `Instructions: Bounce on things (?)`);

  playButton.addEventListener("click", startTimer);

  function startTimer() {
    playButton.removeEventListener("click", startTimer);
    breakoutGame.stage = 'play';
    gameIntroOverlay.style.visibility = "hidden";


    timer.innerHTML = '10';
    timer.style.display = "block";

    let countdown = 10;
    let delay = 1000;
    let timerTimeout = setTimeout(function request() {
      clearTimeout(timerTimeout);
      if (countdown <= 0) {
        // uncomment when different levels created
        // breakoutGame.level = (p5TemmplateGame.level + 1) % 5;
        breakoutGame.stage = 'gameOver'
        timer.innerHTML = `FINAL SCORE: ${breakoutGame.score}`;
        // last parameters in setTimeout are parameters that pass into endGame(_game, _gameCanvas)
        setTimeout(endGame, 2500, breakoutGame, breakoutGameCanvas);
      } else if (breakoutGame.stage == 'gameOver' || breakoutGame.stage == 'youWon') {
        // uncomment when different levels created
        // breakoutGame.level = (p5TemmplateGame.level + 1) % 5;
        timer.innerHTML = `FINAL SCORE: ${breakoutGame.score}`;
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
  drawCollapseBackgroundBool = true;
  collapseGameCanvas.style.visibility = "visible";

  // hide care menu with state change
  state = 'game';

  collapseGame.stage = 'intro';

  displayGameTitle(`COLLAPSE`, `Instructions: Click to collapse three or more touching THINGS`);


  playButton.addEventListener("click", startTimer)

  function startTimer() {
    playButton.removeEventListener("click", startTimer);
    collapseGame.stage = 'play';
    gameIntroOverlay.style.visibility = "hidden";

    timer.innerHTML = '10';
    timer.style.display = "block";

    let countdown = 10;
    let delay = 1000;
    let timerTimeout = setTimeout(function request() {
      clearTimeout(timerTimeout);
      if (countdown <= 0) {
        // pointsLocal += collapseGame.score;
        collapseGame.stage = 'gameOver'
        timer.innerHTML = `FINAL SCORE: ${collapseGame.score}`;

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

function displayGameTitle(_title, _instructions){
  gameIntroOverlay.style.visibility = "visible";

  gameTitle.innerHTML =  `${_title}`;

  playInstructions.innerHTML = `${_instructions}`;

  timer.style.display = "block";
  timer.innerHTML = "10 seconds";
}

function initPlatformDropGame() {
  drawPlatformBackgroundBool = true;
  platformDropGameCanvas.style.visibility = "visible";

  console.log(`platform drop level is ${platformDropGame.level}`);

  state = 'game';
  platformDropGame.stage = 'intro';

  displayGameTitle(`PLATFORM DROP`, `Instructions: Click on PINK blocks to guide your Gotchi to the prize.`);




  playButton.addEventListener("click", startTimer);

  function startTimer() {
    playButton.removeEventListener("click", startTimer);

      platformDropGame.stage = 'play';
      gameIntroOverlay.style.visibility = "hidden";

      timer.innerHTML = '10';

      let countdown = 10;
      let delay = 1000;
      let timerTimeout = setTimeout(function request() {
          clearTimeout(timerTimeout);
          if (countdown <= 0) {
            // uncomment when different levels created -> moved to game.js
            platformDropGame.level = (platformDropGame.level + 1) % 6;
            platformDropGame.stage == 'gameOver';
            timer.innerHTML = `FINAL SCORE: ${platformDropGame.score}`;
            setTimeout(endGame, 2500, platformDropGame, platformDropGameCanvas);
          } else if (platformDropGame.stage == 'gameOver' || platformDropGame.stage == 'youWon') {
            // uncomment when different levels created
            // platformDropGame.level = (platformDropGame.level + 1) % 6; // moved to game.js
            timer.innerHTML = `FINAL SCORE: ${platformDropGame.score}`;
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
  gameBackgroundInstanceCanvas.style.visibility = "hidden";

  userData.points += _game.score;
  pushMoreData({
    points: userData.points
  })
  pointStats.innerHTML = `${userData.points} points`;

  timer.innerHTML = ` `;
  timer.style.display = "none";

  state = 'care';

  _game.stage = 'waiting';
  _game.score = 0;

  // console.log(`${_game} stage is ${_game.stage}`)

  _gameCanvas.style.visibility = "hidden";
}
