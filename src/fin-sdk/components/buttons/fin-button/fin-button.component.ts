import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-fin-button',
  templateUrl: './fin-button.component.html',
  styleUrls: ['./fin-button.component.css']
})
export class FinButtonComponent {
  @Input() color!:string;
}
