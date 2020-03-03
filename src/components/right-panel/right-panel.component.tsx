import React from "react"
import { Button } from "../button/button.component"
import { MainSketch } from "../../sketches/sketch"

import { Container } from "./right-panel.style"
import { Sequencer } from "src/sketches/sequencer"

export class RightPanel extends React.Component<any, any> {
    private onLayerClick = () => {
        MainSketch.createNewLayer()
    }

    private onTrackClick = () => {
        //console.log("yes")
        MainSketch.selectShape()
    }

    private onShapeClick = () => {
        MainSketch.changeShape()
    }

    private onRotateClick = () => {
        MainSketch.rotateShape()
    }

    private onShapeDeleteClick = () => {
        MainSketch.deleteShape()
    }
    private onPlayClick = () => {
       
        MainSketch.updateGrains()
        
    }
    private onStopClick = () => {
       
        MainSketch.stop_sequencer()
        
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
    public render() {
        return (
            <div style={{ marginTop: "12px" }}>
                <h5>Groove Shapes Control</h5>

                <Container>
                
                 <div><Sequencer /></div>   
                    
                <Button
                    
                        text="Play"
                        icon="play"
                        onClick={this.onPlayClick}
                        
                        style={{ marginBottom: "12px" }}
                    />
                    <Button
                    
                    text="Stop"
                    icon="stop"
                    onClick={this.onStopClick}
                    
                    style={{ marginBottom: "12px" }}
                />
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
                        icon="times"
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
}
