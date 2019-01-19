"use strict";


function displayCode() {
  codeSpan.innerHTML = codeArray[codeArrayIndex];
}

// these are triggered once from decision tree
function moreCode() {

  codeArrayIndex++;
  if (codeArrayIndex >= codeArray.length - 1) {
    codeArrayIndex = 0;
  }
  codeSpan.innerHTML = codeArray[codeArrayIndex];
}

function makeSparkly() {

  // sparkleOffset++;
  // if (sparkleOffset >= sparklesArray.length - 1) {
  //   sparkleOffset = 0;
  // }

  // codeSparkle.innerHTML = sparklesArray[0 + sparkleOffset] + sparklesArray[1 + sparkleOffset] + sparklesArray[0] + sparklesArray[0] + sparklesArray[0];

  sparkleOn = true;

  let delay = 333;

  let sparkleTimeout = setTimeout(function request() {
    clearTimeout(sparkleTimeout);
    if (sparkleOn == false) {
      // end sparkle, break recursive call
      codeSparkle.innerHTML = ``;
    } else {
      sparkleOffset++;
      if (sparkleOffset >= sparklesArray.length) {
        sparkleOffset = 0;
      }

      let sparkleString = ``;

      // for (let i = 0; i < sparklesArray.length; i++){
      // sparkleString += sparklesArray[(i + sparkleOffset) % (sparklesArray.length)];
      // // console.log(sparkleString);
      // }

      for (let i = 0; i < 45; i++) {
        sparkleString += sparklesArray[Math.floor(random(sparklesArray.length - 1))];
        // console.log(sparkleString);
      }

      codeSparkle.innerHTML = sparkleString;
      // codeSparkle.innerHTML = sparklesArray[(0 + sparkleOffset)%] + sparklesArray[1 + sparkleOffset] + sparklesArray[2 + sparkleOffset] + sparklesArray[3 + sparkleOffset] + sparklesArray[4 + sparkleOffset];
      sparkleTimeout = setTimeout(request, delay);
    }
  }, delay);
}

function stopSparkly() {
  sparkleOn = false;

}

let sparklesArray = [
  ` :                               ･ﾟ★                                   ,                             ｡   ･                                                          :       `,
  `✧                          ･     ﾟ                                                                         : *                                                 ✧･           ﾟ`,
  `ﾟ                           -: ✧ :-　　                                                               -: ✧ :                                                               -  `,
  `✧       ･     ﾟ              :                                                                                                   :   ･ﾟ                                      ★`,

  `:                                              ･ﾟ★                                                                                                                             , `,
  `･     ﾟ                                                                                                                       ✧･                ﾟ                            -`,
  `ﾟ                           ✮:▹　　                                                            ◃:                                                            ✮                 *`,
  `ﾟ                  +                                 .                                                                 .｡✮ﾟ                            +                         +`
];









// let sparklesArray = [`✧   ･     ﾟ   : *     ✧･ﾟ:      * 　　 *:･ﾟ    ✧    *      :･ﾟ       ✧
// .      ・        ゜゜・　　・   ゜   ゜   ・   ．
// ｡･    ﾟﾟ   ･　　･       ﾟﾟ         ･｡
// ｡･    :        *:   ･ﾟ★,    ｡   ･:*   :･ﾟ☆　　 ｡･:    *      :･    ﾟ★,｡･   :*:･ﾟ☆
// .・゜-: ✧ :-　　-: ✧ :-゜・．
// ⋇       ⋆✦      ⋆⋇　 ⋇          ⋆    ✦⋆⋇
// ❃.       ✮:▹　　◃: ✮     .    ❃
// ‧͙⁺˚*        *˚⁺‧͙
// .｡*     ﾟ+        .*  .｡　　　ﾟ+.     .｡*ﾟ+
// :        *:   ･ﾟ★,    ｡   ･:*   :･ﾟ☆　　 ｡･:    *      :･    ﾟ★,｡･   :*:･ﾟ☆
// -: ✧ :-　　-: ✧ :     -゜・．
//      ⋆✦      ⋆⋇　 ⋇          ⋆   ✦⋆ ⋇
//        ✮:▹　　◃: ✮     .    ❃
// ‧͙⁺˚*        *˚⁺‧͙
// .｡*     ﾟ +.   *   .   ｡　　　ﾟ+   ..   ｡   *   +`,
//
// `.      ・        ゜゜・　　・   ゜   ゜   ・   ．
// ｡･    ﾟﾟ   ･　　･       ﾟﾟ         ･｡
// ｡･    :        ✧:   ･ﾟ★,    ｡   ･:✧   :･ﾟ☆　　 ｡･:    ✧      :･    ﾟ★,｡･   :✧:･ﾟ☆
// .・゜-: ✧ :-　　-: ✧ :-゜・．
// ⋇       ⋆✦      ⋆⋇　 ⋇          ⋆    ✦⋆⋇
// ❃.       ✮:▹　　◃: ✮     .    ❃
// ‧͙⁺˚✧        ✧˚⁺‧͙
// .｡✧     ﾟ+        .✧  .｡　　　ﾟ+.     .｡✧ﾟ+
// :        ✧:   ･ﾟ★,    ｡   ･:✧   :･ﾟ☆　　 ｡･:    ✧      :･    ﾟ★,｡･   :✧:･ﾟ☆
// -: ✧ :-　　-: ✧ :     -゜・．
//      ⋆✦      ⋆⋇　 ⋇          ⋆   ✦⋆ ⋇
//        ✮:▹　　◃: ✮     .    ❃
// ‧͙⁺˚✧        ✧˚⁺‧͙
// .｡✧     ﾟ +.   ✧   .   ｡　　　ﾟ+   ..   ｡   ✧   +
// *   ･     ﾟ   : ✧     *･ﾟ:      ✧ 　　 ✧:･ﾟ    *    ✧      :･ﾟ       *`,
//
// `｡･    ﾟﾟ   ･　　･       ﾟﾟ         ･｡
// ｡･    :        ✮:   ･ﾟ★,    ｡   ･:✮   :･ﾟ☆　　 ｡･:    ✮      :･    ﾟ★,｡･   :✮:･ﾟ☆
// .・゜-: ✮ :-　　-: ✮ :-゜・．
// ⋇       ⋆✦      ⋆⋇　 ⋇          ⋆    ✦⋆⋇
// ❃.       ✮:▹　　◃: ✮     .    ❃
// ‧͙⁺˚✮        ✮˚⁺‧͙
// .｡✮     ﾟ+        .✮  .｡　　　ﾟ+.     .｡✮ﾟ+
// :        ✮:   ･ﾟ★,    ｡   ･:✮   :･ﾟ☆　　 ｡･:    ✮      :･    ﾟ★,｡･   :✮:･ﾟ☆
// -: ✮ :-　　-: ✮ :     -゜・．
//      ⋆✦      ⋆⋇　 ⋇          ⋆   ✦⋆ ⋇
//        ✮:▹　　◃: ✮     .    ❃
// ‧͙⁺˚✮        ✮˚⁺‧͙
// .｡✮     ﾟ +.   ✮   .   ｡　　　ﾟ+   ..   ｡   ✮   +
// *   ･     ﾟ   : ✮     *･ﾟ:      ✮ 　　 ✮:･ﾟ    *    ✮      :･ﾟ       *
// .      ・        ゜゜・　　・   ゜   ゜   ・   ．`,
//
// `｡･    :        ✮:   ･ﾟ★,    ｡   ･:✮   :･ﾟ☆　　 ｡･:    ✮      :･    ﾟ★,｡･   :✮:･ﾟ☆
// .・゜-: ✮ :-　　-: ✮ :-゜・．
// ⋇       ⋆✦      ⋆⋇　 ⋇          ⋆    ✦⋆⋇
// ❃.       ✮:▹　　◃: ✮     .    ❃
// ‧͙⁺˚✮        ✮˚⁺‧͙
// .｡✮     ﾟ+        .✮  .｡　　　ﾟ+.     .｡✮ﾟ+
// :        ✮:   ･ﾟ★,    ｡   ･:✮   :･ﾟ☆　　 ｡･:    ✮      :･    ﾟ★,｡･   :✮:･ﾟ☆
// -: ✮ :-　　-: ✮ :     -゜・．
//      ⋆✦      ⋆⋇　 ⋇          ⋆   ✦⋆ ⋇
//        ✮:▹　　◃: ✮     .    ❃
// ‧͙⁺˚✮        ✮˚⁺‧͙
// .｡✮     ﾟ +.   ✮   .   ｡　　　ﾟ+   ..   ｡   ✮   +
// *   ･     ﾟ   : ✮     *･ﾟ:      ✮ 　　 ✮:･ﾟ    *    ✮      :･ﾟ       *
// .      ・        ゜゜・　　・   ゜   ゜   ・   ．
// ｡･    ﾟﾟ   ･　　･       ﾟﾟ         ･｡`,
//
// `.・゜-: ✮ :-　　-: ✮ :-゜・．
// ⋇       ⋆✦      ⋆⋇　 ⋇          ⋆    ✦⋆⋇
// ❃.       ✮:▹　　◃: ✮     .    ❃
// ‧͙⁺˚✮        ✮˚⁺‧͙
// .｡✮     ﾟ+        .✮  .｡　　　ﾟ+.     .｡✮ﾟ+
// :        ✮:   ･ﾟ★,    ｡   ･:✮   :･ﾟ☆　　 ｡･:    ✮      :･    ﾟ★,｡･   :✮:･ﾟ☆
// -: ✮ :-　　-: ✮ :     -゜・．
//      ⋆✦      ⋆⋇　 ⋇          ⋆   ✦⋆ ⋇
//        ✮:▹　　◃: ✮     .    ❃
// ‧͙⁺˚✮        ✮˚⁺‧͙
// .｡✮     ﾟ +.   ✮   .   ｡　　　ﾟ+   ..   ｡   ✮   +
// *   ･     ﾟ   : ✮     *･ﾟ:      ✮ 　　 ✮:･ﾟ    *    ✮      :･ﾟ       *
// .      ・        ゜゜・　　・   ゜   ゜   ・   ．
// ｡･    ﾟﾟ   ･　　･       ﾟﾟ         ･｡
// ｡･    :        ✮:   ･ﾟ★,    ｡   ･:✮   :･ﾟ☆　　 ｡･:    ✮      :･    ﾟ★,｡･   :✮:･ﾟ☆`,
//
// `⋇       ⋆✦      ⋆⋇　 ⋇          ⋆    ✦⋆⋇
// ❃.       ✮:▹　　◃: ✮     .    ❃
// ‧͙⁺˚✮        ✮˚⁺‧͙
// .｡✮     ﾟ+        .✮  .｡　　　ﾟ+.     .｡✮ﾟ+
// :        ✮:   ･ﾟ★,    ｡   ･:✮   :･ﾟ☆　　 ｡･:    ✮      :･    ﾟ★,｡･   :✮:･ﾟ☆
// -: ✮ :-　　-: ✮ :     -゜・．
//      ⋆✦      ⋆⋇　 ⋇          ⋆   ✦⋆ ⋇
//        ✮:▹　　◃: ✮     .    ❃
// ‧͙⁺˚✮        ✮˚⁺‧͙
// .｡✮     ﾟ +.   ✮   .   ｡　　　ﾟ+   ..   ｡   ✮   +
// *   ･     ﾟ   : ✮     *･ﾟ:      ✮ 　　 ✮:･ﾟ    *    ✮      :･ﾟ       *
// .      ・        ゜゜・　　・   ゜   ゜   ・   ．
// ｡･    ﾟﾟ   ･　　･       ﾟﾟ         ･｡
// ｡･    :        ✮:   ･ﾟ★,    ｡   ･:✮   :･ﾟ☆　　 ｡･:    ✮      :･    ﾟ★,｡･   :✮:･ﾟ☆
// .・゜-: ✮ :-　　-: ✮ :-゜・．`,
//
// `❃.       ✮:▹　　◃: ✮     .    ❃
// ‧͙⁺˚✮        ✮˚⁺‧͙
// .｡✮     ﾟ+        .✮  .｡　　　ﾟ+.     .｡✮ﾟ+
// :        ✮:   ･ﾟ★,    ｡   ･:✮   :･ﾟ☆　　 ｡･:    ✮      :･    ﾟ★,｡･   :✮:･ﾟ☆
// -: ✮ :-　　-: ✮ :     -゜・．
//      ⋆✦      ⋆⋇　 ⋇          ⋆   ✦⋆ ⋇
//        ✮:▹　　◃: ✮     .    ❃
// ‧͙⁺˚✮        ✮˚⁺‧͙
// .｡✮     ﾟ +.   ✮   .   ｡　　　ﾟ+   ..   ｡   ✮   +
// *   ･     ﾟ   : ✮     *･ﾟ:      ✮ 　　 ✮:･ﾟ    *    ✮      :･ﾟ       *
// .      ・        ゜゜・　　・   ゜   ゜   ・   ．
// ｡･    ﾟﾟ   ･　　･       ﾟﾟ         ･｡
// ｡･    :        ✮:   ･ﾟ★,    ｡   ･:✮   :･ﾟ☆　　 ｡･:    ✮      :･    ﾟ★,｡･   :✮:･ﾟ☆
// .・゜-: ✮ :-　　-: ✮ :-゜・．
// ⋇       ⋆✦      ⋆⋇　 ⋇          ⋆    ✦⋆⋇`]

let codeArray = [`
  if (newlyFallenSnow === true) {
    let state = cleanSlate;
    if (traumaGrid.slimeShard === 1 && traumaGrid.sourNectar === 1) {
      waterwheel += dontPanic;
      glimpseHorizon(mindfulnessCheck, sacredKey, theSmellOfPaper, angelThoughts, oasisBreeze);
    } else if (traumaGrid.protectiveMask) {
      unveilCritter();
      ringOfKeys.hypocaust.transmigrationShard[forestNight]();
    } else {
      mindfulOfTime++
    }
  }

  if (worldNight == 'descending') {
    traumagrid.push(protectiveMask);
    angelThoughts("don't panic", "step well");
  } else if (forestNight == 'dawning') {
    unveilCritter();
    let worldTrees = [yewBranch, poplarBranch, ashBranch, sycamoreBranch];
  }
  pushMoreData(traumaGrid);

  if (gentlePoise <= manifestCharm) {
    gentlePoise++;
    glimpseHorizon();
  }

  vision.add(planeOfTortoise, planeOfHummingbird, planeOfSpirit);
  charms.add(charmSatchel, charmAbacus, charmGift, charmJostle, charmSheen);
  vision.add(planeOfTortoise, planeOfHummingbird, planeOfSpirit);

  slimeMorph('sky spirit');
  `, `

    slimeMorph('sky spirit');
    for (let clearBlueSky == actual; clearBlueSky <= manifestCharm; clearBlueSky++) {
      skySpirit += clearBlueSky;
      glimpseHorizon();
    }
    if (worldNight == 'descending') {
      traumagrid.push[protectiveMask];
      angelThoughts("don't panic", "step well");
    } else if (forestNight == 'dawning') {
      unveilCritter();
      let worldTrees = [yewBranch, poplarBranch, ashBranch, sycamoreBranch];
      scamperField = [auraHotSprings, auraEveningSky, auraSkyMatrix, auraCharm]
    }
  `,
  `
  planeOfSpirit = height / 2 / tan(PI / 6);

  charmDistance = diameter;

  aura = createGraphics(diameter + 20, diameter + 20);

  graphicsShrineTgotchi = createGraphics(diameter + 20, diameter + 20);

  auraEveningSky = createGraphics(diameter + 20, diameter + 20);

  auraHotSprings = createGraphics(width, width);

  auraCharm = createGraphics(diameter / 2, diameter / 2);

  chalkWordsRewrittenEveryDawn = createGraphics(diameter * 4, diameter * 4.5);

  aBoldInscribingToCommemorateTheRecentVision = createGraphics(diameter, diameter);

  thePhysicalFormOfTheShrineIsOnlyAnAnchorForWhatIsAlreadyThere = createGraphics(diameter * 3, diameter);

  for (let i = 0; i < 32; i++) {
    auraSkyMatrix[i] = [];
    for (let j = 0; j < 32; j++) {
      // set initial color value to background;
      auraSkyMatrix[i][j] = 0;
    }
  }
  `,
  `
yewBranch0.addEventListener("click", () => {
  dontPanic.style.display = "none";
  keySparklingBelowTheCurrent = tree[ruinsSparklingBelowTheCurrent].choices[0].nextKey;
  tree[ruinsSparklingBelowTheCurrent].choices[0].action();
  nextMenu();
});
poplarBranch1.addEventListener("click", () => {
  dontPanic.style.display = "none";
  keySparklingBelowTheCurrent = tree[ruinsSparklingBelowTheCurrent].choices[1].nextKey;
  tree[ruinsSparklingBelowTheCurrent].choices[1].action();
  nextMenu();
});
ashBranch2.addEventListener("click", () => {
  dontPanic.style.display = "none";
  keySparklingBelowTheCurrent = tree[ruinsSparklingBelowTheCurrent].choices[2].nextKey;
  tree[ruinsSparklingBelowTheCurrent].choices[2].action();
  nextMenu();
});
sycamoreBranch3.addEventListener("click", () => {
  dontPanic.style.display = "none";
  keySparklingBelowTheCurrent = tree[ruinsSparklingBelowTheCurrent].choices[3].nextKey;
  tree[ruinsSparklingBelowTheCurrent].choices[3].action();
  nextMenu();
});
  `, `
  aBucketForTheSnowAndOnlyTheHeatInYourHeartToMeltIt = document.querySelector("#releaseWordsButton");

  aBucketForTheSnowAndOnlyTheHeatInYourHeartToMeltIt.addEventListener("click", () => {
    wordsMeltLikeSnow = document.querySelector("#releaseWordsInput").value;
    returningToTheDarkAndSweetSeaFreeFromColdWhiteRigidity = true;
    if (!machinesOfLovingGays.isPlaying()) {
      machinesOfLovingGays.play();
    }
    setTimeout(function () {
      nurtureTrellis.style.display = "block";
      furrowsOfSnowLikeABlizzardFarm.style.display = "none";
    }, 2000);
  });

  howToMoveATreeWithoutTearingTheRoots = document.querySelector("#setIntentionButton");

  howToMoveATreeWithoutTearingTheRoots.addEventListener("click", () => {
    onlySeedsWhichNeverGrowNeedToBeLabeled = document.querySelector("#setIntentionInput").value;
    theLullBeforePlantingSeasonWhenTheEarthRefractsAndQuickens = true;
    if (!divingWhereTheMindIsClottedThickAndBlack.isPlaying()) {
      divingWhereTheMindIsClottedThickAndBlack.play();
    }
    setTimeout(function () {
      nurtureTrellis.style.display = "block";
      theBestWishesChangeWhenImmersedInTheSoil.style.display = "none";
    }, 2000);
  });
`, `
if (!sinkingIntoTectonicReveriesOfMagmaAndRift.isPlaying()) {
    sinkingIntoTectonicReveriesOfMagmaAndRift.setVolume(0.3);
    imaginingOneselfAsAnOrbOfCalmDespiteFloodOfLoudAngrySounds.setVolume(0.4);
    robotsWithLips.setVolume(0.4);
    aWoundOneCanSurvive.setVolume(0.4);
    aWoundThatMakesYouAwareOfChildhood.setVolume(0.4);
    aBlindAndHeavyRain.setVolume(0.3);
    brushedLightlyOnTheSpineByBranchesTheBloodFilledBonesOfTrees.setVolume(0.4);
    machinesOfLovingGays.setVolume(0.2);
    depressurizingCarefullySoWeDontBurstIntoGibsAfterAHardDay.setVolume(0.2);
    divingWhereTheMindIsClottedThickAndBlack.setVolume(0.2);
    aMachinesWayofShowingSadness.setVolume(0.2);
    safeInTheCarapaceGuidingBreathThroughTheTracheaLabyrinth.setVolume(0.4);
    aSuddenButWelcomeLucidity.setVolume(0.2);
    becomingAwareOfBecomingAware.setVolume(0.2);
    sound_wack.setVolume(0.2);
    sinkingIntoTectonicReveriesOfMagmaAndRift.loop();
  }
}`
];

// // older
// let codeArray = [`
//   if (newlyFallenSnow === true) {
//     let state = cleanSlate;
//     if (traumaGrid.slimeShard === 1 && traumaGrid.sourNectar === 1) {
//       waterwheel += dontPanic;
//       glimpseHorizon(mindfulnessCheck, sacredKey, theSmellOfPaper, angelThoughts, oasisBreeze);
//     } else if (traumaGrid.protectiveMask) {
//       unveilCritter();
//       ringOfKeys.hypocaust.transmigrationShard[forestNight]();
//     } else {
//       mindfulOfTime++
//     }
//   }
//
//   if (worldNight == 'descending') {
//     traumagrid.push(protectiveMask);
//     angelThoughts("don't panic", "step well");
//   } else if (forestNight == 'dawning') {
//     unveilCritter();
//     let worldTrees = [yewBranch, poplarBranch, ashBranch, sycamoreBranch];
//   }
//   pushMoreData(traumaGrid);
//
//   if (gentlePoise <= manifestCharm) {
//     gentlePoise++;
//     glimpseHorizon();
//   }
//
//   vision.add(planeOfTortoise, planeOfHummingbird, planeOfSpirit);
//   charms.add(charmSatchel, charmAbacus, charmGift, charmJostle, charmSheen);
//   vision.add(planeOfTortoise, planeOfHummingbird, planeOfSpirit);
//
//   slimeMorph('sky spirit');
//   `, `
//   else if (forestNight == 'dawning') {
//     unveilCritter();
//     let worldTrees = [yewBranch, poplarBranch, ashBranch, sycamoreBranch];
//   }
//   pushMoreData(traumaGrid);
//   `,
// `
//   slimeMorph('sky spirit');
//   for (let clearBlueSky == actual; clearBlueSky <= manifestCharm; clearBlueSky++) {
//     skySpirit += clearBlueSky;
//     glimpseHorizon();
//   }
//   if (worldNight == 'descending') {
//     traumagrid.push[protectiveMask];
//     angelThoughts("don't panic", "step well");
//   } else if (forestNight == 'dawning') {
//     unveilCritter();
//     let worldTrees = [yewBranch, poplarBranch, ashBranch, sycamoreBranch];
//     scamperField = [auraHotSprings, auraEveningSky, auraSkyMatrix, auraCharm]
//   }
//   `, `
//   function traumaDissolve() {
//     worldTree.add(
//       text: userInput; end: true;
//     )
//   }
//   vision.add(planeOfTortoise, planeOfHummingbird, planeOfSpirit);
//   charms.add(charmSatchel, charmAbacus, charmGift, charmJostle, charmSheen);
//   vision.add(planeOfTortoise, planeOfHummingbird, planeOfSpirit);
//
//   slimeMorph('sky spirit');
// `];
