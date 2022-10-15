import { Component, Input } from '@angular/core';

@Component({
  selector: 'fin-subtitle',
  templateUrl: './fin-subtitle.component.html',
  styleUrls: ['./fin-subtitle.component.css']
})
export class FinSubtitleComponent {

  @Input() label!:string;

}
