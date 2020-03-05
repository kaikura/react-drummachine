// UPDATE: there is a problem in chrome with starting audio context
//  before a user gesture. This fixes it.
/*
 document.documentElement.addEventListener('mousedown', () => {
    if (Tone.context.state !== 'running') Tone.context.resume();
  });
  */
import * as React from "react"
import { MainSketch } from "./sketch"
import { Transport } from "tone"
import { TimeForm } from "src/components/control-panel/time-form/time-form.component"
import { BPM } from "src/components/bpm-component"
import { Tick } from "src/engines";
import "./metronome.css"



  export class Sequencer extends React.Component<any,any> {
    private drumKit: any[] = [];
    private sounds1: any = [];
    private sounds2:any = [];
    private time: TimeForm | undefined ;
    private tick : any;
    
    
  
  constructor(props:any){
  super(props);

  
  
  
  this.state = {
 
    selected: null,
    bpm: 120
}
Transport.TimeSignature = 4
Transport.loop = true
Transport.loopEnd = "1m"
}
 

  private handleTSChange(){
    console.log(this.time);
  //Transport.TimeSignature = this.time.state.selectedTimeSignature;

    
  }
   

    private handleBPMChange = (bpm: number) => {
        Transport.bpm.value = bpm
        this.setState({ bpm })
    }

    render() {
        return (
            <div>
                <BPM handleChange={this.handleBPMChange} value={this.state.bpm} />
            </div>
        )
    }
}

//drumkit
