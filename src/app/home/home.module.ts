import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';

import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';

import { HomeComponent } from './components/view/home/home.component';
import { MenuComponent } from './components/view/menu/menu.component';
import { WalletsComponent } from './components/view/wallets/wallets.component';
import { DashboardComponent } from './components/view/dashboard/dashboard.component';


@NgModule({
  declarations: [
    HomeComponent,
    MenuComponent,
    WalletsComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,

    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,

    HomeRoutingModule
  ]
})
export class HomeModule {}
