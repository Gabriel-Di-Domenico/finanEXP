import { Component, Input } from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
} from '@angular/forms';

@Component({
  selector: 'app-fin-input',
  templateUrl: './fin-input.component.html',
  styleUrls: ['./fin-input.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: FinInputComponent,
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: FinInputComponent,
    },
  ],
})
export class FinInputComponent implements ControlValueAccessor, Validator {
  @Input() public type!: string;
  @Input() public placeholder = '';
  @Input() public label!: string;
  @Input() public required!:string | boolean;
  @Input() public hint!:string;
  public touched = false;
  public value = '';
  public showPassword = false;
  public disabled = false;

  public inputChanges(): void {
    this.markAsTouched();
    this.onChange(this.value);
  }

  public writeValue(value: string): void {
    this.value = value;
  }

  public registerOnChange(
    onChange: (email: string | undefined) => {
      // Vazio
    }
  ): void {
    this.onChange = onChange;
  }

  public registerOnTouched(
    onTouched: () => {
      // Vazio
    }
  ): void {
    this.onTouched = onTouched;
  }

  public setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
  public validate(): ValidationErrors | null {
    return null;
  }

  private markAsTouched() {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }

  private onChange = (email: string | undefined) => {
    // Vazio
  };

  private onTouched = () => {
    // Vazio
  };
}
