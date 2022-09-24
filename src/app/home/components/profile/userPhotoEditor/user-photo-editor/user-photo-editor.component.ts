import { HttpErrorResponse } from '@angular/common/http';
import { SnackBarControlService } from './../../../../../shared/support/services/snackBarControl/snack-bar-control.service';
import { UserHandler } from './../../../../../shared/support/classes/user-handler';
import { ProfileService } from '../../../../modules/user-config/pages/profile/profile.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { UserHandlerService } from 'src/app/shared/handlers/user-handler.service';
import UserOutput from 'src/app/shared/support/interfaces/userOutput.interface';
import User from 'src/app/shared/support/interfaces/user.interface';

@Component({
  selector: 'app-user-photo-editor',
  templateUrl: './user-photo-editor.component.html',
  styleUrls: ['./user-photo-editor.component.css'],
})

export class UserPhotoEditorComponent extends UserHandler implements OnInit {
  perfilPhoto!: any
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: UserOutput,
    private dialog: MatDialog,
    private profileService: ProfileService,
    userHandlerService: UserHandlerService,
    private snackBarControlService: SnackBarControlService
  ) {
    super(userHandlerService)
    this.currentUser = data
  }

  override ngOnInitFunction(): void {
    this.getPerfilPhoto()

  }
  protected override afterListening(): void {
    this.getPerfilPhoto()
  }
  public closeUserPhotoEditor() {
    this.dialog.getDialogById("userPhotoEditor")?.close()
  }

  public onFileSelected() {
    const inputNode: any = document.querySelector('#file');
    const archiveType = inputNode.files[0].type

    if (typeof (FileReader) !== 'undefined') {
      const reader = new FileReader();

      reader.onload = (e: any) => {


        if (archiveType === "image/jpeg" || archiveType === "image/png") {
          const arr = new Uint8Array(e.target?.result);
          const currentUser = <User>this.currentUser

          currentUser.perfilPhoto = arr.toString()

          this.profileService.updateProfilePreferences(`${this.currentUser.id}`, currentUser, (err?: HttpErrorResponse) => {
            if (!err) {
              this.snackBarControlService.showMessage("Imagem salva com sucesso", false,)
            } else if (err.status === 401) {
              this.snackBarControlService.showMessage("Sessão expirada", true)
              this.closeUserPhotoEditor()
            }
          })
        } else {
          this.snackBarControlService.showMessage("Apenas arquivos jpeg e png são suportados", true)
        }
        inputNode.value = ""
      };

      reader.readAsArrayBuffer(inputNode.files[0]);

      this.currentUser.perfilPhoto
    }
  }
  public canRemove() {
    if (this.perfilPhoto.length) {
      return false
    } else {
      return true
    }
  }
  public removeImage() {
    const currentUser = <User>this.currentUser
    currentUser.perfilPhoto = ''

    this.profileService.updateProfilePreferences(`${this.currentUser.id}`, <User>this.currentUser, (err?: HttpErrorResponse) => {
      if (!err) {
        this.snackBarControlService.showMessage("Imagem removida com sucesso", false)
      } else if (err.status === 401) {
        this.snackBarControlService.showMessage("Sessão expirada", true)
        this.closeUserPhotoEditor()
      }
    })
  }
  private getPerfilPhoto() {
    if(this.currentUser.perfilPhoto){
      const array = this.currentUser.perfilPhoto.split(',').map((byte:string) => Number(byte))

      this.perfilPhoto = "data:image/png;base64," + window.btoa(String.fromCharCode.apply(null, array));
    }else{
      this.perfilPhoto = ""
    }
  }
}


