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

}

function saveFile() {


  // access tgotchi node
  let ref = database.ref('tgotchi');

  // create json for data
  let data = {
    name: inputName.value(),
    tGotchi: 3
  }

  ref.push(data);
}

function draw() {

}
