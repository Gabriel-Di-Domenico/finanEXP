import { UserResolverGuard } from '../shared/guards/user-resolver.guard';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HomeComponent } from './pages/home/home.component';
import { WalletsComponent } from './pages/wallets/wallets.component';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        children: [
            { path: 'dashboard', component: DashboardComponent },
            { path: 'wallets', component: WalletsComponent },
            {
                path: 'user/config',
                loadChildren: () => import("./modules/user-config/user-config.module").then(m => m.UserConfigModule),
                resolve: {currentUserId : UserResolverGuard}
            },

        ]
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HomeRoutingModule {

}
