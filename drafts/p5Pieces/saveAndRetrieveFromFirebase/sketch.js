let canvas;
let button;
let inputName;
// create variable object to connect to Firebase
let database;

function setup() {
  // you will probably want to set these up in html

  // canvas = createCanvas(windowWidth, windowHeight);
  createP('Save Traumagotchi');
  button = createButton('save');
  button.mousePressed(saveFile);
  inputName = createInput('username');



  // Initialize Firebase
  let config = {
    apiKey: "AIzaSyDf1V8E4N8LGUYDX1QQ1tURMQXCCULuefQ",
    authDomain: "traumagotchi33.firebaseapp.com",
    databaseURL: "https://traumagotchi33.firebaseio.com",
    projectId: "traumagotchi33",
    storageBucket: "traumagotchi33.appspot.com",
    messagingSenderId: "121692513015"
  };

  firebase.initializeApp(config);
  database = firebase.database();

  // to retrieve data
  // note this is updated automatically as firebase pings the site whenever
  // database changes

  let ref = database.ref('tgotchi');
  ref.on('value', gotData, errData);

}

function gotData(data) {
  // need to retrieve firebase data with val() method
  let tgotchi = data.val();

  // create array of keys
  let keys = Object.keys(tgotchi);
  console.log(keys);

 for (let i = 0; i < keys.length; i++) {
   let k = keys[i];
   let userName = tgotchi[k].name;
   let tgotchiImage = tgotchi[k].tgotchiImage;
   // console.log(userName, tgotchiImage);
   // add data to list in HTML
   let li = createElement('li', userName + " is this tgotchi " + tgotchiImage);
   li.parent('tgotchiImages');
 }
  // forEach loop is the stylish way to do this
  // keys.forEach(function(key) {
  //   console.log(key);
  // });
}

function errData(err) {
  console.log("error!");
  console.log(err);
}


function saveFile() {


  // access tgotchi node
  let ref = database.ref('tgotchi');

  // create json for data
  let data = {
    name: inputName.value(),
    tgotchiImage: 3
  }

  // ref.push(data);
  // if you save the result (return from pushing data) in a variable, you can
  // access the key it was saved with
  let result = ref.push(data);
  console.log(result.key);
}

function draw() {

}
