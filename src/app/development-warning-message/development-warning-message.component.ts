import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'fin-development-warning-message',
  templateUrl: './development-warning-message.component.html',
  styleUrls: ['./development-warning-message.component.css']
})
export class DevelopmentWarningMessageComponent {
  constructor(private router:Router){}
  public navigateToAuth(){
    this.router.navigate(['auth'])
  }
}
