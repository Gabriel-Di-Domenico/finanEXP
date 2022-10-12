import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FinTitleComponent } from './fin-title/fin-title.component';
import { FinSubtitleComponent } from './fin-subtitle/fin-subtitle.component';
import { FinH3Component } from './fin-h3/fin-h3.component';

@NgModule({
  declarations: [
    FinTitleComponent,
    FinSubtitleComponent,
    FinH3Component
  ],
  imports: [
    CommonModule
  ],
  exports:[
    FinTitleComponent,
    FinSubtitleComponent,
    FinH3Component
  ]
})
export class FinCommonModule { }
