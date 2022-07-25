import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MenuComponent } from './components/view/menu/menu.component';

import { DashboardComponent } from './components/view/dashboard/dashboard.component';
import { WalletsComponent } from './components/view/wallets/wallets.component';
import { AuthenticateModule } from './authenticate/authenticate.module';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    DashboardComponent,
    WalletsComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    FormsModule,
    AuthenticateModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
