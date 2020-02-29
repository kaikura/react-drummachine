import * as React from "react"
import { Transport } from "tone"
import { BPM } from "./bpm-component"
import { Instrument } from "./instrument"
import { InstrumentHack } from "./instrument-hack"
import { PlayPause } from "./play-pause"
import { Steps } from "./steps"
import { Container } from "./transport-style"

export class TransportComponent extends React.Component<any, any> {
    constructor(props) {
        super(props)
        this.state = {
            steps: [
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false
            ],
            selected: null,
            bpm: 120
        }
        Transport.TimeSignature = 3
        Transport.loop = true
        Transport.loopEnd = "1m"
    }

    pause = () => {
        Transport.stop()
    }

    play = () => {
        Transport.start()
    }

    private handleStepChange = (id: number) => {
        const s = this.state.steps
        s[id] = !s[id]
        this.setState({
            steps: s
        })
    }

    private selectInstrument = (selected: string, steps: boolean[]) => {
        this.setState({ selected, steps })
    }

    handleBPMChange = (bpm: number) => {
        Transport.bpm.value = bpm
        this.setState({ bpm })
    }

    render() {
        return (
            <div>
                <div style={{ display: "block" }}>
                    <BPM handleChange={this.handleBPMChange} value={this.state.bpm} />
                    <PlayPause play={this.play} pause={this.pause} />
                </div>

                <Container>
                    <InstrumentHack steps={this.state.steps} selectedInstrument={this.state.selected}>
                        <Instrument engine="Kick" key="Kick" handleClick={this.selectInstrument} />
                        <Instrument engine="Snare" key="Snare" handleClick={this.selectInstrument} />
                        <Instrument engine="Clap" key="Clap" handleClick={this.selectInstrument} />
                        <Instrument engine="HiHat" key="HiHat" handleClick={this.selectInstrument} />
                        <Instrument engine="Cymbal" key="Cymbal" handleClick={this.selectInstrument} />
                    </InstrumentHack>
                </Container>
                <Steps handleStepChange={this.handleStepChange} steps={this.state.steps} />
            </div>
        )
    }
}
