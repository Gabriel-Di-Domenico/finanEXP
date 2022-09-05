import { PerfilComponent } from './components/view/perfil/perfil.component';
import { MatListModule } from '@angular/material/list';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-config.routing.module';

import { MatIconModule } from '@angular/material/icon';
import {MatTabsModule} from '@angular/material/tabs';

import { UserConfigComponent } from './components/view/user-config/user-config.component';

@NgModule({
  declarations: [
    UserConfigComponent,
    PerfilComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatTabsModule,
    MatListModule,

    UserRoutingModule
  ]
})
export class UserConfigModule { }
