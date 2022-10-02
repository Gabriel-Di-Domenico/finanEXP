import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FinButtonComponent } from './fin-button/fin-button.component';

@NgModule({
  declarations: [FinButtonComponent],
  imports: [CommonModule, MatButtonModule, MatIconModule],
  exports: [FinButtonComponent],
})
export class ButtonsModule {}
