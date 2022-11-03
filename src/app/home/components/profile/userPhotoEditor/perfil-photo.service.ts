import { HttpErrorResponse } from '@angular/common/http';
import { ResponseDto } from 'src/app/shared/support/classes/responseDto';
import { take } from 'rxjs';
import { PerfilPhotoProxysService } from '../../../../shared/proxys/perfilPhotoProxys/perfil-photo-proxys.service';
import { Injectable } from '@angular/core';
import { PerfilPhotoInput } from 'src/app/shared/support/interfaces/perfilPhoto/perfilPhotoInput.interface';
import { Message } from 'src/app/shared/support/interfaces/message.interface';
import { PerfilPhotoOutput } from 'src/app/shared/support/interfaces/perfilPhoto/perfilPhotoOutput';

@Injectable({
  providedIn: 'root',
})
export class PerfilPhotoService {
  constructor(private perfilPhotoProxysService: PerfilPhotoProxysService) {}

  public createPerfilPhoto(PerfilPhotoInput: PerfilPhotoInput, callback?: (message: Message) => void) {
    this.perfilPhotoProxysService
      .createPerfilPhotoRequest(PerfilPhotoInput)
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
  public updatePerfilPhoto(perfilPhotoId: string, perfilPhoto: PerfilPhotoInput, callback: (message: Message) => void) {
    this.perfilPhotoProxysService
      .updatePerfilPhotoRequest(perfilPhotoId, perfilPhoto)
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
  public get(perfilPhotoId: string, callback?: (data: ResponseDto<PerfilPhotoOutput>) => void) {
    this.perfilPhotoProxysService
      .getRequest(perfilPhotoId)
      .pipe(take(1))
      .subscribe({
        next: (data: ResponseDto<PerfilPhotoOutput>) => {
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
  public delete(perfilPhotoId: string, callback?: (message: Message) => void) {
    this.perfilPhotoProxysService
      .deleteRequest(perfilPhotoId)
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
