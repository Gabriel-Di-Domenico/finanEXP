import { TransactionOutput } from './../../../shared/support/interfaces/transactions/transactionOutput';
import { TransactionsProxysService } from './../../../shared/proxys/transactionsProxys/transactions-proxys.service';
import { HttpErrorResponse } from '@angular/common/http';
import { take } from 'rxjs';
import { CustomersProxyService } from './../../../shared/proxys/customersProxys/customers-proxy.service';
import { Injectable } from '@angular/core';
import { CustomerOutput } from 'src/app/shared/support/interfaces/customers/customerOutput.interface';
import { ResponseDto } from 'src/app/shared/support/classes/responseDto';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(
    private customersProxyService: CustomersProxyService,
    private transactionsProxysService: TransactionsProxysService
  ) {}
  public getAllCustomers(callback?: (data: ResponseDto<Array<CustomerOutput>>) => void) {
    this.customersProxyService
      .getAll()
      .pipe(take(1))
      .subscribe({
        next: (data: ResponseDto<Array<CustomerOutput>>) => {
          if (callback) {
            callback(data);
          }
        },
        error: (err: HttpErrorResponse) => {
          if (callback) {
            callback(err.error);
          }
        },
      });
  }
  public getAllTransactions(callback?: (data: ResponseDto<Array<TransactionOutput>>) => void) {
    this.transactionsProxysService
      .getAll()
      .pipe(take(1))
      .subscribe({
        next: (data: ResponseDto<Array<TransactionOutput>>) => {
          if (callback) {
            callback(data);
          }
        },
        error: (err: HttpErrorResponse) => {
          if (callback) {
            callback(err.error);
          }
        },
      });
  }

}
