import React from "react"
import { Button } from "../button/button.component"
import { MainSketch } from "../../sketches/sketch"
import { Metro } from "../../sketches/metronome"
import { Container } from "./right-panel.style"
import { Sequencer } from "src/sketches/sequencer"
import { spacing } from "src/config/spacing"
import { ButtonWithPopover } from "../button-with-popover/button-with-popover.component"


export class RightPanel extends React.Component<any, any> {
    private onMetroClick_1 = () => {
        Metro.handleClick_1()
    }
    private onMetroClick_2 = () => {
        Metro.handleClick_2()
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

    public render() {
        return (
            <div style={{ marginTop: "12px" }}>
                
                <ButtonWithPopover
                    id="test-popover"
                    placement="bottom"
                    title="Audio Panel"
                    showIcon
                    btnText="Click me"
                    renderPopoverContent={this.renderPopoverContent as any}
                />
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
                    <Button
                        text="Play"
                        icon="play"
                        onClick={this.onPlayClick}
                        style={{ marginBottom: "12px" }}
                    />
                    <Button
                        text="Global Stop"
                        icon="stop"
                        onClick={this.onStopClick}
                        style={{ marginBottom: "12px" }}
                    />
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
    private renderPopoverContent = () => {
        return <p>Here you can manage all the audio features of the interface.</p>
    }
}
