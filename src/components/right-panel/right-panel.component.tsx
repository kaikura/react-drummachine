import React from "react"
import { Button } from "../button/button.component"
import { MainSketch } from "../../sketches/sketch"
import { Metro } from "../../sketches/metronome"
import { Container } from "./right-panel.style"
import { Sequencer } from "src/sketches/sequencer"
import { spacing } from "src/config/spacing"
import { PlayPause } from "../play_button/play-pause"

export class RightPanel extends React.Component<any, any> {
    private onMetroClick_1 = () => {
        Metro.handleClick_1()
    }
    private onMetroClick_2 = () => {
        Metro.handleClick_2()
    }

    private onShapeDeleteClick = () => {
        MainSketch.deleteShape()
    }
  
    private encoderClick = () => {
        MainSketch.encoderButt()
    }

    private plusOneClick = () => {
        MainSketch.encoderInc()
    }

    private minusOneClick = () => {
        MainSketch.encoderDec()
    }

    private onMouseReleased = () => {
        MainSketch.mouseReleased()
    }
    private onPlayClick = () => {
        MainSketch.updateGrains()
    }
    private onStopClick = () => {
        MainSketch.stop_sequencer()
    }

    private onSoundClick = () => {
        MainSketch.chooseSound()
    }
    private pause = () => {
        MainSketch.stop_sequencer()
    }

    play = () => {
        MainSketch.updateGrains()
    }

    public render() {
        return (
            <div style={{ marginTop: "12px" }}>
                <h5>Groove Shapes Control</h5>

                <Container>
                    <div className="d-flex justify-content-center">
                        <Sequencer />
                    </div>

                    <Button
                        text="Clock Layer 1"
                        icon="clock"
                        onClick={this.onMetroClick_1}
                        style={{ marginBottom: "12px" }}
                    />
                    <Button
                        text="Clock Layer 2"
                        icon="clock"
                        onClick={this.onMetroClick_2}
                        style={{ marginBottom: "12px" }}
                    />
                    <Container>
                    <PlayPause play={this.play} pause={this.pause} />
                    </Container>
                 
                    <Button
                        text="Instrument"
                        icon="music player fill"
                        onMouseDown={this.onSoundClick}
                        style={{ marginBottom: "12px" }}
                    />
                </Container>
            </div>
        )
    }
}
