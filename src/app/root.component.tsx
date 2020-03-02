import React from "react"
import "./root.component.scss"
import { Drawer } from "../components/drawer/drawer.component"
import { ControlPanel } from "../components/control-panel/control-panel.component"
import { RightPanel } from "../components/right-panel/right-panel.component"
import { subscribeToTimer } from "../api"
import { ModeSelection } from "../components/mode-selection/mode-selection.component"

export enum AppMode {
    Play,
    Learn
}

interface State {
    appMode: AppMode | null
    timestamp: string
}

export class RootComponent extends React.Component<any, State> {
    constructor(props) {
        super(props)
        subscribeToTimer((err, timestamp) =>
            this.setState({
                timestamp
            })
        )
    }

    public state = {
        appMode: null,
        timestamp: "no timestamp yet"
    }

    public render() {
        const { appMode } = this.state
        const noModeSelected = appMode === null

        return (
            <div className="App">
                {noModeSelected && <ModeSelection onClick={this.onClick} />}
                {!noModeSelected && (
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-2 control-column">
                                <ControlPanel />
                            </div>
                            <div
                                id="centralSquare"
                                className="col-8"
                                style={{ position: "relative", backgroundColor: "#51757a" }}
                            >
                                <Drawer />
                            </div>
                            <div className="col-2 control-column">
                                <RightPanel />
                            </div>
                        </div>

                        <div className="trnsp" style={{ padding: "20px" }}>
                            {" "}
                            This is the encoder value: {this.state.timestamp}
                        </div>
                    </div>
                )}
            </div>
        )
    }

    private onClick = (mode: AppMode) => {
        this.setState({
            appMode: mode
        })

        // TODO: do something more with the mode just selected
    }
}
