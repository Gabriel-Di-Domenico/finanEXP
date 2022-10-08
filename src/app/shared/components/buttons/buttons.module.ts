import { FinSubmitButtonComponent } from './fin-submit-button/fin-submit-button.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FinAddButtonComponent } from './fin-add-button/fin-add-button.component';

@NgModule({
  declarations: [FinSubmitButtonComponent, FinAddButtonComponent, FinAddButtonComponent],
  imports: [CommonModule, MatButtonModule, MatIconModule],
  exports: [FinSubmitButtonComponent, FinAddButtonComponent],
})
export class ButtonsModule {}
