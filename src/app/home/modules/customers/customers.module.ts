import { SharedModule } from 'src/app/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { CustomersRoutingModule } from './customers-routing.module';
import { CustomersComponent } from './customers.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { ContentComponent } from './content/content.component';

@NgModule({
  declarations: [CustomersComponent, CustomerListComponent, ContentComponent],
  imports: [
    CommonModule,
    CustomersRoutingModule,
    SharedModule,
    MatCardModule
  ],
})
export class CustomersModule {}
