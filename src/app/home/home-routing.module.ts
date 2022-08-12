import { UserConfigComponent } from './components/view/user-config/user-config.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './components/view/dashboard/dashboard.component';
import { HomeComponent } from './components/view/home/home.component';
import { WalletsComponent } from './components/view/wallets/wallets.component';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        children: [
            { path: 'dashboard', component: DashboardComponent },
            { path: 'wallets', component: WalletsComponent },
            { path: 'user/config', component: UserConfigComponent }
        ]
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HomeRoutingModule {

}
