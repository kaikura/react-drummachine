import { Synth } from "tone";

export class Snare {
    private sound: any;

constructor(){
    this.sound = new Synth();
}
    

    setup() {
        this.sound.toMaster();
    }

    trigger(time:number) {
        
        this.setup();
        this.sound.triggerAttackRelease('G2','30n',time);


  
}
}