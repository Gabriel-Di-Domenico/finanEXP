import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { CustomersRoutingModule } from './customers-routing.module';
import { CustomersComponent } from './customers.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { ContentComponent } from './content/content.component';
import { CustomerEdtiorDialogComponent } from './customer-edtior-dialog/customer-edtior-dialog.component';
import { CustomerDetailsDialogComponent } from './customer-list/customer-details-dialog/customer-details-dialog.component';

@NgModule({
  declarations: [CustomersComponent, CustomerListComponent, ContentComponent, CustomerEdtiorDialogComponent, CustomerDetailsDialogComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CustomersRoutingModule,
    SharedModule,
    MatCardModule
  ],
})
export class CustomersModule {}
