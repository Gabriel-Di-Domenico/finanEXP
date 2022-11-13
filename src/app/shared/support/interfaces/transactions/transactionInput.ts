import { TransactionType } from './../../enums/transactionTypes/transaction-types';
export interface TransactionInput {
  description?: string;
  value: number;
  categoryId: string;
  customerId: string;
  transactionType: TransactionType;
}
