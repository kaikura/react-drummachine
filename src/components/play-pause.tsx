import * as React from 'react';
import './play.css';
import Tone from 'tone';

export class PlayPause extends React.Component<any, any> {
    private isFirst: boolean;
    constructor(props) {
        super(props);
        this.isFirst = true;

        this.state = {
            playing: false,
        }
    }

    public handleClick = () => {
        if(this.isFirst){
            Tone.context.resume();
            this.isFirst=false;
        }
       
        if (this.state.playing) {
            this.props.pause();
        } else {
            this.props.play();
        }
        this.setState({
            playing: !this.state.playing
        });
    }
    render() {
        const playClassName = 'playButton' + (this.state.playing ? ' pauseButton' : '')
        return (
            <div onClick={this.handleClick} className={playClassName} />
        );
    }
}
