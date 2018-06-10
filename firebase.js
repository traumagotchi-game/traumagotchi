function gotData(data) {
  // need to retrieve firebase data with val() method
  tgotchiData = data.val();

  // create array of keys (traumagotchi names)
  keys = Object.keys(tgotchiData);
  // console.log(keys);
}

function errData(err) {
  console.log("error!");
  console.log(err);
}

function saveTgotchiData() {

  if (/\S+/.test(inputName.value())) {

    // access tgotchi node, this was for push not set code below
    // let ref = database.ref('tgotchi');

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

    // // create json for data
    userData = {
      // name: inputName.value(),
      // password: inputPassword.value(),
      // timeStamp: [dateObject],
      timeStamp: [Date.now()],
      points: 0,
      tgotchiImage: {
        pixelArray: pixelArray,
        pixelSize: sliderSize.value(),
        pixelColor: pixelColor,
        backgroundColor: backgroundColor
      }
      // sessionStorage.setItem("userData", "data");
    }


    // pushing creates new entry with random key
    // if you save the result (return from pushing data) in a variable, you can
    // access the key it was saved with, or any other values
    // let result = ref.push(data);

    // using set will let you create node with given name, not random key

    // save name in global variable to access firebase
    // if (/\S+/.test(inputName.value())) {
    //   userName = inputName.value();
    // } else {
    //   alert("must name traumagotchi!");
    // }

    userName = inputName.value();

    // // comment out to disable pushing to firebase
    let result = firebase.database().ref('tgotchi/' + userName).set(userData);



    setTimeout(function() {
      state = 'menu1';
      menu1();
    }, 750);

  } else {
    alert("must name traumagotchi!");
  }
}

function pushMoreData(data) {

  // this works to add new key:value pairs and also to reassign values with same key name

  // // comment out to disable pushing to firebase
  firebase.database().ref('tgotchi/' + userName).update(data);

  // add new data to local userData object (this will also reassign values)
  userData = Object.assign(userData, data);
  // console.log(userData);
}

function rewriteData(data) {

// not sure how to do this!
  firebase.database().ref(`tgotchi/${userName}`).set(data);


}
