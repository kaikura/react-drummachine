import React from "react"
import "./mode-selection.component.scss"
import { AppMode } from "../../app/root.component"

interface Props {
    onClick(mode: AppMode): void
}

export class ModeSelection extends React.Component<Props> {
    public render() {
        return (
            <div className="mode-selection">
                <div className="alert alert-warning">
                    Differences between modes:
                    <ul>
                        <li>
                            <b>Play</b> is to...
                        </li>
                        <li>
                            <b>Learn more</b> is to...
                        </li>
                    </ul>
                </div>
                <div className="btn-container">
                    <button className="btn btn-primary" onClick={this.onClick(AppMode.Play)}>
                        Play mode
                    </button>
                    <button className="btn btn-primary" onClick={this.onClick(AppMode.Learn)}>
                        Learn more
                    </button>
                </div>
            </div>
        )
    }

    private onClick = (mode: AppMode) => {
        return (event) => {
            this.props.onClick(mode)
            event.preventDefault()
        }
    }
}
