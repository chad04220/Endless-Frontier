export class FlightKeyboard {
 constructor(){this.keys=new Set();this.chordLatched=false;}
 down(code,cheatAllowed=false){this.keys.add(code);if(cheatAllowed&&!this.chordLatched&&this.keys.has('KeyU')&&this.keys.has('KeyI')){this.chordLatched=true;return true;}return false;}
 up(code){this.keys.delete(code);if(!this.keys.has('KeyU')&&!this.keys.has('KeyI'))this.chordLatched=false;}
 clear(){this.keys.clear();this.chordLatched=false;}
 throttle(){return (this.keys.has('ShiftLeft')?1:0)+(this.keys.has('ShiftRight')?1:0)-(this.keys.has('AltLeft')?1:0);}
}

export class InstrumentSmoother {
 constructor(){this.values={};}
 reset(){this.values={};}
 sample(key,target,dt,response=9,wrap=0){if(!Number.isFinite(target))return this.values[key]||0;const previous=this.values[key];if(previous===undefined)return this.values[key]=target;let difference=target-previous;if(wrap)difference=((difference+wrap/2)%wrap+wrap)%wrap-wrap/2;let next=previous+difference*(1-Math.exp(-Math.max(0,dt)*response));if(wrap)next=(next%wrap+wrap)%wrap;return this.values[key]=next;}
}

// Standard Gamepad mapping: stick presses are buttons 10 and 11.
export class GamepadEdges{
 constructor(){this.held=new Set();}
 clear(){this.held.clear();}
 poll(pad){const actions={},mapping={2:'fire',3:'lock',10:'gear',11:'flaps'},next=new Set();for(const[index,name]of Object.entries(mapping)){if(pad?.connected&&pad.buttons[+index]?.pressed){next.add(+index);if(!this.held.has(+index))actions[name]=true;}}this.held=next;return actions;}
}
