var SendAbs = 0;

var Result = 0;

var bufferSize = 10;

var myBuffX = CBuffer(bufferSize);
var myBuffY = CBuffer(bufferSize);

var Sample1;
var Sample0;

var HasSomeData = 0;

var buffOldMouseX;
var buffOldMouseY;


var CrossHairX = 650;
var CrossHairY = 300;
var CrossHairRadius = 50;

function preload() {
   myimg = loadImage("assets/Aerospace_Text.png");
   gradient = loadImage("assets/Gradient.png");

   buttonSound = loadSound('assets/button.wav');
   clickSound = loadSound('assets/click.wav');
}

function setup() {
   var myCanvas = createCanvas(800, 480);
   myCanvas.parent('myContainer');
   frameRate(30)
}

function draw() {
   background(255);
   //Draw Image and the Mask
   image(myimg, width / 2 - myimg.width / 2, height / 2 - myimg.height / 2);
   if (!mouseIsPressed) {
      image(gradient, mouseX - gradient.width / 2, mouseY - gradient.height / 2);
   }

   //Draw Title
   fill(0);
   noStroke();
   textSize(18);
   text("AUI DTW Demo", width / 2 - 50, 40);

   //Draw Borders
   strokeWeight(4);
   stroke(51);
   noFill();
   rect(0, 0, width, height);


   //Draw Debug info
   draw_debug();
   
    //Draw Crosshairs
   DrawCrossHair(CrossHairX, CrossHairY, CrossHairRadius);

   //Mouse position
   if (SendAbs) {
      myBuffX.push(mouseX);
      myBuffY.push(mouseY);
   } else {
      myBuffX.push(mouseX - buffOldMouseX);
      myBuffY.push(mouseY - buffOldMouseY)
   }
   buffOldMouseX = mouseX;
   buffOldMouseY = mouseY;

   //Check from our Algorithm
   ML();


   fill(0);
   textSize(18);
   text("Detection: ", 300, height - 25);

   text(Result, 500, height - 25);

   //Draw last points
   strokeWeight(5);
   stroke(255, 0, 0, 128);
   for (i = 0; i < myBuffX.length; i++) {
      if (!SendAbs) {
         point(myBuffX.data[i] + CrossHairX, myBuffY.data[i] + CrossHairY);
      } else {
         point(myBuffX.data[i], myBuffY.data[i]);
      }
   }
   strokeWeight(1);

}

function draw_debug() {
   strokeWeight(1);
   textSize(12);
   noFill();
   text("Mouse X:", 10, height - 30);
   text(mouseX, 100, height - 30);

   text("Mouse Y:", 10, height - 10);
   text(mouseY, 100, height - 10);
}


function keyPressed() {

   if (keyCode == 48) { //Keypress 0
   /*
      HasSomeData = 1;
      var newIn = myBuffX.data.concat(myBuffY.data);
      Sample0 = newIn;


      clickSound.setVolume(1);
      clickSound.play();
      */
   }


   if (keyCode == 49) { //Keypress 1
      HasSomeData = 1;
      var newIn = myBuffX.data.concat(myBuffY.data);
      Sample1 = newIn;

      clickSound.setVolume(1);
      clickSound.play();
   }
   return false; // prevent default
}

function DrawCrossHair(x, y, radius) {
   if (SendAbs) {
      return 0;
   }
   strokeWeight(2);
   stroke(0, 50);
   radius += 10;
   //Vertical Line
   line(x, y - radius, x, y + radius);
   //Horizontal Line
   line(x - radius, y, x + radius, y);
   //Circle
   radius += 40;
   fill(2, 20);
   ellipse(x, y, radius, radius);
}