import { FinCustomerCardComponent } from './components/fin-customer-card/fin-customer-card.component';
import { PerfilPhotoComponent } from './components/perfilPhoto/perfil-photo.component';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NgModule } from '@angular/core';
import { TransactionMenuComponent } from './components/transaction-menu/transaction-menu.component';
import { MatMenuModule } from '@angular/material/menu';
import { FinanEXPComponentsModule } from 'finan-exp-components';
import { FinanEXPPipesModule } from 'finan-exp-pipes';
import { FinanEXPServicesModule } from 'finan-exp-services';

@NgModule({
  declarations: [TransactionMenuComponent, PerfilPhotoComponent, FinCustomerCardComponent],
  imports: [
    CommonModule,
    FinanEXPComponentsModule,
    FinanEXPPipesModule,
    FinanEXPServicesModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatCardModule,
  ],
  exports: [
    FinanEXPComponentsModule,
    FinanEXPPipesModule,
    FinanEXPServicesModule,
    TransactionMenuComponent,
    PerfilPhotoComponent,
    FinCustomerCardComponent
  ],
})
export class SharedModule {}
