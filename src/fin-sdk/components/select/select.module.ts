import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ButtonsModule } from './../buttons/buttons.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FinSelectComponent } from './fin-select/fin-select.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [FinSelectComponent],
  imports: [
    CommonModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonsModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
  ],
  exports: [FinSelectComponent],
})
export class SelectModule {}
