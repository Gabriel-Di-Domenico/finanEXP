import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FinValidatorsService {

  public trimValidator(formControl: FormControl) {
    const value: string = formControl.value;
    return value?.trim() === '' || value?.endsWith(' ') || value?.startsWith(' ') ? { trim: true } : null;
  }
}
