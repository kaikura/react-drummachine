import { Synth } from "tone"

export class HiHat {
    private sound: any

    constructor() {
        this.sound = new Synth()
    }

    setup() {
        this.sound.toMaster()
    }

    trigger(time: number) {
        this.setup()
        this.sound.triggerAttackRelease("B2", "30n", time)
    }
}
