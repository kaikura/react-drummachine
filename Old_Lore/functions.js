//ENCODER INCREASE BUTTON FUNCTION
function encoderInc() {

    //INC LAYER SELECTION MODE
    if (instrumentMode == 1 && layerNumber == 1) {
      layerNumber = 2;
  
    } else if (instrumentMode == 1 && layerNumber == 2) {
      layerNumber = 1;
    }
  
    //INC TRACK SELECTION MODE
    if (instrumentMode == 2 && selectedShape != 0) {
      //change track
      selectedShape++;
    }
  
  
  
    //INC CHANGE SHAPE MODE
    if (instrumentMode == 3 && shp1[selectedShape - 1] != polygon_array.length) {
      //polygon_array_ALL[selectedShape-1][kindOfShape]=polygon_array_ALL[selectedShape-1][kindOfShape++];
      shp1[selectedShape - 1] = shp1[selectedShape - 1] + 1;
  
    }
    if (instrumentMode == 3 && shp1[selectedShape - 1] == polygon_array.length) {
      shp1[selectedShape - 1] = 0;
    }
  
    //INC CUSTOM SHAPE MODE
    if (instrumentMode == 7) {
      if (currentGrain == nGrain - 1) {
        currentGrain = 0;
      } else {
        currentGrain++
      }
    }
  
    //INC CHANGE ROTATION MODE

    if (instrumentMode == 4 && selectedShape != 0) {
      //rotate the selected shape
      rot1[selectedShape - 1] = rot1[selectedShape - 1] + 1;
      
    }
    triggerer();
  }
  
  //ENCODER DECREASE BUTTON FUNCTION
  function encoderDec() {
  
    //LAYER SELECTION MODE
    if (instrumentMode == 1 && layerNumber == 1) {
      layerNumber = 2;
    } else if (instrumentMode == 1 && layerNumber == 2) {
      layerNumber = 1;
  
    }
  
    //TRACK SELECTION MODE
    if (instrumentMode == 2 && selectedShape != (0 || 1)) {
      selectedShape--;
    } else if (instrumentMode == 2 && selectedShape == 1) {
      selectedShape = maxNumShapes;
    }
  
    //then CHANGE SHAPE MODE
    if (instrumentMode == 3 && shp1[selectedShape - 1] != 0) {
      shp1[selectedShape - 1] = shp1[selectedShape - 1] - 1;
    } else if (instrumentMode == 3 && shp1[selectedShape - 1] == 0) {
      shp1[selectedShape - 1] = polygon_array.length-1;
    }
  
  
    //CUSTOM SHAPE MODE
    if (instrumentMode == 7) {
      if (currentGrain == 0) {
        currentGrain = nGrain - 1;
      } else {
        currentGrain--
      };
    }
  
    //the CHANGE ROTATION MODE
    if (instrumentMode == 4 && selectedShape != 0) {
      rot1[selectedShape - 1] = rot1[selectedShape - 1] - 1;
    }

    triggerer();
  }
  
  //ENCODER BUTTON FUNCTION
  function encoderButt() {
    if (instrumentMode == 7) {
      if (polygon_array_c.includes(currentGrain)) {
        for (var i = 0; i < polygon_array_c.length; i++) {
          if (polygon_array_c[i] === currentGrain) {
            polygon_array_c.splice(i, 1);
          }
        }
      } else {
        polygon_array_c.push(currentGrain);
      }
      polygon_array_c.sort(function(a, b) {
        return a - b
      });
  
    }
  }
  
  //CREATE NEW LAYER FUNCTION 
  function createNewLayer() {
    instrumentMode = 1;
  
    myTimeout = setTimeout(function() {
      layerNumber++;
  
      fill(250);
      if (layerNumber == 2) {
        stroke(0);
      }
      ellipse(x, y, 600, 600);
  
      //Grains for Layer 2 
      push();
      var angle2 = (TWO_PI / 4) * 3;
      var step2 = TWO_PI / nGrain2;
  
      for (let j = 0; j < nGrain2; j++) {
        var grainX2 = x + (cos(angle2) * 300); //320 effects how much bigger the second circle is should be half the width and height of the elipse
        var grainY2 = y + (sin(angle2) * 300);
        var grains2 = createVector(grainX2, grainY2);
        vertices.push(grains2);
        strokeWeight(10);
        point(grainX2, grainY2);
        angle2 += step2;
      }
      pop();
    }, 2000);
  }
  
  //TRACK SELECTION/ADD TRACK FUNCTION
  function selectShape() {
      instrumentMode = 2 // we are in track_mode!
      selectedShape = maxNumShapes;
    //if you press for 2 seconds you create a new track
    if(instrumentMode != 0){
    myTimeout = setTimeout(function() {
      maxNumShapes = maxNumShapes + 1;
      updateArrays();
    }, 2000);
  }
  triggerer();
  }
  
  ///CHANGE SHAPE AND GO INTO CUSTOM SHAPE FUNCTION
  function changeShape() {
    instrumentMode = 3; // we are in change_shape_mode!
    myTimeout = setTimeout(function() {
      instrumentMode = 7;
      maxNumShapes++;
      numCustShapes++;
      selectedShape=maxNumShapes;
      
      if (numCustShapes>0){ //resets current grain to 0 
        currentGrain=0;
      }
      polygon_array_c = new Array();
      //splice(maxNumShapes, 0, polygon_array_c);
      polygon_array.push(polygon_array_c);
      shp1.push(polygon_array.length-1);
      updateArrays();
    }, 2000);

    triggerer();
  }
  
  //ROTATE SHAPE FUNCTION
  function rotateShape() {
    instrumentMode = 4; // we are in rotation_mode!
  }
  
  
  function mouseReleased() {
    clearTimeout(myTimeout);
  }

  //function NOT USED
  function activate_sequencer(){
    //active_seq = true;
    //play();
  }

  function stop_sequencer(){
    //active_seq = false;
    Tone.Transport.stop();
    Tone.Transport.cancel();
    index = nGrain-1;
  }

  function triggerer() {
    //clears all the previous trigs
  for(l = 0; l < trig1.length; l++){ 
    trig1[l] = false;
  }

    //rotate according to rot1 ---- TO BE FINISHED
    rotation_element = rot1[0];
    if(rot1[0] != 0){
      //compact_shp1[0] = 
    }


  for(i = 0; i < shp1.length; i++){ //loop for the number of tracks (shapes) active      
    for(k = 0; k < polygon_array[shp1[i]].length; k++){ //loops for the length of the array containing the index of the grains active
      trig1[polygon_array[shp1[i]][k]] = true; //sets trig1 to be a copy of the active shape but with trigs
    }
  }


}

//read input for grains
function myGrainEvent(){
  nGrain = this.value();
  initializeArrays();
  generateShapes();
}

function myBpmEvent(){
  new_BPM = this.value();
  parseInt(new_BPM, 10);
  }

function my_TS_Num(){
  TS_Num = this.value();
  }

function my_TS_Den(){
  TS_Den = this.value();
  }