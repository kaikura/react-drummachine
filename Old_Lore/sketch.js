var instrumentMode; // if this variable is = 0 we are outside the mode selection, if = 1 we are in 'layer mode', if = 2 we are in 'track_selection mode', if = 3 we are in 'change_shape_mode', if = 4 we are in 'rotation mode', if = 5 we are in 'note mode', if = 6 we are in 'sample mode', if = 7 we are in custom shape mode;

var trig1 = []; //array which contains the triggers of the first layer


var context = new AudioContext();

let degree = 0;

var input_grains;
var input_BPM;
var input_my_TS_Num;
var input_my_TS_Den;

var myTimeout;
var layerNumber = 1;
var kindOfShape = 0;
var selectedShape = 0;
var maxNumShapes = 1;
var numCustShapes = 0;
var canvas;
var firstLayerLandW = 500;
var vertices = [];
var vertices2 = [];
var buttonsx;
var buttondx;
var slider;
var buttonNC;
var NewCircle;
var buttonShape;
var buttonRotate;
var nGrain = 8;
var nGrain2 = 22;
var x = 400;
var y = 400;
var currentGrain = 0;

var active_seq = false;

var rot1 = new Array(maxNumShapes);
var shp1 = new Array(maxNumShapes);

var rotation_element = 0; //element that stores the first element of the array (see functions.js)
var compact_shp1 = []; //array that compacts shp1 and rot1 in one thing.

let polygon_array = new Array(nGrain - 1);
let polygon_array_c = new Array(); // custom polygon array


function initializeArrays() {
  for (i = 0; i < rot1.length; i++) {
    rot1[i] = 0;
  }

  for (i = 0; i < shp1.length; i++) {
    shp1[i] = i;
  }

  for (i = 0; i < nGrain; i++){
    trig1[i] = false;
  }
}

initializeArrays();


//SHAPES' DATABASE

//this is the array whose dimension is the maximum number of tracks we want to have --> maxNumberShapes <--, and for each track selects a specific shape. e.g. polygon_array_ALL[1][2] selects,given a number of grains nGrain, the third shape -a triangle- for the second track.





//LOOP TO GENERATE DIFFERENT SHAPES
function generateShapes(){
for (i = 2; i <= nGrain; i++) { //starts from 2 since we need a line as the simplest shape possible
  polygon_array[i - 2] = new Array(i);
  for (h = 0; h < polygon_array[i - 2].length; h++) {
    polygon_array[i - 2][h] = Math.round(nGrain * h / polygon_array[i - 2].length);
  }
}
}

generateShapes();



//UPDATE ARRAYS
function updateArrays() {
  // this is the rotation array, containing all the rotation indexes for just the FIRST layer. Its length is equal to the maximum number of shapes created in the related layer.
  rot1.push(0);


  //kind of shape index array relative to the first layer. here are stored the kind of shape of tracks. i set up this number to be 1,2,3...maxNumofShapes just to make the user distinguish between and avoid graphic overlap.

  if(instrumentMode == 2) {
    shp1.push(maxNumShapes-1);
  } 
  
  selectedShape=maxNumShapes;

  /*if (instrumentMode == 7) {
  shp1.push(polygon_array.length)
  }*/

}

//SETUP
function setup() {
  canvas = createCanvas(800, 800);

  //buttons
  buttondx = createButton('+1');
  buttondx.position(width * 0.87, height * 0.8);
  
  buttonsx = createButton('-1');
  buttonsx.position(width * 0.87 - 35, height * 0.8);
  
  buttonenc = createButton('Encoder Button');
  buttonenc.position(width * 0.8, height * 0.84);
  
  buttondx.mousePressed(encoderInc);
  buttonsx.mousePressed(encoderDec);
  buttonenc.mousePressed(encoderButt);
  
  buttoncust = createButton('X');
  buttoncust.position(width * 0.8, height * 0.3);
  buttoncust.mousePressed(deleteShape);

  // audio buttons
  buttonplay = createButton('play');
  buttonplay.position(width * 0.87 - 130, height * 0.8);
  buttonplay.mousePressed(updateGrains);

  buttonstop = createButton('stop');
  buttonstop.position(width * 0.87 - 90, height * 0.8);
  buttonstop.mousePressed(stop_sequencer);
  
  // INPUTS

  input_grains = createInput('');
  input_grains.position(width * 0.2, height * 0.15);
  input_grains.input(myGrainEvent);


  
  input_BPM = createInput('');
  input_BPM.position(width * 0.67, height * 0.15);
  input_BPM.input(myBpmEvent);

  buttoncust = createButton('Change TS or BPM');
  buttoncust.position(width * 0.1, height * 0.94);
  buttoncust.mousePressed(changeTS);

  input_my_TS_Num = createInput('');
  input_my_TS_Num.position(width * 0.1, height * 0.9);
  input_my_TS_Num.input(my_TS_Num);

  input_my_TS_Dem = createInput('');
  input_my_TS_Dem.position(width * 0.1, height * 0.92);
  input_my_TS_Dem.input(my_TS_Den);


 function deleteShape() {
   if(instrumentMode == 7){
     instrumentMode=2;
   }
   shp1.splice(selectedShape-1,1);
   rot1.splice(selectedShape-1,1);
   maxNumShapes--;
   //start from skratch
   if(maxNumShapes == 0){
     instrumentMode = 0;
   }
   selectedShape=maxNumShapes;
  }

  //button new Circle
  buttonNC = createButton('Layer');
  buttonNC.position(width * 0.32, height * 0.9);
  noFill();
  buttonNC.mousePressed(createNewLayer);

  //button Track
  buttonShape = createButton('Track');
  buttonShape.position(width * 0.42, height * 0.9);
  buttonShape.mousePressed(selectShape);

  //buttonShape.mouseReleased(console.log("ciao"));

  //button Track
  buttonShape = createButton('Shape');
  buttonShape.position(width * 0.52, height * 0.9);
  buttonShape.mousePressed(changeShape);


  buttonRotate = createButton('Rotate');
  buttonRotate.position(width * 0.62, height * 0.9);
  buttonRotate.mousePressed(rotateShape);


  musicTheoryComputation();
}

//DRAW
function draw() {
  

  
  // NEW ENVIRONMENT

  background(100, 150, 100);
  fill(255);
  ellipse(x, y, firstLayerLandW, firstLayerLandW);

  textSize(32);
  fill(255);
  text('Number of Grains', width*0.1, height*0.12);

  text('BPM : ' + showed_BPM, width*0.65, height*0.12);

  //GRAINS
  var angle = (TWO_PI / 4) * 3;
  var step = TWO_PI / nGrain;
  push();
  for (let i = 0; i < nGrain; i++) {
    var grainX = x + (cos(angle) * (firstLayerLandW / 2));
    var grainY = y + (sin(angle) * (firstLayerLandW / 2));
    //var grains = createVector(grainX, grainY);
    //vertices.push(grains);
    strokeWeight(10);
    point(grainX, grainY);
    angle += step;
  }
  pop();
  //END GRAINS

  if (instrumentMode == 7) {
    push();
    var selGrainX = x + (cos(angle + (step * currentGrain)) * (firstLayerLandW / 2));
    var selGrainY = y + (sin(angle + (step * currentGrain)) * (firstLayerLandW / 2));
    var grains = createVector(grainX, grainY);
    //vertices.push(grains);
    strokeWeight(10);
    stroke("red");
    point(selGrainX, selGrainY);
    pop();
  }

  //END OF NEW ENVIRONMENT


  //vert is defined as vert=createVector(n1,n2,...,nn) with nn --number/id of the grain

  //POLYGON_SPEC, defining 
  function polygon_spec(x, y, radius, vert) {
    let angle = TWO_PI / nGrain;

    //draws first layer shapes
    beginShape();
    for (let i = 0; i <= vert.length; i++) {
      corr_node = vert[i];
      count = 0;
      for (let a = 0; a < TWO_PI; a += angle) {
        if (count == corr_node) {
          let sx = x + cos(a - (TWO_PI / 4)) * radius;
          let sy = y + sin(a - (TWO_PI / 4)) * radius;
          vertex(sx, sy);
        }
        count++;
      }
    }
    endShape(CLOSE)
  }

  if (selectedShape > maxNumShapes) {
    selectedShape = 1;
  }

  //it creates all the tracks

  for (i = 1; i <= maxNumShapes; i++) {
    push();
    translate(width * 0.5, height * 0.5);
    colorMode(RGB);
    fill(i*50, i*20, i*10, 100);
    
    if (selectedShape == i) {
      strokeWeight(3);
      

    }
    rotate((TWO_PI) * rot1[i - 1] / nGrain);
    // TO BE FIXED! the circular array is useless, we can use polygon_array_ALL as a database of all the possible shapes. Then, with shp1, shp2, etc. we point the shape we need. For now i set it to polygon_array_ALL[0];


    polygon_spec(0, 0, (firstLayerLandW / 2), polygon_array[shp1[i - 1]])
    pop();
  }


// visualization of the clock on the canvas

  if(active_seq == true){
    push();
    let c = color(255, 204, 0);
    //fill(c);
    strokeWeight(4);
    noFill();
    if(currGrain==0 || currGrain == -1){
      //don't draw
  }
    else{
    arc(x, y, firstLayerLandW+10, firstLayerLandW+10, -TWO_PI/4, -TWO_PI/4+currGrain*step);
    }
    pop();
  }

  // end visualization of the clock on the canvas

  //converting the nGrain into a string (used in the audio engine)
  nGrain_string = nGrain.toString()+'n';
}
//END DRAW FUNCTION

/*
////serial

var SerialPort = require('serialport');
var serialPort = new SerialPort('/dev/tty.usbmodem14101', {
    baudrate: 9600
});

// Switches the port into "flowing mode"
serialPort.on('data', function (data) {
    console.log('Data:', data);
});// Read data that is available but keep the stream from entering //"flowing mode"
serialPort.on('readable', function () {
    console.log('Data:', port.read());
});

*/