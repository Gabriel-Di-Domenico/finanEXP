import { MatIconModule } from '@angular/material/icon';
import { FinCardComponent } from './fin-card/fin-card.component';

import { ButtonsModule } from './../buttons/buttons.module';

import { PipesModule } from './../../pipes/pipes.module';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { FinCustomerCardComponent } from './fin-customer-card/fin-customer-card.component';
import { FinNewCardComponent } from './fin-new-card/fin-new-card.component';

@NgModule({
  declarations: [FinCustomerCardComponent, FinNewCardComponent, FinCardComponent],
  imports: [CommonModule, MatCardModule, PipesModule, ButtonsModule, MatIconModule],
  exports: [FinCustomerCardComponent, FinNewCardComponent, FinCardComponent],
})
export class CardsModule {}
