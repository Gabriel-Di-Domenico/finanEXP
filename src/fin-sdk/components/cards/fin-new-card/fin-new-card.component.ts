import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'fin-new-card',
  templateUrl: './fin-new-card.component.html',
  styleUrls: ['./fin-new-card.component.css']
})
export class FinNewCardComponent {
  @Input() title!: string;
  @Output() clickEvent: EventEmitter<PointerEvent> = new EventEmitter<PointerEvent>()

  sendClick(){
    this.clickEvent.emit()
  }
}
