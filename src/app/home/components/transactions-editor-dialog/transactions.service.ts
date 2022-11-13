import { TransactionsProxysService } from './../../../shared/proxys/transactionsProxys/transactions-proxys.service';
import { Message } from './../../../shared/support/interfaces/message.interface';
import { TransactionInput } from './../../../shared/support/interfaces/transactions/transactionInput';
import { GetAllFilter } from './../../../shared/support/interfaces/getAllFilter';
import { CategoriesProxyService } from './../../../shared/proxys/categoriesProxys/categories-proxy.service';
import { HttpErrorResponse } from '@angular/common/http';
import { take } from 'rxjs';
import { CustomersProxyService } from './../../../shared/proxys/customersProxys/customers-proxy.service';
import { Injectable } from '@angular/core';
import { CustomerOutput } from 'src/app/shared/support/interfaces/customers/customerOutput.interface';
import { ResponseDto } from 'src/app/shared/support/classes/responseDto';
import { CategoryOutput } from 'src/app/shared/support/interfaces/categories/categoryOutput';

@Injectable({
  providedIn: 'root',
})
export class TransactionsService {
  constructor(
    private customersProxyService: CustomersProxyService,
    private categoriesProxyService: CategoriesProxyService,
    private transactionsProxysService:TransactionsProxysService
  ) {}

  public create(transaction:TransactionInput, callback?:(message:Message) => void){
    this.transactionsProxysService.create(transaction).pipe(take(1)).subscribe({
      next:(data:ResponseDto) => {
        if(callback){
          callback(data.message)
        }
      },
      error:(err:HttpErrorResponse) => {
        if(callback){
          callback(err.error.message)
        }
      }
    })
  }
  public getAllCustomers(callback?: (data: ResponseDto<Array<CustomerOutput>>) => void): void {
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
  public getAllCategories(filter:GetAllFilter, callback?: (data: ResponseDto<Array<CategoryOutput>>) => void): void {
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
