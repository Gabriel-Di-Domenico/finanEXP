import { UserResolverGuard } from './shared/guards/user-resolver.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'developmentWarningMessage', pathMatch: 'full' },
  { path: 'auth', loadChildren: () => import('./authenticate/authenticate.module').then(m => m.AuthenticateModule) },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
    resolve: { currentUserId: UserResolverGuard },
  },
  { path: 'dashboard', loadChildren: () => import('./home/modules/dashboard/dashboard.module').then(m => m.DashboardModule) },
  { path: 'developmentWarningMessage', loadChildren: () => import('./development-warning-message/development-warning-message.module').then(m => m.DevelopmentWarningMessageModule) },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
