import { CommonService } from './../../../shared/support/services/common.service';
import { Component, Input } from '@angular/core';
import { UserOutput } from 'src/app/shared/support/interfaces/user/userOutput.interface';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./styles/menu.component.css'],
})
export class MenuComponent {
  @Input() currentUser: UserOutput = {
    id: '',
    name: '',
    email: '',
  };
  @Input() smallScreen = false;
  constructor(private commonService:CommonService){}
  public logout(): void {
    this.commonService.logout();
  }
}
