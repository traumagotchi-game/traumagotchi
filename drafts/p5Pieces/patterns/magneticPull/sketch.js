
// http://purin.co/Experiments-with-P5-js
var u;
var l;
var a;
var mods = [];
var x;
var y;
var count;

function setup() {
  createCanvas(windowWidth, windowHeight);
  //u = int(width/15);
  u = 100;
  l = 20;
  var highCount = height/80;
  var wideCount = width/80;
  count = int(highCount * wideCount);

  var index = 0;
  for (var xc = 0; xc < wideCount; xc++) {
    for (var yc = 0; yc < highCount; yc++) {
      mods[index++] = new Module(int(xc)*u,int(yc)*u);
    }
   }
}

function draw() {



  if (mouseIsPressed) {
    background(0);
    stroke(255,163,163);
  } else {
    background(255,163,163);
    stroke(255);
  }

  strokeWeight(15);

  translate(20, 20);

  for (var i = 0; i <= count; i++) {
    mods[i].update();
    mods[i].draw2();
  }

}

function Module(_x, _y) {
  this.x = _x;
  this.y = _y;
  this.a = 0;


}

Module.prototype.update = function() {
  if (mouseIsPressed) {
    this.a = -20 * (atan2(mouseY-this.y, mouseX-this.x));
  } else {
    this.a = atan2(mouseY-this.y, mouseX-this.x);
  }
}

Module.prototype.draw2 = function() {
  push();
  translate(this.x, this.y);
  rotate(this.a);
  line(-l,0,l,0);
  pop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
