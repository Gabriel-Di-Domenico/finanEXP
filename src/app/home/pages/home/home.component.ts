import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

import { Subscription, take } from 'rxjs';

import { UserHandlerService } from './../../../shared/handlers/user-handler.service';

import { MatSidenav } from '@angular/material/sidenav';
import { UserCrudProxysService } from './../../../shared/proxys/userCrudProxys/user-crud-proxys.service';
import UserOutput  from './../../../shared/support/interfaces/userOutput.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],

})
export class HomeComponent implements OnInit, OnDestroy {
  isExtended: boolean = false
  viewPortSizeObserver!: Subscription
  currentUserId: string = ''

  currentUser: UserOutput = {
    id: '',
    name: '',
    email: '',
  }

  @ViewChild(MatSidenav) sideNave!: MatSidenav

  constructor(
    private observer: BreakpointObserver,
    private route: ActivatedRoute,
    private userCrudProxysService: UserCrudProxysService,
    private userHandlerService: UserHandlerService
  ) { }

  ngOnInit(): void {
    this.viewPortSizeObserver = this.observer.observe(['(max-width:800px)']).subscribe((res: BreakpointState) => {
      if (res.matches) {
        this.isExtended = false
        this.sideNave?.close()
      } else {
        this.isExtended = true
        this.sideNave?.open()
      }
    })
    this.route.data.subscribe({
      next: (data) => {
        this.currentUserId = data['currentUserId']
      }
    })
    this.userCrudProxysService.getUserByIdRequest(this.currentUserId)
      .pipe(
        take(1)
      ).subscribe({
        next: (data: UserOutput) => {
          this.currentUser = data
        }
      })
    this.userHandlerService.registerGetUser().subscribe({
      next: (user: UserOutput) => {
        this.currentUser = user
      }
    })
  }
  ngOnDestroy(): void {
    this.viewPortSizeObserver.unsubscribe()
  }

}
