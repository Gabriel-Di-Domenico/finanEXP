import { UserOutput } from './../../../../../support/interfaces/userOutput.interface';
import { ActivatedRoute } from '@angular/router';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-config',
  templateUrl: './user-config.component.html',
  styleUrls: ['./user-config.component.css']
})
export class UserConfigComponent implements OnInit {

  currentUser: UserOutput = {
    name: '',
    email: ''
  }
  
  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.data.subscribe({
      next: (data) => {
        this.currentUser = data['currentUser']
      }
    })
  }

}
