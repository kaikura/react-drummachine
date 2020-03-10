import React from "react"
import { Button } from "../button/button.component"
import { MainSketch } from "../../sketches/sketch"
import { Metro } from "../../sketches/metronome"
import { Container } from "./right-panel.style"
import { spacing } from "src/config/spacing"
import { PlayPause } from "../play_button/play-pause"
import {Tone} from 'tone'
import { BPM } from "../bpm-component"
import {MetroB} from "../metro_button/metro_button"

export class RightPanel extends React.Component<any, any> {
    
    constructor(props: any) {
        super(props)

        this.state = {
            bpm: 120
        }
    }

    private onMetroClick_1 = () => {
        Metro.handleClick_1()
    }
    private onMetroClick_2 = () => {
        Metro.handleClick_2()
    }
    private metroPause = () => {
        Metro.metroPause()
    }
    private metro2Pause = () => {
        Metro.metro2Pause()
    }

    private onSoundClick = () => {
        MainSketch.chooseSound()
    }
    private pause_1 = () => {
        MainSketch.stop_sequencer_1()
    }

    private play_1 = () => {
        MainSketch.updateGrains_1()
    }
    private pause_2 = () => {
        MainSketch.stop_sequencer_2()
    }

    private play_2 = () => {
        MainSketch.updateGrains_2()
    }
    private handleBPMChange = (bpm: number) => {
        //console.log(this.time.state.selectedTimeSignature);
        Tone.Transport.bpm.value = bpm
        this.setState({ bpm })
    }

    public render() {
        return (
            <div style={{ marginTop: "1em",  marginBottom: "3em"  }}>
                <h5 style={{textAlign:'center'}}>Groove Shapes Control</h5>

                <Container>
                    <div className="d-flex justify-content-center">
                         <div>
                    <BPM handleChange={this.handleBPMChange} value={this.state.bpm} />
                         </div>
                    </div>
                    
                        <Container>
                         <div>
                    
                    <MetroB play={this.onMetroClick_1} pause={this.metroPause} />
                         
                         </div>
                         <div>
                         <h6 style={{textAlign:'center'}}>clock_one</h6>
                         </div>
                         </Container>
                         <Container>
                         <div>
                    
                    <MetroB play={this.onMetroClick_2} pause={this.metro2Pause} />
                         
                         </div>
                         <div>
                         <h6 style={{textAlign:'center'}}>clock_two</h6>
                         </div>
                         </Container>
                    
                    <Container>
                    <PlayPause play={this.play_1} pause={this.pause_1} />
                    <div>
                         <h6 style={{textAlign:'center'}}>Transport One</h6>
                         </div>
                    </Container>
                    <Container>
                    <PlayPause play={this.play_2} pause={this.pause_2} />
                    <div>
                         <h6 style={{textAlign:'center'}}>Transport Two</h6>
                         </div>
                    </Container>
                 
                 
                    <Button
                        text="Instrument"
                        icon="music player fill"
                        onMouseDown={this.onSoundClick}
                        style={{marginTop: "2em", marginBottom: "3pxem" }}
                    />
                </Container>
            </div>
        )
    }
}
