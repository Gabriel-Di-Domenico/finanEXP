import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-config-view',
  templateUrl: './config-view.component.html',
  styleUrls: ['./styles/config-view.component.css']
})
export class ConfigViewComponent {
  @Input() public title = '';

}
