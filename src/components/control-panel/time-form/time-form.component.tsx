import React from "react"
import { MainSketch } from "../../../sketches/sketch"
import { Metro } from "../../../sketches/metronome"
import { AppMode } from "src/app/root.component"
import { ModeSelection } from "src/components/mode-selection/mode-selection.component"

export interface IState {
    selectedTimeSignature: string
    selectedNumberOfGrains: string
}

export interface IProps {
    layer: 1 | 2
}

export class TimeForm extends React.Component<IProps, IState> {
    public state = {
        selectedTimeSignature: "",
        selectedNumberOfGrains: ""
    }
    private timeSignature = ["4/4", "3/4", "9/8", "7/8", "5/4", "3/2"]
    private numberOfGrains = {
        "4/4": [4, 8, 12, 16, 20, 24, 28],
        "3/4": [3, 6, 9, 12, 15, 18, 21, 24, 27, 30],
        "9/8": [9, 18, 27, 36],
        "7/8": [7, 14, 21, 28],
        "5/4": [5, 10, 15, 20, 25, 30],
        "3/2": [3, 6, 9, 12, 15, 18]
    }
    private appMode!: AppMode

    public render() {
        const { layer } = this.props
        const { selectedTimeSignature, selectedNumberOfGrains } = this.state
        const disabledNumberOfGrains = selectedTimeSignature === undefined

        return (
            <form onSubmit={this.onSubmit}>
                <div className="form-group row">
                    <label htmlFor="polyrhytm" className="col-sm-2 col-form-label">
                        <ul></ul>
                        <h5>Layer{layer}</h5>
                    </label>
                    <div className="col-sm-10">
                        <input type="text" readOnly className="form-control-plaintext" id="polyrhytm" />
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="timeSignature">Time signature</label>
                    <select
                        className="form-control"
                        id="timeSignature"
                        onChange={this.onSelectTimeSignature}
                        value={selectedTimeSignature}
                    >
                        <option> </option>
                        {this.timeSignature.map((o) => (
                            <option key={`option-${o}`}>{o}</option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="numberOfGrains">Number of grains</label>
                    {this.appMode === AppMode.Learn && (
                        <select
                            className="form-control"
                            id="numberOfGrains"
                            disabled={disabledNumberOfGrains}
                            value={selectedNumberOfGrains}
                            onChange={this.onSelectNumberOfGrains}
                        >
                            {selectedTimeSignature &&
                                this.numberOfGrains[(selectedTimeSignature as unknown) as string].map((o) => (
                                    <option key={`option-${o}`}>{o}</option>
                                ))}
                        </select>
                    )}

                    {this.appMode === AppMode.Play && (
                        <input
                            className="form-control"
                            id="numberOfGrains"
                            disabled={disabledNumberOfGrains}
                            value={selectedNumberOfGrains}
                            onChange={this.onSelectNumberOfGrains}
                        >
                            {selectedTimeSignature &&
                                this.numberOfGrains[(selectedTimeSignature as unknown) as string].map((o) => (
                                    <option key={`option-${o}`}>{o}</option>
                                ))}
                        </input>
                    )}
                </div>
                <button type="submit" className="btn btn-info btn-block">
                    Confirm
                </button>
            </form>
        )
    }

    private onSelectTimeSignature = (event) => {
        this.setState({
            selectedTimeSignature: event.target.value,
            selectedNumberOfGrains: this.numberOfGrains[event.target.value][0]
        })
    }

    private onSelectNumberOfGrains = (event) => {
        this.setState({ selectedNumberOfGrains: event.target.value })
    }

    private onSubmit = (event) => {
        const { selectedNumberOfGrains } = this.state
        const { layer } = this.props

        if (selectedNumberOfGrains) {
            switch (layer) {
                case 1:
                    MainSketch.setNGrain(Number(this.state.selectedNumberOfGrains))
                    MainSketch.setTS1(String(this.state.selectedTimeSignature))
                    Metro.setTS_1(String(this.state.selectedTimeSignature))
                    MainSketch.generateShapes()
                    MainSketch.updateArrays()
                    MainSketch.triggerer()
                    break
                case 2:
                    MainSketch.setNGrain2(Number(this.state.selectedNumberOfGrains))
                    MainSketch.setTS2(String(this.state.selectedTimeSignature))
                    Metro.setTS_2(String(this.state.selectedTimeSignature))
                    MainSketch.generateShapes()
                    MainSketch.updateArrays()
                    MainSketch.triggerer()
                    break
            }
        }

        event.preventDefault()
    }
}
