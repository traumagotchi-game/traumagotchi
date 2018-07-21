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
    box(diameter / 5);
    cone(diameter, Math.floor(diameter * .62));
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
    rotateX(PI / 2);
    // rotateY(rotateRing);
    rotateY(angleTgotchi * -.3);
    rotateZ(angleTgotchi * 1.1);
    torus(diameter * 1.2, diameter * 0.05, 24, 10);
    pop();
  }

  angleTgotchi += .01;


  if (userData.charm) {
    charmID = userData.charm;
    displayCharm()
  } else if (document.querySelector('input[name="charm"]:checked')) {
    charmID = document.querySelector('input[name="charm"]:checked').value;
    displayCharm();
  }
}

function drawShrineTgotchiGraphics(_tgotchi) {
  graphicsShrineTgotchi.background(_tgotchi.tgotchiImage.backgroundColor[0], _tgotchi.tgotchiImage.backgroundColor[1], _tgotchi.tgotchiImage.backgroundColor[2]);


  graphicsShrineTgotchi.fill(_tgotchi.tgotchiImage.pixelColor[0], _tgotchi.tgotchiImage.pixelColor[1], _tgotchi.tgotchiImage.pixelColor[2]);
  graphicsShrineTgotchi.noStroke();
  // graphicsShrineTgotchi.stroke(_tgotchi.tgotchiImage.pixelColor[0], _tgotchi.tgotchiImage.pixelColor[1], _tgotchi.tgotchiImage.pixelColor[2]);

  let stepSize = _tgotchi.tgotchiImage.pixelSize;

  // pixel array is [x, y, radius] of all the different rectangles. for 3d make the radius the height....
  _tgotchi.tgotchiImage.pixelArray.forEach(function(entry) {
    graphicsShrineTgotchi.rectMode(CENTER);
    graphicsShrineTgotchi.rect(entry[0], entry[1], entry[2], entry[2]);
  });

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
    writeConsoleText(`Traumagotchi named ${keys[shrineTgotchiCounter]} is visiting DeepInTheMachineWorldTraumaCompostShrine`)
  } else if (shrineTgotchiX >= 42) {
    writeToConsoleBool = true;
    writeConsoleText(`( .⋅. shrine processing ${keys[shrineTgotchiCounter]} trauma .⋅. )`)
  }

  if (!tgotchiEntryComplete) {
    if (shrineTgotchiX < -34) {
      // console.log(actionX);
      moveShrineTgotchi(-33, 0.07);
    } else {
      // tgotchiEntryComplete = true;
      let tgotchiExitTimeout = setTimeout(function() {
        clearTimeout(tgotchiExitTimeout);
        tgotchiEntryComplete = true;
        // tgotchiVisitOver = true;
      }, 2000)
    }
  } else if (tgotchiEntryComplete) {
    moveShrineTgotchiEaseout(330, 0.002);

    if (shrineTgotchiX > 330) {
      shrineTgotchiCounter++;
      shrineTgotchiX = -200;
      tgotchiEntryComplete = false;

      // change console text here

      if (shrineTgotchiCounter == tgotchiDataArray.length) {
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
  // translate(-33, 25, 300);
  rotateX(angleTgotchi);
  rotateZ(angleTgotchi * 1.2);

  if (cubeEnabled) {
    box(shrineTgotchiDiameter);
  }
  if (coneEnabled) {
    box(shrineTgotchiDiameter / 5);
    cone(shrineTgotchiDiameter, Math.floor(shrineTgotchiDiameter * .62));
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

function drawCrystalGraphics() {

  // graphicsCrystal.background(200, 100, 0);
  graphicsCrystal.background(0, 10, 0);
  // graphicsCrystal.clear();

  graphicsCrystal.strokeWeight(0);
  graphicsCrystal.fill(0, 255, 0);

  // graphicsCrystal.stroke(0, 255, 0);
  // graphicsCrystal.rect(0, 0, 20, 20)
  let strArray = [`if (newlyFallenSnow === true) {
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


  let textAnimationFrame = Math.floor(frameCount / 6);

  if (textAnimationFrame != lastTextAnimationFrame) {
    machineWorldText = random(strArray)
  }


  lastTextAnimationFrame = textAnimationFrame;



  graphicsCrystal.text(machineWorldText, 0, 0, graphicsCrystal.width, graphicsCrystal.height);

  // graphicsCrystal.background(userData.tgotchiImage.backgroundColor[0], userData.tgotchiImage.backgroundColor[1], userData.tgotchiImage.backgroundColor[2]);
  //
  //
  // graphicsCrystal.fill(userData.tgotchiImage.pixelColor[0], userData.tgotchiImage.pixelColor[1], userData.tgotchiImage.pixelColor[2]);
  // graphicsCrystal.noStroke();
  // // graphicsCrystal.stroke(userData.tgotchiImage.pixelColor[0], userData.tgotchiImage.pixelColor[1], userData.tgotchiImage.pixelColor[2]);
  //
  // let stepSize = userData.tgotchiImage.pixelSize;
  //
  // // pixel array is [x, y, radius] of all the different rectangles. for 3d make the radius the height....
  // userData.tgotchiImage.pixelArray.forEach(function(entry) {
  //   graphicsCrystal.rectMode(CENTER);
  //   graphicsCrystal.rect(entry[0], entry[1], entry[2], entry[2]);
  // });

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
  texture(graphicsCrystal);
  // translate(0, 0, 0);
  translate(0, width / 9, -width * 3 / 2);
  box(graphicsCrystal.width * 1.5, graphicsCrystal.height * 1.5);
  pop();

}

function displayShrineCenter() {

  drawShrineGrid();
  drawCrystalGraphics();

  // directionalLight(60, 200, 360, -width / 4, -width / 4, -70)
  // // ambientLight(0, 0, 100)
  // directionalLight(120, 200, 360, width / 2, width / 2, -100)
  //
  // specularMaterial(255);
  // texture(graphicsCrystal);
  // normalMaterial();
  // ambientMaterial(10, 10, 10);
  ambientMaterial(0, 200, 0);



  push();
  translate(0, 100, -33);
  // translate(0, 0, 0);
  rotateY(angleTgotchi);
  rotateX(PI);
  model(machineWorldFeelingsCompostShrineCenter);
  pop();


  texture(graphicsCrystal);

  push();
  translate(100, -150, -250);
  rotateY(angleTgotchi);
  // box(100, 100, 10);

  rotateX(PI);
  translate(33, 60, 33);
  box(70, 70, 50);
  pop();

  push();
  translate(-120, 150, -250);
  rotateY(angleTgotchi);
  // box(100, 100, 10);

  rotateX(PI);
  translate(33, 60, 33);
  box(70, 70, 50);
  pop();

  push();
  translate(133, -150, -250);
  rotateY(-angleTgotchi);
  box(50, 50, 50);

  rotateX(PI);
  translate(-33, -60, 33);
  box(70, 70, 50);
  pop();


  // ambientMaterial(200, 100, 100);
  // texture(graphicsCrystal);
  // texture(graphics);

  let shrineTgotchiDiameter = 20;
  let jMax = 4;
  let iMax = 10; // for BAC
  // let iMax = 18;

  for (var j = 0; j < jMax; j++) {
    push();
    for (let i = 0; i < iMax; i++) {
      translate(sin(frameCount * 0.0005 + j) * 100, sin(frameCount * 0.0005 + j) * 100, i * 0.1);
      // translate(sin(frameCount * 0.00005 + j) * 50, sin(frameCount * 0.00005 + j) * 50, i * 0.1);
      // translate(sin(frameCount * 0.0000001 + j / 50), sin(frameCount * 0.0000001 + j / 50), i * 0.01 - 200);
      // translate(sin(frameCount * 0.0000001 + j / 50), sin(frameCount * 0.0000001 + j / 50), i * 0.01 - 200);
      rotateZ(frameCount * 0.0002);
      // translate(0, 0, 0);
      rotateY(angleTgotchi * 0.1);
      // sphere(20);


      if (tgotchiDataArray) {

        ambientMaterial(tgotchiDataArray[(j * iMax) + i].tgotchiImage.pixelColor[0], tgotchiDataArray[(j * iMax) + i].tgotchiImage.pixelColor[1], tgotchiDataArray[(j * iMax) + i].tgotchiImage.pixelColor[2]);
        // ambientMaterial(tgotchiDataArray[(j*iMax) + i].tgotchiImage.backgroundColor[0], tgotchiDataArray[(j*iMax) + i].tgotchiImage.backgroundColor[1], tgotchiDataArray[(j*iMax) + i].tgotchiImage.backgroundColor[2]);

        cubeEnabled = tgotchiDataArray[(j * iMax) + i].shape.cube;
        coneEnabled = tgotchiDataArray[(j * iMax) + i].shape.cone;
        sphereEnabled = tgotchiDataArray[(j * iMax) + i].shape.sphere;
        torusEnabled = tgotchiDataArray[(j * iMax) + i].shape.torus;
        ringEnabled = tgotchiDataArray[(j * iMax) + i].shape.ring;


        if (cubeEnabled) {
          box(shrineTgotchiDiameter);
          ambientMaterial(tgotchiDataArray[(j * iMax) + i].tgotchiImage.backgroundColor[0], tgotchiDataArray[(j * iMax) + i].tgotchiImage.backgroundColor[1], tgotchiDataArray[(j * iMax) + i].tgotchiImage.backgroundColor[2]);
        }
        if (coneEnabled) {
          box(shrineTgotchiDiameter / 5);
          cone(shrineTgotchiDiameter, Math.floor(shrineTgotchiDiameter * .62));
          ambientMaterial(tgotchiDataArray[(j * iMax) + i].tgotchiImage.backgroundColor[0], tgotchiDataArray[(j * iMax) + i].tgotchiImage.backgroundColor[1], tgotchiDataArray[(j * iMax) + i].tgotchiImage.backgroundColor[2]);
        }
        if (sphereEnabled) {
          ambientMaterial(tgotchiDataArray[(j * iMax) + i].tgotchiImage.backgroundColor[0], tgotchiDataArray[(j * iMax) + i].tgotchiImage.backgroundColor[1], tgotchiDataArray[(j * iMax) + i].tgotchiImage.backgroundColor[2]);
          sphere(shrineTgotchiDiameter * .62);
        }
        if (torusEnabled) {
          torus(shrineTgotchiDiameter / 2, shrineTgotchiDiameter / 2, 3, 3);
        }


        let rotateRing = sin((frameCount * .01) * 2) * .3;

        if (ringEnabled) {
          // push();
          rotateX(PI / 2);
          // rotateY(rotateRing);
          rotateY(angleTgotchi * -.3);
          rotateZ(angleTgotchi * 1.1);
          torus(shrineTgotchiDiameter * 1.2, shrineTgotchiDiameter * 0.05, 24, 10);
          // pop();
        }
      }
    }
    pop();
  }
  angleTgotchi += .01;
}

function displayCharm() {


  graphicsCharm.noStroke();
  graphicsCharm.background(0, 255, 0);
  // graphicsCharm.background(180, 360, 25);


  // leaving this draw2D function here as a declaration in case want to make a global function
  draw2DArray(graphicsCharm, charmGraphics[charmID], graphicsCharm.width / 16, graphicsCharm.width / 16);




  let moveCharmX = sin((frameCount * .01) * 2) * 10;
  let moveCharmY = sin((frameCount * .01) * 3) * 10;

  // bottom grid
  push();
  texture(graphicsCharm);
  translate(diameter + moveCharmX, diameter + moveCharmY, diameter / 2);
  rotateX(angleTgotchi);
  rotateY(angleTgotchi * 2);
  rotateZ(PI / 2);
  box(graphicsCharm.width / 2);
  // plane(graphicsGrid.width, graphicsGrid.height);
  pop();
}

function displayAction(_actionGraphicArray, _actionGraphicIndex) {

  // console.log('displaying animation');
  push();
  // normalMaterial();
  translate(actionX, actionY, actionZ);
  rotateX(actionAngle * .7);
  rotateY(actionAngle * 5);
  rotateZ(PI / 2);
  // console.log(_actionGraphicArray);
  texture(_actionGraphicArray[_actionGraphicIndex]);
  box(50);
  pop();

  if (actionAnimating && !swipeLeftComplete) {
    // actionX -= 5;
    if (actionX > -41) {
      // console.log(actionX);
      moveActionCube(-42, -33, 200, 0.07);
      actionAngle += 0.0033;
    } else {
      swipeLeftComplete = true;
    }
  } else if (actionAnimating && swipeLeftComplete) {
    if (actionX < -10) {
      // if (actionY < 0.5) {
      moveActionCube(0, 0, -80, 0.025);
      actionAngle += 0.02;
    } else {
      actionAnimating = false;
      swipeLeftComplete = false;
      actionX = 200;
      actionY = 0;

      actionZ = 200;
      actionAngle = 0;
      //  go back to initial menu when animation complete (this only gets triggered in one frame =p)
      printOnceBool = true; // so only writes actions to console once
      executeAction = 'careMenu';
      currentKey = 'initial';
      stateChange('mainMenu');
      nextMenu();
    }
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
