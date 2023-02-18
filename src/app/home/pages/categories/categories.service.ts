import { GetAllFilter } from './../../../shared/support/interfaces/getAllFilter';
import { UpdateFilter } from './../../../shared/support/interfaces/updateFilter';
import { Message } from 'src/app/shared/support/interfaces/message.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { CategoryOutput } from '../../../core/dtos/categories/categoryOutput';
import { CategoriesProxyService } from '../../../api/categoriesProxy/categories-proxy.service';
import { Injectable } from '@angular/core';
import { ResponseDto } from 'src/app/shared/support/classes/responseDto';
import { take } from 'rxjs/operators';
import { CategoryInput } from 'src/app/core/dtos/categories/categoryInput';
import { Category } from 'src/app/core/models/categories/category';

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
  public getAll(
    getAllFilter:GetAllFilter,
    callback?: (data: ResponseDto<Array<CategoryOutput>>) => void): void {
    this.categoriesProxyService
      .getAll(getAllFilter)
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
  public archive(category: Category, callback?: (message: Message) => void) {
    this.categoriesProxyService.update(category.id, category, { toArchive: true } as UpdateFilter).pipe(take(1)).subscribe({
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
    });
  }
  public unArchive(category: Category, callback?: (message: Message) => void){
    this.categoriesProxyService.update(category.id, category, { toArchive: false } as UpdateFilter).pipe(take(1)).subscribe({
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
    });
  }
}
