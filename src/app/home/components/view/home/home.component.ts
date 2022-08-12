import { User } from '../../../../interfaces/user.interface';
import { ConfigUserService } from './../../../services/config-user.service';
import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout'
import { Subscription } from 'rxjs';

import { MatSidenav } from '@angular/material/sidenav';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  isExtended: boolean = false
  viewPortSizeObserver!: Subscription
  
  currentUser: User = {
    name: '',
    email: ''
  }

  @ViewChild(MatSidenav) sideNave!: MatSidenav

  constructor(
    private observer: BreakpointObserver,
    private configUserService: ConfigUserService) { }

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
    this.configUserService.getCurrentUser().subscribe({
      next: data => {
        this.currentUser = data.user
      },
      error: err => {
        console.log(err)
      }
    })
  }
  ngOnDestroy(): void {
    this.viewPortSizeObserver.unsubscribe()
  }

}
