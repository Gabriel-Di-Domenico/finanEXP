import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-fin-title',
  templateUrl: './fin-title.component.html',
  styleUrls: ['./fin-title.component.css']
})
export class FinTitleComponent {
  @Input() public label!:string;

}
