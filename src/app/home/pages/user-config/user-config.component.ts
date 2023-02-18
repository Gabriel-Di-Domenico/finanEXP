import { CommonService, DialogControlService } from 'finan-exp-services';
import { PerfilPhotoService } from '../../components/profile/userPhotoEditor/perfil-photo.service';

import { UserService } from '../../services/user.service';
import { UserPhotoEditorComponent } from '../../components/profile/userPhotoEditor/user-photo-editor.component';

import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { UserHandlerService } from '../../../shared/handlers/user-handler.service';
import { UserHandler } from 'src/app/shared/handlers/user-handler';
import { BreakpointState } from '@angular/cdk/layout';
import { Subscription } from 'rxjs';
import { ResponseDto } from 'src/app/shared/support/classes/responseDto';
import { UserOutput } from 'src/app/core/dtos/user/userOutput';
import { PerfilPhotoOutput } from 'src/app/core/dtos/perfilPhoto/perfilPhotoOutput';

@Component({
  selector: 'app-user-config',
  templateUrl: './user-config.component.html',
  styleUrls: ['./styles/user-config.component.css'],
})
export class UserConfigComponent extends UserHandler implements OnInit, OnDestroy {
  public currentUserId = '';
  public perfilPhoto = '';
  public smallScreen = false;
  private viewPortSizeObserver!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private UserService: UserService,
    private perfilPhotoService: PerfilPhotoService,
    userHandlerService: UserHandlerService,
    private dialogControlService: DialogControlService,
    private commonService: CommonService
  ) {
    super(userHandlerService);
    this.viewPortSizeObserver = this.commonService.startViewPortSizeObserver().subscribe((res: BreakpointState) => {
      if (res.matches) {
        this.smallScreen = true;
      } else {
        this.smallScreen = false;
      }
    });
  }

  override ngOnInitFunction(): void {
    this.route.data.subscribe({
      next: data => {
        this.currentUserId = data['currentUserId'];
      },
    });
    this.UserService.getUserById(this.currentUserId, (data: ResponseDto<UserOutput>) => {
      this.currentUser = data.content;
      this.getPerfilPhoto();
    });
  }
  override ngOnDestroyFunction(): void {
    this.viewPortSizeObserver.unsubscribe();
  }
  protected override execAfterGetUser(): void {
    this.getPerfilPhoto();
  }
  public openPerfilPhotoEditor(): void {
    this.dialogControlService.openDialog(UserPhotoEditorComponent, {
      panelClass: 'custom-dialog-container',
      id: 'userPhotoEditor',
      data: this.currentUser,
      width: '500px',
      height: '300px',
    });
  }
  public logout(): void {
    this.commonService.logout();
  }
  private getPerfilPhoto(): void {
    this.perfilPhoto = '';

    this.perfilPhotoService.get((data: ResponseDto<PerfilPhotoOutput>) => {
      if (!data.message.error) {
        this.perfilPhoto = `data:image/png;base64,${data.content.data}`;
      }
    });
  }
}
