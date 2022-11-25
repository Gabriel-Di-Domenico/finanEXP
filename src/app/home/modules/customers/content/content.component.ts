import { ActivatedRoute } from '@angular/router';
import { ResponseDto } from './../../../../shared/support/classes/responseDto';
import { CustomersService } from './../customers.service';
import { customerUpdateHandler } from '../../../../shared/handlers/customerHandler/customerUpdateHandler';
import { Subscription } from 'rxjs';
import { Component, Input, LOCALE_ID, OnInit, OnDestroy } from '@angular/core';
import { CustomerOutput } from 'src/app/shared/support/interfaces/customers/customerOutput.interface';
import { registerLocaleData } from '@angular/common';
import ptBr from '@angular/common/locales/pt';
import { transactionUpdatedHandler } from 'src/app/shared/handlers/transactionHandler/transactionUpdatedHandler';
import { GetAllFilter } from 'src/app/shared/support/interfaces/getAllFilter';

registerLocaleData(ptBr);

@Component({
  selector: 'content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css'],
  providers: [{ provide: LOCALE_ID, useValue: 'pt-BR' }],
})
export class ContentComponent implements OnInit, OnDestroy {
  public customers!: Array<CustomerOutput>;
  public totalBalance = 0;
  public actualBalanceColor: 'green' | 'red' = 'green';
  public isArchivedComponent = false;
  private subscriptions: Array<Subscription> = [];

  constructor(private customersService: CustomersService, private route: ActivatedRoute) {}
  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }
  ngOnInit(): void {
    if (this.route.snapshot.url.length) {
      this.isArchivedComponent = true
    }

    this.subscriptions.push(
      transactionUpdatedHandler.subscribe(() => {
        this.getAllCustomers();
      })
    );
    this.subscriptions.push(
      customerUpdateHandler.subscribe((customers:Array<CustomerOutput>) => {
        this.customers = customers
        this.getTotalBalance();
      })
    );
  }
  private getTotalBalance() {
    this.totalBalance = 0;

    this.customers.forEach((customer: CustomerOutput) => {
      this.totalBalance += customer.actualBalance;
    });
    if (this.totalBalance < 0) {
      this.actualBalanceColor = 'red';
    } else {
      this.actualBalanceColor = 'green';
    }
  }
  private getAllCustomers() {
    const filter = {
      isArchived: false,
    } as GetAllFilter;
    this.customersService.getAll(filter, (data: ResponseDto<Array<CustomerOutput>>) => {
      this.customers = data.content;
      this.getTotalBalance();
    });
  }
}
