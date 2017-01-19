var oldX;
var oldY;

var oldsec = 0;
var currsec = 0;

var timeThreshold = 400;

var x;
var y;
var svm;


function ML() {

   if (CheckTime()) {
      if (HasSomeData) {

         //SVM
         var newIn = myBuffX.data.concat(myBuffY.data);
         var out = svm.predict(newIn);
         console.log("Predict : ", out);
         Result = out;


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

   //SVM
   svm = null;

   svm = new ml.SVM({
      x: Input,
      y: Output
   });

   svm.train({
      C: 1.1,
      tol: 1e-5,
      max_passes: 100,
      alpha_tol: 1e-5,
      kernel: {
         type: "polynomial",
         c: 1,
         d: 5
      }
   });

}