import * as React from "react"
import Tone from "tone"
<<<<<<< HEAD
import { Tick } from "src/engines"
import "./metronome.css"

export class Metro extends React.Component<any, any> {
    private tick: any
    private loopId: number
    private index: number
    constructor(props) {
        super(props)
        this.tick = new Tick()
        this.loopId = 0
        this.index = 0
=======
import { Tick } from "src/engines";
import { Tick_1 } from "src/engines";
import "./metronome.css"

export class Metro extends React.Component<any, any> {
    
    private tick : any;
    private start_meaure_tick : any;
    private loopId : number;
    private index : number;
    static measure : String ="1:0"
    static num : number = 4
    static den : number = 4
    constructor(props) {
        super(props)
        this.tick = new Tick()
        this.start_meaure_tick = new Tick_1()
        this.loopId = 0;
        this.index=0;
        
>>>>>>> 44f43583a39ebe837d64380c86dab9467f3d0850

        this.state = {
            playing: false
        }
         Tone.Transport.loop = false;
        
    }
    static setTS(value: String) {
        this.num=Number(value.substring(0,1))
        this.den=Number(value.substring(2))
        let val = this.mapping(value)
        if (val !== undefined)
        this.measure = val

<<<<<<< HEAD
        Tone.Transport.loop = true
        Tone.Transport.loopEnd = "1m"
=======
        return this
    }
    static mapping(val : String){
        let num = Number(val.substring(0,1))
        let den = Number(val.substring(2))
        if(den===4){
            if(num===5) return "0:5"
            if(num===3) return "0:3"
            if(num===4) return "1:0"
        }else{
        if(den===8){
            if(num===9) return "0:4:2"
            if(num===7) return "0:3:2"
        }
    } return "1:2"
    //end
>>>>>>> 44f43583a39ebe837d64380c86dab9467f3d0850
    }
    createLoop = () => {
        const loop = (time: number) => {
<<<<<<< HEAD
            for (let i = 0; i <= 3; i++) {
                this.tick.trigger(time + i * Tone.Time("4n").toSeconds())
            }
            //DO DRAWINGS HERE
        } //the function callback "const loop" is called at the beginning of every measure (long as the time signature) at the choosen bpm, the trigger is scheduled in order to have a beat of metronome at EXACTLY Time('4n').toSeconds() that is the distance of quarter notes at any given bpm. The tracks and metronome are indipendent (for now).
        this.loopId = Tone.Transport.schedule(loop, "0")
=======
            
          for(let i=0;i<Metro.num;i++){
              if (i===0){ this.start_meaure_tick.trigger(time)
               //metronome
          }else{   this.tick.trigger(time + i*Tone.Time((Metro.den + "n")).toSeconds()) }
          }
        //DO DRAWINGS HERE

    }   //the function callback "const loop" is called at the beginning of every measure (long as the time signature) at the choosen bpm, the trigger is scheduled in order to have a beat of metronome at EXACTLY Time('4n').toSeconds() that is the distance of quarter notes at any given bpm. The tracks and metronome are indipendent (for now).
        this.loopId = Tone.Transport.scheduleRepeat(loop, Metro.measure ,"0")
>>>>>>> 44f43583a39ebe837d64380c86dab9467f3d0850
    }

    public handleClick = () => {
        if (this.state.playing) {
            Tone.Transport.clear(this.loopId)
        } else {
            this.createLoop()
        }
        this.setState({
            playing: !this.state.playing
        })
    }
    render() {
        const playClassName = "playButton" + (this.state.playing ? " stopButton" : "")
        return <div onClick={this.handleClick} className={playClassName} />
    }
<<<<<<< HEAD
}
=======
    
}


>>>>>>> 44f43583a39ebe837d64380c86dab9467f3d0850
