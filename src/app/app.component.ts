import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout'
import { MatSidenav } from '@angular/material/sidenav';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(private observer: BreakpointObserver) {

  }

  isExtended: boolean = false
  viewPortSizeObserver!: Subscription

  @ViewChild(MatSidenav) sideNave!: MatSidenav

  ngOnInit() {
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
  ngOnDestroy() {
    this.viewPortSizeObserver.unsubscribe()
  }


}
