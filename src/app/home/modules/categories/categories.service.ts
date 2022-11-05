import { TransactionType } from '../../../shared/support/enums/transactionTypes/transaction-types';
import { Message } from 'src/app/shared/support/interfaces/message.interface';
import { CategoryInput } from './../../../shared/support/interfaces/categories/categoryInput';
import { HttpErrorResponse } from '@angular/common/http';
import { CategoryOutput } from './../../../shared/support/interfaces/categories/categoryOutput';
import { CategoriesProxyService } from './../../../shared/proxys/categoriesProxys/categories-proxy.service';
import { Injectable } from '@angular/core';
import { ResponseDto } from 'src/app/shared/support/classes/responseDto';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(private categoriesProxyService: CategoriesProxyService) {}
  public getById(categoryId: string, callback?: (data: ResponseDto<CategoryOutput>) => void) {
    this.categoriesProxyService
      .getById(categoryId)
      .pipe(take(1))
      .subscribe({
        next: (data: ResponseDto<CategoryOutput>) => {
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
  public create(category: CategoryInput, callback?: (message: Message) => void) {
    this.categoriesProxyService
      .create(category)
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
  public getAll(transactionType: TransactionType, callback?: (data: ResponseDto<Array<CategoryOutput>>) => void): void {
    this.categoriesProxyService
      .getAll(transactionType)
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
  public update(categoryId: string, category: CategoryInput, callback?: (message: Message) => void) {
    this.categoriesProxyService
      .update(categoryId, category)
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
  public delete(categoryId: string, callback?: (message: Message) => void) {
    this.categoriesProxyService
      .delete(categoryId)
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
}
