
import { Synth } from "tone";

export class Kick {
    private sound: any;

constructor(){
    this.sound = new Synth();
}
    

    setup() {
        this.sound.toMaster();
    }

    trigger(time:number) {
        
        this.setup();
        this.sound.triggerAttackRelease('C2','30n',time);


  
}
}