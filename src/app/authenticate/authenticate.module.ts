import { SharedModule } from './../shared/shared.module';
import { AuthenticateService } from './services/authenticate-service/authenticate.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { AuthenticateRoutingModule } from './authenticate-routing.module';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';

import { AuthenticateComponent } from './authenticate.component';
import { AuthenticateFormComponent } from './components/authenticate-form/authenticate-form.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    AuthenticateComponent,
    AuthenticateFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    SharedModule,
    
    MatFormFieldModule,
    MatInputModule,
    MatTabsModule,
    MatIconModule,
    MatButtonModule,

    AuthenticateRoutingModule

  ],
  providers:[HttpClient,AuthenticateService]


})
export class AuthenticateModule { }
