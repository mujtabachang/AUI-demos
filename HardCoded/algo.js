var oldX;
var oldY;

var oldsec = 0;
var currsec = 0;

var thresholdX = 25;

var thresholdY = 10;


var timeThreshold=300;

function Check_1() {

   if (CheckTime()) {
      
      if (mouseX - oldX >= thresholdX) {
         console.log("Reading!!");
         Reading =1
      } else {
         console.log("Not Reading");
         Reading = 0;
      }
      oldX = mouseX;
   }
}

function Check_2() {

   if (CheckTime()) {
      
      if (mouseX - oldX >= thresholdX && abs(mouseY - oldY) < thresholdY) {
         console.log("Reading!!");
         Reading =1
      } else {
         console.log("Not Reading");
         Reading = 0;
      }
      oldX = mouseX;
      oldY = mouseY;
   }
}

function CheckTime() {
   currsec = millis();
   if (currsec - oldsec >= timeThreshold) {
      oldsec = currsec;
      return 1;
   } else {
      return 0;
   }
}