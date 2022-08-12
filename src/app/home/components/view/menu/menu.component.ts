import { User } from '../../../../interfaces/user.interface';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  @Input() currentUser: User = {
    name: '',
    email: ''
  }
  constructor() { }



  ngOnInit(): void {
    
  }
  


}
