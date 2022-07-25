import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WalletsComponent } from './components/view/wallets/wallets.component';
import { DashboardComponent } from './components/view/dashboard/dashboard.component';
import { AuthenticateComponent } from './authenticate/components/view/authenticate/authenticate.component';

const routes: Routes = [{
  path: 'authenticate',
  component: AuthenticateComponent
},
{
  path: 'dashboard',
  component: DashboardComponent
},
{
  path: 'wallets',
  component: WalletsComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
