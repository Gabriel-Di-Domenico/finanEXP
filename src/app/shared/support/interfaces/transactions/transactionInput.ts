import { TransactionType } from './../../enums/transactionTypes/transaction-types';
export interface TransactionInput {
  description?: string;
  value: number;
  categoryId?: string | null;
  receiverCustomerId: string;
  senderCustomerId?: string;
  transactionType: TransactionType;
  date: Date | string;
}
