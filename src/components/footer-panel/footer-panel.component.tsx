import React from "react"
import { Button } from "../button/button.component"
import { MainSketch } from "../../sketches/sketch"
import { Container } from "./footer-panel.style"
import {TimeForm} from "../control-panel/time-form/time-form.component"


export class FooterPanel extends React.Component<any, any> {
    public render () {
        return(
            <Container>
        <div className="alert alert-info" role="alert">
            <strong>Polyrhythm created: </strong> 
        </div>
        
        
        <div className="alert alert-info" role="alert">
            <strong>Polymeter created:</strong>
        </div>
        </Container>
        )
    }
        
}
