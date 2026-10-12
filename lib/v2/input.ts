import { emptyInput, type DriveInput } from "./physics";

export const keyActions: Record<string,keyof DriveInput> = {
  w:"forward",arrowup:"forward",s:"reverse",arrowdown:"reverse",
  a:"left",arrowleft:"left",d:"right",arrowright:"right"," ":"brake",
};

/** Keeps each physical key and pointer independent so one release cannot cancel another hold. */
export class InputController {
  readonly input=emptyInput();
  private keys=new Map<string,keyof DriveInput>();
  private pointers=new Map<number,keyof DriveInput>();
  pressKey(key:string){const action=keyActions[key.toLowerCase()];if(action){this.keys.set(key.toLowerCase(),action);this.sync();}return !!action;}
  releaseKey(key:string){const action=keyActions[key.toLowerCase()];this.keys.delete(key.toLowerCase());this.sync();return !!action;}
  pressPointer(id:number,action:keyof DriveInput){this.pointers.set(id,action);this.sync();}
  releasePointer(id:number){this.pointers.delete(id);this.sync();}
  clear(){this.keys.clear();this.pointers.clear();this.sync();}
  private sync(){for(const action of Object.keys(this.input) as (keyof DriveInput)[])
    this.input[action]=[...this.keys.values(),...this.pointers.values()].includes(action);}
}
