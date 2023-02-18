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

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserPhotoEditorComponent } from './components/profile/userPhotoEditor/user-photo-editor.component';
import { TransactionsEditorDialogComponent } from './pages/transactions/transactions-editor-dialog/transactions-editor-dialog.component';

@NgModule({
  declarations: [
    HomeComponent,
    MenuComponent,
    UserPhotoEditorComponent,
    TransactionsEditorDialogComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
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
