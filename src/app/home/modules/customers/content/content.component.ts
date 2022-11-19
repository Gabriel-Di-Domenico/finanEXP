import { ResponseDto } from './../../../../shared/support/classes/responseDto';
import { CustomersService } from './../customers.service';
import { customerUpdateHandler } from '../../../../shared/handlers/customerHandler/customerUpdateHandler';
import { Subscription } from 'rxjs';
import { Component, Input, LOCALE_ID, OnInit, OnDestroy } from '@angular/core';
import { CustomerOutput } from 'src/app/shared/support/interfaces/customers/customerOutput.interface';
import { registerLocaleData } from '@angular/common';
import ptBr from '@angular/common/locales/pt';
import { transactionUpdatedHandler } from 'src/app/shared/handlers/transactionHandler/transactionUpdatedHandler';

registerLocaleData(ptBr);

@Component({
  selector: 'content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css'],
  providers: [{ provide: LOCALE_ID, useValue: 'pt-BR' }],
})
export class ContentComponent implements OnInit, OnDestroy {
  @Input() public customers!: Array<CustomerOutput>;
  public totalBalance = 0;
  public actualBalanceColor:'green' | 'red' = 'green';
  private subscriptions: Array<Subscription> = [];

  constructor(private customersService: CustomersService) {}
  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }
  ngOnInit(): void {
    this.getTotalBalance();

    this.subscriptions.push(
      transactionUpdatedHandler.subscribe(() => {
        this.getAllCustomers();
      })
    );
    this.subscriptions.push(
      customerUpdateHandler.subscribe(() => {
        this.getAllCustomers();
      })
    );
  }
  private getTotalBalance() {
    this.totalBalance = 0;
    this.customers.forEach((customer: CustomerOutput) => {
      this.totalBalance += customer.actualBalance;
    });
    if(this.totalBalance < 0){
      this.actualBalanceColor = 'red'
    }else{
      this.actualBalanceColor = 'green'
    }
  }
  private getAllCustomers() {
    this.customersService.getAll((data: ResponseDto<Array<CustomerOutput>>) => {
      this.customers = data.content;
      this.getTotalBalance();
    });
  }
}
