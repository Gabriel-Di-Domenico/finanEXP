import { environment } from 'src/environments/environment';
import { GetAllFilter } from './../../support/interfaces/getAllFilter';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonService } from '../../support/services/common.service';
import { ResponseDto } from '../../support/classes/responseDto';
import { TransactionInput } from '../../support/interfaces/transactions/transactionInput';
import { TransactionOutput } from '../../support/interfaces/transactions/transactionOutput';
import { TransactionType } from '../../support/enums/transactionTypes/transaction-types';

@Injectable({
  providedIn: 'root',
})
export class TransactionsProxysService {
  private basePath = `${environment.baseUrl}/transactions`;
  constructor(private httpClient: HttpClient, private commonService: CommonService) {}

  public delete(id: string): Observable<ResponseDto> {
    const headers = this.commonService.getHeaders();
    return <Observable<ResponseDto>>this.httpClient.delete(`${this.basePath}/${id}`, { headers });
  }
  public update(id: string, transaction: TransactionInput): Observable<ResponseDto> {
    const headers = this.commonService.getHeaders();
    return <Observable<ResponseDto>>this.httpClient.put(`${this.basePath}/${id}`, transaction, { headers });
  }
  public create(transaction: TransactionInput): Observable<ResponseDto> {
    const headers = this.commonService.getHeaders();
    return <Observable<ResponseDto>>this.httpClient.post(`${this.basePath}`, transaction, { headers });
  }
  public getAll(filter?: GetAllFilter): Observable<ResponseDto<Array<TransactionOutput>>> {
    const headers = this.commonService.getHeaders();
    let params = new HttpParams();

    if (filter?.transactionType != null && filter.transactionType !== TransactionType.transactions) {
      params = params.append('transactionType', filter?.transactionType);
    }

    return <Observable<ResponseDto<Array<TransactionOutput>>>>this.httpClient.get(`${this.basePath}`, { headers, params });
  }
  public getById(id: string): Observable<ResponseDto<TransactionOutput>> {
    const headers = this.commonService.getHeaders();
    return <Observable<ResponseDto<TransactionOutput>>>this.httpClient.get(`${this.basePath}/${id}`, { headers });
  }
}
