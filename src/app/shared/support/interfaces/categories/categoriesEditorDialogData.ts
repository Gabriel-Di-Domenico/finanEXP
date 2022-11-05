import { TransactionType } from '../../enums/transactionTypes/transaction-types';
export interface CategoriesEditorDialogData {
  operation: 'create' | 'update',
  categoryId:string,
  transactionType:TransactionType,
}