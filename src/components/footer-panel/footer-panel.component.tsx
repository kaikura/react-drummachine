import React from "react"
import { Button } from "../button/button.component"
import { MainSketch } from "../../sketches/sketch"
import { Metro } from "../../sketches/metronome"
import { Container } from "./footer-panel.style"
<<<<<<< HEAD
import {TimeForm} from "../control-panel/time-form/time-form.component"
import { Sequencer } from "src/sketches/sequencer"
import { spacing } from "src/config/spacing"



export class FooterPanel extends React.Component<any, any> {
    /*public render () {
        return(
=======
import { TimeForm } from "../control-panel/time-form/time-form.component"

export class FooterPanel extends React.Component<any, any> {
    public render() {
        return (
>>>>>>> dae7d89c7645d8d811d85e7b440a55a244ec36b0
            <Container>
                <div className="alert alert-info" role="alert">
                    <strong>Polyrhythm created: </strong>
                </div>

                <div className="alert alert-info" role="alert">
                    <strong>Polymeter created:</strong>
                </div>
            </Container>
        )
    }
<<<<<<< HEAD
    */
   private onLayerClick = () => {
    MainSketch.createNewLayer()
}

private onTrackClick = () => {
    //console.log("yes")
    MainSketch.selectShape()
}
/*private onMetroClick_1 = () => {
    
    Metro.handleClick_1()
} 
private onMetroClick_2 = () => {
    
    Metro.handleClick_2()
} */

private onShapeClick = () => {
    MainSketch.changeShape()
}

private onRotateClick = () => {
    MainSketch.rotateShape()
}

private onShapeDeleteClick = () => {
    MainSketch.deleteShape()
}
/*private onPlayClick = () => {
    MainSketch.updateGrains()
}
private onStopClick = () => {
    MainSketch.stop_sequencer()
}*/

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
/*private onSoundClick = () => {
    MainSketch.chooseSound()
}*/
   public render() {
    return (
        <div style={{ marginTop: "12px" }}>
            <Container>
            <Button
                        text="Layer"
                        icon="plus"
                        onMouseDown={this.onLayerClick}
                        onMouseUp={this.onMouseReleased}
                        style={{ marginBottom: "12px" }}
                    />

                    <Button
                        text="Track"
                        icon="vector-square"
                        onMouseDown={this.onTrackClick}
                        onMouseUp={this.onMouseReleased}
                        style={{ marginBottom: "12px" }}
                    />
                    <Button
                        text="Shape"
                        icon="shapes"
                        onMouseDown={this.onShapeClick}
                        onMouseUp={this.onMouseReleased}
                        style={{ marginBottom: "12px" }}
                    />
                    <Button
                        text="Rotate"
                        icon="sync"
                        onClick={this.onRotateClick}
                        style={{ marginBottom: "12px" }}
                    />
                    <Button
                        text="Delete shape"
                        icon="trash fill"
                        type="danger"
                        onClick={this.onShapeDeleteClick}
                        style={{ marginBottom: "12px" }}
                    />
                    <Button text="Encoder" onClick={this.encoderClick} style={{ marginBottom: "12px" }} />
                    <Button text="-1" onClick={this.minusOneClick} style={{ marginBottom: "12px" }} />
                    <Button text="+1" onClick={this.plusOneClick} style={{ marginBottom: "12px" }} />
            </Container>   
            </div> 
    )
}
=======
>>>>>>> dae7d89c7645d8d811d85e7b440a55a244ec36b0
}
