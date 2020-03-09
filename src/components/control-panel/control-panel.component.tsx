import React from "react"
import { TimeForm } from "./time-form/time-form.component"
import { ButtonWithPopover } from "../button-with-popover/button-with-popover.component"

export class ControlPanel extends React.Component<any, any> {
    public render() {
        return (
            <div style={{ margin: "12px" }}>
                <ButtonWithPopover
                    id="test-popover"
                    placement="bottom"
                    title="Test popover"
                    showIcon
                    btnText="Click me"
                    renderPopoverContent={this.renderPopoverContent as any}
                />
                <TimeForm layer={1} />
                <TimeForm layer={2} />
            </div>
        )
    }

    private renderPopoverContent = () => {
        return <p>Contenuto del popover</p>
    }
}
