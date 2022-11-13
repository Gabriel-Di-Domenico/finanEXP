import { TransactionType } from './../../enums/transactionTypes/transaction-types';
export interface TransactionOutput {
  id: string;
  description: string;
  date: Date;
  value: number;
  categoryId: string;
  customerId: string;
  transactionType: TransactionType;
}
