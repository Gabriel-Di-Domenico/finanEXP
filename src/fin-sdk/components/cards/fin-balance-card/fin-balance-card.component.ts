import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-fin-balance-card',
  templateUrl: './fin-balance-card.component.html',
  styleUrls: ['./fin-balance-card.component.css'],
})
export class FinBalanceCardComponent {
  @Input() title!: string;
  @Input() subtitle!: string;
}
