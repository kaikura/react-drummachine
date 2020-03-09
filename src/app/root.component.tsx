import React from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import "./root.component.scss"
import { Drawer } from "../components/drawer/drawer.component"
import { ControlPanel } from "../components/control-panel/control-panel.component"
import { RightPanel } from "../components/right-panel/right-panel.component"
import { FooterPanel } from "../components/footer-panel/footer-panel.component"
import { subscribeToTimer } from "../api"
import { ModeSelection } from "../components/mode-selection/mode-selection.component"
import { AppContext } from "./app-context"
import { MainSketch } from "../sketches/sketch"
import { Tutorial } from "src/tutorial/tutorial.component"

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
        timestamp: "no timestamp yet",
    }

    public render() {
        const { appMode } = this.state
        const noModeSelected = appMode === null
        const backgroundColor = appMode === AppMode.Learn ? "#17a2b8" : "#348781"
        MainSketch.setEncoder(String(this.state.timestamp))

        return (
            <AppContext.Provider value={{ appMode }}>
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
                                    style={{ position: "relative", backgroundColor }}
                                >
                                    <Drawer />
                                </div>

                                <div className="col-2 control-column">
                                    <RightPanel />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12 control-column">
                                    <FooterPanel />
                                </div>
                            </div>
                            <div> This is the encoder value: {this.state.timestamp}</div>
                        </div>
                    )}
                </div>
            </AppContext.Provider>
        )
    }

    private onClick = (mode: AppMode) => {
        this.setState({
            appMode: mode
        })
        console.log(this.state.appMode)
        MainSketch.setAppMode(mode)
        // TODO: do something more with the mode just selected
    }
}
