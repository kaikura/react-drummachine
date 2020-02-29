import * as React from "react"

export type Instruments = "Kick" | "Snare" | "HiHat" | "Clap" | "Cymbal"

export interface InstrumentHackProps {
    steps: boolean[]
    selectedInstrument: Instruments
}

export class InstrumentHack extends React.Component<InstrumentHackProps> {
    render() {
        const childrenWithProps = React.Children.map(this.props.children, (child:any) => {
            if (child && typeof child === "object") {
                if (child.key === this.props.selectedInstrument) {
                    return React.cloneElement(child, { steps: this.props.steps, selected: true })
                } else {
                    return React.cloneElement(child, { steps: null, selected: true })
                }
            }
            return child
        })

        return (
            <div style={{ flex: 1, flexDirection: "row", justifyContent: "space-between" }}>
                {childrenWithProps}
            </div>
        )
    }
}
