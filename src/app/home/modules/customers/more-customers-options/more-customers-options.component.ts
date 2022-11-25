import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'more-customers-options',
  templateUrl: './more-customers-options.component.html',
  styleUrls: ['./more-customers-options.component.css']
})
export class MoreCustomersOptionsComponent {

  constructor(private router:Router) { }

  public openArchivedComponent() {
    this.router.navigate(['home', 'customers', 'archived']);
  }

}
