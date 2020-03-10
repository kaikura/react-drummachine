import React from "react"
import { Button } from "../button/button.component"
import { MainSketch } from "../../sketches/sketch"
import { ButtonWithPopover } from "../button-with-popover/button-with-popover.component"
import "./footer-panel.component.scss"

enum ButtonType {
    Layer,
    Track,
    Shape,
    Rotate,
    DeleteShape
}

export class FooterPanel extends React.Component<any, any> {
    public render() {
        return (
            <div className="footer-panel">
                <div className="d-flex justify-content-md-around">
                    <div className="button-container">
                        <Button
                            text="Layer"
                            icon="plus"
                            onMouseDown={this.onLayerClick}
                            onMouseUp={this.onMouseReleased}
                        />
                        <ButtonWithPopover
                            id="test-popover"
                            placement="bottom"
                            showIcon
                            renderPopoverContent={this.renderPopoverContent(ButtonType.Layer) as any}
                        />
                    </div>

                    <div className="button-container">
                        <Button
                            text="Track"
                            icon="vector-square"
                            onMouseDown={this.onTrackClick}
                            onMouseUp={this.onMouseReleased}
                        />
                        <ButtonWithPopover
                            id="test-popover"
                            placement="bottom"
                            showIcon
                            renderPopoverContent={this.renderPopoverContent(ButtonType.Track) as any}
                        />
                    </div>

                    <div className="button-container">
                        <Button
                            text="Shape"
                            icon="shapes"
                            onMouseDown={this.onShapeClick}
                            onMouseUp={this.onMouseReleased}
                        />
                        <ButtonWithPopover
                            id="test-popover"
                            placement="bottom"
                            showIcon
                            renderPopoverContent={this.renderPopoverContent(ButtonType.Shape) as any}
                        />
                    </div>

                    <div className="button-container">
                        <Button text="Rotate" icon="sync" onClick={this.onRotateClick} />
                        <ButtonWithPopover
                            id="test-popover"
                            placement="bottom"
                            showIcon
                            renderPopoverContent={this.renderPopoverContent(ButtonType.Rotate) as any}
                        />
                    </div>

                    <div className="button-container">
                        <Button
                            text="Delete shape"
                            icon="trash fill"
                            type="danger"
                            onClick={this.onShapeDeleteClick}
                        />
                        <ButtonWithPopover
                            id="test-popover"
                            placement="bottom"
                            showIcon
                            renderPopoverContent={this.renderPopoverContent(ButtonType.DeleteShape) as any}
                        />
                    </div>

                    <Button text="Encoder" onClick={this.encoderClick} />
                    <Button text="-1" onClick={this.minusOneClick} />
                    <Button text="+1" onClick={this.plusOneClick} />
                </div>
            </div>
        )
    }

    private renderPopoverContent = (buttonType) => {
        return () => {
            const map = {
                [ButtonType.Layer]:
                    "Hold to add a layer, press to enter the layer mode. Then you can switch between them with the encoder.",
                [ButtonType.Track]:
                    "Hold to add a track, press to enter the track mode. Then you can switch between them with the encoder.",
                [ButtonType.Rotate]:
                    "Press to enter the rotation mode. Then you can rotate shapes with the encoder",
                [ButtonType.Shape]:
                    "Hold to add a shape. press to enter the shape mode. Then you can switch between them with the encoder.",
                [ButtonType.DeleteShape]: "Press to delete the shape selected."
            }

            return <p>{map[buttonType]}</p>
        }
    }

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
}
