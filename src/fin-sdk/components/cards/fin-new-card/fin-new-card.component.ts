import { Component, Input } from '@angular/core';

@Component({
  selector: 'fin-new-card',
  templateUrl: './fin-new-card.component.html',
  styleUrls: ['./fin-new-card.component.css']
})
export class FinNewCardComponent {
  @Input() clickEvent!: () => void;
  @Input() title!: string;

}
