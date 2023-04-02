import { TransactionType } from '../../../../shared/support/enums/transactionTypes/transaction-types';
export interface CategoriesEditorDialogData {
  operation: 'create' | 'update',
  categoryId:string,
  transactionType:TransactionType,
}