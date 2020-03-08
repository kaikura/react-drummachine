
import * as React from "react"
import { MainSketch } from "./sketch"
import { Transport } from "tone"
import { TimeForm } from "src/components/control-panel/time-form/time-form.component"
import { BPM } from "src/components/bpm-component"
import { Tick } from "src/engines"
import "./metronome.css"

export class Sequencer extends React.Component<any, any> {
   
    private time: TimeForm | undefined
   

    constructor(props: any) {
        super(props)

        this.state = {
            selected: null,
            bpm: 120
        }
      
    }

    private handleTSChange() {
        console.log(this.time)
        //Transport.TimeSignature = this.time.state.selectedTimeSignature;
    }

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
