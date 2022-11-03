import { PerfilPhotoInput } from '../../../../shared/support/interfaces/perfilPhoto/perfilPhotoInput.interface';
import { PerfilPhotoService } from './perfil-photo.service';
import { SnackBarControlService } from '../../../../shared/support/services/snackBarControl/snack-bar-control.service';
import { UserHandler } from '../../../../shared/handlers/user-handler';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { UserHandlerService } from 'src/app/shared/handlers/user-handler.service';

import { Message } from 'src/app/shared/support/interfaces/message.interface';
import { UserOutput } from 'src/app/shared/support/interfaces/user/userOutput.interface';
import { ResponseDto } from 'src/app/shared/support/classes/responseDto';
import { PerfilPhotoOutput } from 'src/app/shared/support/interfaces/perfilPhoto/perfilPhotoOutput';

@Component({
  selector: 'app-user-photo-editor',
  templateUrl: './user-photo-editor.component.html',
  styleUrls: ['./user-photo-editor.component.css'],
})
export class UserPhotoEditorComponent extends UserHandler implements OnInit {
  public perfilPhoto!: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: UserOutput,
    private dialog: MatDialog,
    private perfilPhotoService: PerfilPhotoService,
    private snackBarControlService: SnackBarControlService,
    userHandlerService: UserHandlerService
  ) {
    super(userHandlerService);
    this.currentUser = data;
  }

  protected override ngOnInitFunction(): void {
    this.getPerfilPhoto();
  }
  protected override execAfterGetUser(): void {
    this.getPerfilPhoto();
  }
  public closeUserPhotoEditor() {
    this.dialog.getDialogById('userPhotoEditor')?.close();
  }

  public onFileSelected() {
    const inputNode: HTMLInputElement = document.querySelector('#file') as HTMLInputElement;
    const file = (inputNode.files as FileList)[0]
    const archiveType = file.type;

    if (typeof FileReader !== 'undefined') {
      const reader = new FileReader();

      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (archiveType === 'image/jpeg' || archiveType === 'image/png') {
          const base64Data = window.btoa(e.target?.result as string)
          const perfilPhoto = {
            data: base64Data,
            name: file.name,
          } as PerfilPhotoInput;

          if (this.currentUser.perfilPhotoId) {
            this.updatePerfilPhoto(perfilPhoto);
          } else {
            this.createPerfilPhoto(perfilPhoto);
          }
        } else {
          this.snackBarControlService.showMessage('Apenas arquivos jpeg e png são suportados', true);
        }
        inputNode.value = '';
      };

      reader.readAsBinaryString(file);
    }
  }
  public canRemove() {
    if (this.perfilPhoto?.length) {
      return false;
    } else {
      return true;
    }
  }
  public removeImage() {
    if (this.currentUser.perfilPhotoId) {
      this.perfilPhotoService.delete(this.currentUser.perfilPhotoId, (message: Message) => {
        this.snackBarControlService.showMessage(message.message, message.error);
        if (!message.error) {
          this.currentUser.perfilPhotoId = undefined;
          this.emit();
        }
      });
    }
  }

  private getPerfilPhoto() {
    this.perfilPhoto = '';
    if (this.currentUser.perfilPhotoId) {
      this.perfilPhotoService.get(this.currentUser.perfilPhotoId, (data: ResponseDto<PerfilPhotoOutput>) => {
        if (!data.message.error) {
          this.perfilPhoto = `data:image/png;base64,${data.content.data}`;
        }
      });
    }
  }
  private updatePerfilPhoto(perfilPhoto: PerfilPhotoInput) {
    this.perfilPhotoService.updatePerfilPhoto(this.currentUser.perfilPhotoId as string, perfilPhoto, (message: Message) => {
      this.snackBarControlService.showMessage(message.message, message.error);
      this.emit();
      if (message.error) {
        this.closeUserPhotoEditor();
      }
    });
  }
  private createPerfilPhoto(perfilPhoto: PerfilPhotoInput) {
    this.perfilPhotoService.createPerfilPhoto(perfilPhoto, (message: Message) => {
      this.snackBarControlService.showMessage(message.message, message.error);
      this.emit();
      if (message.error) {
        this.closeUserPhotoEditor();
      }
    });
  }
}
