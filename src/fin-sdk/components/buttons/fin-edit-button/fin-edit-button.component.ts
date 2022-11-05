import { Component, Input } from '@angular/core';

@Component({
  selector: 'fin-edit-button',
  templateUrl: './fin-edit-button.component.html',
  styleUrls: ['./fin-edit-button.component.css']
})
export class FinEditButtonComponent {
  @Input() color = 'primary';
}
