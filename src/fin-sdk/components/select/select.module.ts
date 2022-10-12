import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FinSelectComponent } from './fin-select/fin-select.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [FinSelectComponent],
  imports: [CommonModule, MatSelectModule, FormsModule, ReactiveFormsModule],
  exports: [FinSelectComponent],
})
export class SelectModule {}
