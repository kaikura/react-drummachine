 // UPDATE: there is a problem in chrome with starting audio context
 //  before a user gesture. This fixes it.
 document.documentElement.addEventListener('mousedown', () => {
   if (Tone.context.state !== 'running') Tone.context.resume();
 });

 // TIME SIGNATURE _ Layer 1
 var TS_Num = 4;
 var TS_Den = 4;

 var new_BPM = 60;
 var showed_BPM = 60;
 let nGrain_string = '8n';
 Tone.Transport.timeSignature = [TS_Num, TS_Den];
 Tone.Transport.bpm.value = showed_BPM; 


 const synths = [
   new Tone.Synth(),
   new Tone.Synth(),
   new Tone.Synth()
 ];
 
 synths[0].oscillator.type = 'triangle';
 synths[1].oscillator.type = 'sine';
 synths[2].oscillator.type = 'sawtooth';
 
 const gain = new Tone.Gain(0.4);
 gain.toMaster();
 
 synths.forEach(synth => synth.connect(gain));
 notes = ['G5', 'A6', 'F5'];
 let index = 0;
 

 function updateGrains(){
  stop_sequencer();
  Tone.Transport.scheduleRepeat(repeat, '0n');
  Tone.Transport.scheduleRepeat(repeat, nGrain_string);
  Tone.Transport.start();
 }

 // change time signature
 function changeTS(){
  Tone.Transport.timeSignature = [TS_Num, TS_Den];

  if(TS_Den == 4 && TS_Num == 4){ //in quattro quarti
    console.log('quattroquarti');
    showed_BPM = new_BPM; // real bpm = showed bpm = input bpm
    Tone.Transport.bpm.value = new_BPM; 
    Tone.Transport.scheduleRepeat(repeat, '0n');
    Tone.Transport.scheduleRepeat(repeat, nGrain_string);

    stop_sequencer();
  } else {                       // NON in quattro quarti
    console.log('else');
    nGrain = parseInt(TS_Num, 10); // setting the grains as the numerator
    musicTheoryComputation(); // calculating the new virtual bpm
    Tone.Transport.bpm.value = virtual_BPM;
    showed_BPM = new_BPM; //keeping the same bpm
    //restarting
    stop_sequencer();
    Tone.Transport.scheduleRepeat(repeat, '0n');
    Tone.Transport.scheduleRepeat(repeat, nGrain_string);
  }
 }

 updateGrains();



 function repeat(time) {
  let step = index % nGrain;
  if(trig1[step] == true) {synths[1].triggerAttackRelease(notes[2], '30n', time)};

  // CLOCK
/*
  if(step == 0){
    synths[1].triggerAttackRelease(notes[1], '30n', time)
  } else {
    synths[1].triggerAttackRelease(notes[2], '30n', time)
  }
*/  

  //if(trig1[step] == true) {sendmidi()};
  index++;
}