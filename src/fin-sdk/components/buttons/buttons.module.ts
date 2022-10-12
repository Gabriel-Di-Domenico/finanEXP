import { FinButtonComponent } from './fin-button/fin-button.component';
import { FinSubmitButtonComponent } from './fin-submit-button/fin-submit-button.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FinAddButtonComponent } from './fin-add-button/fin-add-button.component';
import { FinCloseButtonComponent } from './fin-close-button/fin-close-button.component';
import { FinEditButtonComponent } from './fin-edit-button/fin-edit-button.component';
import { FinDeleteButtonComponent } from './fin-delete-button/fin-delete-button.component';

@NgModule({
  declarations: [
    FinSubmitButtonComponent,
    FinAddButtonComponent,
    FinAddButtonComponent,
    FinCloseButtonComponent,
    FinEditButtonComponent,
    FinDeleteButtonComponent,
    FinButtonComponent
  ],
  imports: [CommonModule, MatButtonModule, MatIconModule],
  exports: [
    FinSubmitButtonComponent,
    FinAddButtonComponent,
    FinCloseButtonComponent,
    FinEditButtonComponent,
    FinDeleteButtonComponent,
    FinButtonComponent
  ],
})
export class ButtonsModule {}
