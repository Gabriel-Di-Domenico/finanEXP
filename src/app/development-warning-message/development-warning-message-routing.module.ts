import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DevelopmentWarningMessageComponent } from './development-warning-message.component';

const routes: Routes = [{ path: '', component: DevelopmentWarningMessageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DevelopmentWarningMessageRoutingModule { }
