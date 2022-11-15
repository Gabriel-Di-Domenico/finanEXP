import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FinSDKModule } from './../../fin-sdk/fin-sdk.module';
import { NgModule } from '@angular/core';
import { TransactionMenuComponent } from './components/transaction-menu/transaction-menu.component';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  declarations: [TransactionMenuComponent],
  imports: [CommonModule, FinSDKModule, MatIconModule, MatButtonModule, MatMenuModule],
  exports: [FinSDKModule, TransactionMenuComponent],
})
export class SharedModule {}
