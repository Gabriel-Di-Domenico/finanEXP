import { UserResolverGuard } from '../shared/guards/user-resolver.guard';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home.component';
import { AuthGuard } from '../guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule),
        canActivate: [AuthGuard],
        canLoad: [AuthGuard],
      },
      {
        path: 'transactions',
        loadChildren: () => import('./pages/transactions/transactions.module').then(m => m.TransactionsModule),
        canActivate: [AuthGuard],
        canLoad: [AuthGuard],
      },

      {
        path: 'customers',
        loadChildren: () => import('./pages/customers/customers.module').then(m => m.CustomersModule),
        canActivate: [AuthGuard],
        canLoad: [AuthGuard],
      },
      {
        path: 'user/config',
        loadChildren: () => import('./pages/user-config/user-config.module').then(m => m.UserConfigModule),
        resolve: { currentUserId: UserResolverGuard },
        canActivate: [AuthGuard],
        canLoad: [AuthGuard],
      },
      {
        path: 'categories',
        loadChildren: () => import('./pages/categories/categories.module').then(m => m.CategoriesModule),
        canActivate: [AuthGuard],
        canLoad: [AuthGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
