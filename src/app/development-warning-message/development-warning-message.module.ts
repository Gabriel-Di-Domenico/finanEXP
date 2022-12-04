import { SharedModule } from 'src/app/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DevelopmentWarningMessageRoutingModule } from './development-warning-message-routing.module';
import { DevelopmentWarningMessageComponent } from './development-warning-message.component';

@NgModule({
  declarations: [
    DevelopmentWarningMessageComponent
  ],
  imports: [
    CommonModule,
    DevelopmentWarningMessageRoutingModule,
    SharedModule
  ]
})
export class DevelopmentWarningMessageModule { }
