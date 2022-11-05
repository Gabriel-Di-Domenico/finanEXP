import { TransactionType } from '../../support/enums/transactionTypes/transaction-types';
import { EventEmitter } from '@angular/core';
export const transactionTypeChangeHandler = new EventEmitter<TransactionType>