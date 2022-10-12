import { FinBalanceCardComponent } from './fin-balance-card/fin-balance-card.component';

import { ButtonsModule } from './../buttons/buttons.module';

import { PipesModule } from './../../pipes/pipes.module';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { FinCustomerCardComponent } from './fin-customer-card/fin-customer-card.component';
import { FinNewCardComponent } from './fin-new-card/fin-new-card.component';

@NgModule({
  declarations: [FinCustomerCardComponent, FinNewCardComponent, FinBalanceCardComponent],
  imports: [
    CommonModule,
    MatCardModule,
    PipesModule,
    ButtonsModule
  ],
  exports:[FinCustomerCardComponent, FinNewCardComponent, FinBalanceCardComponent]
})
export class CardsModule { }
