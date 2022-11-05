import { TransactionType } from '../../../../shared/support/enums/transactionTypes/transaction-types';
import { Component, Output, EventEmitter } from '@angular/core';

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
  @Output() transactionTypeReturnEvent = new EventEmitter<TransactionType>;

  public returnTransactionType(transactionType:TransactionType){
    this.transactionTypeReturnEvent.emit(transactionType)
  }
}
