import React from "react"
import { Button } from "../button/button.component"
import { MainSketch } from "../../sketches/sketch"
import { Metro } from "../../sketches/metronome"
import { Container } from "./right-panel.style"
import { spacing } from "src/config/spacing"
import { PlayPause } from "../play_button/play-pause"
import {MetroB} from "../metro_button/metro_button"
import { ButtonWithPopover } from "../button-with-popover/button-with-popover.component"
import {BpmContainer} from '../bpm.container'

interface IProps {
    timeSignature1: string | null
    timeSignature2: string | null

 
}

export class RightPanel extends React.Component<IProps,any> {
    

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


    public render() {
        const { timeSignature1, timeSignature2 } = this.props

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
                       <BpmContainer />
                    </div>
                    
                        
                         <div>
                    
                    <MetroB play={this.onMetroClick_1} pause={this.metroPause} />
                         
                         </div>
                         <div>
                         <h6 style={{textAlign:'center'}}>clock_one</h6>
                         </div>
                       
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
                {timeSignature1 && timeSignature2 && (
                    <div>
                        <div className="alert alert-info" role="alert">
                        <p>
                            <b><i>Polymeter   </i></b>
                            <i>{timeSignature1} : {timeSignature2}</i>
                        </p>
</div>
                    </div>
                )}
            </div>
        )
    }


    private renderPopoverContent = () => {
        return <p>Here you can manage all the audio features of the interface.</p>
    }
}
