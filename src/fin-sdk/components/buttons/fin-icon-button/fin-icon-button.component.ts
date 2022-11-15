import { Component, Input } from '@angular/core';

@Component({
  selector: 'fin-icon-button',
  templateUrl: './fin-icon-button.component.html',
  styleUrls: ['./styles/fin-icon-button.component.css'],
})
export class FinIconButtonComponent {
  @Input() icon!: string;
  @Input() color = 'primary';
  @Input() fontSize?:string

}
