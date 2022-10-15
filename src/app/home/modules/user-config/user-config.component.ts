import { CommonService } from './../../../shared/support/services/common.service';
import { UserService } from './../../services/user.service';
import { UserPhotoEditorComponent } from '../../components/profile/userPhotoEditor/user-photo-editor.component';
import { DialogControlService } from '../../../shared/support/services/dialogControl/dialog-control.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { UserHandlerService } from '../../../shared/handlers/user-handler.service';
import { UserHandler } from 'src/app/shared/handlers/user-handler';
import { ResponseGetUserByIdDto } from 'src/app/shared/support/classes/responseGetUserByIdDto';

@Component({
  selector: 'app-user-config',
  templateUrl: './user-config.component.html',
  styleUrls: ['./user-config.component.css'],
})
export class UserConfigComponent extends UserHandler implements OnInit, OnDestroy {
  currentUserId = '';
  perfilPhoto = '';

  constructor(
    private route: ActivatedRoute,
    private UserService: UserService,
    userHandlerService: UserHandlerService,
    private dialogControlService: DialogControlService,
    private router: Router,
    private commonService:CommonService
  ) {
    super(userHandlerService);
  }

  override ngOnInitFunction(): void {
    this.route.data.subscribe({
      next: data => {
        this.currentUserId = data['currentUserId'];
      },
    });
    this.UserService.getUserById(this.currentUserId, (data: ResponseGetUserByIdDto) => {
      this.currentUser = data.user;
      this.getPerfilPhoto();
    });
  }
  protected override afterListening(): void {
    this.getPerfilPhoto();
  }
  public openPerfilPhotoEditor(): void {
    this.dialogControlService.openDialog(UserPhotoEditorComponent, {
      panelClass: 'custom-dialog-container',
      id: 'userPhotoEditor',
      data: this.currentUser,
    });
  }
  public logout(): void {
    this.commonService.logout();
  }
  private getPerfilPhoto(): void {
    if (this.currentUser.perfilPhoto) {
      const array = this.currentUser.perfilPhoto.split(',').map((byte: string) => Number(byte));

      this.perfilPhoto = `data:image/png;base64,${ window.btoa(String.fromCharCode.apply(null, array))}`;
    } else {
      this.perfilPhoto = '';
    }
  }
}
