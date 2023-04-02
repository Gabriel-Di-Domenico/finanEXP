import { TransactionType } from 'src/app/shared/support/enums/transactionTypes/transaction-types';

export interface TransactionsEditorDialogData {
  operation: 'create' | 'update',
  transactionId:string,
  transactionType:TransactionType,
}