import { UserPhotoEditorComponent } from '../../components/profile/userPhotoEditor/user-photo-editor/user-photo-editor.component';
import { DialogControlService } from '../../../shared/support/services/dialogControl/dialog-control.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { take } from 'rxjs';

import { UserHandlerService } from '../../../shared/handlers/user-handler.service';
import UserOutput from '../../../shared/support/interfaces/userOutput.interface';
import { UserCrudProxysService } from '../../../shared/proxys/userCrudProxys/user-crud-proxys.service';
import { UserHandler } from 'src/app/shared/support/classes/user-handler';

@Component({
  selector: 'app-user-config',
  templateUrl: './user-config.component.html',
  styleUrls: ['./user-config.component.css']
})
export class UserConfigComponent extends UserHandler implements OnInit, OnDestroy {

  currentUserId: string = ''
  perfilPhoto:string = ''

  constructor(
    private route: ActivatedRoute,
    private userCrudProxysService: UserCrudProxysService,
    userHandlerService:UserHandlerService,
    private dialogControlService: DialogControlService
  ) {
    super(userHandlerService)
  }

  override ngOnInitFunction(): void {
    this.route.data.subscribe({
      next: (data) => {
        this.currentUserId = data['currentUserId']
      }
    })
    this.userCrudProxysService.getUserByIdRequest(this.currentUserId)
      .pipe(
        take(1)
      )
      .subscribe({
        next: (user: UserOutput) => {
          this.currentUser = user
          this.getPerfilPhoto()
        }
      })
      
  }
  protected override afterListening(): void {
    this.getPerfilPhoto()
  }
  openPerfilPhotoEditor() {
    this.dialogControlService.openDialog(UserPhotoEditorComponent,{
      panelClass:'custom-dialog-container',
      id:"userPhotoEditor",
      data:this.currentUser
    })
  }
  private getPerfilPhoto(){
    if(this.currentUser.perfilPhoto){
      const array = this.currentUser.perfilPhoto.split(',').map((byte:string) => Number(byte))

      this.perfilPhoto = "data:image/png;base64," + window.btoa(String.fromCharCode.apply(null, array));
    }else{
      this.perfilPhoto = ""
    }
  }

}
