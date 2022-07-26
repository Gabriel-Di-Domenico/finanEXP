import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-authenticate-form',
  templateUrl: './authenticate-form.component.html',
  styleUrls: ['./authenticate-form.component.css']
})
export class AuthenticateFormComponent implements OnInit {
  showPassword: boolean = false

  constructor() {

  }

  ngOnInit(): void {
  }



}
