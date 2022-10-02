import { FinSubmitButtonComponent } from './fin-submit-button/fin-submit-button.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [FinSubmitButtonComponent],
  imports: [CommonModule, MatButtonModule, MatIconModule],
  exports: [FinSubmitButtonComponent],
})
export class ButtonsModule {}
