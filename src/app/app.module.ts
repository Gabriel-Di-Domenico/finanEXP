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

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    DashboardComponent,
    WalletsComponent

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

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
