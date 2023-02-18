import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatIconModule } from '@angular/material/icon';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransactionsRoutingModule } from './transactions-routing.module';
import { TransactionsComponent } from './transactions.component';
import { TransactionsListComponent } from './transactions-list/transactions-list.component';

@NgModule({
  declarations: [
    TransactionsComponent,
    TransactionsListComponent
  ],
  imports: [
    CommonModule,
    TransactionsRoutingModule,
    MatIconModule,
    MatMenuModule,
    MatTableModule,
    SharedModule
  ]
})
export class TransactionsModule { }
