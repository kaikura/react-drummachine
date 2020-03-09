import React from "react"
import "./tutorial.component.scss"

export class Tutorial extends React.Component<any> {
public render() {
    return (
        <div className="tutorial-show">
            <div className= "alert-size">
<div className="alert-warning alert-dismissible fade show" role="alert">
  <strong>Here you can choose the time signature and the number of grains for your two layers.</strong> 
  <button type="button" className="close" data-dismiss="alert" aria-label="Close">
    <span aria-hidden="true">&times;</span>
  </button>
</div>
<div className="alert-warning alert-dismissible fade show" role="alert">
  <strong>RIGHT PANEL</strong> 
  <button type="button" className="close" data-dismiss="alert" aria-label="Close">
    <span aria-hidden="true">&times;</span>
  </button>
</div>
<div className="alert-warning alert-dismissible fade show" role="alert">
  <strong>
    FOOTER PANEL</strong> 
  <button type="button" className="close" data-dismiss="alert" aria-label="Close">
    <span aria-hidden="true">&times;</span>
  </button>
</div>
</div>
</div>


    )
}
}