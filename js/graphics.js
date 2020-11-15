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


function draw2DArray(_graphics, _array, _cellWidth, _cellHeight) {
  _graphics.fill(180, 360, 25);
  _graphics.rect(0, 0, _graphics.width, _graphics.height);
  for (let i = 0; i < _array.length; i++) {
    for (let j = 0; j < _array[i].length; j++) {
      let x = i * _cellWidth;
      let y = j * _cellHeight;
      if (_array[i][j] == 1) {
        _graphics.fill(0);
        // _graphics.fill(120, 300, 300);
      } else {
        _graphics.fill(0, 255, 0);
        // _graphics.fill(180, 360, 25);
      }

      graphicsCharm.rect(x, y, _cellWidth, _cellHeight);
    }
  }
}

function drawTgotchiGraphics() {
  graphics.background(userData.tgotchiImage.backgroundColor[0], userData.tgotchiImage.backgroundColor[1], userData.tgotchiImage.backgroundColor[2]);


  graphics.fill(userData.tgotchiImage.pixelColor[0], userData.tgotchiImage.pixelColor[1], userData.tgotchiImage.pixelColor[2]);
  graphics.noStroke();
  // graphics.stroke(userData.tgotchiImage.pixelColor[0], userData.tgotchiImage.pixelColor[1], userData.tgotchiImage.pixelColor[2]);

  let stepSize = userData.tgotchiImage.pixelSize;

  // pixel array is [x, y, radius] of all the different rectangles. for 3d make the radius the height....
  userData.tgotchiImage.pixelArray.forEach(function(entry) {
    graphics.rectMode(CENTER);
    graphics.rect(entry[0], entry[1], entry[2], entry[2]);
  });

  // for 3d,
}

function displayTgotchi() {

  tgotchiDiameterController();

  // directionalLight(60, 200, 360, -width / 4, -width / 4, -70)
  // ambientLight(0, 0, 100)
  // directionalLight(120, 200, 360, width / 2, width / 2, -100)
  //
  // specularMaterial(255);
  texture(graphics);
  // normalMaterial();
  // ambientMaterial(100, 0, 255);

  cubeEnabled = userData.shape.cube;
  coneEnabled = userData.shape.cone;
  sphereEnabled = userData.shape.sphere;
  torusEnabled = userData.shape.torus;
  ringEnabled = userData.shape.ring;

  if (!cubeEnabled && !sphereEnabled && !torusEnabled && !ringEnabled && !coneEnabled) {
    drawFlatGotchi();
  }

  push();
  translate(0, 0, 0);
  rotateX(angleTgotchi);
  rotateZ(angleTgotchi * 1.2);

  if (cubeEnabled) {
    box(diameter);
  }
  if (coneEnabled) {
    ellipsoid(diameter * .9, diameter * .2, diameter * .9);
    // box(diameter / 5);
    // cone(diameter, Math.floor(diameter * .62));
  }
  if (sphereEnabled) {
    sphere(diameter * .62);
  }
  if (torusEnabled) {
    torus(diameter / 2, diameter / 2, 3, 3);
  }
  pop();

  let rotateRing = sin((frameCount * .01) * 2) * .3;

  if (ringEnabled) {
    push();
    // rotateX(PI / 2);
    rotateX(PI / 4 + angleTgotchi * -0.05);
    rotateY(angleTgotchi * -0.3);
    rotateZ(angleTgotchi * 1.1);
    torus(diameter * 1.2, diameter * 0.05, 24, 10);
    pop();
  }

  // angleTgotchi += .005;


  if (userData.charm) {
    charmID = userData.charm;
    displayCharm()
  } else if (document.querySelector('input[name="charm"]:checked')) {
    charmID = document.querySelector('input[name="charm"]:checked').value;
    displayCharm();
  }
}

function tgotchiDiameterController() {


  if (!collisionActive) {
    let sinAngle = (angleBreathe) * 0.15;
    diameter = 100 + sin(sinAngle) * 5;
    angleBreathe += .3
  } else {
    tgotchiAbsorbActionCube(executeAction, initialFrameCount, initialDiameter);
  }

}

function drawShrineTgotchiGraphics(_tgotchi) {
  graphicsShrineTgotchi.background(_tgotchi.tgotchiImage.backgroundColor[0], _tgotchi.tgotchiImage.backgroundColor[1], _tgotchi.tgotchiImage.backgroundColor[2]);


  graphicsShrineTgotchi.fill(_tgotchi.tgotchiImage.pixelColor[0], _tgotchi.tgotchiImage.pixelColor[1], _tgotchi.tgotchiImage.pixelColor[2]);
  graphicsShrineTgotchi.noStroke();

  // graphicsShrineTgotchi.stroke(_tgotchi.tgotchiImage.pixelColor[0], _tgotchi.tgotchiImage.pixelColor[1], _tgotchi.tgotchiImage.pixelColor[2]);

  let stepSize = _tgotchi.tgotchiImage.pixelSize;

  // pixel array is [x, y, radius] of all the different rectangles. for 3d make the radius the height....
  if (_tgotchi.tgotchiImage.pixelArray) {
    _tgotchi.tgotchiImage.pixelArray.forEach(function(entry) {
      graphicsShrineTgotchi.rectMode(CENTER);
      graphicsShrineTgotchi.rect(entry[0], entry[1], entry[2], entry[2]);
    });
  }

  // for 3d,
}

function moveShrineTgotchi(_shrineTgotchiX, ease = 0.1) {
  if (shrineTgotchiX < _shrineTgotchiX) {
    // with ease: added 0.1 to target value so that it wil exit condition
    shrineTgotchiX += ((_shrineTgotchiX + .1) - shrineTgotchiX) * ease;
  } else if (shrineTgotchiX > _shrineTgotchiX) {
    // subtracted .1 so it will exit condition
    shrineTgotchiX += ((_shrineTgotchiX - .1) - shrineTgotchiX) * ease;
  }
}

function moveShrineTgotchiEaseout(_shrineTgotchiX, ease = 0.1) {
  if (shrineTgotchiX < _shrineTgotchiX) {
    // with ease: added 0.1 to target value so that it wil exit condition
    shrineTgotchiX += 1 / (((_shrineTgotchiX + .1) - shrineTgotchiX) * ease);
  } else if (shrineTgotchiX > _shrineTgotchiX) {
    // subtracted .1 so it will exit condition
    shrineTgotchiX += 1 / (((_shrineTgotchiX - .1) - shrineTgotchiX) * ease);
  }
}

function displayShrineTgotchi(_tgotchi) {

  if (shrineTgotchiX == -200) {
    writeToConsoleBool = true;
    writeConsoleText(`There are currently ${numberTgotchi + 606} Traumagotchi circling the DeepInTheMachineWorldTraumaCompostShrine. </br>
    ---> Traumagotchi named ${keys[shrineTgotchiCounter]} is leaving a quiet offering. `)
  } else if (shrineTgotchiX >= 42) {
    writeToConsoleBool = true;
    writeConsoleText(`There are currently ${numberTgotchi} Traumagotchi circling the DeepInTheMachineWorldTraumaCompostShrine. </br>
    ---> ( .⋅. shrine receives ${keys[shrineTgotchiCounter]}'s offering .⋅. )`)
  }

  if (!tgotchiEntryComplete) {
    if (shrineTgotchiX < -34) {
      moveShrineTgotchi(-33, 0.07);
    } else {
      let tgotchiExitTimeout = setTimeout(function() {
        clearTimeout(tgotchiExitTimeout);
        tgotchiEntryComplete = true;
      }, 2000)
    }
  } else if (tgotchiEntryComplete) {
    moveShrineTgotchiEaseout(330, 0.002);

    if (shrineTgotchiX > 330) {
      shrineTgotchiCounter++;
      shrineTgotchiX = -200;
      tgotchiEntryComplete = false;

      // change console text here

      if (shrineTgotchiCounter >= tgotchiDataArray.length) {
        shrineTgotchiCounter = 0;

      }
    }
  }

  // specularMaterial(255);
  texture(graphicsShrineTgotchi);
  // normalMaterial();
  // ambientMaterial(100, 0, 255);

  cubeEnabled = _tgotchi.shape.cube;
  coneEnabled = _tgotchi.shape.cone;
  sphereEnabled = _tgotchi.shape.sphere;
  torusEnabled = _tgotchi.shape.torus;
  ringEnabled = _tgotchi.shape.ring;

  if (!cubeEnabled && !sphereEnabled && !torusEnabled && !ringEnabled && !coneEnabled) {
    drawFlatGotchi();
  }

  let shrineTgotchiDiameter = diameter * .23;

  push();
  translate(shrineTgotchiX, 20, 300);
  rotateX(angleTgotchi);
  rotateZ(angleTgotchi * 1.2);

  if (cubeEnabled) {
    box(shrineTgotchiDiameter);
  }
  if (coneEnabled) {
    ellipsoid(shrineTgotchiDiameter * .9, shrineTgotchiDiameter * .2, shrineTgotchiDiameter * .9);
    // box(shrineTgotchiDiameter / 5);
    // cone(shrineTgotchiDiameter, Math.floor(shrineTgotchiDiameter * .62));
  }
  if (sphereEnabled) {
    sphere(shrineTgotchiDiameter * .62);
  }
  if (torusEnabled) {
    torus(shrineTgotchiDiameter / 2, shrineTgotchiDiameter / 2, 3, 3);
  }

  // pop();

  let rotateRing = sin((frameCount * .01) * 2) * .3;

  if (ringEnabled) {
    push();
    rotateX(PI / 2);
    // rotateY(rotateRing);
    rotateY(angleTgotchi * -.3);
    rotateZ(angleTgotchi * 1.1);
    torus(shrineTgotchiDiameter * 1.2, shrineTgotchiDiameter * 0.05, 24, 10);
    pop();
  }



}

function drawBackgroundText() {

  // graphicsShrineText.background(200, 100, 0);
  graphicsShrineText.background(0, 10, 0);
  // graphicsShrineText.clear();

  graphicsShrineText.textFont('monospace');
  graphicsShrineText.textSize(16);
  graphicsShrineText.strokeWeight(0);
  graphicsShrineText.fill(0, 255, 0);

  // graphicsShrineText.stroke(0, 255, 0);
  // graphicsShrineText.rect(0, 0, 20, 20)
  let spellArray = [`if (newlyFallenSnow === true) {
  let state = cleanSlate;
  if (traumaGrid.slimeShard === 1 && traumaGrid.sourNectar === 1) {
    waterwheel += dontPanic;
    glimpseHorizon(mindfulnessCheck, sacredKey, theSmellOfPaper, angelThoughts, oasisBreeze);
  } else if (traumaGrid.protectiveMask){
    unveilCritter();
    ringOfKeys.hypocaust.transmigrationShard[forestNight]();
  } else {
    mindfulOfTime++
  }
  }
  if (worldNight == 'descending'){
  traumagrid.push[protectiveMask];
  angelThoughts("don't panic", "step well");
  } else if (forestNight == 'dawning'){
  unveilCritter();
  let worldTrees = [yewBranch, poplarBranch, ashBranch, sycamoreBranch];
  }
  pushMoreData(traumaGrid);`,
    `if (state == cleanSlate){
    newlyFallenSnowThaw == 'thawing';
    charms.add(charmSatchel, charmAbacus, charmGift, charmJostle, charmSheen);
    vision.add(planeOfTortoise, planeOfHummingbird, planeOfSpirit);
  }

  slimeMorph('sky spirit');

  for (let gentlePoise == actual; gentlePoise <= manifestCharm; gentlePoise ++){
    holdingHandsAtSunset += gentlePoise;
    glimpseHorizon();
  }
  if (worldNight == 'descending'){
    traumagrid.push[protectiveMask];
    angelThoughts("don't panic", "step well");
  } else if (forestNight == 'dawning'){
    unveilCritter();
    let worldTrees = [yewBranch, poplarBranch, ashBranch, sycamoreBranch];
  }
  pushMoreData(traumaGrid);`,
    `slimeMorph('sky spirit');

  for (let clearBlueSky == actual; clearBlueSky <= manifestCharm; clearBlueSky ++){
    skySpirit += clearBlueSky;
    glimpseHorizon();
  }
  if (worldNight == 'descending'){
    traumagrid.push[protectiveMask];
    angelThoughts("don't panic", "step well");
  } else if (forestNight == 'dawning'){
    unveilCritter();
    let worldTrees = [yewBranch, poplarBranch, ashBranch, sycamoreBranch];
    scamperField = [auraHotSprings, auraEveningSky, auraSkyMatrix, auraCharm]
  }
  iluminatedManuscript.push(theSmellOfPaper, succulentNectar, charmGift)

  function traumaDissolve(){
  worldTree.add(
    text: userInput;
    end: true;
  )
  }`
  ];



  let textAnimationFrame = Math.floor(frameCount / 60);

  if (textAnimationFrame != lastTextAnimationFrame) {
    machineWorldText = random(spellArray)
  }


  lastTextAnimationFrame = textAnimationFrame;


  graphicsShrineText.text(machineWorldText, 0, 0, graphicsShrineText.width, graphicsShrineText.height);
}

function drawCirclingSpellText(_text) {

  // graphicsShrineText.background(200, 100, 0);
  graphicsShrineTextLarge.background(0, 10, 0);
  // graphicsShrineTextLarge.clear();

  graphicsShrineTextLarge.strokeWeight(0);
  graphicsShrineTextLarge.fill(0, 255, 0);
  graphicsShrineTextLarge.textSize(14);
  graphicsShrineTextLarge.textFont('monospace');

  // graphicsShrineTextLarge.stroke(0, 255, 0);
  // graphicsShrineTextLarge.rect(0, 0, 20, 20)
  let spellArray = [`if (newlyFallenSnow === true) {
  let state = cleanSlate;
  if (traumaGrid.slimeShard === 1 && traumaGrid.sourNectar === 1) {
    waterwheel += dontPanic;
    glimpseHorizon(mindfulnessCheck, sacredKey, theSmellOfPaper, angelThoughts, oasisBreeze);
  } else if (traumaGrid.protectiveMask){
    unveilCritter();
    ringOfKeys.hypocaust.transmigrationShard[forestNight]();
  } else {
    mindfulOfTime++
  }
}`, `if (worldNight == 'descending'){
  traumagrid.push(protectiveMask);
  angelThoughts("don't panic", "step well");
} else if (forestNight == 'dawning'){
  unveilCritter();
  let worldTrees = [yewBranch, poplarBranch, ashBranch, sycamoreBranch];
}
pushMoreData(traumaGrid);`,
    `
if (gentlePoise <= manifestCharm){
  gentlePoise++;
  glimpseHorizon();
}

vision.add(planeOfTortoise, planeOfHummingbird, planeOfSpirit);
charms.add(charmSatchel, charmAbacus, charmGift, charmJostle, charmSheen);
vision.add(planeOfTortoise, planeOfHummingbird, planeOfSpirit);

slimeMorph('sky spirit');`, `else if (forestNight == 'dawning'){
    unveilCritter();
    let worldTrees = [yewBranch, poplarBranch, ashBranch, sycamoreBranch];
}
pushMoreData(traumaGrid);`,
    `slimeMorph('sky spirit');
for (let clearBlueSky == actual; clearBlueSky <= manifestCharm; clearBlueSky ++){
    skySpirit += clearBlueSky;
    glimpseHorizon();
}
if (worldNight == 'descending'){
    traumagrid.push[protectiveMask];
    angelThoughts("don't panic", "step well");
} else if (forestNight == 'dawning'){
    unveilCritter();
    let worldTrees = [yewBranch, poplarBranch, ashBranch, sycamoreBranch];
    scamperField = [auraHotSprings, auraEveningSky, auraSkyMatrix, auraCharm]
}
`, `function traumaDissolve(){
  worldTree.add(
    text: userInput;
    end: true;
  )
}
vision.add(planeOfTortoise, planeOfHummingbird, planeOfSpirit);
charms.add(charmSatchel, charmAbacus, charmGift, charmJostle, charmSheen);
vision.add(planeOfTortoise, planeOfHummingbird, planeOfSpirit);

slimeMorph('sky spirit');`
  ];

  graphicsShrineTextLarge.text(spellArray[_text], 0, 0, graphicsShrineTextLarge.width, graphicsShrineTextLarge.height);

}

function drawShrineGrid() {

  graphicsGrid.background(0);
  // hsb mode
  // graphicsGrid.background(180, 360, 25);
  graphicsGrid.strokeWeight(1.5);
  graphicsGrid.stroke(0, 255, 0);
  graphicsGrid.strokeWeight(4);
  // graphicsGrid.rect(100, 100, 100, 100);

  // draw outline
  graphicsGrid.line(0, 0, 0, graphicsGrid.height);
  graphicsGrid.line(0, 0, graphicsGrid.width, 0);
  graphicsGrid.line(0, graphicsGrid.height, 0, 0);
  graphicsGrid.line(graphicsGrid.width, 0, 0, 0);

  // draw lines from middle
  // draw lines to top
  for (let x = gridOffset; x < graphicsGrid.width; x += graphicsGrid.width / 10) {
    graphicsGrid.line(x, 0, x, graphicsGrid.width);
  }
  // to right
  for (let y = 0; y < graphicsGrid.height; y += graphicsGrid.height / 10) {
    graphicsGrid.line(0, y, graphicsGrid.height, y);
  }

  if (moveGrid) {
    // to move forward in space
    gridOffset -= 2;
    if (gridOffset >= graphicsGrid.width / 10) {
      gridOffset = 0;
    }
  }

  // push();
  // // specularMaterial(150, 350, 50);
  // texture(graphicsGrid);
  // translate(0, 0, -width);
  // plane(graphicsGrid.width, graphicsGrid.height);
  // // fill(250);
  // // rect(graphicsGrid.width, graphicsGrid.height);
  // // sphere(graphicsGrid.width/2);
  // // torus(graphicsGrid.width/3, graphicsGrid.width/7);
  // pop();



  // bottom grid
  push();
  texture(graphicsGrid);
  translate(0, width / 2 - width / 12, -width / 5);
  rotateX(PI / 2);
  rotateZ(PI * 3 / 2);
  box(graphicsGrid.width, graphicsGrid.height, 10, 10);
  // plane(graphicsGrid.width, graphicsGrid.height);
  pop();

  // top grid
  push();
  translate(0, -width / 2 + width / 12, -width / 5);
  rotateX(PI / 2);
  rotateZ(PI);
  box(graphicsGrid.width, graphicsGrid.height, 10, 10);
  // plane(graphicsGrid.width, graphicsGrid.height);
  pop();

  // left grid
  push();
  translate(-width / 2 + width / 18, 0, -width / 5);
  rotateY(PI / 2);
  box(graphicsGrid.width, graphicsGrid.height, 10, 10);
  // plane(graphicsGrid.width, graphicsGrid.height);
  pop();

  // right grid
  push();
  translate(width / 2 - width / 18, 0, -width / 5);
  rotateY(PI / 2);
  rotateZ(PI * 3 / 2);
  box(graphicsGrid.width, graphicsGrid.height, 10, 10);
  // plane(graphicsGrid.width, graphicsGrid.height);
  pop();



  // graphicsBG.noStroke();
  // graphicsBG.colorMode(RGB);
  // graphicsBG.background(0, 255, 0);
  //
  //
  // for (let i = 0; i < graphicsBGArray.length; i++) {
  //   for (let j = 0; j < graphicsBGArray[i].length; j++) {
  //     let x = i * graphicsBG.width / 32;
  //     let y = j * graphicsBG.height / 32;
  //     graphicsBG.fill(random(0, 20));
  //     // this was to create a staticy background but it was too much =)
  //     // graphicsBG.fill(random(0, 10), random(30, 80), random(0, 10));
  //     graphicsBG.rect(x, y, graphicsBG.width / 32, graphicsBG.width / 32);
  //   }
  // }

  push();
  texture(graphicsShrineText);
  // translate(0, 0, 0);
  translate(0, width / 9, -width * 3 / 2);
  box(graphicsShrineText.width * 1.5, graphicsShrineText.height * 1.5);
  pop();

}

function displayShrineCenter() {

  drawShrineGrid();
  // displayShrineShield();
  drawBackgroundText();

  // directionalLight(60, 200, 360, -width / 4, -width / 4, -70)
  // // ambientLight(0, 0, 100)
  // directionalLight(120, 200, 360, width / 2, width / 2, -100)
  //
  // specularMaterial(255);
  // texture(graphicsShrineText);
  // normalMaterial();
  // ambientMaterial(10, 10, 10);


  // rotating box center
  for (let i = 0; i < 10; i++) {
    ambientMaterial(i * 25, 200, 0);
    push();
    translate(0, i * 20 - 100, -133);
    rotateY(angleTgotchi * i);
    rotateX(PI);
    box(sin(angleTgotchi * 2) * 20 + i * 5);
    pop();
  }


  texture(graphicsShrineTextLarge);

  push();
  drawCirclingSpellText(0);
  // translate(100, -150, -250);
  translate(cos(angleTgotchi) * 100, -150, sin(angleTgotchi) * 100 - 200);
  rotateY(angleTgotchi);
  box(100, 100, 10);

  drawCirclingSpellText(1);
  rotateX(PI);
  translate(33, 60, 33);
  box(70, 70, 50);
  pop();

  push();
  drawCirclingSpellText(2);
  // translate(-120, 150, -250);
  translate(sin(angleTgotchi) * 120, 150, cos(angleTgotchi) * 120 - 150);
  rotateY(angleTgotchi);
  box(100, 100, 10);

  drawCirclingSpellText(3);
  rotateX(PI);
  translate(33, 60, 33);
  box(70, 70, 50);
  pop();

  push();
  drawCirclingSpellText(4);
  translate(133, -150, -250);
  rotateY(-angleTgotchi);
  box(50, 50, 50);

  drawCirclingSpellText(5);
  rotateX(PI);
  translate(-33, -60, 33);
  box(70, 70, 50);
  pop();


  angleTgotchi += .01;
}

// this disabled - was double sin wave
function displayShrineShield() {
  // comment this back -- all circline little shrine tgotchi

  let iMax = 5;

  push();
  for (let i = 0; i < iMax; i++) {
    ambientMaterial(i * 13, 255, 0);
    translate(sin(angleTgotchi / 3) * 3, sin(angleTgotchi / 3) * 3, i - 133);
    // translate(sin(frameCount * 0.0005 / 5) * 3, sin(frameCount * 0.0005 / 5) * 3, i - 133);
    // translate(sin(frameCount * 0.00005 + j) * 50, sin(frameCount * 0.00005 + j) * 50, i * 0.1);
    // translate(sin(frameCount * 0.0000001 + j / 50), sin(frameCount * 0.0000001 + j / 50), i * 0.01 - 133);
    // translate(sin(frameCount * 0.0000001 + j / 50), sin(frameCount * 0.0000001 + j / 50), i * 0.01 - 200);
    rotateZ(frameCount * 0.0002);
    // translate(0, 0, 0);
    rotateY(angleTgotchi * 0.1)

    torus(13, 13, 3, 3);
    // sphere(2);
  }
  pop();
}

function releaseWordsAnimation() {

  if (releaseWords.length < 40) {
    releaseTextSize = 36;
  } else if (releaseWords.length < 100) {
    releaseTextSize = 24;
  } else if (releaseWords.length < 200) {
    releaseTextSize = 16;
  } else {
    releaseTextSize = 12;
  }

  graphicsShrineRelease.noStroke();
  graphicsShrineRelease.textAlign(CENTER);
  graphicsShrineRelease.colorMode(RGB);
  let redVal = (frameCount * 20) % 255;
  graphicsShrineRelease.background(255 - redVal, redVal, 57);
  graphicsShrineRelease.textSize(releaseTextSize);
  graphicsShrineRelease.strokeWeight(0);
  graphicsShrineRelease.fill(0);
  graphicsShrineRelease.textFont('monospace');
  graphicsShrineRelease.text(`${releaseWords}`, 5, 5, graphicsShrineRelease.width - 10, graphicsShrineRelease.height - 10);


  push();
  texture(graphicsShrineRelease);
  translate(0, 0, releasePositionZ);
  rotateX(releaseRotationX);
  rotateY(0);
  rotateZ(0);
  box(graphicsShrineRelease.width * releaseScale, graphicsShrineRelease.height * releaseScale, 10, 10);
  pop();

  releasePositionVel += releasePositionAcc
  releasePositionZ -= releasePositionVel;

  releaseRotationX -= .03;

  releaseScale -= 0.02;

  if (releasePositionZ < -100) {
    releasingWords = false;
    // if (!sound_powerup_1.isPlaying()) {
    //   sound_powerup_1.play();
    // }
    releasePositionZ = 33;
    releaseRotationX = 0;
    releasePositionVel = 0;
    releasePositionAcc = 0.1;
    releaseScale = 1;
    document.querySelector("#releaseWordsInput").value = ''
  }


}

function setIntentionAnimation() {

  if (intentionWords.length < 40) {
    releaseTextSize = 22;
  } else if (intentionWords.length < 100) {
    releaseTextSize = 16;
  } else if (intentionWords.length < 200) {
    releaseTextSize = 12;
  } else {
    releaseTextSize = 10;
  }

  graphicsShrineRelease.noStroke();
  graphicsShrineRelease.textAlign(CENTER);
  graphicsShrineRelease.colorMode(RGB);
  // graphicsShrineRelease.clear();
  // graphicsShrineRelease.background(0);
  // graphicsShrineRelease.background(0, 0, 0, 0);
  graphicsShrineRelease.background(172, 212, 57);
  graphicsShrineRelease.textSize(releaseTextSize);
  graphicsShrineRelease.strokeWeight(0);
  // graphicsShrineRelease.fill(172, 212, 57);
  // graphicsShrineRelease.fill(255, 33, random(200, 255));
  graphicsShrineRelease.fill(random(200, 255), 33, 66);
  // graphicsShrineRelease.fill(0);
  graphicsShrineRelease.textFont('monospace');
  graphicsShrineRelease.text(`${intentionWords}`, 5, 5, graphicsShrineRelease.width - 10, graphicsShrineRelease.height - 10);


  push();
  texture(graphicsShrineRelease);
  translate(0, 0, releasePositionZ);
  // rotateX(PI/2);
  // rotateY(angleTgotchi / 4);
  // rotateZ(angleTgotchi / 5);
  rotateX(releaseRotationX);
  rotateY(0);
  rotateZ(0);
  box(graphicsShrineRelease.width * releaseScale, graphicsShrineRelease.height * releaseScale, 10, 10);
  // plane(graphicsShrineRelease.width, graphicsShrineRelease.height);
  pop();

  releasePositionVel += releasePositionAcc
  releasePositionZ -= releasePositionVel;

  releaseRotationX += 0.05;

  releaseScale -= 0.02;

  if (releasePositionZ < -100) {
    settingIntention = false;
    // if (!sound_powerup_0.isPlaying()) {
    //   sound_powerup_0.play();
    // }
    releasePositionZ = 33;
    releaseRotationX = 0;
    releasePositionVel = 0;
    releasePositionAcc = 0.1;
    releaseScale = 1;
    document.querySelector("#setIntentionInput").value = ''
  }

}

function displayCharm() {


  graphicsCharm.noStroke();
  graphicsCharm.background(0, 255, 0);
  // graphicsCharm.background(180, 360, 25);


  // leaving this draw2D function here as a declaration in case want to make a global function
  draw2DArray(graphicsCharm, charmGraphics[charmID], graphicsCharm.width / 16, graphicsCharm.width / 16);




  let moveCharmX = sin((frameCount * .01) * 2) * 10;
  let moveCharmY = sin((frameCount * .01) * 3) * 10;


  push();
  texture(graphicsCharm);
  translate(charmDistance + moveCharmX, charmDistance + moveCharmY, charmDistance / 2);
  rotateX(angleTgotchi);
  rotateY(angleTgotchi * 2);
  rotateZ(PI / 2);
  box(graphicsCharm.width / 2);
  // plane(graphicsGrid.width, graphicsGrid.height);
  pop();
}

function displayAction(_actionGraphicArray, _actionGraphicIndex) {

  push();
  // normalMaterial();
  translate(actionX, actionY, actionZ);
  rotateX(actionAngle * .7);
  rotateY(actionAngle * 5);
  rotateZ(PI / 2);
  // console.log(_actionGraphicArray);
  texture(_actionGraphicArray[_actionGraphicIndex]);
  box(actionCubeDiameter);
  pop();

  if (actionAnimating && !swipeLeftComplete) {

    if (!sound_fizzDown_loPitch.isPlaying()) {
      sound_fizzDown_loPitch.play();
    }

    if (actionX > -41) {
      // console.log(actionX);
      moveActionCube(-42, -33, 200, 0.07);
      actionAngle += 0.0033;
    } else {
      swipeLeftComplete = true;
    }
  } else if (actionAnimating && swipeLeftComplete) {
    if (actionZ > diameter / 2 - actionCubeDiameter / 2) {
      // if (actionX < -10) {
      // if (actionY < 0.5) {
      moveActionCube(0, 0, -80, 0.025);
      actionAngle += 0.02;
    } else {
      collisionActive = true; // activates tgotchiAbsorbActionCube() and resets displayAnimation process
      initialFrameCount = frameCount;
      initialDiameter = diameter;
      actionAnimating = false;
      swipeLeftComplete = false;
      printOnceBool = true; // so only writes actions to console once
    }
  }
}

// function playSoundOnce(_sound) {
//
//
//   if (!_sound.isPlaying()) {
//     _sound.play();
//   }
//
//   _sound.onended(function() {
//     _sound.stop()
//   })
//
// }

function tgotchiAbsorbActionCube(_executeAction, _initialFrameCount, _initialDiameter) {

  if (!sound_powerup_0.isPlaying()) {
    sound_powerup_0.play();
  }

  let sinAngle = (frameCount - _initialFrameCount) * 0.15;

  if (sinAngle <= PI) {
    let sinShift = sin(sinAngle)
    diameter = _initialDiameter + sin(sinAngle) * 33;

    if (actionCubeDiameter > 0) {
      actionCubeDiameter -= 5;
    } else {
      actionCubeDiameter = 0;
    }
  } else {
    collisionActive = false;
    actionCubeDiameter = 66;
    actionX = 200;
    actionY = 0;
    actionZ = 200;
    actionAngle = 0;
    executeAction = 'careMenu';
    currentKey = 'initial';
    stateChange('mainMenu');
    nextMenu();
  }
}

function moveActionCube(_actionX, _actionY, _actionZ, ease = .1) {
  if (actionZ < _actionZ) {
    actionZ += ((_actionZ + .1) - actionZ) * ease;
  } else if (actionZ > _actionZ) {
    // subtracted .1 so it will exit condition
    actionZ += ((_actionZ - .1) - actionZ) * ease;
  }

  if (actionX < _actionX) {
    // with ease: added 0.1 to target value so that it wil exit condition
    actionX += ((_actionX + .1) - actionX) * ease;
  } else if (actionX > _actionX) {
    // subtracted .1 so it will exit condition
    actionX += ((_actionX - .1) - actionX) * ease;
  }

  if (actionY < _actionY) {
    actionY += ((_actionY + .1) - actionY) * ease;
  } else if (actionY > _actionY) {
    // subtracted .1 so it will exit condition
    actionY += ((_actionY - .1) - actionY) * ease;
  }


}


// for drawing tgotchi graphics at back of grid when there is no shape set
function drawFlatGotchi() {
  push();
  translate(0, 0, -width);
  box(graphicsGrid.width * .7, graphicsGrid.height * .7);
  pop();
}

function displayCapture() {
  // gameIntroOverlay.style.display = "block";
  texture(capture);
  push();
  translate(0, 0, displayCaptureZ);
  box(graphicsCapture.width * 3.3, graphicsCapture.height * 3.3, 2);
  pop();

  if (displayCaptureZ >= -width) {
    displayCaptureZ -= 50;
  }

  // // still in middle
  // texture(capture);
  // push();
  // translate(0, 33, -width + 13);
  // box(graphicsCapture.width * 3.3, graphicsCapture.height * 3.3);
  // pop();

  // // this is to have it at OTHER end of grid, by camera (if it could spin 360)
  // texture(capture);
  // push();
  // translate(0, 33, width * .3);
  // box(graphicsCapture.width * 3.3, graphicsCapture.height * 3, 10);
  // pop();
}

function drawGrid() {

  graphicsGrid.background(0);
  // hsb mode
  // graphicsGrid.background(180, 360, 25);
  graphicsGrid.strokeWeight(1.5);
  graphicsGrid.stroke(0, 255, 0);
  graphicsGrid.strokeWeight(4);
  // graphicsGrid.rect(100, 100, 100, 100);

  // draw outline
  graphicsGrid.line(0, 0, 0, graphicsGrid.height);
  graphicsGrid.line(0, 0, graphicsGrid.width, 0);
  graphicsGrid.line(0, graphicsGrid.height, 0, 0);
  graphicsGrid.line(graphicsGrid.width, 0, 0, 0);

  // draw lines from middle
  // draw lines to top
  for (let x = gridOffset; x < graphicsGrid.width; x += graphicsGrid.width / 10) {
    graphicsGrid.line(x, 0, x, graphicsGrid.width);
  }
  // to right
  for (let y = 0; y < graphicsGrid.height; y += graphicsGrid.height / 10) {
    graphicsGrid.line(0, y, graphicsGrid.height, y);
  }

  if (moveGrid) {
    // to move forward in space
    gridOffset -= 2;
    if (gridOffset >= graphicsGrid.width / 10) {
      gridOffset = 0;
    }
  }

  // push();
  // // specularMaterial(150, 350, 50);
  // texture(graphicsGrid);
  // translate(0, 0, -width);
  // plane(graphicsGrid.width, graphicsGrid.height);
  // // fill(250);
  // // rect(graphicsGrid.width, graphicsGrid.height);
  // // sphere(graphicsGrid.width/2);
  // // torus(graphicsGrid.width/3, graphicsGrid.width/7);
  // pop();



  // bottom grid
  push();
  texture(graphicsGrid);
  translate(0, width / 2 - width / 4, -width / 5);
  rotateX(PI / 2);
  rotateZ(PI * 3 / 2);
  box(graphicsGrid.width, graphicsGrid.height, 10, 10);
  // plane(graphicsGrid.width, graphicsGrid.height);
  pop();

  // top grid
  push();
  translate(0, -width / 2 + width / 4, -width / 5);
  rotateX(PI / 2);
  rotateZ(PI);
  box(graphicsGrid.width, graphicsGrid.height, 10, 10);
  // plane(graphicsGrid.width, graphicsGrid.height);
  pop();

  // left grid
  push();
  translate(-width / 2 + width / 6, 0, -width / 5);
  rotateY(PI / 2);
  box(graphicsGrid.width, graphicsGrid.height, 10, 10);
  // plane(graphicsGrid.width, graphicsGrid.height);
  pop();

  // right grid
  push();
  translate(width / 2 - width / 6, 0, -width / 5);
  rotateY(PI / 2);
  rotateZ(PI * 3 / 2);
  box(graphicsGrid.width, graphicsGrid.height, 10, 10);
  // plane(graphicsGrid.width, graphicsGrid.height);
  pop();



  graphicsBG.noStroke();
  graphicsBG.colorMode(RGB);
  graphicsBG.background(0, 255, 0);


  for (let i = 0; i < graphicsBGArray.length; i++) {
    for (let j = 0; j < graphicsBGArray[i].length; j++) {
      let x = i * graphicsBG.width / 32;
      let y = j * graphicsBG.height / 32;
      graphicsBG.fill(random(0, 20));
      // this was to create a staticy background but it was too much =)
      // graphicsBG.fill(random(0, 10), random(30, 80), random(0, 10));
      graphicsBG.rect(x, y, graphicsBG.width / 32, graphicsBG.width / 32);
    }
  }

  push();
  texture(graphicsBG);
  // translate(0, 0, 0);
  translate(0, 0, -width);
  box(graphicsGrid.width * .7, graphicsGrid.height * .7);
  pop();

}


function drawLoadingScreenGrid() {

  graphicsGrid.background(0);
  // hsb mode
  // graphicsGrid.background(180, 360, 25);

  graphicsGrid.stroke(0, 255, 0);
  graphicsGrid.strokeWeight(6);
  // graphicsGrid.rect(100, 100, 100, 100);

  // draw outline
  graphicsGrid.line(0, 0, 0, graphicsGrid.height);
  graphicsGrid.line(0, 0, graphicsGrid.width, 0);
  graphicsGrid.line(0, graphicsGrid.height, 0, 0);
  graphicsGrid.line(graphicsGrid.width, 0, 0, 0);

  // draw lines from middle
  // draw lines to top
  for (let x = gridOffset; x < graphicsGrid.width; x += graphicsGrid.width / 5) {
    graphicsGrid.line(x, 0, x, graphicsGrid.width);
  }
  // to right
  for (let y = 0; y < graphicsGrid.height; y += graphicsGrid.height / 10) {
    graphicsGrid.line(0, y, graphicsGrid.height, y);
  }


  // to move forward in space
  gridOffset -= 10;
  if (gridOffset >= graphicsGrid.width / 10) {
    gridOffset = 0;

  }


  push()
  rotateZ(angleTgotchi * 2);
  // bottom grid
  push();
  texture(graphicsGrid);
  translate(0, width / 2 - width / 4, -width / 8);
  rotateX(PI / 2);
  rotateZ(PI * 3 / 2);
  box(graphicsGrid.width, graphicsGrid.height, 10, 10);
  // plane(graphicsGrid.width, graphicsGrid.height);
  pop();

  // top grid
  push();
  translate(0, -width / 2 + width / 4, -width / 8);
  rotateX(PI / 2);
  rotateZ(PI);
  box(graphicsGrid.width, graphicsGrid.height, 10, 10);
  // plane(graphicsGrid.width, graphicsGrid.height);
  pop();

  // left grid
  push();
  translate(-width / 2 + width / 6, 0, -width / 8);
  rotateY(PI / 2);
  box(graphicsGrid.width, graphicsGrid.height, 10, 10);
  // plane(graphicsGrid.width, graphicsGrid.height);
  pop();

  // right grid
  push();
  translate(width / 2 - width / 6, 0, -width / 8);
  rotateY(PI / 2);
  rotateZ(PI * 3 / 2);
  box(graphicsGrid.width, graphicsGrid.height, 10, 10);
  // plane(graphicsGrid.width, graphicsGrid.height);
  pop();

  pop();

  graphicsBG.noStroke();
  graphicsBG.colorMode(RGB);
  graphicsBG.background(20, 20, 20);
  // graphicsBG.background(40, 0, 80);
  graphicsBG.textSize(14);
  graphicsBG.textAlign(CENTER);
  graphicsBG.strokeWeight(0);
  graphicsBG.fill(0, 255, 0);

  graphicsBG.text(`LOADING TRAUMAGRID`, 0, graphicsBG.width / 3, graphicsBG.width, graphicsBG.height);

  push();
  texture(graphicsBG);
  translate(0, 0, 0);
  rotateX(angleTgotchi * 2);
  rotateY(angleTgotchi * 1.8);
  // rotateZ(PI / 2);
  box(width / 4);
  // plane(graphicsGrid.width, graphicsGrid.height);
  pop();

  // push();
  // texture(graphicsBG);
  // // translate(0, 0, 0);
  // translate(0, 0, -width / 5);
  // box(graphicsBG.width, graphicsBG.height);
  // pop();
}


function drawLoadingScreenGridNew() {

  graphicsGrid.background(0);
  // hsb mode
  // graphicsGrid.background(180, 360, 25);

  graphicsGrid.stroke(0, 255, 0);
  graphicsGrid.strokeWeight(6);
  // graphicsGrid.rect(100, 100, 100, 100);

  // draw outline
  graphicsGrid.line(0, 0, 0, graphicsGrid.height);
  graphicsGrid.line(0, 0, graphicsGrid.width, 0);
  graphicsGrid.line(0, graphicsGrid.height, 0, 0);
  graphicsGrid.line(graphicsGrid.width, 0, 0, 0);

  // draw lines from middle
  // draw lines to top
  for (let x = gridOffset; x < graphicsGrid.width; x += graphicsGrid.width / 5) {
    graphicsGrid.line(x, 0, x, graphicsGrid.width);
  }
  // to right
  for (let y = 0; y < graphicsGrid.height; y += graphicsGrid.height / 10) {
    graphicsGrid.line(0, y, graphicsGrid.height, y);
  }


  // to move forward in space
  gridOffset -= 2;
  if (gridOffset >= graphicsGrid.width / 10) {
    gridOffset = 0;

  }


  push()
  rotateZ(angleTgotchi / 2);
  // bottom grid
  push();
  texture(graphicsGrid);
  translate(0, width / 2 - width / 4, -width / 8);
  rotateX(PI / 2);
  rotateZ(PI * 3 / 2);
  box(graphicsGrid.width, graphicsGrid.height, 10, 10);
  // plane(graphicsGrid.width, graphicsGrid.height);
  pop();

  // top grid
  push();
  translate(0, -width / 2 + width / 4, -width / 8);
  rotateX(PI / 2);
  rotateZ(PI);
  box(graphicsGrid.width, graphicsGrid.height, 10, 10);
  // plane(graphicsGrid.width, graphicsGrid.height);
  pop();

  // left grid
  push();
  translate(-width / 2 + width / 6, 0, -width / 8);
  rotateY(PI / 2);
  box(graphicsGrid.width, graphicsGrid.height, 10, 10);
  // plane(graphicsGrid.width, graphicsGrid.height);
  pop();

  // right grid
  push();
  translate(width / 2 - width / 6, 0, -width / 8);
  rotateY(PI / 2);
  rotateZ(PI * 3 / 2);
  box(graphicsGrid.width, graphicsGrid.height, 10, 10);
  // plane(graphicsGrid.width, graphicsGrid.height);
  pop();

  pop();

  graphicsBG.noStroke();
  graphicsBG.colorMode(RGB);
  graphicsBG.background(20, 20, 20);
  // graphicsBG.background(40, 0, 80);
  graphicsBG.textSize(14);
  graphicsBG.textAlign(CENTER);
  graphicsBG.strokeWeight(0);
  graphicsBG.fill(0, 255, 0);

  graphicsBG.text(`LOADING TRAUMAGRID`, 0, graphicsBG.width / 3, graphicsBG.width, graphicsBG.height);

  push();
  texture(graphicsBG);
  translate(0, 0, 0);
  rotateX(angleTgotchi * 2);
  rotateY(angleTgotchi * 1.8);
  // rotateZ(PI / 2);
  box(width / 4);
  // plane(graphicsGrid.width, graphicsGrid.height);
  pop();



  // push();
  // texture(graphicsBG);
  // // translate(0, 0, 0);
  // translate(0, 0, -width / 5);
  // box(graphicsBG.width, graphicsBG.height);
  // pop();
}

function defaultCamera() {
  cameraX = 0;
  cameraY = 0;
  cameraZ = (height / 2) / tan(PI / 6);
}

function moveCamera(_cameraX, _cameraY, _cameraZ, ease = .1) {
  if (cameraZ < _cameraZ) {
    cameraZ += ((_cameraZ + .1) - cameraZ) * ease;
  } else if (cameraZ > _cameraZ) {
    // subtracted .1 so it will exit condition
    cameraZ += ((_cameraZ - .1) - cameraZ) * ease;
  }

  if (cameraX < _cameraX) {
    // with ease: added 0.1 to target value so that it wil exit condition
    cameraX += ((_cameraX + .1) - cameraX) * ease;
  } else if (cameraX > _cameraX) {
    // subtracted .1 so it will exit condition
    cameraX += ((_cameraX - .1) - cameraX) * ease;
  }

  if (cameraY < _cameraY) {
    cameraY += ((_cameraY + .1) - cameraY) * ease;
  } else if (cameraY > _cameraY) {
    // subtracted .1 so it will exit condition
    cameraY += ((_cameraY - .1) - cameraY) * ease;
  }


}


let charmGraphics = {

  fourLeafClover: [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1],
    [1, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0, 1],
    [1, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 1, 0, 1],
    [1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0, 1],
    [1, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  ],

  heel: [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
    [0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  ],

  moon: [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0],
    [0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0],
    [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  ],

  arrow: [
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1]
  ],

  heart: [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0],
    [0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  ],

  eye: [
    [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 1, 0, 0, 1, 1, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  ],

  no: [
    [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0],
    [0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0],
    [0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0],
    [0, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
    [1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1],
    [1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1],
    [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 1],
    [0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0],
    [0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0],
    [0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0]
  ],

  wink: [
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
    [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  ],

  hesher: [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  ],

  crescent: [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0],
    [0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
    [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  ],

  triangle: [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  ],

  sword: [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  ],

  sad: [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  ],

  palmTree: [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0],
    [0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 0],
    [0, 0, 1, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0],
    [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  ],

  wave: [
    [1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0]
  ],

  cross: [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
    [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  ]
}
