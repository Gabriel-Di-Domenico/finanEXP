import { Component, Input } from '@angular/core';
import { UserOutput } from 'src/app/shared/support/interfaces/user/userOutput.interface';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent {
  @Input() currentUser: UserOutput = {
    id: '',
    name: '',
    email: '',
  };
}
