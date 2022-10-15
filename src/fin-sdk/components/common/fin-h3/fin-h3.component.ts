import { Component, Input } from '@angular/core';

@Component({
  selector: 'fin-h3',
  templateUrl: './fin-h3.component.html',
  styleUrls: ['./fin-h3.component.css']
})
export class FinH3Component {
  @Input() label!:string;
}
