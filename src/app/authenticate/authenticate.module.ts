import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AuthenticateComponent } from './components/view/authenticate/authenticate.component';
import { AuthenticateFormComponent } from './components/view/authenticate/authenticate-form/authenticate-form.component';
import { AuthenticateRoutingModule } from './authenticate-routing.module';

@NgModule({
  declarations: [
    AuthenticateComponent,
    AuthenticateFormComponent

  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,

    MatFormFieldModule,
    MatInputModule,
    MatTabsModule,
    MatIconModule,

    AuthenticateRoutingModule

  ]
})
export class AuthenticateModule { }
