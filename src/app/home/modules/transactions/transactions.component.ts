import { SnackBarControlService } from './../../../shared/support/services/snackBarControl/snack-bar-control.service';
import { TransactionsService } from './transactions.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { TransactionType } from 'src/app/shared/support/enums/transactionTypes/transaction-types';
import { TransactionTypePortuguese } from 'src/app/shared/support/enums/transactionTypes/transaction-types-portuguese';
import { Subscription } from 'rxjs';
import { CustomerOutput } from 'src/app/shared/support/interfaces/customers/customerOutput.interface';
import { ResponseDto } from 'src/app/shared/support/classes/responseDto';
import { TransactionOutput } from 'src/app/shared/support/interfaces/transactions/transactionOutput';
import { transactionCreatedHandler } from 'src/app/shared/handlers/transactionCreatedHandler/transactionCreatedHandler';

@Component({
  selector: 'fin-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css'],
})
export class TransactionsComponent implements OnInit {
  public PortugueseTransactionTypeEnum = TransactionTypePortuguese;
  public currentTransactionType = TransactionType.transactions;
  public finAddButtonColor: 'success' | 'warn' | 'primary' = 'primary';
  public actualBalance = 0;
  public revenuesValue = 0;
  public expensesValue = 0;
  public subscriptions: Array<Subscription> = [];
  private customers: Array<CustomerOutput> = [];
  private transactions: Array<TransactionOutput> = [];

  constructor(
    private router: Router,
    private transactionsService: TransactionsService,
    private snackBarControlService: SnackBarControlService,
    private route: ActivatedRoute
  ) {
    this.getTransactionType();
  }
  ngOnInit(): void {
    this.getCustomers();
    this.getTransactions();
    this.subscriptions.push(
      transactionCreatedHandler.subscribe(() => {
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
  public setTransactionType(transactionType: TransactionType) {
    if (transactionType === TransactionType.expense) {
      this.router.navigate(['home', 'transactions', 'expenses']);
    } else if (transactionType === TransactionType.revenue) {
      this.router.navigate(['home', 'transactions', 'revenues']);
    } else {
      this.router.navigate(['home', 'transactions']);
    }
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
  }
  private getCustomers() {
    this.transactionsService.getAllCustomers((data: ResponseDto<Array<CustomerOutput>>) => {
      if (data.message.error) {
        this.snackBarControlService.showMessage(data.message.message, data.message.error);
      } else {
        this.customers = data.content;
        this.getActualBalance();
      }
    });
  }
  private getTransactions() {
    this.transactionsService.getAll(undefined, (data: ResponseDto<Array<TransactionOutput>>) => {
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
      } else {
        this.expensesValue += transaction.value;
      }
    });
  }
  private getTransactionType() {
    if (!this.route.snapshot.url.length) {
      this.currentTransactionType = TransactionType.transactions;
      this.finAddButtonColor = 'primary';
    } else if (this.route.snapshot.url[0].path === 'expenses') {
      this.currentTransactionType = TransactionType.expense;
      this.finAddButtonColor = 'warn';
    } else {
      this.currentTransactionType = TransactionType.revenue;
      this.finAddButtonColor = 'success';
    }
  }
}
