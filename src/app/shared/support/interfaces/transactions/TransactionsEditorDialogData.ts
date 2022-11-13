import { TransactionType } from '../../enums/transactionTypes/transaction-types';
export interface TransactionsEditorDialogData {
  operation: 'create' | 'update',
  transactionId:string,
  transactionType:TransactionType,
}