import { Component, Input } from '@angular/core';

@Component({
  selector: 'fin-submit-button',
  templateUrl: './fin-submit-button.component.html',
  styleUrls: ['./fin-submit-button.component.css']
})
export class FinSubmitButtonComponent {
  @Input() disabled!:string | boolean;
  @Input() label!:string;
  @Input() color = 'primary';
  @Input() withIcon = true;
}
