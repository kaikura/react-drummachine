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
import { Tick } from "src/engines"
import "./metronome.css"

export class Sequencer extends React.Component<any, any> {
    private drumKit: any[] = []
    private sounds1: any = []
    private sounds2: any = []
    private time: TimeForm | undefined
    private tick: any

    constructor(props: any) {
        super(props)

        this.state = {
            selected: null,
            bpm: 120
        }
        Transport.TimeSignature = 4
        Transport.loop = true
        Transport.loopEnd = "1m"
    }

<<<<<<< HEAD
    private handleTSChange() {
        console.log(this.time)
        //Transport.TimeSignature = this.time.state.selectedTimeSignature;
    }
=======

  export class Sequencer extends React.Component<any,any> {
    private drumKit: any[] = [];
    private sounds1: any = [];
    private sounds2:any = [];
   //private time: TimeForm ;
    private tick : any;
    
    
  
  constructor(props:any){
  super(props);

  
  
  
  this.state = {
 
    selected: null,
    bpm: 120
}
Transport.TimeSignature = 4
Transport.loop = true
Transport.loopEnd = "2m"
}
 

  private handleTSChange(){
    //console.log(this.time);
  //Transport.TimeSignature = this.time.state.selectedTimeSignature;

    
  }
  loop = () => {
    const lp = (time:number) =>{


    }

  }
   
>>>>>>> 44f43583a39ebe837d64380c86dab9467f3d0850

    private handleBPMChange = (bpm: number) => {
      //console.log(this.time.state.selectedTimeSignature);
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
