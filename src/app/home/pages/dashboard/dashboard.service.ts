import { TransactionsProxysService } from '../../../api/transactionsProxy/transactions-proxys.service';
import { HttpErrorResponse } from '@angular/common/http';
import { take } from 'rxjs';
import { CustomersProxyService } from '../../../api/customersProxy/customers-proxy.service';
import { Injectable } from '@angular/core';
import { ResponseDto } from 'src/app/shared/support/classes/responseDto';
import { CustomerOutput } from 'src/app/core/dtos/customers/customerOutput';
import { TransactionOutput } from 'src/app/core/dtos/transactions/transactionOutput';

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
