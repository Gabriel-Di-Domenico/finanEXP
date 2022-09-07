import { UserResolverGuard } from '../../../shared/guards/user-resolver.guard';
import { ProfileComponent } from './pages/profile/profile.component';
import { UserConfigComponent } from './pages/user-config/user-config.component'
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        component: UserConfigComponent,
        children: [
            {
                path: 'profile',
                component: ProfileComponent,
                resolve: { currentUserId: UserResolverGuard }
            },
            { path: 'financeiro', component: ProfileComponent }
        ]
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserRoutingModule {

}
