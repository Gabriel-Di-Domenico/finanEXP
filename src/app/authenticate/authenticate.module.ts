import { SharedModule } from './../shared/shared.module';
import { AuthenticateService } from './services/authenticate-service/authenticate.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { AuthenticateRoutingModule } from './authenticate-routing.module';

import { MatTabsModule } from '@angular/material/tabs';

import { AuthenticateComponent } from './authenticate.component';
import { AuthenticateFormComponent } from './components/authenticate-form/authenticate-form.component';

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
    MatTabsModule,
    AuthenticateRoutingModule

  ],
  providers:[HttpClient, AuthenticateService]

})
export class AuthenticateModule { }
