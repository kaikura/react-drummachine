import React from "react"

interface IState {
    selectedTimeSignature: string | undefined
    selectedNumberOfGrains: string | undefined
}

export class TimeForm extends React.Component<any, IState> {
    public state = {
        selectedTimeSignature: undefined,
        selectedNumberOfGrains: undefined
    }

    private timeSignature = ["4/4", "3/4", "9/8", "7/8", "5/4", "3/2"]

    private numberOfGrains = {
        "4/4": [2, 4, 8, 12, 16, 20, 24, 28],
        "3/4": [3, 6, 9, 12, 15, 18, 21, 24, 27, 30],
        "9/8": [9, 18, 27, 36],
        "7/8": [7, 14, 21, 28],
        "5/4": [5, 10, 15, 20, 25, 30],
        "3/2": [3, 6, 9, 12, 15, 18]
    }

    public render() {
        const { selectedTimeSignature, selectedNumberOfGrains } = this.state
        const disabledNumberOfGrains = selectedTimeSignature === undefined

        return (
            <form onSubmit={this.onSubmit}>
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
                </div>
                <button type="submit" className="btn btn-primary btn-block">
                    Confirm
                </button>
            </form>
        )
    }

    private onSelectTimeSignature = (event) => {
        this.setState({ selectedTimeSignature: event.target.value || undefined })
    }

    private onSelectNumberOfGrains = (event) => {
        this.setState({ selectedNumberOfGrains: event.target.value })
    }

    private onSubmit = (event) => {
        event.preventDefault()
        console.log("submit")
        alert(
            `Selected time signature: ${this.state.selectedTimeSignature}, selected number of grains: ${this.state.selectedNumberOfGrains}`
        )
    }
}
