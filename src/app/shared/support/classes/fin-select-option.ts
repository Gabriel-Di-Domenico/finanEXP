export class finSelectOption {
  public key!: string;
  public value!: unknown;
  constructor(options: { key: string; value: unknown }) {
    this.key = options.key;
    this.value = options.value;
  }
}
