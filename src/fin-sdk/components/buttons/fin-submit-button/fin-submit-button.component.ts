import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-fin-submit-button',
  templateUrl: './fin-submit-button.component.html',
  styleUrls: ['./fin-submit-button.component.css']
})
export class FinSubmitButtonComponent {
  @Input() disabled!:string | boolean;
  @Input() label!:string;
}
