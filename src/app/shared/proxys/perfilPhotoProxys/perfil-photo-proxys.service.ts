import { ResponseGetPerfilPhotoDto } from './../../support/classes/perfilPhoto/responseGetPerfilPhotoDto';
import { CommonService } from './../../support/services/common.service';
import { Observable } from 'rxjs';
import { PerfilPhotoInput } from '../../support/interfaces/perfilPhoto/perfilPhotoInput.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseDto } from '../../support/classes/responseDto';

@Injectable({
  providedIn: 'root',
})
export class PerfilPhotoProxysService {
  private basePath = 'http://localhost:51235/perfilPhotos';
  constructor(private httpClient: HttpClient, private commonService: CommonService) {}

  public createPerfilPhotoRequest(perfilPhoto: PerfilPhotoInput): Observable<ResponseDto> {
    const headers = this.commonService.getHeaders();
    return <Observable<ResponseDto>>this.httpClient.post(`${this.basePath}`, perfilPhoto, { headers });
  }
  public updatePerfilPhotoRequest(perfilPhotoId: string, perfilPhoto: PerfilPhotoInput): Observable<ResponseDto> {
    const headers = this.commonService.getHeaders();
    return <Observable<ResponseDto>>this.httpClient.put(`${this.basePath}/${perfilPhotoId}`, perfilPhoto, { headers });
  }
  public getRequest(perfilPhotoId: string): Observable<ResponseGetPerfilPhotoDto> {
    const headers = this.commonService.getHeaders();
    return <Observable<ResponseGetPerfilPhotoDto>>this.httpClient.get(`${this.basePath}/${perfilPhotoId}`, { headers });
  }
  public deleteRequest(perfilPhotoId: string): Observable<ResponseDto> {
    const headers = this.commonService.getHeaders();
    return <Observable<ResponseDto>>this.httpClient.delete(`${this.basePath}/${perfilPhotoId}`, { headers });
  }
}
