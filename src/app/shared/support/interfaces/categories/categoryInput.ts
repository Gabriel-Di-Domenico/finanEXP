import { TransactionType } from '../../enums/transactionTypes/transaction-types';
export interface CategoryInput {
  name: string;
  transactionType:TransactionType
}
