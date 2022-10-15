import { Component, Input } from '@angular/core';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { inputMask } from 'src/app/shared/support/classes/inputMask';
import { MustHaveControlName } from '../../common/MustHaveControlName';

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
export class FinInputComponent extends MustHaveControlName {
  @Input() public type!: string;
  @Input() public placeholder = '';
  @Input() public label!: string;
  @Input() public required!: boolean;
  @Input() public hint!: string;
  @Input() public mask?: inputMask;

  override value = '';
  public showPassword = false;

  override writeValue(value: string): void {
    this.value = value;
  }

  public inputChanges(): void {
    this.markAsTouched();
    this.onChange(this.value);
  }
}
