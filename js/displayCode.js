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

      let sparkleString= ``;

      // for (let i = 0; i < sparklesArray.length; i++){
      // sparkleString += sparklesArray[(i + sparkleOffset) % (sparklesArray.length)];
      // // console.log(sparkleString);
      // }

      for (let i = 0; i < 45; i++){
      sparkleString += sparklesArray[Math.floor(random(sparklesArray.length - 1))];
      // console.log(sparkleString);
      }

      codeSparkle.innerHTML = sparkleString;
      // codeSparkle.innerHTML = sparklesArray[(0 + sparkleOffset)%] + sparklesArray[1 + sparkleOffset] + sparklesArray[2 + sparkleOffset] + sparklesArray[3 + sparkleOffset] + sparklesArray[4 + sparkleOffset];
      sparkleTimeout = setTimeout(request, delay);
    }
  }, delay)
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
  `ﾟ                  +                                 .                                                                 .｡✮ﾟ                            +                         +`,
  //
  // `  .*                       .                    ｡　　　ﾟ+                       .
  // ﾟ★                    ,                          ｡･   :                      *                 :･       ﾟ          ☆`,
  //
  // `                          :   ･ﾟ★,                     ｡   ･:        *           :･                    ﾟ              ☆　
  //  -: ✧ :-　　                                   -: ✧ :-                                                      ゜
  // `,
  //
  // `  .          *                       .                    ｡　　　ﾟ      +                       .
  // ﾟ    ★                    ,                          ｡･   :                      *                 :      ･        ﾟ          ☆
  //  ｡･                     : `,
  //
  //
  // `
  // ﾟ★                    ,                          ｡･   :                      *                 :･
  // .*                       .                    ｡　　　ﾟ+                       .
  //  ﾟ          ☆
  //  *:   ･ﾟ★                            , `,
]
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
  else if (forestNight == 'dawning') {
    unveilCritter();
    let worldTrees = [yewBranch, poplarBranch, ashBranch, sycamoreBranch];
  }
  pushMoreData(traumaGrid);
  `,
  `
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
  `, `
  function traumaDissolve() {
    worldTree.add(
      text: userInput; end: true;
    )
  }
  vision.add(planeOfTortoise, planeOfHummingbird, planeOfSpirit);
  charms.add(charmSatchel, charmAbacus, charmGift, charmJostle, charmSheen);
  vision.add(planeOfTortoise, planeOfHummingbird, planeOfSpirit);

  slimeMorph('sky spirit');
`
]
