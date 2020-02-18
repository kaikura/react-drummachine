import React from "react"
import { TimeForm } from "./time-form/time-form.component"

export class ControlPanel extends React.Component<any, any> {
    public render() {
        return (
            <div style={{ marginTop: "12px" }}>
                <TimeForm />
            </div>
        )
    }
}
