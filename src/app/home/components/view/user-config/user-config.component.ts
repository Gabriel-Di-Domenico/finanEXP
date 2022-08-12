import { User } from '../../../../interfaces/user.interface';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-config',
  templateUrl: './user-config.component.html',
  styleUrls: ['./user-config.component.css']
})
export class UserConfigComponent implements OnInit {
  currentUser: User = {
    name: '',
    email: ''
  }
  constructor() { }

  ngOnInit(): void {
  }

}
