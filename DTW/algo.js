var oldX;
var oldY;

var oldsec = 0;
var currsec = 0;

var timeThreshold = 400;

var DTW_Threshold_Abs = 4000;
var DTW_Threshold = 250;

function ML() {

   if (CheckTime()) {
      if (HasSomeData) {


         var newIn = myBuffX.data.concat(myBuffY.data);

         var distFunc = function(a, b) {
            return Math.abs(a - b);
         };

         var dtw1 = new DynamicTimeWarping(newIn, Sample1, distFunc);
         var dist1 = dtw1.getDistance();
         console.log(dist1);

         if (SendAbs) {
            if (dist1 < DTW_Threshold_Abs) {
               Result = "Detected";
            } else {
               Result = "";
            }
         } else {
            if (dist1 < DTW_Threshold) {
               Result = "Detected";
            } else {
               Result = "";
            }
         }
         //var dtw2 = new DynamicTimeWarping(newIn, Sample1, distFunc);
         //var dist2 = dtw2.getDistance();

         //if (dist2 >= dist1) {
         //   Result = "Yes!";
         //} else {
         //   Result = "";
         //}
      }
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

function Training() {

}