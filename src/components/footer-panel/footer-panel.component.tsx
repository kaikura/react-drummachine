import React from "react"
import { Button } from "../button/button.component"
import { MainSketch } from "../../sketches/sketch"
import { Container } from "./footer-panel.style"
import { TimeForm } from "../control-panel/time-form/time-form.component"

export class FooterPanel extends React.Component<any, any> {
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
            <Container>
                <div className="d-flex justify-content-md-around">
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
                    {/*<div className="alert alert-info" role="alert">
                    <strong>Polyrhythm created: </strong>
                </div>

                <div className="alert alert-info" role="alert">
                    <strong>Polymeter created:</strong>
        </div>*/}
                </div>
            </Container>
        )
    }
}
