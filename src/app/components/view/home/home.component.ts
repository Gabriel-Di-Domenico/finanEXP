import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout'
import { MatSidenav } from '@angular/material/sidenav';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  isExtended: boolean = false
  viewPortSizeObserver!: Subscription

  @ViewChild(MatSidenav) sideNave!: MatSidenav

  constructor(private observer: BreakpointObserver,) { }

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
  }
  ngOnDestroy(): void {
    this.viewPortSizeObserver.unsubscribe()
  }

}
