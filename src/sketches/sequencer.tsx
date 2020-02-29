// UPDATE: there is a problem in chrome with starting audio context
 //  before a user gesture. This fixes it.
 /*
 document.documentElement.addEventListener('mousedown', () => {
    if (Tone.context.state !== 'running') Tone.context.resume();
  });
  */
 import React from "react"
import {MainSketch} from './sketch'
import {Transport} from 'tone'
import { TimeForm } from "src/components/control-panel/time-form/time-form.component";
import { render } from "@testing-library/react";
import {TransportComponent} from '../components/transport'
import { BPM } from "src/components/bpm-component";

  export class Sequencer extends React.Component<any,any> {
    private drumKit!: any[];
    private sounds1 = [];
    private sounds2 = [];
    
  
  constructor(props:any){
  super(props);
  this.drumKit[0] = new Audio("./samples/kick.wav")
  this.drumKit[1] = new Audio("./samples/snare1.wav");
  this.drumKit[2] = new Audio("./samples/snare2.wav");
  this.drumKit[3] = new Audio("./samples/clap.wav");
  this.drumKit[4] = new Audio("./samples/blastBlock.wav");
  this.drumKit[5] = new Audio("./samples/closedHH.wav");
  this.drumKit[6] = new Audio("./samples/cowbell.wav");
  this.drumKit[7] = new Audio("./samples/egg.wav");
  this.drumKit[7] = new Audio("./samples/openHH.wav");
  this.drumKit[8] = new Audio("./samples/stick.wav");
  this.drumKit[9] = new Audio("./samples/tomFloor.wav");
  this.drumKit[10] = new Audio("./samples/tomHigh.wav");
  this.drumKit[11] = new Audio("./samples/tomMid.wav");
  this.state = {
 
    selected: null,
    bpm: 120
}
Transport.TimeSignature = 4
Transport.loop = true
Transport.loopEnd = "1m"
}
 

  private handleTSChange(){
  

  }

  handleBPMChange = (bpm: number) => {
    Transport.bpm.value = bpm
    this.setState({ bpm })
}

render(){
return(
  
  <div>
 <BPM handleChange={this.handleBPMChange} value={this.state.bpm} />

  </div>
);
}
  
 
}
  
  //drumkit
  
  
  
  
  
 
  
 
 
 
  
  
