var Mode = 2;

//Mode 0 is Just Reading
//Mode 1 is Hard Coded dX/dt
//Mode 2 is Hard Coded dX/dt and looking for Y is under threshold

var Result = 0;

var Rotated = 0;

function preload() {
   myimg = loadImage("assets/Aerospace_Text.png");
   myimg_rot = loadImage("assets/Aerospace_Text_Rot.png");
   gradient = loadImage("assets/Gradient.png");
}

function setup() {
   smooth();
   var myCanvas = createCanvas(800, 480);
   myCanvas.parent('myContainer');
}

function draw() {
   background(255);
   //Draw Image and the Mask
   if (!Rotated) {
      image(myimg, width / 2 - myimg.width / 2, height / 2 - myimg.height / 2);
   } else {
      image(myimg_rot, width / 2 - myimg.width / 2, height / 2 - myimg.height / 2);
   }
   if (!mouseIsPressed) {
      image(gradient, mouseX - gradient.width / 2, mouseY - gradient.height / 2);

   }
   //Draw Title
   fill(0);
   //strokeWeight(0);
   textSize(18);
   text("AUI Demo", width / 2 - 50, 40)

   //Draw Borders
   strokeWeight(4);
   stroke(51);
   noFill();
   rect(0, 0, width, height);

   draw_debug();

   //Check from our Algorithm
   switch (Mode) {
      case 0:
         break;
      case 1:
         Check_1();
         break;
      case 2:
         Check_2();
         break;

   }

   if (Mode > 0) {
      fill(0);
      //strokeWeight(1);
      
      if (Reading) {
         textSize(26);
         fill(255,0,0);
         text("Reading", 300, height - 25);
      }
      textSize(18);
      fill(0);
      text("Mode: ", 600, height - 25);
      text(Mode, 670, height - 25);


   }
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
   if (keyCode == 32) { //Keypress Space
      Rotated = !Rotated;
      console.log(Rotated);
   }

   return false; // prevent default
}