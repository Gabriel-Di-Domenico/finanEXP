import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WalletsComponent } from './components/view/wallets/wallets.component';
import { DashboardComponent } from './components/view/dashboard/dashboard.component';
import { AuthenticateComponent } from './authenticate/components/view/authenticate/authenticate.component';
import { AuthGuard } from './authenticate/shared/auth.guard';
import { HomeComponent } from './components/view/home/home.component';

const routes: Routes = [
  {path: '', component: AuthenticateComponent,canActivate: [AuthGuard]},
  {
    path: 'home',
    component: HomeComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'wallets', component: WalletsComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
