import { MatDatepickerModule } from '@angular/material/datepicker';
import { FinDatePickerComponent } from './fin-date-picker/fin-date-picker.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FinInputComponent } from './fin-input/fin-input.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FinInputCurrencyComponent } from './fin-input-currency/fin-input-currency.component';
import { MatNativeDateModule } from '@angular/material/core';

@NgModule({
  declarations: [FinInputComponent, FinInputCurrencyComponent, FinDatePickerComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  exports:[FinInputComponent, FinInputCurrencyComponent, FinDatePickerComponent]
})
export class InputsModule { }
