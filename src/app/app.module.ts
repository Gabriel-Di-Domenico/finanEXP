import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AuthenticateModule } from './authenticate/authenticate.module';

import { AppComponent } from './app.component';
import { MenuComponent } from './components/view/menu/menu.component';
import { DashboardComponent } from './components/view/dashboard/dashboard.component';
import { WalletsComponent } from './components/view/wallets/wallets.component';
import { AuthenticateRoutingModule } from './authenticate/authenticate-routing.module';
import { HomeComponent } from './components/view/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    DashboardComponent,
    WalletsComponent,
    HomeComponent

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    

    AuthenticateModule,

    AppRoutingModule,
    AuthenticateRoutingModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
