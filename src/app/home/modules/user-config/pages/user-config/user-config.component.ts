import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { take } from 'rxjs';

import { UserHandlerService } from '../../../../../shared/handlers/user-handler.service';
import UserOutput from './../../../../../shared/support/interfaces/userOutput.interface';
import { UserCrudProxysService } from './../../../../../shared/proxys/userCrudProxys/user-crud-proxys.service';
import { UserHandler } from 'src/app/shared/support/classes/user-handler';

@Component({
  selector: 'app-user-config',
  templateUrl: './user-config.component.html',
  styleUrls: ['./user-config.component.css']
})
export class UserConfigComponent extends UserHandler implements OnInit, OnDestroy {

  currentUserId: string = ''
  override currentUser: UserOutput = {
    id: '',
    name: '',
    email: ''
  }

  constructor(
    private route: ActivatedRoute,
    private userCrudProxysService: UserCrudProxysService,
    userHandlerService: UserHandlerService
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
        }
      })
  }

}
