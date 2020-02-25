import React from "react"
import "./root.component.scss"
import { Drawer } from "../components/drawer/drawer.component"
import { Navbar } from "../components/navbar/navbar.component"
import { ControlPanel } from "../components/control-panel/control-panel.component"
import { FooterPanel } from "../components/footer-panel/footer-panel.component"
import { RightPanel } from "../components/right-panel/right-panel.component"
import { TransportComponent } from "src/components/transport"
import { subscribeToTimer } from '../api';

export class RootComponent extends React.Component<any, any> {
    constructor(props) {
        super(props);
        subscribeToTimer((err, timestamp) => this.setState({ 
          timestamp 
        }));
        
      }
      state = {
        timestamp: 'no timestamp yet'
      };
    public render() {
        return (
            <div className="App">
                
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
<<<<<<< HEAD
                            This is the timer value: {this.state.timestamp}
=======
                            
>>>>>>> e463111f245399371d54fdde9da1f93ee484e5df
                        
                    </div>
                </div>
            </div>
        )
    }
}
