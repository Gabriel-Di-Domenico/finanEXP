import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonService } from '../../support/services/common.service';
import { ResponseDto } from '../../support/classes/responseDto';
import { TransactionInput } from '../../support/interfaces/transactions/transactionInput';
import { TransactionOutput } from '../../support/interfaces/transactions/transactionOutput';

@Injectable({
  providedIn: 'root',
})
export class TransactionsProxysService {
  private basePath = 'http://localhost:51235/transactions';
  constructor(private httpClient: HttpClient, private commonService: CommonService) {}

  public create(transaction: TransactionInput): Observable<ResponseDto> {
    const headers = this.commonService.getHeaders();
    return <Observable<ResponseDto>>this.httpClient.post(`${this.basePath}`, transaction, { headers });
  }
  public getAll(): Observable<ResponseDto<Array<TransactionOutput>>> {
    const headers = this.commonService.getHeaders();
    return <Observable<ResponseDto<Array<TransactionOutput>>>>this.httpClient.get(`${this.basePath}`, { headers });
  }
}
