import { TransactionsProxysService } from '../../../api/transactionsProxy/transactions-proxys.service';
import { Message } from '../../../shared/support/interfaces/message.interface';
import { GetAllFilter } from '../../../shared/support/interfaces/getAllFilter';
import { CategoriesProxyService } from '../../../api/categoriesProxy/categories-proxy.service';
import { HttpErrorResponse } from '@angular/common/http';
import { take } from 'rxjs';
import { CustomersProxyService } from '../../../api/customersProxy/customers-proxy.service';
import { Injectable } from '@angular/core';
import { ResponseDto } from 'src/app/shared/support/classes/responseDto';
import { CategoryOutput } from 'src/app/core/dtos/categories/categoryOutput';
import { TransactionOutput } from 'src/app/core/dtos/transactions/transactionOutput';
import { TransactionInput } from 'src/app/core/dtos/transactions/transactionInput';
import { CustomerOutput } from 'src/app/core/dtos/customers/customerOutput';

@Injectable({
  providedIn: 'root',
})
export class TransactionsService {
  constructor(
    private customersProxyService: CustomersProxyService,
    private categoriesProxyService: CategoriesProxyService,
    private transactionsProxysService: TransactionsProxysService
  ) {}

  public getAll(filter?: GetAllFilter, callback?: (data: ResponseDto<Array<TransactionOutput>>) => void) {
    this.transactionsProxysService
      .getAll(filter)
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
  public getById(id: string, callback?: (message: ResponseDto<TransactionOutput>) => void) {
    this.transactionsProxysService
      .getById(id)
      .pipe(take(1))
      .subscribe({
        next: (data: ResponseDto) => {
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
  public update(id: string, transaction: TransactionInput, callback?: (message: Message) => void) {
    this.transactionsProxysService
      .update(id, transaction)
      .pipe(take(1))
      .subscribe({
        next: (data: ResponseDto) => {
          if (callback) {
            callback(data.message);
          }
        },
        error: (err: HttpErrorResponse) => {
          if (callback) {
            callback(err.error.message);
          }
        },
      });
  }

  public create(transaction: TransactionInput, callback?: (message: Message) => void) {
    this.transactionsProxysService
      .create(transaction)
      .pipe(take(1))
      .subscribe({
        next: (data: ResponseDto) => {
          if (callback) {
            callback(data.message);
          }
        },
        error: (err: HttpErrorResponse) => {
          if (callback) {
            callback(err.error.message);
          }
        },
      });
  }
  public delete(id: string, callback?: (message: Message) => void) {
    this.transactionsProxysService
      .delete(id)
      .pipe(take(1))
      .subscribe({
        next: (data: ResponseDto) => {
          if (callback) {
            callback(data.message);
          }
        },
        error: (err: HttpErrorResponse) => {
          if (callback) {
            callback(err.error.message);
          }
        },
      });
  }
  public getAllCustomers(filter?: GetAllFilter, callback?: (data: ResponseDto<Array<CustomerOutput>>) => void): void {
    this.customersProxyService
      .getAll(filter)
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
  public getAllCategories(filter?: GetAllFilter, callback?: (data: ResponseDto<Array<CategoryOutput>>) => void): void {
    this.categoriesProxyService
      .getAll(filter)
      .pipe(take(1))
      .subscribe({
        next: (data: ResponseDto<Array<CategoryOutput>>) => {
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
