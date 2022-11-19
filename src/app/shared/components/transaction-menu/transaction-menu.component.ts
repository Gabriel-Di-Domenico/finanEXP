import { TransactionType } from '../../support/enums/transactionTypes/transaction-types';
import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'transaction-menu',
  templateUrl: './transaction-menu.component.html',
  styleUrls: ['./transaction-menu.component.css'],
  host: {
    class: 'h-100 w-100',
  },
})
export class TransactionMenuComponent {
  public transactionTypes = TransactionType;
  @Input() module!: 'transactions' | 'categories' | 'menu';
  @Output() transactionTypeReturnEvent = new EventEmitter<TransactionType>;

  public returnTransactionType(transactionType:TransactionType){
    this.transactionTypeReturnEvent.emit(transactionType)
  }
}
