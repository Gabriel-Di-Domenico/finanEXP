import { UserOutput } from '../../../../support/interfaces/userOutput.interface';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  @Input() currentUser: UserOutput = {
    name: '',
    email: ''
  }
  constructor() { }

  ngOnInit(): void {
    
  }



}
