export class finSelectOption {
  public key!: string;
  public value!: unknown;
  public selected?:boolean;
  constructor(options: { key: string; value: unknown, selected?:boolean }) {
    this.key = options.key;
    this.value = options.value;
    this.selected = options.selected ? options.selected : false
  }
}
