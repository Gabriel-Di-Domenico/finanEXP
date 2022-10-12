export default class finSelectOption {
  public key!: string;
  public value!: number;
  constructor(options: { key: string; value: number }) {
    this.key = options.key;
    this.value = options.value;
  }
}
