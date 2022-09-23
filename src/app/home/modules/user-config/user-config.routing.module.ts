import { SecurityComponent } from './pages/security/security.component';
import { UserResolverGuard } from '../../../shared/guards/user-resolver.guard';
import { ProfileComponent } from './pages/profile/profile.component';
import { UserConfigComponent } from './user-config.component'
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
            { path: 'security', component: SecurityComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserRoutingModule {

}
