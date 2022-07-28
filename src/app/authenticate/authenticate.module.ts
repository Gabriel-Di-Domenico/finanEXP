import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticateRoutingModule } from './authenticate-routing.module';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';

import { AuthenticateComponent } from './components/view/authenticate/authenticate.component';
import { AuthenticateFormComponent } from './components/view/authenticate/authenticate-form/authenticate-form.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    AuthenticateComponent,
    AuthenticateFormComponent
  ],
  imports: [
    CommonModule,

    MatFormFieldModule,
    MatInputModule,
    MatTabsModule,
    MatIconModule,
    MatButtonModule,

    AuthenticateRoutingModule

  ]
})
export class AuthenticateModule { }
