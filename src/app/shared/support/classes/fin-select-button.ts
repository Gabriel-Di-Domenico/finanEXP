export class finSelectButton {
  public label!: string;
  public callback!: () => void;

  constructor(label:string, callback:() => void) {
    this.label = label;
    this.callback = callback;
  }
}
