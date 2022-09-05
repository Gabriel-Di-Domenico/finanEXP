import { UserOutput } from './../../../../support/interfaces/userOutput.interface';
import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout'
import { Subscription } from 'rxjs';

import { MatSidenav } from '@angular/material/sidenav';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  
})
export class HomeComponent implements OnInit, OnDestroy {
  isExtended: boolean = false
  viewPortSizeObserver!: Subscription

  currentUser: UserOutput = {
    name: '',
    email: '',
  }

  @ViewChild(MatSidenav) sideNave!: MatSidenav

  constructor(
    private observer: BreakpointObserver,
    private route: ActivatedRoute
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
      next:(data) => {
        this.currentUser = data['currentUser']
      }
    })

  }
  ngOnDestroy(): void {
    this.viewPortSizeObserver.unsubscribe()
  }

}
