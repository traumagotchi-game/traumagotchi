"use strict";

function gotData(data) {
  // need to retrieve firebase data with val() method
  tgotchiData = data.val();
  // create array of keys (traumagotchi names)
  keys = Object.keys(tgotchiData);
  // console.log(tgotchiData);
  // console.log(keys);
}

function errData(err) {
  console.log("error!");
  console.log(err);
}

function saveTgotchiData() {


  let newName = true;
  keys.forEach(function(key) {
    if (key === inputName.value()) {
      newName = false;
      alert(`sorry there is already another traumagotchi named ${inputName.value()}`)
    }
  })

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
      sound_fizzDown_hiPitch.play();
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
        }
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

  // // comment out to disable pushing to firebase
  // firebase.database().ref(userName).update(data);

  // original push
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
