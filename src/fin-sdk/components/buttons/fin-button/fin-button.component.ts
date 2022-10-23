import { Component, Input } from '@angular/core';

@Component({
  selector: 'fin-button',
  templateUrl: './fin-button.component.html',
  styleUrls: ['./fin-button.component.css']
})
export class FinButtonComponent {
  @Input() color!:string;
  @Input() disabled?:boolean;
}
