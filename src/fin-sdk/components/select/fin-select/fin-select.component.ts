import { Component, Input } from '@angular/core';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
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
export class FinSelectComponent extends MustHaveControlName{
  override value!: number;

  @Input() options!: Array<finSelectOption>;
  @Input() label?: string;
  @Input() required!:boolean;

  selectType(){
    this.markAsTouched();
    this.onChange(this.value);
  }
  override writeValue(value: string): void {
    if(value !== null){
      this.value = Number(value);
    }
  }
}
