import { TransactionType } from '../../enums/transactionTypes/transaction-types';
export interface CategoryOutput{
  id:string,
  name:string,
  transactionType:TransactionType,
}