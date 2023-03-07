import { CommonService } from 'finan-exp-sdk';
import { environment } from 'src/environments/environment';

import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseDto } from '../../shared/support/classes/responseDto';
import { PerfilPhotoInput } from 'src/app/core/dtos/perfilPhoto/perfilPhotoInput';
import { PerfilPhotoOutput } from 'src/app/core/dtos/perfilPhoto/perfilPhotoOutput';

@Injectable({
  providedIn: 'root',
})
export class PerfilPhotoProxysService {
  private basePath = `${environment.baseUrl}/perfilPhotos`;
  constructor(private httpClient: HttpClient, private commonService: CommonService) {}

  public createPerfilPhotoRequest(perfilPhoto: PerfilPhotoInput): Observable<ResponseDto> {
    const headers = this.commonService.getHeaders();
    return <Observable<ResponseDto>>this.httpClient.post(`${this.basePath}`, perfilPhoto, { headers });
  }
  public updatePerfilPhotoRequest(perfilPhoto: PerfilPhotoInput): Observable<ResponseDto> {
    const headers = this.commonService.getHeaders();
    return <Observable<ResponseDto>>this.httpClient.put(`${this.basePath}`, perfilPhoto, { headers });
  }
  public getRequest(): Observable<ResponseDto<PerfilPhotoOutput>> {
    const headers = this.commonService.getHeaders();
    return <Observable<ResponseDto<PerfilPhotoOutput>>>this.httpClient.get(`${this.basePath}`, { headers });
  }
  public deleteRequest(): Observable<ResponseDto> {
    const headers = this.commonService.getHeaders();
    return <Observable<ResponseDto>>this.httpClient.delete(`${this.basePath}`, { headers });
  }
}
