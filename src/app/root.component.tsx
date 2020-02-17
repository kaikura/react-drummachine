import React from "react"
import "./root.component.scss"
import { Drawer } from "../components/drawer/drawer.component"
import { Navbar } from "../components/navbar/navbar.component"
import { ControlPanel } from "../components/control-panel/control-panel.component"
import { FooterPanel } from "../components/footer-panel/footer-panel.component"
import { RightPanel } from "../components/right-panel/right-panel.component"
import { TransportComponent } from "src/components/transport"

export class RootComponent extends React.Component<any, any> {
    public render() {
        return (
            <div className="App">
                <Navbar />
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-2 control-column">
                            <ControlPanel />
                        </div>
                        <div
                            id="centralSquare"
                            className="col-8"
                            style={{ position: "relative", backgroundColor: "#81A094" }}
                        >
                            <Drawer />
                        </div>
                        <div className="col-2 control-column">
                            <RightPanel />
                        </div>
                    </div>
                    <div className="row" style={{ padding: "20px" }}>
                        <FooterPanel />
                        <div className="trnsp" style={{ padding: "20px" }}>
                            {" "}
                            <TransportComponent />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
