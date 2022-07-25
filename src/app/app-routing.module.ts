import { WalletsComponent } from './components/view/wallets/wallets.component';
import { DashboardComponent } from './components/view/dashboard/dashboard.component';
import { LoginComponent } from './components/view/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{
  path: 'login',
  component: LoginComponent
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
