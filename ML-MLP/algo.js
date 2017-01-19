var oldX;
var oldY;

var oldsec = 0;
var currsec = 0;

var timeThreshold = 350;

var Result_Threshold=0.5;

var x;
var y;
var mlp;


function ML() {

   if (CheckTime()) {
      if (HasSomeData) {

         var newIn = myBuffX.data.concat(myBuffY.data);
         var out = mlp.predict([newIn]);
         //console.log("Predict : ", out);
         Result = out[0];


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
   

   Doing_Training = 1;

   mlp = null;

   mlp = new ml.MLP({
      'input': Input,
      'label': Output,
      'n_ins': bufferSize * 2,
      'n_outs': 1,
      'hidden_layer_sizes': [20, 10]
   });

   mlp.set('log level', 0); // 0 : nothing, 1 : info, 2 : warning.
  
   mlp.train({
      'lr': 0.6,
      'epochs': 60000
   });
   Doing_Training = 0;

}