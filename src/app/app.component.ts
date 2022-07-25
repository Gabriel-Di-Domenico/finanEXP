import { Component, ViewChild, OnInit } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout'
import { MatSidenav } from '@angular/material/sidenav';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isExtended: boolean = false
  @ViewChild(MatSidenav) sideNave!: MatSidenav
  constructor(private observer: BreakpointObserver) {

  }
  ngOnInit() {
    this.observer.observe(['(max-width:800px)']).subscribe((res) => {
      if (res.matches) {
        this.isExtended = false
        this.sideNave?.close()
      } else {
        this.isExtended = true
        this.sideNave?.open()
      }
    })
  }
  extendedControl() {

  }
  
}
