import { TransactionType } from '../../support/enums/transactionTypes/transaction-types';
import { CommonService } from './../../support/services/common.service';
import { CategoryOutput } from './../../support/interfaces/categories/categoryOutput';
import { ResponseDto } from 'src/app/shared/support/classes/responseDto';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CategoryInput } from '../../support/interfaces/categories/categoryInput';

@Injectable({
  providedIn: 'root',
})
export class CategoriesProxyService {
  private basePath = 'http://localhost:51235/categories';
  constructor(private httpClient: HttpClient, private commonService: CommonService) {}

  public getById(categoryId: string): Observable<ResponseDto<CategoryOutput>> {
    const headers = this.commonService.getHeaders();
    return <Observable<ResponseDto<CategoryOutput>>>this.httpClient.get(`${this.basePath}/${categoryId}`, { headers });
  }

  public create(category: CategoryInput): Observable<ResponseDto> {
    const headers = this.commonService.getHeaders();
    return <Observable<ResponseDto>>this.httpClient.post(`${this.basePath}`, category, { headers });
  }
  public getAll(transactionType: TransactionType): Observable<ResponseDto<Array<CategoryOutput>>> {
    const headers = this.commonService.getHeaders();
    return <Observable<ResponseDto<Array<CategoryOutput>>>>(
      this.httpClient.get(`${this.basePath}?transactionType=${transactionType}`, { headers })
    );
  }
  public update(categoryId: string, category: CategoryInput): Observable<ResponseDto> {
    const headers = this.commonService.getHeaders();
    return <Observable<ResponseDto>>this.httpClient.put(`${this.basePath}/${categoryId}`, category, { headers });
  }
  public delete(categoryId: string): Observable<ResponseDto> {
    const headers = this.commonService.getHeaders();
    return <Observable<ResponseDto>>this.httpClient.delete(`${this.basePath}/${categoryId}`, { headers });
  }
}
