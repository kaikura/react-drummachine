import React from "react"
import { Container } from "./control-panel.style"
import { Button } from "../button/button.component"
import { MainSketch } from "../../sketches/sketch"
import $ from "jquery"

export class ControlPanel extends React.Component<any, any> {
    public render() {
        return (
            <div style={{ marginTop: "12px" }}>
                    <h4>Time signature</h4>
                        <Container>
<script src="selectFilter.min.js"/>
                                 <select id="timeSignature" className="form-control time signature selectFilter" data-target="numberGrains">
        <option value="-1" >Select the time signature</option>     
        <option data-ref="4/4" >4/4</option>
        <option data-ref="3/4">3/4</option>
        <option data-ref="9/8">9/8</option>
        <option data-ref="7/8">7/8</option>
        <option data-ref="5/4">5/4</option>
        <option data-ref="3/2">3/2</option>
                                </select>
                                <h4>Number of grains</h4>
                                <select id="numberGrains" className="form-control grains selectFilter" data-ref="timeSignature" >
<option value="-1">Select the number of grains</option>     
<option value="0" data-belong="4/4">2</option>
<option value="1" data-belong="4/4">4</option>
<option value="2" data-belong="4/4">8</option>
<option value="3" data-belong="4/4">12</option>
<option value="4" data-belong="4/4">16</option>
<option value="5" data-belong="4/4">20</option>
<option value="6" data-belong="4/4">24</option>
<option value="7" data-belong="4/4">28</option>
<option value="8" data-belong="3/4">3</option>
<option value="9" data-belong="3/4">6</option>
<option value="10" data-belong="3/4">9</option>
<option value="11" data-belong="3/4">12</option>
<option value="12" data-belong="3/4">15</option>
<option value="13" data-belong="3/4">18</option>
<option value="14" data-belong="3/4">21</option>
<option value="15" data-belong="3/4">24</option>
<option value="16" data-belong="3/4">27</option>
<option value="17" data-belong="3/4">30</option>


                                </select>
                                </Container>
                            </div>
            
        )
    }

    
}