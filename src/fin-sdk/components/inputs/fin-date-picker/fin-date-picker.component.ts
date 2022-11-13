import { Component, Input } from '@angular/core';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MustHaveControlName } from '../../common/MustHaveControlName';
import * as _moment from 'moment';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';

import { default as _rollupMoment } from 'moment';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

export const MY_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
  },
};
@Component({
  selector: 'fin-date-picker',
  templateUrl: './fin-date-picker.component.html',
  styleUrls: ['./fin-date-picker.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: FinDatePickerComponent,
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: FinDatePickerComponent,
    },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    { provide: MAT_DATE_LOCALE, useValue: 'pt-br' },
  ],
})
export class FinDatePickerComponent extends MustHaveControlName {
  @Input() label = 'Data';
  @Input() hint!: string;
  @Input() required!: boolean;
  constructor() {
    super();
  }
  override writeValue(value: string): void {
    this.value = value
  }
  public inputChanges(): void {
    this.value = (<_moment.Moment>this.value).toDate()
    this.markAsTouched();
    this.onChange(this.value);
  }
}
