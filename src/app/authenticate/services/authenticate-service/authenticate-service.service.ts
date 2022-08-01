import { Injectable } from '@angular/core';
import { User } from './user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {
  users: User[] = [

  ]
  constructor() { }
  registerNewUser(User: User) {
    this.users.push(User)
  }
}
