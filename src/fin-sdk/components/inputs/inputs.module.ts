import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FinInputComponent } from './fin-input/fin-input.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FinInputCurrencyComponent } from './fin-input-currency/fin-input-currency.component';

@NgModule({
  declarations: [FinInputComponent, FinInputCurrencyComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule
  ],
  exports:[FinInputComponent, FinInputCurrencyComponent]
})
export class InputsModule { }
