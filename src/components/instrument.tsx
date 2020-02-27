import * as React from "react"
import { Time, Transport } from "tone"
import { Snare, Kick, HiHat } from "../engines"
import { areEqual } from "../utils/array-comparator"
import { MainSketch } from "../sketches/sketch"
import { Slider } from "./slider"
import { Clap } from "../engines/clap"
import { Cymbal } from "../engines/cymbal"
import {Synth} from "tone"
import {TimeForm} from "../components/control-panel/time-form/time-form.component"
 

export interface InstrumentProps {
    engine: string
    steps?: boolean[]
    selected?: boolean
    handleClick?: (engine: string, steps: boolean[]) => void
}

export class Instrument extends React.Component<InstrumentProps, any> {
    private sound: any
    private ctx: AudioContext
    private loopId: number
    private isFirst: boolean

    constructor(props: any) {
        super(props)
        this.isFirst = true
        this.ctx = new AudioContext()
        switch (props.engine) {
            case "Kick":
                this.sound = new Kick();
                break
            case "Snare":
                this.sound = new Snare();
                break
            case "HiHat":
                this.sound = new HiHat();
                break
            case "Clap":
                this.sound = new Clap();
                break

            
        }

        this.state = {
            steps: [
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false
            ],
           
        }

        this.loopId = 0
        Transport.bpm.value = 120
    }

    componentDidUpdate() {
        if (this.props.steps && !areEqual(this.props.steps, this.state.steps)) {
            this.setState({
                steps: this.props.steps.slice(0)
            })
            this.createLoop()
        }
    }

    createLoop = () => {
        if (!this.props.steps) {
            return
        }
        Transport.clear(this.loopId)
        const loop = (time: number) => {
            this.state.steps.forEach((s, i) => {
                if (s) {
                    this.sound.trigger(time + i * Time("16n").toSeconds())
                }
            })
        }
        this.loopId = Transport.schedule(loop, "0")
    }
  

    private onMouseReleased = () => {
        
        MainSketch.mouseReleased()
    }
    private onTrackClick = () => {
        //console.log("yes")
        MainSketch.selectShape()
    }

    handleClick = () => {
        /*
        if(this.isFirst){
        this.ctx = new AudioContext;
        console.log("resumed");
        this.isFirst=false;
        }
        */
        //MainSketch.selectShape();
        if (this.props.handleClick) this.props.handleClick(this.props.engine, this.state.steps.slice(0))
    }

   

    render() {
        const InstrumentStyle = {
            height: "3em",
            width: "4em",
            margin: "1",
            borderRadius: 10,
            padding: 5,
            backgroundColor: this.props.selected ? "#2AC7DC" : "#696969",
            color: "white",
            boxShadow: "2px 2px 5px #222"
        }
        return (
            <div style={{ display: "inline-block", width: "1em", alignContent: "center", padding: "2em" }}>
                <div style={InstrumentStyle} onClick={this.handleClick} onMouseDown={this.onTrackClick}
                        onMouseUp={this.onMouseReleased}>
                    <p>{this.props.engine}</p>
                </div>
            </div>
        )
    }
}
