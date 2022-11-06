import { FinIconButtonComponent } from './fin-icon-button/fin-icon-button.component';
import { FinButtonComponent } from './fin-button/fin-button.component';
import { FinSubmitButtonComponent } from './fin-submit-button/fin-submit-button.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    FinSubmitButtonComponent,
    FinButtonComponent,
    FinIconButtonComponent
  ],
  imports: [CommonModule, MatButtonModule, MatIconModule],
  exports: [
    FinSubmitButtonComponent,
    FinButtonComponent,
    FinIconButtonComponent
  ],
})
export class ButtonsModule {}
