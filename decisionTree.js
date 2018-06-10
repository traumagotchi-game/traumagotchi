let tree = [{
    key: 'initial',
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
    }, {
      display: 'play',
      nextKey: 'play_0',
      action: function() {}
    }]
  },
  {
    key: 'eat_0',
    choices: [{
      display: 'laughter',
      nextKey: 'eat_00',
      action: function() {
        laughter();
      }
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
      display: 'titter',
      // make this go tonhow often before initial
      nextKey: 'howOften',
      action: function() {
        titter();
      }
    }, {
      display: 'Hysterical spontaneous laughter that turns into tears.',
      nextKey: 'howOften',
      action: function() {}
    }, {
      display: 'Chortle',
      nextKey: 'howOften',
      action: function() {}
    }, {
      display: 'I haven’t laughed for (5 + x) years.',
      nextKey: 'howOften',
      action: function() {}
    }]
  },
  {
    key: 'eat_01',
    choices: [{
      display: 'Sea otter makes you a salad.',
      nextKey: 'howOften',
      action: function() {}
    }, {
      display: 'Strange thing bonks into you and gives you hope for all strange things.',
      nextKey: 'howOften',
      action: function() {}
    }, {
      display: 'Puppers and kittens!', //inject a pupper into your eyeball
      nextKey: 'howOften',
      action: function() {}
    }, ]
  },
  {
    key: 'eat_02', //FOOD
    choices: [{
      display: 'Kombucha transfusion',
      nextKey: 'howOften',
      action: function() {}
    }, {
      display: 'Hotdogs',
      nextKey: 'howOften',
      action: function() {}
    }, {
      display: 'It’s complicated!', //animations could vary, showing Traumagotchi eating / not eating / puking / shitting =)
      nextKey: 'howOften',
      action: function() {}
    }, ]
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
      action: function() {}
    }, {
      display: 'A brisk 5 seconds of crying and then lunch.',
      nextKey: 'howOften',
      action: function() {}
    }, {
      display: 'Tears like a nail bomb.',
      nextKey: 'howOften',
      action: function() {}
    }, ]
  },

  {
    key: 'rest_01', //Sink
    choices: [{
      display: '(into slime)', //SLIME ANIMATION!!! How deep can you go before you feel scared? Before you feel safe? (Warm as a hydrothermal vent.)
      nextKey: 'howOften',
      action: function() {}
    }, {
      display: '420 666 lmao',
      nextKey: 'howOften',
      action: function() {}
    }, {
      display: 'Drug of choice.',
      nextKey: 'howOften',
      action: function() {}
    }, ]
  },

  {
    key: 'rest_02', //Slumber
    choices: [{
      display: 'Unplug', //options would appear as text in animation)
      nextKey: 'howOften',
      action: function() {}
    }, {
      display: 'Roll the dice', //animation would be an actually rolling of the dice
      nextKey: 'howOften',
      action: function() {}
    }, {
      display: 'Dream of something.', //state intention for dream in use input
      nextKey: 'howOften',
      action: function() {}
    }, ]
  },
  {
    key: 'bathe_0',
    choices: [{
      display: 'Sweat',
      nextKey: 'bathe_00',
      action: function() {}
    }, {
      display: 'Float',
      nextKey: 'bathe_01',
      action: function() {}
    }, {
      display: 'Splash Splash',
      nextKey: 'bathe_02',
      action: function() {}
    }]
  },
  {
    key: 'bathe_00', //sweat
    choices: [{
      display: 'Catwalk speed strut',
      nextKey: 'howOften',
      action: function() {}
    }, {
      display: 'Gym/Sauna',
      nextKey: 'howOften',
      action: function() {}
    }, {
      display: 'Sweaty palms',
      nextKey: 'howOften',
      action: function() {}
    }, ]
  },

  {
    key: 'bathe_01', //float
    choices: [{
      display: 'Repeat mantra ', //User Input
      nextKey: 'howOften',
      action: function() {}
    }, {
      display: 'Scream', //User Input
      nextKey: 'howOften',
      action: function() {}
    }, {
      display: 'Disassociate / Daydreaming',
      nextKey: 'howOften',
      action: function() {}
    }, ]
  },

  {
    key: 'bathe_02', //Splash Splash
    choices: [{
      display: 'Hot tub',
      nextKey: 'howOften',
      action: function() {}
    }, {
      display: 'Ocean',
      nextKey: 'howOften',
      action: function() {}
    }, {
      display: 'Sewer',
      nextKey: 'howOften',
      action: function() {}
    }, ]
  },


  {
    key: 'play_0',
    choices: [{
      display: 'HTML5 games',
      nextKey: 'play_00',
      action: function() {

      }
    }, {
      display: 'P5 games',
      nextKey: 'play_01',
      action: function() {

      }
    }, {
      display: 'pluck',
      nextKey: 'initial',
      action: function() {
        initP5templateGame();
      }
    }, {
      display: 'breakout',
      nextKey: 'initial',
      action: function() {
        initBreakoutGame();
      }
    }]
  },
  {
    key: 'play_00',
    choices: [{
      display: 'collapse',
      nextKey: 'initial',
      action: function() {
        initCollapseGame();
      }
    }, {
      display: 'platform drop',
      nextKey: 'initial',
      action: function() {
        initPlatformDropGame();
      }
    }, {
      display: 'in development',
      nextKey: 'initial',
      action: function() {

      }
    }, {
      display: 'in dev',
      nextKey: 'initial',
      action: function() {

      }
    }]
  },
  {
    key: 'play_01',
    choices: [{
      display: 'SCHMUP',
      nextKey: 'initial',
      action: function() {
        initSchmupGame();
      }
    }, {
      display: 'wacky mole',
      nextKey: 'initial',
      action: function() {
        initWackymoleGame();
      }
    }, {
      display: 'in development',
      nextKey: 'initial',
      action: function() {

      }
    }, {
      display: 'in dev',
      nextKey: 'initial',
      action: function() {

      }
    }]
  },
  {
    key: 'howOften',
    choices: [{
      display: 'just once',
      // make this go tonhow often before initial
      nextKey: 'initial',
      action: function() {
        executeAction(this.display);
      }
    }, {
      display: 'hourly',
      nextKey: 'howOften',
      action: function() {
        if (userData.points >= 100) {
          // do it
        } else {
          sorryNeedPoints();
        }
      }
    }, {
      display: 'every five minutes',
      nextKey: 'howOften',
      action: function() {
        if (userData.points >= 300) {
          // do it
        } else {
          sorryNeedPoints();
        }
      }
    }]
  }
];

function nextMenu() {

  for (let i = 0; i < treeLength; i++) {
    if (currentKey == tree[i].key) {

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

function executeAction(action) {
  writeConsoleText(`${userName} is "${action}"`)
}

function sorryNeedPoints() {
  alertMenu.style.display = "block";
  setTimeout(function() {
    alertMenu.style.display = "none";
  }, 3000)
  // alertMenu.style.visibility = "visible";
  // setTimeout(function(){alertMenu.style.visibility = "hidden";}, 3000)
}

function titter() {
  writeConsoleText(`teetering: animation where traumagotchi teeters`)
  // console.log('teetering');
}

function laughter() {
  // console.log('laughing')
}
