import { Component, Input } from '@angular/core';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MustHaveControlName } from '../../common/MustHaveControlName';

@Component({
  selector: 'fin-input-currency',
  templateUrl: './fin-input-currency.component.html',
  styleUrls: ['./fin-input-currency.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: FinInputCurrencyComponent,
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: FinInputCurrencyComponent,
    },
  ],
})
export class FinInputCurrencyComponent extends MustHaveControlName {
  @Input() public type!: string;
  @Input() public placeholder = '';
  @Input() public label!: string;
  @Input() public required!: boolean;
  @Input() public hint!: string;

  override value = '';

  override writeValue(value: string): void {
    this.value = value?.toString();
    this.value = this.currencyMask(Number(this.value).toFixed(2));
  }
  public inputChanges(): void {
    this.value = this.currencyMask(this.value);

    this.markAsTouched();
    this.onChange(this.value);
  }

  public verifyKey(event: KeyboardEvent) {
    if (!this.verifyChar(event.key) || (this.value === 'R$ 0,00 ' && (event.key === 'Backspace' || event.key === '0'))) {
      event.preventDefault();
    }
  }

  private currencyMask(value: string) {
    value = value.replace('.', '').replace(',', '').replace(/\D/g, '');
    if (!value) {
      value = '0';
    }
    const options: Intl.NumberFormatOptions = { minimumFractionDigits: 2, currency: 'BRL' };
    const result = new Intl.NumberFormat('pt-BR', options).format(parseFloat(value) / 100);
    return `R$ ${result} `;
  }

  private verifyChar(char: string) {
    const allowedChars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'Backspace', 'Tab'];
    return allowedChars.includes(char);
  }
}
