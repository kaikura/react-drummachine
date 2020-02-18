WebMidi.enable(function (err) {
 
    if (err) {
      console.log("WebMidi could not be enabled.", err);
    } else {
      console.log("WebMidi enabled!");
    }
    
  });

  WebMidi.enable(function (err) {
    console.log(WebMidi.inputs);
    console.log(WebMidi.outputs);
});

// selection of the MIDI device: check your midi device's address, it's in console log
//var output = WebMidi.getOutputById("here the id");
  //output = WebMidi.getOutputByName("Axiom Pro 25 Ext Out");
  //output = WebMidi.outputs[0];

var output = WebMidi.outputs[2];

function sendmidi(){
    WebMidi.getOutputById("-1224853051").playNote("G4", 1)
    .stopNote("G4", 1, {time: 2500});
}

function sendmidi_2(){
  WebMidi.getOutputById("-1224853051").playNote("G3", 1)
  .stopNote("G3", 1, {time: 2500});
}