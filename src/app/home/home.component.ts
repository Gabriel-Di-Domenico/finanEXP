import { CommonService } from './../shared/support/services/common.service';
import { UserService } from './services/user.service';
import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

import { Subscription, take } from 'rxjs';

import { UserHandlerService } from '../shared/handlers/user-handler.service';

import { MatSidenav } from '@angular/material/sidenav';

import { ResponseGetUserByIdDto } from '../shared/support/classes/responseGetUserByIdDto';
import { UserOutput } from '../shared/support/interfaces/user/userOutput.interface';
import { UserHandler } from '../shared/handlers/user-handler';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./styles/home.component.css'],
})
export class HomeComponent extends UserHandler implements OnInit, OnDestroy {
  public isExtended = false;
  public smallScreen = false;
  private viewPortSizeObserver!: Subscription;

  override currentUser: UserOutput = {
    id: '',
    name: '',
    email: '',
  };

  @ViewChild(MatSidenav) sideNave!: MatSidenav;

  constructor(
    private observer: BreakpointObserver,
    private route: ActivatedRoute,
    private userService: UserService,
    private commonService:CommonService,
    userHandlerService: UserHandlerService
  ) {
    super(userHandlerService);
    this.viewPortSizeObserver = this.commonService.startViewPortSizeObserver().subscribe((res: BreakpointState) => {
      if (res.matches) {
        this.smallScreen = true;
        this.isExtended = false;
        this.sideNave?.close();
      } else {
        this.smallScreen = false;
        this.isExtended = true;
        this.sideNave?.open();
      }
    })
  }
  override ngOnInitFunction(): void {
    this.getCurrentUser();
  }
  override ngOnDestroyFunction(): void {
    this.viewPortSizeObserver.unsubscribe();
  }

  private getCurrentUser() {
    let currentUserId = '';

    this.route.data.pipe(take(1)).subscribe({
      next: (data: any) => {
        currentUserId = data['currentUserId'];
      },
    });
    this.userService.getUserById(currentUserId, (data: ResponseGetUserByIdDto) => {
      this.currentUser = data.user;
    });
  }
}
