import { SnackBarControlService } from 'finan-exp-sdk';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { DashboardService } from './dashboard.service';
import { Component, LOCALE_ID, OnInit, OnDestroy } from '@angular/core';
import { ResponseDto } from 'src/app/shared/support/classes/responseDto';
import ptBr from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import { TransactionType } from 'src/app/shared/support/enums/transactionTypes/transaction-types';
import { transactionUpdatedHandler } from 'src/app/shared/handlers/transactionHandler/transactionUpdatedHandler';
import { CustomerOutput } from 'src/app/core/dtos/customers/customerOutput';
import { TransactionOutput } from 'src/app/core/dtos/transactions/transactionOutput';

registerLocaleData(ptBr);

@Component({
  selector: 'fin-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./styles/dashboard.component.css'],
  providers: [{ provide: LOCALE_ID, useValue: 'pt-BR' }],
})
export class DashboardComponent implements OnInit, OnDestroy {
  private customers: Array<CustomerOutput> = [];
  private transactions: Array<TransactionOutput> = [];
  public actualBalance = 0;
  public revenuesValue = 0;
  public expensesValue = 0;
  public subscriptions: Array<Subscription> = [];
  public actualBalanceColor: 'green' | 'red' = 'green';
  constructor(
    private dashboardService: DashboardService,
    private snackBarControlService: SnackBarControlService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getCustomers();
    this.getTransactions();
    this.subscriptions.push(
      transactionUpdatedHandler.subscribe(() => {
        this.getCustomers();
        this.getTransactions();
      })
    );
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }
  public navigate(route: 'customers' | 'revenues' | 'expenses') {
    if (route === 'customers') {
      this.router.navigate(['home', route]);
    } else {
      this.router.navigate(['home', 'transactions', route]);
    }
  }
  private getActualBalance() {
    this.actualBalance = 0;
    this.customers.forEach((customer: CustomerOutput) => {
      this.actualBalance += customer.actualBalance;
    });
    if (this.actualBalance < 0) {
      this.actualBalanceColor = 'red';
    } else {
      this.actualBalanceColor = 'green';
    }
  }
  private getCustomers() {
    this.dashboardService.getAllCustomers((data: ResponseDto<Array<CustomerOutput>>) => {
      if (data.message.error) {
        this.snackBarControlService.showMessage(data.message.message, data.message.error);
      } else {
        this.customers = data.content;
        this.getActualBalance();
      }
    });
  }
  private getTransactions() {
    this.dashboardService.getAllTransactions((data: ResponseDto<Array<TransactionOutput>>) => {
      if (data.message.error) {
        this.snackBarControlService.showMessage(data.message.message, data.message.error);
      } else {
        this.transactions = data.content;
        this.getRevenuesAndExpenses();
      }
    });
  }
  private getRevenuesAndExpenses() {
    this.expensesValue = 0;
    this.revenuesValue = 0;
    this.transactions.forEach((transaction: TransactionOutput) => {
      if (transaction.transactionType === TransactionType.revenue) {
        this.revenuesValue += transaction.value;
      } else if (transaction.transactionType === TransactionType.expense) {
        this.expensesValue += transaction.value;
      }
    });
  }
}
