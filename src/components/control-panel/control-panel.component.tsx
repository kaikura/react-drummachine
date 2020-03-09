import React from "react"
import { TimeForm } from "./time-form/time-form.component"

export class ControlPanel extends React.Component<any, any> {
    public render() {
        return (
            <div style={{ margin: "12px" }}>
                <TimeForm layer={1} />
                <TimeForm layer={2} />
            </div>
        )
    }
}
