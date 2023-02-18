import { HttpErrorResponse } from '@angular/common/http';
import { ResponseDto } from 'src/app/shared/support/classes/responseDto';
import { take } from 'rxjs';
import { PerfilPhotoProxysService } from '../../../../api/perfilPhotoProxy/perfil-photo-proxys.service';
import { Injectable } from '@angular/core';
import { Message } from 'src/app/shared/support/interfaces/message.interface';
import { PerfilPhotoOutput } from 'src/app/core/dtos/perfilPhoto/perfilPhotoOutput';
import { PerfilPhotoInput } from 'src/app/core/dtos/perfilPhoto/perfilPhotoInput';

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
  public updatePerfilPhoto(perfilPhoto: PerfilPhotoInput, callback: (message: Message) => void) {
    this.perfilPhotoProxysService
      .updatePerfilPhotoRequest(perfilPhoto)
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
  public get(callback?: (data: ResponseDto<PerfilPhotoOutput>) => void) {
    this.perfilPhotoProxysService
      .getRequest()
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
  public delete(callback?: (message: Message) => void) {
    this.perfilPhotoProxysService
      .deleteRequest()
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
