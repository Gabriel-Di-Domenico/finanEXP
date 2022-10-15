import { Component, Input, OnInit } from '@angular/core';

import  UserOutput  from '../../../shared/support/interfaces/user/userOutput.interface';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  @Input() currentUser: UserOutput = {
    id: '',
    name: '',
    email: ''
  }
  constructor() { }

  ngOnInit(): void {
    
  }



}
