import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { finSelectOption } from 'src/app/shared/support/classes/fin-select-option';
import { MustHaveControlName } from '../../common/MustHaveControlName';

@Component({
  selector: 'fin-select',
  templateUrl: './fin-select.component.html',
  styleUrls: ['./fin-select.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: FinSelectComponent,
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: FinSelectComponent,
    },
  ],
})
export class FinSelectComponent extends MustHaveControlName {
  override value!: string;
  @Input() options!: Array<finSelectOption>;
  @Input() label?: string;
  @Input() required!: boolean;
  @Output() selectionChange = new EventEmitter();

  selectType(selectedOptionValue:MatSelectChange) {
    this.markAsTouched();
    this.onChange(this.value);
    this.selectionChange.emit(selectedOptionValue)
  }
  override writeValue(value: string): void {
    if (value !== null) {
      this.value = value

    }
  }
}
