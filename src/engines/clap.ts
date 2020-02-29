import { Synth } from "tone";

export class Clap {
    private sound: any;

constructor(){
    this.sound = new Synth();
}
    

    setup() {
        this.sound.toMaster();
    }

    trigger(time:number) {
        
        this.setup();
        this.sound.triggerAttackRelease('G3','30n',time);


  
}
}