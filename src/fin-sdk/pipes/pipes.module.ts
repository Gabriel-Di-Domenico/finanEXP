import { ConvertEnumPipe } from './convert-enum.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [ConvertEnumPipe],
  imports: [CommonModule],
  exports:[ConvertEnumPipe]
})
export class PipesModule {}
