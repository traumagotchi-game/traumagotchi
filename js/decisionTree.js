"use strict";

let tree = [{
    key: 'initial',
    choices: [{
      display: 'shrine',
      nextKey: 'deepInTheMachineWorld</br>traumaCompostShrine_0', // or initial
      action: function() {
        shrineTgotchiX = -200;
        stateChange('shrine');
      }
      // }, {
      //   display: 'community',
      //   nextKey: 'community_0', // or initial
      //   action: function() {
      //     communitySignup();
      //     stateChange('community');
      //   }
    }, {
      display: 'care',
      nextKey: 'care_0',
      action: function() {
        stateChange('care');
      }
    }, {
      display: 'play',
      nextKey: 'initial',
      action: function() {
        // lark: consolidate code: pull state = 'game' out of init funcitons for game
        selectGames();
        initGameBank();
      }
    }]
  },
  {
    key: 'deepInTheMachineWorld</br>traumaCompostShrine_0',
    choices: [{
      display: '(work in progress: very soon you can release words and leave charms here)',
      nextKey: 'deepInTheMachineWorld</br>traumaCompostShrine_0',
      action: function() {
        // toggleUserInputMenu(`release these words`, `RELEASE`);
      }
    }, {
      display: '...',
      nextKey: 'deepInTheMachineWorld</br>traumaCompostShrine_0',
      action: function() {
        // toggleUserInputMenu(`release these words`, `RELEASE`);
      }
    }, {
      display: 'ok, leave shrine',
      nextKey: 'initial',
      action: function() {
        state = 'care';
        // toggleUserInputMenu(`set your intention`, `CAST INTENTION`)
      }
    }]
  },
  {
    key: 'care_0',
    choices: [{
      display: 'eat',
      nextKey: 'eat_0',
      action: function() {}
    }, {
      display: 'rest',
      nextKey: 'rest_0',
      action: function() {}
    }, {
      display: 'bathe',
      nextKey: 'bathe_0',
      action: function() {}
    }]
  },
  {
    key: 'eat_0',
    choices: [{
      display: 'laughter',
      nextKey: 'eat_00',
      action: function() {}
    }, {
      display: '<3',
      nextKey: 'eat_01',
      action: function() {}
    }, {
      display: 'food',
      nextKey: 'eat_02',
      action: function() {}
    }]
  },
  {
    key: 'eat_00',
    choices: [{
      display: 'Chortle',
      nextKey: 'howOften',
      action: function() {
        actionFunction = chortle;
        lastActionName = 'chortle'; // name of action
        lastActionPastTense = 'chortled'; // past tense
        // lastActionInput =
      }
    }, {
      display: 'Hysterical spontaneous laughter that turns into tears.',
      nextKey: 'howOften',
      action: function() {
        actionFunction = laughterTears;
        lastActionName = 'Hysterical spontaneous laughter that turns into tears'; // name of action
        lastActionPastTense = 'Hysterical spontaneous laughter that turned into tears'; // past tense
        // lastActionInput =
      }
    }, {
      //   display: 'Titter',
      //   nextKey: 'howOften',
      //   action: function() {}
      // }, {
      display: 'I haven’t laughed for (5 + x) years.',
      nextKey: 'howOften',
      action: function() {
        actionFunction = haventLaughed;
        lastActionName = `not laughing`; // name of action
        lastActionPastTense = `hasn't laughted`; // past tense
        // lastActionInput =
      }
    }]
  },
  {
    key: 'eat_01',
    choices: [{
      display: 'Sea otter makes you a salad.',
      nextKey: 'howOften',
      action: function() {
        actionFunction = seaOtterSalad;
        lastActionName = `Sea otter makes you a salad`; // name of action
        lastActionPastTense = `Sea otter made you a salad`; // past tense
        // lastActionInput =
      }
    }, {
      display: 'Strange thing bonks into you and gives you hope for all strange things',
      nextKey: 'howOften',
      action: function() {
        actionFunction = strangeThing;
        lastActionName = `.。･:*♡◟༼ຈ 3 ຈ༽◞⌒♡*:･。. Strange thing bonks into you and gives you hope for all strange things`; // name of action
        lastActionPastTense = `.。･:*♡◟༼ຈ 3 ຈ༽◞⌒♡*:･。. Strange thing bonked into you and gave you hope for all strange things`; // past tense
        // lastActionInput =
      }
    }, {
      display: 'Puppers and kittens!', //inject a pupper into your eyeball
      nextKey: 'howOften',
      action: function() {
        actionFunction = puppers;
        lastActionName = `inject a pupper into your eyeball`; // name of action
        lastActionPastTense = `injected a pupper into your eyeball`; // past tense
        // lastActionInput =
      }
    }, ]
  },
  {
    key: 'eat_02', //FOOD
    choices: [{
        display: 'Kombucha transfusion',
        nextKey: 'howOften',
        action: function() {
          actionFunction = farmersMarket;
          lastActionName = `Kombucha transfusion`; // name of action
          lastActionPastTense = `got a Kombucha transfusion`; // past tense
          // lastActionInput =
        }
      }, {
        display: 'Hotdogs',
        nextKey: 'howOften',
        action: function() {
          actionFunction = hotDog;
          lastActionName = `hot dogs`; // name of action
          lastActionPastTense = `ate hot dog`; // past tense
          // lastActionInput =
        }
      },
      // {
      //   display: 'feed spirit', //animations could vary, showing Traumagotchi eating / not eating / puking / shitting =)
      //   nextKey: 'howOften',
      //   action: function() {
      //     actionFunction = complicated;
      //     lastActionName = `eat a ***!* thing`; // name of action
      //     lastActionPastTense = `ate a ***!* thing`; // past tense
      //     // lastActionInput =
      //   }
      // },
      {
        display: 'It’s complicated!', //animations could vary, showing Traumagotchi eating / not eating / puking / shitting =)
        nextKey: 'howOften',
        action: function() {
          actionFunction = complicated;
          lastActionName = `eat a ***!* thing`; // name of action
          lastActionPastTense = `ate a ***!* thing`; // past tense
          // lastActionInput =
        }
      },
    ]
  },
  {
    key: 'rest_0',
    choices: [{
      display: 'Cry',
      nextKey: 'rest_00',
      action: function() {}
    }, {
      display: 'Sink',
      nextKey: 'rest_01',
      action: function() {}
    }, {
      display: 'Slumber',
      nextKey: 'rest_02',
      action: function() {}
    }]
  },
  {
    key: 'rest_00', //cry
    choices: [{
        display: 'A single huge tear.',
        nextKey: 'howOften',
        action: function() {
          actionFunction = singleHugeTear;
          lastActionName = `a single huge tear`; // name of action
          lastActionPastTense = `released a single huge tear`; // past tense
          // lastActionInput =
        }
      },
      {
        display: 'A brisk 5 seconds of crying and then lunch.',
        nextKey: 'howOften',
        action: function() {
          actionFunction = brisk;
          lastActionName = `brisk 5 seconds of crying and then lunch`; // name of action
          lastActionPastTense = `had a brisk 5 seconds of crying and then lunch`; // past tense
          // lastActionInput =
        }
      },
      {
        display: 'Tears like a nail bomb.',
        nextKey: 'howOften',
        action: function() {
          actionFunction = tearsLikeNails;
          lastActionName = `tears like a nail bomb`; // name of action
          lastActionPastTense = `Dropped tears like a nail bomb`; // past tense
          // lastActionInput =
        }
      },
    ]
  },

  {
    key: 'rest_01', //Sink
    choices: [{
        display: '(into slime)', //SLIME ANIMATION!!! How deep can you go before you feel scared? Before you feel safe? (Warm as a hydrothermal vent.)
        nextKey: 'howOften',
        action: function() {
          actionFunction = slime;
          lastActionName = `sink into slime`; // name of action
          lastActionPastTense = `sunk into slime`; // past tense
          // lastActionInput =
        }
      },
      {
        display: '420 666 lmao',
        nextKey: 'howOften',
        action: function() {
          actionFunction = fourTwenty;
          lastActionName = `420 666 lmao`; // name of action
          lastActionPastTense = `420 666 lmao'd`; // past tense
          // lastActionInput =
        }
      },
      {
        display: 'self-harm of choice',
        nextKey: 'howOften',
        action: function() {
          actionFunction = selfHarm;
          lastActionName = `self-harm of choice`; // name of action
          lastActionPastTense = `self-harm of choiced`; // past tense
          // lastActionInput =
        }
      },
    ]
  },

  {
    key: 'rest_02', //Slumber
    choices: [{
        display: 'Unplug', //options would appear as text in animation)
        nextKey: 'howOften',
        action: function() {
          actionFunction = disassociate;
          lastActionName = `unplug`; // name of action
          lastActionPastTense = `unplugged`; // past tense
          // lastActionInput =
        }
      },
      {
        display: 'Sleep', //animation would be an actually rolling of the dice
        nextKey: 'howOften',
        action: function() {
          actionFunction = sleep;
          lastActionName = `sleep`; // name of action
          lastActionPastTense = `slept`; // past tense
          // lastActionInput =
        }
      },
      {
        display: 'Dream of something.', //state intention for dream in use input
        nextKey: 'howOften',
        action: function() {
          actionFunction = dream;
          lastActionName = `dream of something`; // name of action
          lastActionPastTense = `dreamt of something`; // past tense
          // lastActionInput =
        }
      },
    ]
  },
  {
    key: 'bathe_0',
    choices: [{
      display: 'Makeover',
      nextKey: 'bathe_00',
      action: function() {}
    }, {
      display: 'Splash splash',
      nextKey: 'bathe_01',
      action: function() {}
    }, {
      display: 'Cerebral flush',
      nextKey: 'bathe_02',
      action: function() {}
    }]
  },
  {
    key: 'bathe_00', //sweat
    choices: [{
      display: 'Next level: abstract',
      nextKey: 'howOften',
      action: function() {
        actionFunction = abstract;
        lastActionName = `next level look`; // name of action
        lastActionPastTense = `next leveled its look`; // past tense
        // lastActionInput =
      }
    }, {
      display: 'Moisturizer',
      nextKey: 'howOften',
      action: function() {
        actionFunction = moisturizer;
        lastActionName = `moisturize`; // name of action
        lastActionPastTense = `moisturized`; // past tense
        // lastActionInput =
      }
    }, {
      display: 'Just a new look',
      nextKey: 'howOften',
      action: function() {
        actionFunction = newLook;
        lastActionName = `get new look`; // name of action
        lastActionPastTense = `got a new look`; // past tense
        // lastActionInput =
      }
    }, ]
  },

  {
    key: 'bathe_01', //Splash Splash
    choices: [{
        display: 'Hot tub',
        nextKey: 'howOften',
        action: function() {
          actionFunction = hotTub;
          lastActionName = `hot tub`; // name of action
          lastActionPastTense = `hot tubbed`; // past tense
          // lastActionInput =
        }
      },
      {
        display: 'Ocean',
        nextKey: 'howOften',
        action: function() {
          actionFunction = ocean;
          lastActionName = `get in ocean`; // name of action
          lastActionPastTense = `got in ocean`; // past tense
          // lastActionInput =
        }
      },
      {
        display: 'Sewer',
        nextKey: 'howOften',
        action: function() {
          actionFunction = sewer;
          lastActionName = `bathe in the sewer`; // name of action
          lastActionPastTense = `bathed in the sewer`; // past tense
          // lastActionInput =
        }
      },
    ]
  },


  {
    key: 'bathe_02', //float
    choices: [{
        display: 'Repeat mantra ', //User Input
        nextKey: 'howOften',
        action: function() {
          actionFunction = mantra;
          lastActionName = `repeat mantra`; // name of action
          lastActionPastTense = `repeated mantra`; // past tense
          // lastActionInput =
        }
      },
      {
        display: 'Scream', //User Input
        nextKey: 'howOften',
        // nextKey: 'userInput',
        action: function() {
          actionFunction = scream;
          lastActionName = 'scream'; // name of action
          lastActionPastTense = 'screamed'; // action Name
          // change this to userInput
          lastActionInput = 'aaaAAAaaaaaarrr';
        }
      },
      {
        display: 'Catwalk speed strut?',
        nextKey: 'howOften',
        action: function() {
          actionFunction = catwalk;
          lastActionName = ``; // name of action
          lastActionPastTense = ``; // past tense
          // lastActionInput =
        }
      },
    ]
  },
  // {
  //   key: 'play_0',
  //   choices: [{
  //     display: 'HTML5 games',
  //     nextKey: 'play_00',
  //     action: function() {
  //
  //     }
  //   }, {
  //     display: 'P5 games',
  //     nextKey: 'play_01',
  //     action: function() {
  //
  //     }
  //   }, {
  //     display: 'p5template',
  //     nextKey: 'initial',
  //     action: function() {
  //       initP5templateGame();
  //     }
  //   }, {
  //     display: 'breakout',
  //     nextKey: 'initial',
  //     action: function() {
  //       initBreakoutGame();
  //     }
  //   }]
  // },
  // {
  //   key: 'play_00',
  //   choices: [{
  //     display: 'collapse',
  //     nextKey: 'initial',
  //     action: function() {
  //       initCollapseGame();
  //     }
  //   }, {
  //     display: 'platform drop',
  //     nextKey: 'initial',
  //     action: function() {
  //       initPlatformDropGame();
  //     }
  //   }, {
  //     display: 'GAME BANK',
  //     nextKey: 'initial',
  //     action: function() {
  //       selectGames();
  //       initGameBank();
  //     }
  //   }, {
  //     display: 'in dev',
  //     nextKey: 'initial',
  //     action: function() {
  //
  //     }
  //   }]
  // },
  // {
  //   key: 'play_01',
  //   choices: [{
  //     display: 'SCHMUP',
  //     nextKey: 'initial',
  //     action: function() {
  //       initSchmupGame();
  //     }
  //   }, {
  //     display: 'wacky mole',
  //     nextKey: 'initial',
  //     action: function() {
  //       initWackymoleGame();
  //     }
  //   }, {
  //     display: 'PLUCK',
  //     nextKey: 'initial',
  //     action: function() {
  //       initPluckGame();
  //     }
  //   }, {
  //     display: 'SNAKE',
  //     nextKey: 'initial',
  //     action: function() {
  //       initSnakeGame();
  //     }
  //   }]
  // },
  {
    key: 'howOften',
    choices: [{
        display: 'just once',
        // make this go tonhow often before initial
        nextKey: 'initial',
        action: function() {
          lastActionInput = null;

          actionFunction();
        }
      },
      {
        display: 'hourly',
        nextKey: 'howOften',
        action: function() {
          // change this
          let hourlyCost = 150;

          if (userData.points >= hourlyCost) {

            userData.points -= hourlyCost;
            pushMoreData({
              points: userData.points
            })

            pointStats.innerHTML = `${userData.points} points`;

            let newActionsHourly = {
              action: lastActionName,
              actionPastTense: lastActionPastTense,
              initialTimestamp: Date.now()
            }

            if (lastActionInput) {
              newActionsHourly.input = lastActionInput;
            };
            userData.actionsHourly.push(newActionsHourly);
            rewriteData('actionsHourly', userData.actionsHourly);
            lastActionInput = null;
            actionFunction();

            congratsAlert('hour', hourlyCost);

          } else {
            sorryNeedPoints(hourlyCost);
          }
        }
      },
      {
        display: 'every five minutes',
        nextKey: 'howOften',
        action: function() {
          let fiveMinuteCost = 500;
          if (userData.points >= fiveMinuteCost) {

            userData.points -= fiveMinuteCost;
            pushMoreData({
              points: userData.points
            });
            pointStats.innerHTML = `${userData.points} points`;

            let newActionsFiveMinutes = {
              action: lastActionName,
              actionPastTense: lastActionPastTense,
              initialTimestamp: Date.now()
            }

            if (lastActionInput) {
              newActionsFiveMinutes.input = lastActionInput;
            };

            userData.actionsFiveMinutes.push(newActionsFiveMinutes);
            rewriteData('actionsFiveMinutes', userData.actionsFiveMinutes);
            lastActionInput = null;
            actionFunction();

            congratsAlert('five minutes', fiveMinuteCost);

          } else {
            sorryNeedPoints(fiveMinuteCost);
          }
        }
      }
    ]
  },
  {
    // LARK will have to format this so that it creates an input field and button will submit response and pushe it to
    key: 'userInput',
    choices: [{
        display: 'just once',
        // make this go tonhow often before initial
        nextKey: 'initial',
        action: function() {}
      },
      {
        display: 'hourly',
        nextKey: 'howOften',
        action: function() {}
      },
      {
        display: 'every five minutes',
        nextKey: 'howOften',
        action: function() {}
      }
    ]
  }
];

function nextMenu() {

  for (let i = 0; i < treeLength; i++) {
    if (currentKey === tree[i].key) {

      // // original menu (doesn't account for 3 instead of 4 display options)
      // choice0.innerHTML = tree[i].choices[0].display;
      // choice1.innerHTML = tree[i].choices[1].display;
      // choice2.innerHTML = tree[i].choices[2].display;
      // choice3.innerHTML = tree[i].choices[3].display;



      // // // (simplest solution) toggles on and off fourth option depending if one is provided in the tree.
      // // // if (option exists){ then show it! }
      // if (tree[i].choices[3]) {
      //   choice0.innerHTML = tree[i].choices[0].display;
      //   choice1.innerHTML = tree[i].choices[1].display;
      //   choice2.innerHTML = tree[i].choices[2].display;
      //   choice3.style.display = "block";
      //   choice3.innerHTML = tree[i].choices[3].display;
      // } else {
      //   choice0.innerHTML = tree[i].choices[0].display;
      //   choice1.innerHTML = tree[i].choices[1].display;
      //   choice2.innerHTML = tree[i].choices[2].display;
      //   choice3.style.display = "none";
      // }

      // if inside a care menu (eat, rest, bathe), this displays menu title at top....
      // buggy causes a little flash as the display settings turn on and off....
      // to view, activate/uncomment button with id "menuTitle" in HTML

      if (tree[i].choices[3]) {
        choiceMenuTitle.style.display = "none";
        choice0.innerHTML = tree[i].choices[0].display;
        choice1.innerHTML = tree[i].choices[1].display;
        choice2.innerHTML = tree[i].choices[2].display;
        choice3.style.display = "block";
        choice3.innerHTML = tree[i].choices[3].display;
      } else if (tree[i].key == 'initial') {
        choiceMenuTitle.style.display = "none";
        choice0.innerHTML = tree[i].choices[0].display;
        choice1.innerHTML = tree[i].choices[1].display;
        choice2.innerHTML = tree[i].choices[2].display;
        choice3.style.display = "none";
      } else {
        // use global variable for colors here... (color3)
        // need to make it so choice0 doesn't indent with mouseOver
        choiceMenuTitle.style.display = "block";
        choiceMenuTitle.style.backgroundColor = '#00aa00';
        choiceMenuTitle.style.color = '#000';
        choiceMenuTitle.innerHTML = getMenuName(tree[i].key);

        choice0.innerHTML = tree[i].choices[0].display;
        choice1.innerHTML = tree[i].choices[1].display;
        choice2.innerHTML = tree[i].choices[2].display;
        choice3.style.display = "none";
      }


      // // trying to see if menu title could be at bottom (!) little weird. would have to disable button click for it...
      // if (tree[i].choices[3]) {
      //   choice0.innerHTML = tree[i].choices[0].display;
      //   choice1.innerHTML = tree[i].choices[1].display;
      //   choice2.innerHTML = tree[i].choices[2].display;
      //   choice3.innerHTML = tree[i].choices[3].display;
      // } else {
      //   choice0.innerHTML = tree[i].choices[0].display;
      //   choice1.innerHTML = tree[i].choices[1].display;
      //   choice2.innerHTML = tree[i].choices[2].display;
      //   choice3.style.textAlign = 'right';
      //   choice3.innerHTML = getMenuName(tree[i].key);
      // }


      currentIndex = i;

    }
  }
}

function getMenuName(key) {
  // this is why the keys were named this way! using the split method for strings, we can split the keys by '_' to just get the name of the parent menu
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split
  let menuName = key.split('_')[0];
  // return value in all caps
  return menuName.toUpperCase();
}

function toggleUserInputMenu(_title, _buttonText){
  careMenu.style.display = "none";
  userInputMenu.style.display = "block";
}

function writeAction2Console(action) {
  writeConsoleText(`${userName} is "${action}"`)
}

function sorryNeedPoints(_numberPoints) {
  alertMenu.innerHTML = `sorry you need ${_numberPoints} points for that`
  alertMenu.style.display = "block";
  // setTimeout(function() {
  //   alertMenu.style.display = "none";
  // }, 3000)
}


function congratsAlert(_type, _numberPoints) {
  alertMenu.innerHTML = `recurring every ${_type}. <br> using: ${_numberPoints} points`
  alertMenu.style.display = "block";
  setTimeout(function() {
    alertMenu.style.display = "none";
  }, 3000)
}


// functions for key eat_00
function chortle() {

  writeToConsoleBool = true;
  writeConsoleText(`chortle!!!`);

  if (chortleImgsIndex < chortleImgs.length - 1) {
    chortleImgsIndex++;
  } else {

    chortleImgsIndex = 0;
  }

  actionAnimating = true;
  executeAction = 'chortle';
}

function laughterTears() {

  writeToConsoleBool = true;
  writeConsoleText(`Waaahahahahah!!!`);


  if (laughterTearsImgsIndex < laughterTearsImgs.length - 1) {
    laughterTearsImgsIndex++;
  } else {
    laughterTearsImgsIndex = 0;
  }

  actionAnimating = true;
  executeAction = 'laughterTears';
}

function haventLaughed() {
  writeToConsoleBool = true;
  writeConsoleText(`No laughing`);


  if (haventLaughedImgsIndex < haventLaughedImgs.length - 1) {
    haventLaughedImgsIndex++;
  } else {
    haventLaughedImgsIndex = 0;
  }

  actionAnimating = true;
  executeAction = 'haventLaughed';
}

function seaOtterSalad() {
  writeToConsoleBool = true;
  writeConsoleText(`Awwwwwww`);

  if (seaOtterSaladImgsIndex < seaOtterSaladImgs.length - 1) {
    seaOtterSaladImgsIndex++;
  } else {
    seaOtterSaladImgsIndex = 0;
  }

  actionAnimating = true;
  executeAction = 'seaOtterSalad';
}

function strangeThing() {
  writeToConsoleBool = true;
  writeConsoleText(`Some kind of . . . cat.
`);

  if (strangeThingImgsIndex < strangeThingImgs.length - 1) {
    strangeThingImgsIndex++;
  } else {
    strangeThingImgsIndex = 0;
  }

  actionAnimating = true;
  executeAction = 'strangeThing';
}

function puppers() {
  writeToConsoleBool = true;
  writeConsoleText(`inject a pupper into your eyeball`);

  if (puppersImgsIndex < puppersImgs.length - 1) {
    puppersImgsIndex++;
  } else {
    puppersImgsIndex = 0;
  }

  actionAnimating = true;
  executeAction = 'puppers';
}

function farmersMarket() {
  writeToConsoleBool = true;
  writeConsoleText(`Freshly gentrified farmers market`);

  actionAnimating = true;
  executeAction = 'farmersMarket';

  if (farmersMarketImgsIndex < farmersMarketImgs.length - 1) {
    farmersMarketImgsIndex++;
  } else {
    farmersMarketImgsIndex = 0;
  }
}

function hotDog() {
  writeToConsoleBool = true;
  writeConsoleText(`Classic.`);

  actionAnimating = true;
  executeAction = 'hotDog';

  if (hotDogImgsIndex < hotDogImgs.length - 1) {
    hotDogImgsIndex++;
  } else {
    hotDogImgsIndex = 0;
  }
}

function complicated() {
  writeToConsoleBool = true;
  writeConsoleText(`Sweet as pie and ready to die
`);

  actionAnimating = true;
  executeAction = 'complicated';

  if (complicatedImgsIndex < complicatedImgs.length - 1) {
    complicatedImgsIndex++;
  } else {
    complicatedImgsIndex = 0;
  }
}

function singleHugeTear() {
  writeToConsoleBool = true;
  writeConsoleText(`How precise!`);

  actionAnimating = true;
  executeAction = 'singleHugeTear';

  if (singleHugeTearImgsIndex < singleHugeTearImgs.length - 1) {
    singleHugeTearImgsIndex++;
  } else {
    singleHugeTearImgsIndex = 0;
  }
}

function brisk() {
  writeToConsoleBool = true;
  writeConsoleText(`cmd r`);

  actionAnimating = true;
  executeAction = 'brisk';

  if (briskImgsIndex < briskImgs.length - 1) {
    briskImgsIndex++;
  } else {
    briskImgsIndex = 0;
  }
}

function tearsLikeNails() {
  writeToConsoleBool = true;
  writeConsoleText(`Lachrymosal enema`);

  actionAnimating = true;
  executeAction = 'tearsLikeNails';

  if (tearsLikeNailsImgsIndex < tearsLikeNailsImgs.length - 1) {
    tearsLikeNailsImgsIndex++;
  } else {
    tearsLikeNailsImgsIndex = 0;
  }
}

function slime() {
  writeToConsoleBool = true;
  writeConsoleText(`Warm as a hydrothermal vent.`);

  actionAnimating = true;
  executeAction = 'slime';

  if (slimeImgsIndex < slimeImgs.length - 1) {
    slimeImgsIndex++;
  } else {
    slimeImgsIndex = 0;
  }
}

function fourTwenty() {
  writeToConsoleBool = true;
  writeConsoleText(`YOM YOM YOM`);

  actionAnimating = true;
  executeAction = 'fourTwenty';

  if (fourTwentyImgsIndex < fourTwentyImgs.length - 1) {
    fourTwentyImgsIndex++;
  } else {
    fourTwentyImgsIndex = 0;
  }
}

function selfHarm() {
  writeToConsoleBool = true;
  writeConsoleText(`no judgement here`);

  actionAnimating = true;
  executeAction = 'selfHarm';

  if (selfHarmImgsIndex < selfHarmImgs.length - 1) {
    selfHarmImgsIndex++;
  } else {
    selfHarmImgsIndex = 0;
  }
}

function disassociate() {
  writeToConsoleBool = true;
  writeConsoleText(`Sometimes you have to abandon your mech suit for a little while`);

  actionAnimating = true;
  executeAction = 'disassociate';

  if (disassociateImgsIndex < disassociateImgs.length - 1) {
    disassociateImgsIndex++;
  } else {
    disassociateImgsIndex = 0;
  }
}

function sleep() {
  writeToConsoleBool = true;
  writeConsoleText(`It thinks it was dreaming, but can’t remember what it was`);

  actionAnimating = true;
  executeAction = 'sleep';

  if (sleepImgsIndex < sleepImgs.length - 1) {
    sleepImgsIndex++;
  } else {
    sleepImgsIndex = 0;
  }
}

function dream() {
  writeToConsoleBool = true;
  writeConsoleText(`A pristine, regenerating dream.
`);

  actionAnimating = true;
  executeAction = 'dream';

  if (dreamImgsIndex < dreamImgs.length - 1) {
    dreamImgsIndex++;
  } else {
    dreamImgsIndex = 0;
  }
}

function abstract() {
  writeToConsoleBool = true;
  writeConsoleText(`sdafhkashdfnjk
`);

  actionAnimating = true;
  executeAction = 'abstract';

  if (abstractImgsIndex < abstractImgs.length - 1) {
    abstractImgsIndex++;
  } else {
    abstractImgsIndex = 0;
  }
}

function moisturizer() {
  writeToConsoleBool = true;
  writeConsoleText(`sdafhkashdfnjk`);

  actionAnimating = true;
  executeAction = 'moisturizer';

  if (moisturizerImgsIndex < moisturizerImgs.length - 1) {
    moisturizerImgsIndex++;
  } else {
    moisturizerImgsIndex = 0;
  }
}

function newLook() {
  writeToConsoleBool = true;
  writeConsoleText(`fun!`);

  actionAnimating = true;
  executeAction = 'newLook';

  if (newLookImgsIndex < newLookImgs.length - 1) {
    newLookImgsIndex++;
  } else {
    newLookImgsIndex = 0;
  }
}

function hotTub() {
  writeToConsoleBool = true;
  writeConsoleText(`My body is already 100% water.`);

  actionAnimating = true;
  executeAction = 'hotTub';

  if (hotTubImgsIndex < hotTubImgs.length - 1) {
    hotTubImgsIndex++;
  } else {
    hotTubImgsIndex = 0;
  }
}

function ocean() {
  writeToConsoleBool = true;
  writeConsoleText(`sweet saline`);

  actionAnimating = true;
  executeAction = 'ocean';

  if (oceanImgsIndex < oceanImgs.length - 1) {
    oceanImgsIndex++;
  } else {
    oceanImgsIndex = 0;
  }
}

function sewer() {
  writeToConsoleBool = true;
  writeConsoleText(`seeewwwwwww clean`);

  actionAnimating = true;
  executeAction = 'sewer';

  if (sewerImgsIndex < sewerImgs.length - 1) {
    sewerImgsIndex++;
  } else {
    sewerImgsIndex = 0;
  }
}

function mantra() {
  writeToConsoleBool = true;
  writeConsoleText(`[insert mantra of choice] [insert mantra of choice]  [insert mantra of choice]  [insert mantra of choice]  [insert mantra of choice]  [insert mantra of choice]  [insert mantra of choice]  [insert mantra of choice]  [insert mantra of choice]  [insert mantra of choice]  `);

  actionAnimating = true;
  executeAction = 'mantra';

  if (mantraImgsIndex < mantraImgs.length - 1) {
    mantraImgsIndex++;
  } else {
    mantraImgsIndex = 0;
  }
}


function scream() {
  writeToConsoleBool = true;
  writeConsoleText(`gaaaaarrrrrrrrrrrrrrrrrrr rrrrrrrrrrrrrrrrr rrrrrrrrrrrr aaaaaaarrrrrrrr aaaaaaaaggghhhggggggggaaaaaarrrr aaaaaa rrrr </br> FUCK!!!!!  </br> OH GOD NO  </br> AGHHHHHHHHHHHH`);

  if (screamImgsIndex < screamImgs.length - 1) {
    screamImgsIndex++;
  } else {
    screamImgsIndex = 0;
  }

  actionAnimating = true;
  executeAction = 'scream';
}

function catwalk() {
  writeToConsoleBool = true;
  writeConsoleText(`strut-strut`);

  if (catwalkImgsIndex < catwalkImgs.length - 1) {
    catwalkImgsIndex++;
  } else {
    catwalkImgsIndex = 0;
  }

  actionAnimating = true;
  executeAction = 'catwalk';
}
