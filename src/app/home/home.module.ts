import { SharedModule } from 'src/app/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';

import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';

import { HomeComponent } from './home.component';
import { MenuComponent } from './components/menu/menu.component';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { FormsModule } from '@angular/forms';
import { UserPhotoEditorComponent } from './components/profile/userPhotoEditor/user-photo-editor.component';

@NgModule({
  declarations: [
    HomeComponent,
    MenuComponent,
    DashboardComponent,
    UserPhotoEditorComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    SharedModule,
    MatMenuModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
