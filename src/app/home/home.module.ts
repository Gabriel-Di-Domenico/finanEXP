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
import { FormsModule } from '@angular/forms';
import { UserConfigComponent } from './components/view/user-config/user-config.component';


@NgModule({
  declarations: [
    HomeComponent,
    MenuComponent,
    WalletsComponent,
    DashboardComponent,
    UserConfigComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,

    HomeRoutingModule
  ]
})
export class HomeModule { }
