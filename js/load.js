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

function gotData(data) {
  ready();

  tgotchiData = data.val();
  tgotchiDataArray = Object.values(tgotchiData);
  numberTgotchi = tgotchiDataArray.length;

  // create array of keys (traumagotchi names)
  keys = Object.keys(tgotchiData);
}

function errData(err) {
  console.log("error!");
  console.log(err);
}

function saveTgotchiData() {

  let newName = true;

  if (keys) {
    keys.forEach(function(key) {
      if (key === inputName.value()) {
        newName = false;
        alert(`sorry there is already another traumagotchi named ${inputName.value()}`)
      }
    })
  } else {
    // drawLoadingScreenGrid();
    // createPOnce(`slow connection... </br> take a deep breathe and try again`, "rightColumn")
  }

  if (newName) {
    if (/^\S+$/.test(inputName.value())) {
      // let date = new Date();
      // let dateObject = {
      //   dateNow: Date.now(),
      //   month: date.getMonth(),
      //   day: date.getDate(),
      //   year: date.getFullYear(),
      //   hour: date.getHours(),
      //   minutes: date.getMinutes()
      // }
      // console.log(date);
      userName = inputName.value();
      songs[2].play();
      // // create json for data
      userData = {
        // name: inputName.value(),
        // password: inputPassword.value(),
        // timeStamp: [dateObject],
        userName: userName,
        timeStamp: [Date.now()],
        points: 0,
        tgotchiImage: {
          pixelArray: pixelArray,
          pixelSize: sliderSize.value(),
          pixelColor: pixelColor,
          backgroundColor: backgroundColor
        },
        actionsHourly: ["nothing"],
        actionsFiveMinutes: ["nope"]

      }

      irlRl = true;





      // if pushing to fb up front for debugging
      // let result = firebase.database().ref(userName).set(userData);

      setTimeout(function() {
        state = 'menu1';
        irlRl = false;
        gameIntroOverlay.style.display = "none";
        menu1();
      }, 750);
    } else {
      alert("Please give your Traumagotchi a valid name with no spaces");
    }
  }
}

function createTgotchiNode() {
  // // comment out to disable pushing to firebase
  // let result = firebase.database().ref(userName).set(userData);

  // original
  let result = firebase.database().ref('tgotchi/' + userName).set(userData);
}

function pushMoreData(data) {

  // this works to add new key:value pairs and also to reassign values with same key name


  firebase.database().ref('tgotchi/' + userName).update(data);

  // add new data to local userData object (this will also reassign values)
  userData = Object.assign(userData, data);
  // console.log(userData);
}

function rewriteData(node, data) {

  // not sure how to do this!
  // firebase.database().ref(userName).set(data);

  // original
  firebase.database().ref(`tgotchi/${userName}/${node}`).set(data);


}
