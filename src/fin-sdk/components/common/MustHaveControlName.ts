import { AbstractControl, ControlValueAccessor, ValidationErrors, Validator } from '@angular/forms';

export class MustHaveControlName implements ControlValueAccessor, Validator {
  public disabled = false;
  public value!: any;

  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    return null;
  }
  writeValue(value: string): void {
    this.value = Number(value);
  }
  registerOnChange(
    onChange: (type: unknown) => {
      // Vazio
    }
  ): void {
    this.onChange = onChange;
  }
  registerOnTouched(
    onTouched: () => {
      // Vazio
    }
  ): void {
    this.onTouched = onTouched;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
  protected onChange = (type: unknown) => {
    // Vazio
  };

  protected onTouched = () => {
    // Vazio
  };
  protected markAsTouched() {
    this.onTouched();
  }
}
