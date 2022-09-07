import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { take } from 'rxjs';

import { UserHandlerService } from '../../../../../shared/handlers/user-handler.service';
import  UserOutput  from './../../../../../shared/support/interfaces/userOutput.interface';
import { UserCrudProxysService } from './../../../../../shared/proxys/userCrudProxys/user-crud-proxys.service';

@Component({
  selector: 'app-user-config',
  templateUrl: './user-config.component.html',
  styleUrls: ['./user-config.component.css']
})
export class UserConfigComponent implements OnInit {

  currentUserId: string = ''
  currentUser: UserOutput = {
    id: '',
    name: '',
    email: ''
  }

  constructor(
    private route: ActivatedRoute,
    private userCrudProxysService: UserCrudProxysService,
    private userHandlerService: UserHandlerService
  ) { }

  ngOnInit(): void {
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
    this.userHandlerService.registerGetUser().subscribe({
      next: (user: UserOutput) => {
        this.currentUser = user
      }
    })
  }

}
