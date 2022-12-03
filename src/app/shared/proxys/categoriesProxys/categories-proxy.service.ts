import { environment } from 'src/environments/environment';
import { UpdateFilter } from './../../support/interfaces/updateFilter';
import { GetAllFilter } from './../../support/interfaces/getAllFilter';
import { CommonService } from './../../support/services/common.service';
import { CategoryOutput } from './../../support/interfaces/categories/categoryOutput';
import { ResponseDto } from 'src/app/shared/support/classes/responseDto';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CategoryInput } from '../../support/interfaces/categories/categoryInput';

@Injectable({
  providedIn: 'root',
})
export class CategoriesProxyService {
  private basePath = `${environment.baseUrl}/categories`;
  constructor(private httpClient: HttpClient, private commonService: CommonService) {}

  public getById(categoryId: string): Observable<ResponseDto<CategoryOutput>> {
    const headers = this.commonService.getHeaders();
    return <Observable<ResponseDto<CategoryOutput>>>this.httpClient.get(`${this.basePath}/${categoryId}`, { headers });
  }

  public create(category: CategoryInput): Observable<ResponseDto> {
    const headers = this.commonService.getHeaders();
    return <Observable<ResponseDto>>this.httpClient.post(`${this.basePath}`, category, { headers });
  }
  public getAll(getAllFilter?: GetAllFilter): Observable<ResponseDto<Array<CategoryOutput>>> {
    const headers = this.commonService.getHeaders();
    let params = new HttpParams();
    if (getAllFilter && getAllFilter.transactionType != null) {
      params = params.append('transactionType', getAllFilter.transactionType);
    }
    if (getAllFilter && getAllFilter.isArchived != null) {
      params = params.append('isArchived', getAllFilter.isArchived);
    }

    return <Observable<ResponseDto<Array<CategoryOutput>>>>(
      this.httpClient.get(`${this.basePath}`, { headers, params: params })
    );
  }
  public update(categoryId: string, category: CategoryInput, updateFilter?: UpdateFilter): Observable<ResponseDto> {
    const headers = this.commonService.getHeaders();
    let params = new HttpParams();
    if (updateFilter?.toArchive != null) {
      params = params.append('toArchive', updateFilter?.toArchive);
    }
    return <Observable<ResponseDto>>this.httpClient.put(`${this.basePath}/${categoryId}`, category, { headers, params });
  }
  public delete(categoryId: string): Observable<ResponseDto> {
    const headers = this.commonService.getHeaders();
    return <Observable<ResponseDto>>this.httpClient.delete(`${this.basePath}/${categoryId}`, { headers });
  }
}
