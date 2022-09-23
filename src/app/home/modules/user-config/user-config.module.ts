import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { ProfileComponent } from './pages/profile/profile.component';
import { MatListModule } from '@angular/material/list';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-config.routing.module';

import { MatIconModule } from '@angular/material/icon';
import {MatTabsModule} from '@angular/material/tabs';

import { UserConfigComponent } from './user-config.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    UserConfigComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    
    MatIconModule,
    MatTabsModule,
    MatListModule,
    MatInputModule,
    MatButtonModule,

    UserRoutingModule
  ]
})
export class UserConfigModule { }
