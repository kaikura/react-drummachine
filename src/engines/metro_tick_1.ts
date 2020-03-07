import { Synth } from "tone"

export class Tick_1 {
    private sound: any

    constructor() {
        this.sound = new Synth()
    }

    setup() {
        this.sound.toMaster()
    }

    trigger(time: number) {
        this.setup()
        this.sound.triggerAttackRelease("B5", "30n", time)
    }
}
