import * as React from "react"
import Tone from "tone"
import { Tick } from "src/engines";
import "./metronome.css"

export class Metro extends React.Component<any, any> {
    private tick : any;
    private loopId : number;
    private index : number;
    constructor(props) {
        super(props)
        this.tick = new Tick()
        this.loopId = 0;
        this.index=0;
        

        this.state = {
            playing: false
        }

        Tone.Transport.loop=true;
        Tone.Transport.loopEnd = '1m';
    }
    createLoop = () => {
        
       
        const loop = (time: number) => {
            
           for(let i =0;i<=3;i++){
                    this.tick.trigger(time + i*Tone.Time('4n').toSeconds() )
             }
        //DO DRAWINGS HERE

    }   //the function callback "const loop" is called at the beginning of every measure (long as the time signature) at the choosen bpm, the trigger is scheduled in order to have a beat of metronome at EXACTLY Time('4n').toSeconds() that is the distance of quarter notes at any given bpm. The tracks and metronome are indipendent (for now).
        this.loopId = Tone.Transport.schedule(loop, "0")
    }

    public handleClick = () => {
        if (this.state.playing) {
            Tone.Transport.clear(this.loopId)
        } else {
            this.createLoop();
        }
        this.setState({
            playing: !this.state.playing
        })
        
    }
    render() {
        const playClassName = "playButton" + (this.state.playing ? " stopButton" : "")
        return <div onClick={this.handleClick} className={playClassName} />
    }
}