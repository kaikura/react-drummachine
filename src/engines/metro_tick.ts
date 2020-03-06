import { Synth } from "tone"

export class Tick {
    private sound: any

    constructor() {
        this.sound = new Synth()
    }

    setup() {
        this.sound.toMaster()
    }

    trigger(time: number) {
        this.setup()
        this.sound.triggerAttackRelease("C4", "30n", time)
    }
}
