import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'more-categories-options',
  templateUrl: './more-categories-options.component.html',
  styleUrls: ['./more-categories-options.component.css'],
})
export class MoreCategoriesOptionsComponent {
  constructor(private router: Router) {}

  public openArchivedComponent() {
    this.router.navigate(['home', 'categories', 'archived']);
  }
}
